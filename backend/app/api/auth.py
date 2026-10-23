import logging
from typing import Optional
from urllib.parse import urlencode
import httpx
from fastapi import APIRouter, Cookie, Depends, Header, HTTPException, Request, Response, status
from fastapi.responses import RedirectResponse
from app.core.config import settings
from app.core.rate_limiter import rate_limiter
from app.core.security import generate_csrf_token
from app.schemas.auth import (
    AuthResponse,
    ForgotPasswordRequest,
    LoginRequest,
    MessageResponse,
    RegisterRequest,
    ResendVerificationRequest,
    ResetPasswordRequest,
    UserResponse,
    VerifyEmailRequest,
)
from app.services.auth_service import auth_service
from app.api.deps import (
    get_client_ip,
    get_current_user,
    to_user_response,
    verify_csrf_protection,
)

logger = logging.getLogger("forma.auth")

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.get("/google", summary="Initiate Google OAuth Flow")
async def google_login():
    if not settings.GOOGLE_CLIENT_ID:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Google OAuth is not configured.",
        )
    redirect_uri = f"{settings.BACKEND_URL}/api/auth/google/callback"
    params = {
        "client_id": settings.GOOGLE_CLIENT_ID,
        "redirect_uri": redirect_uri,
        "response_type": "code",
        "scope": "openid email profile",
        "access_type": "offline",
        "prompt": "select_account",
    }
    url = f"https://accounts.google.com/o/oauth2/v2/auth?{urlencode(params)}"
    return RedirectResponse(url=url)


@router.get("/google/callback", summary="Google OAuth Callback")
async def google_callback(
    request: Request,
    code: Optional[str] = None,
    error: Optional[str] = None,
):
    frontend_url = settings.FRONTEND_ORIGIN
    if error or not code:
        logger.warning("Google OAuth error or missing code: %s", error)
        return RedirectResponse(url=f"{frontend_url}/login?error=google_auth_failed")

    if not settings.GOOGLE_CLIENT_ID or not settings.GOOGLE_CLIENT_SECRET:
        return RedirectResponse(url=f"{frontend_url}/login?error=google_not_configured")

    redirect_uri = f"{settings.BACKEND_URL}/api/auth/google/callback"

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            token_resp = await client.post(
                "https://oauth2.googleapis.com/token",
                data={
                    "code": code,
                    "client_id": settings.GOOGLE_CLIENT_ID,
                    "client_secret": settings.GOOGLE_CLIENT_SECRET,
                    "redirect_uri": redirect_uri,
                    "grant_type": "authorization_code",
                },
            )
            if token_resp.status_code != 200:
                logger.error("Failed to exchange code for token: %s", token_resp.text)
                return RedirectResponse(url=f"{frontend_url}/login?error=token_exchange_failed")

            token_data = token_resp.json()
            access_token = token_data.get("access_token")

            userinfo_resp = await client.get(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                headers={"Authorization": f"Bearer {access_token}"},
            )
            if userinfo_resp.status_code != 200:
                return RedirectResponse(url=f"{frontend_url}/login?error=userinfo_failed")

            userinfo = userinfo_resp.json()
    except Exception as e:
        logger.error("Exception during Google OAuth exchange: %s", e)
        return RedirectResponse(url=f"{frontend_url}/login?error=oauth_error")

    email = userinfo.get("email")
    if not email:
        return RedirectResponse(url=f"{frontend_url}/login?error=no_email_provided")

    name = userinfo.get("name") or email.split("@")[0]
    google_id = userinfo.get("sub")
    picture = userinfo.get("picture")

    user = await auth_service.get_or_create_google_user(
        email=email,
        name=name,
        google_id=google_id,
        picture=picture,
    )

    ip = get_client_ip(request)
    session_token, expires_at = await auth_service.create_session(
        user_id=user["_id"],
        remember_me=True,
        user_agent=request.headers.get("user-agent"),
        ip_address=ip,
    )

    redirect_dest = f"{frontend_url}/login?session_token={session_token}&token={session_token}&redirect=/dashboard"
    response = RedirectResponse(url=redirect_dest, status_code=status.HTTP_302_FOUND)
    response.set_cookie(
        key=settings.SESSION_COOKIE_NAME,
        value=session_token,
        max_age=settings.SESSION_MAX_AGE_SECONDS,
        expires=expires_at,
        httponly=settings.COOKIE_HTTPONLY,
        secure=settings.cookie_secure_effective,
        samesite=settings.COOKIE_SAMESITE,
        path="/",
    )
    response.set_cookie(
        key=settings.CSRF_COOKIE_NAME,
        value=generate_csrf_token(),
        max_age=settings.SESSION_MAX_AGE_SECONDS,
        httponly=False,
        secure=settings.cookie_secure_effective,
        samesite=settings.COOKIE_SAMESITE,
        path="/",
    )
    return response


