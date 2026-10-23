from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator


class RegisterRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Full name")
    email: EmailStr = Field(..., description="Valid email address")
    password: str = Field(..., min_length=8, max_length=128, description="Strong password")
    confirm_password: str = Field(..., min_length=8, max_length=128, description="Password confirmation")
    terms_accepted: bool = Field(..., description="Acceptance of Terms of Service and Privacy Policy")

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        trimmed = v.strip()
        if len(trimmed) < 2:
            raise ValueError("Name must be at least 2 characters long.")
        return trimmed

    @field_validator("terms_accepted")
    @classmethod
    def validate_terms(cls, v: bool) -> bool:
        if not v:
            raise ValueError("You must accept the Terms of Service and Privacy Policy to proceed.")
        return v

    @field_validator("confirm_password")
    @classmethod
    def passwords_match(cls, v: str, info) -> str:
        if "password" in info.data and v != info.data["password"]:
            raise ValueError("Passwords do not match.")
        return v


class LoginRequest(BaseModel):
    email: EmailStr = Field(..., description="Account email address")
    password: str = Field(..., min_length=1, max_length=128, description="Password")
    remember_me: bool = Field(default=False, description="Persist session for extended duration")


class ForgotPasswordRequest(BaseModel):
    email: EmailStr = Field(..., description="Account email address for password reset")


class ResetPasswordRequest(BaseModel):
    token: str = Field(..., min_length=10, description="Single-use password reset token")
    new_password: str = Field(..., min_length=8, max_length=128, description="New password")
    confirm_password: str = Field(..., min_length=8, max_length=128, description="Confirm new password")

    @field_validator("confirm_password")
    @classmethod
    def passwords_match(cls, v: str, info) -> str:
        if "new_password" in info.data and v != info.data["new_password"]:
            raise ValueError("Passwords do not match.")
        return v


class VerifyEmailRequest(BaseModel):
    email: Optional[EmailStr] = Field(None, description="Account email address")
    otp: Optional[str] = Field(None, min_length=4, max_length=10, description="6-digit verification OTP")
    token: Optional[str] = Field(None, min_length=10, description="Email verification link token")


class ResendVerificationRequest(BaseModel):
    email: EmailStr = Field(..., description="Email address to resend verification link")


class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    email_verified: bool
    is_active: bool
    created_at: datetime


class AuthResponse(BaseModel):
    user: UserResponse
    message: str = "Authentication successful"
    token: Optional[str] = None
    requires_verification: bool = False


class MessageResponse(BaseModel):
    message: str
    status: str = "success"
    # Never return secrets in API responses
