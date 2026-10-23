from datetime import datetime, timedelta, timezone
from typing import Any, Dict, Optional, Tuple
from bson import ObjectId
from fastapi import HTTPException, status
from app.core.config import settings
from app.core.security import (
    constant_time_compare,
    generate_otp,
    generate_secure_token,
    hash_password,
    hash_token,
    validate_email_deliverability,
    validate_password_strength,
    verify_password,
)
from app.db.mongodb import db_manager
from app.services.email_service import email_service


class AuthService:
    """
    Dedicated authentication service layer encapsulating all business logic,
    cryptography, session lifecycle, and credential verification.
    """

    @staticmethod
    def _id_query(user_id: Any) -> Dict[str, Any]:
        """Ensures queries match either MongoDB ObjectId or string _id across Atlas and test mocks."""
        str_id = str(user_id)
        if ObjectId.is_valid(str_id):
            return {"$or": [{"_id": ObjectId(str_id)}, {"_id": str_id}]}
        return {"_id": user_id}

    async def register_user(
        self,
        name: str,
        email: str,
        password: str,
        terms_accepted: bool,
    ) -> Dict[str, Any]:
        normalized_email = email.strip().lower()

        # Validate email address existence & deliverability to prevent mail bounces
        is_deliverable, deliverable_msg = validate_email_deliverability(normalized_email)
        if not is_deliverable:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=deliverable_msg,
            )

        if not terms_accepted:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You must accept the Terms of Service and Privacy Policy.",
            )

        # Validate password complexity
        is_valid, msg = validate_password_strength(password)
        if not is_valid:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=msg,
            )

        # Check for existing account
        existing_user = await db_manager.users.find_one({"email": normalized_email})
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="An account with this email address already exists.",
            )

        now = datetime.now(timezone.utc)
        password_hash = hash_password(password)

        user_doc = {
            "name": name.strip(),
            "email": normalized_email,
            "password_hash": password_hash,
            "email_verified": not settings.REQUIRE_EMAIL_VERIFICATION,
            "is_active": True,
            "created_at": now,
            "updated_at": now,
        }

        result = await db_manager.users.insert_one(user_doc)
        user_doc["_id"] = str(getattr(result, "inserted_id", user_doc.get("_id", "")))

        # Send initial email verification with 6-digit OTP
        if settings.REQUIRE_EMAIL_VERIFICATION:
            raw_token = generate_secure_token(32)
            token_hash = hash_token(raw_token)
            otp = generate_otp(6)
            otp_hash = hash_token(otp)
            expires_at = now + timedelta(minutes=settings.EMAIL_VERIFICATION_OTP_EXPIRE_MINUTES)
            await db_manager.email_verifications.insert_one({
                "token_hash": token_hash,
                "otp_hash": otp_hash,
                "user_id": user_doc["_id"],
                "email": normalized_email,
                "expires_at": expires_at,
                "created_at": now,
                "attempts": 0,
                "is_used": False,
            })
            await email_service.send_verification_email(normalized_email, raw_token, otp)

        return user_doc

    async def authenticate_user(
        self,
        email: str,
        password: str,
    ) -> Dict[str, Any]:
        normalized_email = email.strip().lower()
        user = await db_manager.users.find_one({"email": normalized_email})

        # Generic error message prevents account enumeration
        invalid_credentials_exc = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

        if not user or not user.get("is_active", True):
            # Run dummy verify to mitigate timing attacks
            verify_password(password, "$argon2id$v=19$m=65536,t=2,p=1$c29tZXNhbHQ$RdescudvJCsgqlrefreshHashDummy1234567890")
            raise invalid_credentials_exc

        if not verify_password(password, user["password_hash"]):
            raise invalid_credentials_exc

        if settings.REQUIRE_EMAIL_VERIFICATION and not user.get("email_verified", False):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Please verify your email address before signing in.",
            )

        user["_id"] = str(user["_id"])
        return user

    async def create_session(
        self,
        user_id: str,
        remember_me: bool = False,
        user_agent: Optional[str] = None,
        ip_address: Optional[str] = None,
    ) -> Tuple[str, datetime]:
        raw_session_token = generate_secure_token(32)
        session_id_hash = hash_token(raw_session_token)

        now = datetime.now(timezone.utc)
        if remember_me:
            expires_at = now + timedelta(days=settings.SESSION_REMEMBER_ME_DAYS)
        else:
            expires_at = now + timedelta(seconds=settings.SESSION_MAX_AGE_SECONDS)

        session_doc = {
            "session_id_hash": session_id_hash,
            "user_id": str(user_id),
            "created_at": now,
            "expires_at": expires_at,
            "is_revoked": False,
            "user_agent": user_agent or "unknown",
            "ip_address": ip_address or "unknown",
        }

        await db_manager.sessions.insert_one(session_doc)
        return raw_session_token, expires_at

    async def get_user_by_session(self, raw_session_token: str) -> Optional[Dict[str, Any]]:
        if not raw_session_token:
            return None

        session_id_hash = hash_token(raw_session_token)
        now = datetime.now(timezone.utc)

        session = await db_manager.sessions.find_one({
            "session_id_hash": session_id_hash,
            "is_revoked": False,
            "expires_at": {"$gt": now},
        })

        if not session:
            return None

        user = await db_manager.users.find_one(self._id_query(session["user_id"]))
        if not user or not user.get("is_active", True):
            return None

        user["_id"] = str(user["_id"])
        return user

    async def invalidate_session(self, raw_session_token: str) -> None:
        if not raw_session_token:
            return
        session_id_hash = hash_token(raw_session_token)
        await db_manager.sessions.update_one(
            {"session_id_hash": session_id_hash},
            {"$set": {"is_revoked": True}},
        )

    async def request_password_reset(self, email: str) -> None:
        normalized_email = email.strip().lower()

        is_deliverable, deliverable_msg = validate_email_deliverability(normalized_email)
        if not is_deliverable:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=deliverable_msg,
            )

        user = await db_manager.users.find_one({"email": normalized_email})

        # Generic response returned by caller regardless of user presence
        if not user or not user.get("is_active", True):
            return

        now = datetime.now(timezone.utc)
        expires_at = now + timedelta(minutes=settings.PASSWORD_RESET_TOKEN_EXPIRE_MINUTES)
        raw_token = generate_secure_token(32)
        token_hash = hash_token(raw_token)

        # Invalidate previous unused reset tokens for this user
        await db_manager.password_resets.update_one(
            {"user_id": str(user["_id"]), "is_used": False},
            {"$set": {"is_used": True}},
        )

        await db_manager.password_resets.insert_one({
            "token_hash": token_hash,
            "user_id": str(user["_id"]),
            "email": normalized_email,
            "created_at": now,
            "expires_at": expires_at,
            "is_used": False,
        })

        await email_service.send_password_reset_email(normalized_email, raw_token)

    async def reset_password(self, raw_token: str, new_password: str) -> None:
        is_valid, msg = validate_password_strength(new_password)
        if not is_valid:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=msg,
            )

        token_hash = hash_token(raw_token)
        now = datetime.now(timezone.utc)

        reset_record = await db_manager.password_resets.find_one({
            "token_hash": token_hash,
            "is_used": False,
            "expires_at": {"$gt": now},
        })

        if not reset_record:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or expired password reset link. Please request a new one.",
            )

        new_hash = hash_password(new_password)
        user_id = reset_record["user_id"]

        # Update user's password and verify email
        await db_manager.users.update_one(
            self._id_query(user_id),
            {"$set": {"password_hash": new_hash, "email_verified": True, "updated_at": now}},
        )

        # Mark single-use token as used
        await db_manager.password_resets.update_one(
            {"token_hash": token_hash},
            {"$set": {"is_used": True, "used_at": now}},
        )

        # Invalidate all active sessions for this user on password reset
        await db_manager.sessions.update_one(
            {"user_id": user_id, "is_revoked": False},
            {"$set": {"is_revoked": True}},
        )

    async def verify_email(
        self,
        raw_token: Optional[str] = None,
        email: Optional[str] = None,
        otp: Optional[str] = None,
    ) -> Tuple[str, datetime, Dict[str, Any]]:
        now = datetime.now(timezone.utc)
        record = None

        if otp and email:
            normalized_email = email.strip().lower()
            record = await db_manager.email_verifications.find_one({
                "email": normalized_email,
                "is_used": False,
                "expires_at": {"$gt": now},
            })

            if not record:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid or expired verification code. Please request a new one.",
                )

            if record.get("attempts", 0) >= 5:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Too many failed attempts. Please request a new verification code.",
                )

            expected_otp_hash = record.get("otp_hash")
            input_otp_hash = hash_token(otp.strip())
            if not expected_otp_hash or not constant_time_compare(input_otp_hash, expected_otp_hash):
                await db_manager.email_verifications.update_one(
                    self._id_query(record["_id"]),
                    {"$inc": {"attempts": 1}},
                )
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid 6-digit verification code. Please check your email and try again.",
                )

        elif raw_token:
            token_hash = hash_token(raw_token)
            record = await db_manager.email_verifications.find_one({
                "token_hash": token_hash,
                "is_used": False,
                "expires_at": {"$gt": now},
            })

            if not record:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid or expired email verification link.",
                )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Verification code or link is required.",
            )

        # Mark token/OTP as consumed
        await db_manager.email_verifications.update_one(
            self._id_query(record["_id"]),
            {"$set": {"is_used": True, "used_at": now}},
        )

        # Mark user as verified
        user_id = record["user_id"]
        await db_manager.users.update_one(
            self._id_query(user_id),
            {"$set": {"email_verified": True, "updated_at": now}},
        )

        user = await db_manager.users.find_one(self._id_query(user_id))
        user["_id"] = str(user["_id"])

        # Auto-create active session upon email verification
        session_token, expires_at = await self.create_session(
            user_id=user["_id"],
            remember_me=True,
        )

        return session_token, expires_at, user

    async def resend_verification(self, email: str) -> None:
        normalized_email = email.strip().lower()

        is_deliverable, deliverable_msg = validate_email_deliverability(normalized_email)
        if not is_deliverable:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=deliverable_msg,
            )

        user = await db_manager.users.find_one({"email": normalized_email})
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No account exists with this email address. Please register first.",
            )
        if user.get("email_verified", False):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="This email address has already been verified. You can sign in directly.",
            )

        now = datetime.now(timezone.utc)
        expires_at = now + timedelta(minutes=settings.EMAIL_VERIFICATION_OTP_EXPIRE_MINUTES)
        raw_token = generate_secure_token(32)
        token_hash = hash_token(raw_token)
        otp = generate_otp(6)
        otp_hash = hash_token(otp)

        # Invalidate previous unused codes for this email
        await db_manager.email_verifications.delete_many({
            "email": normalized_email,
            "is_used": False,
        })

        await db_manager.email_verifications.insert_one({
            "token_hash": token_hash,
            "otp_hash": otp_hash,
            "user_id": str(user["_id"]),
            "email": normalized_email,
            "created_at": now,
            "expires_at": expires_at,
            "attempts": 0,
            "is_used": False,
        })
        await email_service.send_verification_email(normalized_email, raw_token, otp)

    async def get_or_create_google_user(
        self,
        email: str,
        name: Optional[str] = None,
        google_id: Optional[str] = None,
        picture: Optional[str] = None,
    ) -> Dict[str, Any]:
        normalized_email = email.strip().lower()
        now = datetime.now(timezone.utc)

        user = await db_manager.users.find_one({"email": normalized_email})
        if user:
            update_data = {
                "updated_at": now,
                "email_verified": True,
            }
            if google_id and not user.get("google_id"):
                update_data["google_id"] = google_id
            if picture and not user.get("picture"):
                update_data["picture"] = picture
            await db_manager.users.update_one(self._id_query(user["_id"]), {"$set": update_data})
            user = await db_manager.users.find_one(self._id_query(user["_id"]))
            user["_id"] = str(user["_id"])
            return user

        display_name = (name or normalized_email.split("@")[0]).strip()
        user_doc = {
            "name": display_name,
            "email": normalized_email,
            "password_hash": None,
            "google_id": google_id,
            "picture": picture,
            "email_verified": True,
            "is_active": True,
            "created_at": now,
            "updated_at": now,
        }
        result = await db_manager.users.insert_one(user_doc)
        user_doc["_id"] = str(getattr(result, "inserted_id", user_doc.get("_id", "")))
        return user_doc


auth_service = AuthService()
