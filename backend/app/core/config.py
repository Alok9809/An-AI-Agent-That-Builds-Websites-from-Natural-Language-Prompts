from typing import List, Optional
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    PROJECT_NAME: str = "FORMA"
    TAGLINE: str = "Give thought its form."
    ENV: str = "development"

    # MongoDB Atlas / Local Connection
    MONGODB_URI: str = Field(
        default="mongodb://localhost:27017",
        description="MongoDB connection string (Atlas or local)",
    )
    MONGODB_DATABASE: str = Field(
        default="forma_db",
        description="MongoDB database name",
    )

    # Networking & CORS
    FRONTEND_ORIGIN: str = Field(
        default="http://localhost:5173",
        description="Allowed frontend origin for CORS and cookies",
    )
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ]
    BACKEND_URL: str = "http://localhost:8000"

    # Sessions & Security
    SESSION_SECRET: str = Field(
        default="forma_super_secure_session_secret_key_min_32_chars_long_12345",
        description="Cryptographic secret used for HMAC signatures and session hashing",
    )
    SESSION_COOKIE_NAME: str = "forma_session"
    CSRF_COOKIE_NAME: str = "forma_csrf"
    SESSION_MAX_AGE_SECONDS: int = 60 * 60 * 24 * 7  # 7 days
    SESSION_REMEMBER_ME_DAYS: int = 30  # 30 days
    COOKIE_SECURE: bool = False  # Overridden to True if ENV == 'production'
    COOKIE_SAMESITE: str = "lax"
    COOKIE_HTTPONLY: bool = True

    # Password Reset & Email Verification
    PASSWORD_RESET_TOKEN_EXPIRE_MINUTES: int = 60
    EMAIL_VERIFICATION_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours
    EMAIL_VERIFICATION_OTP_EXPIRE_MINUTES: int = 15
    REQUIRE_EMAIL_VERIFICATION: bool = True

    # Email Delivery Configuration
    EMAIL_PROVIDER: str = "console"  # 'console', 'smtp', or 'mock'
    SMTP_HOST: Optional[str] = None
    SMTP_PORT: int = 587
    SMTP_USERNAME: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    SMTP_FROM_EMAIL: str = "noreply@forma.ai"
    SMTP_TLS: bool = True

    # Google OAuth
    GOOGLE_CLIENT_ID: Optional[str] = None
    GOOGLE_CLIENT_SECRET: Optional[str] = None

    # Rate Limiting
    RATE_LIMIT_ENABLED: bool = True
    RATE_LIMIT_LOGIN_MAX: int = 5
    RATE_LIMIT_LOGIN_WINDOW_SECONDS: int = 60
    RATE_LIMIT_REGISTER_MAX: int = 5
    RATE_LIMIT_REGISTER_WINDOW_SECONDS: int = 60
    RATE_LIMIT_FORGOT_MAX: int = 3
    RATE_LIMIT_FORGOT_WINDOW_SECONDS: int = 300

    @property
    def is_production(self) -> bool:
        return self.ENV.lower() == "production"

    @property
    def cookie_secure_effective(self) -> bool:
        return True if self.is_production else self.COOKIE_SECURE


settings = Settings()
