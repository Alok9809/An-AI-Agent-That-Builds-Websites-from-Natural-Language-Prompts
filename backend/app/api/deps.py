"""
API dependencies and request utilities for FORMA Authentication Module.
Maintains clear separation of concerns between HTTP routes and security/context resolution.
"""

from datetime import datetime
from typing import Optional
from fastapi import Cookie, Header, HTTPException, Request, status
from app.core.security import constant_time_compare
from app.schemas.auth import UserResponse
from app.services.auth_service import auth_service


def get_client_ip(request: Request) -> str:
    """Safely extracts client IP address accounting for proxies."""
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "127.0.0.1"


async def get_current_user(
    request: Request,
    forma_session: Optional[str] = Cookie(None),
    authorization: Optional[str] = Header(None),
) -> dict:
    """
    Dependency that authenticates the user from the HttpOnly session cookie
    or an Authorization Bearer token header.
    """
    token = forma_session
    if not token and authorization and authorization.startswith("Bearer "):
        token = authorization.split("Bearer ")[1].strip()

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required. Please sign in.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = await auth_service.get_user_by_session(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session has expired or is invalid. Please sign in again.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


def verify_csrf_protection(
    request: Request,
    forma_session: Optional[str] = Cookie(None),
    forma_csrf: Optional[str] = Cookie(None),
    x_csrf_token: Optional[str] = Header(None),
) -> None:
    """
    Enforces Double Submit Cookie CSRF protection for cookie-based state-changing requests.
    """
    if forma_session:
        # If authenticated via cookie, require valid CSRF token header matching cookie
        if not forma_csrf or not x_csrf_token or not constant_time_compare(forma_csrf, x_csrf_token):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="CSRF token validation failed.",
            )


def to_user_response(user: dict) -> UserResponse:
    """Serializes a MongoDB user record into a sanitized UserResponse DTO."""
    created_at = user.get("created_at")
    if isinstance(created_at, str):
        try:
            created_at = datetime.fromisoformat(created_at)
        except Exception:
            created_at = datetime.now()
    elif not isinstance(created_at, datetime):
        created_at = datetime.now()

    return UserResponse(
        id=str(user.get("_id", "")),
        name=user.get("name", ""),
        email=user.get("email", ""),
        email_verified=user.get("email_verified", False),
        is_active=user.get("is_active", True),
        created_at=created_at,
    )
