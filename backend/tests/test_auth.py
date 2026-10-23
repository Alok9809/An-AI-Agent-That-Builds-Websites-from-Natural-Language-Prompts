import pytest
from fastapi.testclient import TestClient
from app.core.config import settings
from app.core.rate_limiter import rate_limiter
from app.main import app
from app.services.email_service import email_service

client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_teardown():
    # Clear client cookies, rate limiter, and dev outbox before each test
    client.cookies.clear()
    rate_limiter.clear()
    email_service.dev_outbox.clear()
    yield
    client.cookies.clear()


def test_home_and_health():
    res = client.get("/")
    assert res.status_code == 200
    assert res.json()["status"] == "running"
    assert "auth_endpoints" in res.json()

    health = client.get("/health")
    assert health.status_code == 200
    assert health.json()["status"] == "healthy"


def test_register_success():
    payload = {
        "name": "Alex Mercer",
        "email": "alex.mercer@forma.ai",
        "password": "Password123!@#",
        "confirm_password": "Password123!@#",
        "terms_accepted": True,
    }
    res = client.post("/api/auth/register", json=payload)
    assert res.status_code == 201
    data = res.json()
    assert "user" in data
    assert data["user"]["email"] == "alex.mercer@forma.ai"
    assert data["user"]["name"] == "Alex Mercer"
    assert "password_hash" not in str(data)  # Never return password hash
    assert settings.SESSION_COOKIE_NAME in res.cookies

    # Email verification via 6-digit OTP
    assert len(email_service.dev_outbox) > 0
    import re
    otp_match = re.search(r"code is: (\d{6})", email_service.dev_outbox[0].body_text)
    assert otp_match is not None
    otp = otp_match.group(1)

    verify_res = client.post("/api/auth/verify-email", json={
        "email": "alex.mercer@forma.ai",
        "otp": otp,
    })
    assert verify_res.status_code == 200
    assert verify_res.json()["user"]["email_verified"] is True


def test_register_duplicate_email():
    payload = {
        "name": "Duplicate User",
        "email": "alex.mercer@forma.ai",
        "password": "Password123!@#",
        "confirm_password": "Password123!@#",
        "terms_accepted": True,
    }
    res = client.post("/api/auth/register", json=payload)
    assert res.status_code == 409
    assert "already exists" in res.json()["detail"]


def test_register_invalid_inputs():
    # Password mismatch
    res = client.post("/api/auth/register", json={
        "name": "Mismatch User",
        "email": "mismatch@forma.ai",
        "password": "Password123!@#",
        "confirm_password": "DifferentPassword123!",
        "terms_accepted": True,
    })
    assert res.status_code == 422

    # Weak password
    res2 = client.post("/api/auth/register", json={
        "name": "Weak User",
        "email": "weak@forma.ai",
        "password": "simple",
        "confirm_password": "simple",
        "terms_accepted": True,
    })
    assert res2.status_code == 422

    # Terms not accepted
    res3 = client.post("/api/auth/register", json={
        "name": "No Terms",
        "email": "noterms@forma.ai",
        "password": "Password123!@#",
        "confirm_password": "Password123!@#",
        "terms_accepted": False,
    })
    assert res3.status_code == 422


def test_login_success():
    payload = {
        "email": "alex.mercer@forma.ai",
        "password": "Password123!@#",
        "remember_me": True,
    }
    res = client.post("/api/auth/login", json=payload)
    assert res.status_code == 200
    assert "Signed in successfully" in res.json()["message"]
    assert settings.SESSION_COOKIE_NAME in res.cookies


def test_login_incorrect_password():
    payload = {
        "email": "alex.mercer@forma.ai",
        "password": "WrongPassword999!",
    }
    res = client.post("/api/auth/login", json=payload)
    assert res.status_code == 401
    assert "Invalid email or password" in res.json()["detail"]


def test_login_nonexistent_user():
    payload = {
        "email": "nonexistent@forma.ai",
        "password": "Password123!@#",
    }
    res = client.post("/api/auth/login", json=payload)
    assert res.status_code == 401
    assert "Invalid email or password" in res.json()["detail"]