@router.post(
    "/register",
    response_model=AuthResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new FORMA account",
)
async def register(
    req: RegisterRequest,
    request: Request,
    response: Response,
):
    ip = get_client_ip(request)
    rate_limiter.check_rate_limit(
        action="register",
        identifier=ip,
        max_attempts=settings.RATE_LIMIT_REGISTER_MAX,
        window_seconds=settings.RATE_LIMIT_REGISTER_WINDOW_SECONDS,
    )

    user = await auth_service.register_user(
        name=req.name,
        email=req.email,
        password=req.password,
        terms_accepted=req.terms_accepted,
    )

    # Automatically create session upon registration
    session_token, expires_at = await auth_service.create_session(
        user_id=user["_id"],
        remember_me=False,
        user_agent=request.headers.get("user-agent"),
        ip_address=ip,
    )

    # Set secure HttpOnly session cookie
    response.set_cookie(
        key=settings.SESSION_COOKIE_NAME,
        value=session_token,
        httponly=settings.COOKIE_HTTPONLY,
        secure=settings.cookie_secure_effective,
        samesite=settings.COOKIE_SAMESITE,
        expires=expires_at,
        path="/",
    )

    # Set readable CSRF cookie
    csrf_token = generate_csrf_token()
    response.set_cookie(
        key=settings.CSRF_COOKIE_NAME,
        value=csrf_token,
        httponly=False,
        secure=settings.cookie_secure_effective,
        samesite=settings.COOKIE_SAMESITE,
        expires=expires_at,
        path="/",
    )

    requires_verification = not user.get("email_verified", True)
    return AuthResponse(
        user=to_user_response(user),
        token=session_token,
        requires_verification=requires_verification,
        message=(
            "Account created. Please enter the 6-digit verification code sent to your email."
            if requires_verification
            else "Account created successfully."
        ),
    )


@router.post(
    "/login",
    response_model=AuthResponse,
    summary="Authenticate and establish user session",
)
async def login(
    req: LoginRequest,
    request: Request,
    response: Response,
):
    ip = get_client_ip(request)
    identifier = f"{ip}:{req.email.lower()}"
    rate_limiter.check_rate_limit(
        action="login",
        identifier=identifier,
        max_attempts=settings.RATE_LIMIT_LOGIN_MAX,
        window_seconds=settings.RATE_LIMIT_LOGIN_WINDOW_SECONDS,
    )

    try:
        user = await auth_service.authenticate_user(
            email=req.email,
            password=req.password,
        )
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    # Reset failed login rate limit counter on success
    rate_limiter.reset_key(action="login", identifier=identifier)

    session_token, expires_at = await auth_service.create_session(
        user_id=user["_id"],
        remember_me=req.remember_me,
        user_agent=request.headers.get("user-agent"),
        ip_address=ip,
    )

    response.set_cookie(
        key=settings.SESSION_COOKIE_NAME,
        value=session_token,
        httponly=settings.COOKIE_HTTPONLY,
        secure=settings.cookie_secure_effective,
        samesite=settings.COOKIE_SAMESITE,
        expires=expires_at,
        path="/",
    )

    csrf_token = generate_csrf_token()
    response.set_cookie(
        key=settings.CSRF_COOKIE_NAME,
        value=csrf_token,
        httponly=False,
        secure=settings.cookie_secure_effective,
        samesite=settings.COOKIE_SAMESITE,
        expires=expires_at,
        path="/",
    )

    return AuthResponse(
        user=to_user_response(user),
        message="Signed in successfully.",
    )