def test_unauthenticated_access_to_me():
    res = client.get("/api/auth/me")
    assert res.status_code == 401
    assert "Authentication required" in res.json()["detail"]


def test_authenticated_access_to_me_and_logout():
    # Login first
    login_res = client.post("/api/auth/login", json={
        "email": "alex.mercer@forma.ai",
        "password": "Password123!@#",
    })
    session_cookie = login_res.cookies.get(settings.SESSION_COOKIE_NAME)
    assert session_cookie is not None

    # Access /api/auth/me with cookie
    me_res = client.get(
        "/api/auth/me",
        cookies={settings.SESSION_COOKIE_NAME: session_cookie},
    )
    assert me_res.status_code == 200
    assert me_res.json()["email"] == "alex.mercer@forma.ai"

    # Logout
    logout_res = client.post(
        "/api/auth/logout",
        cookies={settings.SESSION_COOKIE_NAME: session_cookie},
    )
    assert logout_res.status_code == 200

    # Access /api/auth/me again after logout -> should be 401
    me_after_res = client.get(
        "/api/auth/me",
        cookies={settings.SESSION_COOKIE_NAME: session_cookie},
    )
    assert me_after_res.status_code == 401


def test_forgot_password_generic_response():
    # Existent user
    res1 = client.post("/api/auth/forgot-password", json={"email": "alex.mercer@forma.ai"})
    assert res1.status_code == 200
    assert "password reset link has been dispatched" in res1.json()["message"]
    assert len(email_service.dev_outbox) > 0

    # Non-existent user -> identical generic message prevents enumeration
    res2 = client.post("/api/auth/forgot-password", json={"email": "nobody@forma.ai"})
    assert res2.status_code == 200
    assert "password reset link has been dispatched" in res2.json()["message"]


def test_password_reset_flow():
    # Register a new user
    client.post("/api/auth/register", json={
        "name": "Reset Tester",
        "email": "reset.tester@forma.ai",
        "password": "InitialPassword123!",
        "confirm_password": "InitialPassword123!",
        "terms_accepted": True,
    })

    # Request reset
    email_service.dev_outbox.clear()
    client.post("/api/auth/forgot-password", json={"email": "reset.tester@forma.ai"})
    assert len(email_service.dev_outbox) == 1
    email_body = email_service.dev_outbox[0].body_text

    # Extract token from dev email body URL (token=...)
    import re
    token_match = re.search(r"token=([A-Za-z0-9_-]+)", email_body)
    assert token_match is not None
    token = token_match.group(1)

    # Perform password reset
    reset_res = client.post("/api/auth/reset-password", json={
        "token": token,
        "new_password": "BrandNewPassword456!",
        "confirm_password": "BrandNewPassword456!",
    })
    assert reset_res.status_code == 200
    assert "successfully updated" in reset_res.json()["message"]

    # Re-using the same token should fail
    reuse_res = client.post("/api/auth/reset-password", json={
        "token": token,
        "new_password": "BrandNewPassword456!",
        "confirm_password": "BrandNewPassword456!",
    })
    assert reuse_res.status_code == 400

    # Log in with new password
    new_login = client.post("/api/auth/login", json={
        "email": "reset.tester@forma.ai",
        "password": "BrandNewPassword456!",
    })
    assert new_login.status_code == 200

    # Old password no longer works
    old_login = client.post("/api/auth/login", json={
        "email": "reset.tester@forma.ai",
        "password": "InitialPassword123!",
    })
    assert old_login.status_code == 401


def test_login_rate_limiting():
    # Exceed login attempts
    email = "ratelimit@forma.ai"
    for i in range(settings.RATE_LIMIT_LOGIN_MAX):
        client.post("/api/auth/login", json={"email": email, "password": f"wrong{i}"})

    # The next attempt must trigger 429
    blocked = client.post("/api/auth/login", json={"email": email, "password": "wrong"})
    assert blocked.status_code == 429
    assert "Too many attempts" in blocked.json()["detail"]