@router.post(
    "/logout",
    response_model=MessageResponse,
    summary="Invalidate session and clear cookies",
)
async def logout(
    response: Response,
    forma_session: Optional[str] = Cookie(None),
    authorization: Optional[str] = Header(None),
):
    token = forma_session
    if not token and authorization and authorization.startswith("Bearer "):
        token = authorization.split("Bearer ")[1].strip()

    if token:
        await auth_service.invalidate_session(token)

    response.delete_cookie(key=settings.SESSION_COOKIE_NAME, path="/")
    response.delete_cookie(key=settings.CSRF_COOKIE_NAME, path="/")

    return MessageResponse(
        message="Signed out successfully.",
        status="success",
    )


@router.get(
    "/me",
    response_model=UserResponse,
    summary="Get current authenticated user profile",
)
async def get_me(current_user: dict = Depends(get_current_user)):
    return to_user_response(current_user)


@router.post(
    "/forgot-password",
    response_model=MessageResponse,
    summary="Request password reset link",
)
async def forgot_password(
    req: ForgotPasswordRequest,
    request: Request,
):
    ip = get_client_ip(request)
    rate_limiter.check_rate_limit(
        action="forgot_password",
        identifier=f"{ip}:{req.email.lower()}",
        max_attempts=settings.RATE_LIMIT_FORGOT_MAX,
        window_seconds=settings.RATE_LIMIT_FORGOT_WINDOW_SECONDS,
    )

    await auth_service.request_password_reset(req.email)

    # Generic response returned unconditionally to prevent account enumeration
    return MessageResponse(
        message="If an account exists for that email, a password reset link has been dispatched.",
        status="success",
    )


@router.post(
    "/reset-password",
    response_model=MessageResponse,
    summary="Reset password using single-use token",
)
async def reset_password(
    req: ResetPasswordRequest,
    request: Request,
):
    ip = get_client_ip(request)
    rate_limiter.check_rate_limit(
        action="reset_password",
        identifier=ip,
        max_attempts=settings.RATE_LIMIT_LOGIN_MAX,
        window_seconds=settings.RATE_LIMIT_LOGIN_WINDOW_SECONDS,
    )

    await auth_service.reset_password(
        raw_token=req.token,
        new_password=req.new_password,
    )

    return MessageResponse(
        message="Password has been successfully updated. You may now sign in.",
        status="success",
    )


@router.post(
    "/verify-email",
    response_model=AuthResponse,
    summary="Verify account email address with 6-digit OTP or link token",
)
async def verify_email(
    req: VerifyEmailRequest,
    request: Request,
    response: Response,
):
    ip = get_client_ip(request)
    rate_limiter.check_rate_limit(
        action="verify_email",
        identifier=f"{ip}:{req.email or 'anon'}",
        max_attempts=15,
        window_seconds=60,
    )

    if not req.otp and not req.token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please provide a 6-digit verification code or link token.",
        )

    session_token, expires_at, user = await auth_service.verify_email(
        raw_token=req.token,
        email=req.email,
        otp=req.otp,
    )

    response.set_cookie(
        key=settings.SESSION_COOKIE_NAME,
        value=session_token,
        httponly=settings.COOKIE_HTTPONLY,
        secure=settings.cookie_secure_effective,
        samesite=settings.COOKIE_SAMESITE,
        expires=expires_at,
        path="/",
    )
    response.set_cookie(
        key=settings.CSRF_COOKIE_NAME,
        value=generate_csrf_token(),
        httponly=False,
        secure=settings.cookie_secure_effective,
        samesite=settings.COOKIE_SAMESITE,
        expires=expires_at,
        path="/",
    )

    return AuthResponse(
        user=to_user_response(user),
        token=session_token,
        message="Email successfully verified.",
    )


@router.post(
    "/resend-verification",
    response_model=MessageResponse,
    summary="Resend verification email",
)
async def resend_verification(
    req: ResendVerificationRequest,
    request: Request,
):
    ip = get_client_ip(request)
    rate_limiter.check_rate_limit(
        action="resend_verify",
        identifier=f"{ip}:{req.email.lower()}",
        max_attempts=settings.RATE_LIMIT_FORGOT_MAX,
        window_seconds=settings.RATE_LIMIT_FORGOT_WINDOW_SECONDS,
    )

    await auth_service.resend_verification(req.email)
    return MessageResponse(
        message="A fresh 6-digit verification code has been sent to your email address.",
        status="success",
    )
