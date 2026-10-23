import hashlib
import hmac
import re
import secrets
import socket
from typing import Tuple
from argon2 import PasswordHasher, Type
from argon2.exceptions import VerifyMismatchError, VerificationError, InvalidHashError
import dns.resolver
from email_validator import validate_email, EmailNotValidError, EmailUndeliverableError

# Public DNS resolvers fallback list for reliable MX resolution across all networks
_dns_resolver = dns.resolver.Resolver(configure=False)
_dns_resolver.nameservers = ["8.8.8.8", "1.1.1.1", "8.8.4.4"]
_dns_resolver.lifetime = 2.5
_dns_resolver.timeout = 2.0

# Argon2id password hasher with secure, production-minded parameters
ph = PasswordHasher(
    time_cost=2,
    memory_cost=65536,  # 64MB
    parallelism=1,
    hash_len=32,
    type=Type.ID,
)

PASSWORD_REGEX = re.compile(
    r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]).{8,128}$"
)


def hash_password(password: str) -> str:
    """Hashes a plaintext password using Argon2id."""
    return ph.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies a plaintext password against an Argon2id hash with constant-time security."""
    if not plain_password or not hashed_password:
        return False
    try:
        return ph.verify(hashed_password, plain_password)
    except (VerifyMismatchError, VerificationError, InvalidHashError):
        return False
    except Exception:
        return False


def validate_password_strength(password: str) -> Tuple[bool, str]:
    """
    Enforces password complexity:
    - 8 to 128 characters
    - At least one lowercase letter
    - At least one uppercase letter
    - At least one number
    - At least one special symbol
    """
    if len(password) < 8:
        return False, "Password must be at least 8 characters long."
    if len(password) > 128:
        return False, "Password cannot exceed 128 characters."
    if not re.search(r"[a-z]", password):
        return False, "Password must contain at least one lowercase letter."
    if not re.search(r"[A-Z]", password):
        return False, "Password must contain at least one uppercase letter."
    if not re.search(r"\d", password):
        return False, "Password must contain at least one numeric digit."
    if not re.search(r"[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]", password):
        return False, "Password must contain at least one special character."
    return True, ""


def generate_secure_token(nbytes: int = 32) -> str:
    """Generates a cryptographically secure URL-safe random string."""
    return secrets.token_urlsafe(nbytes)


def hash_token(token: str) -> str:
    """
    SHA-256 hash for reset tokens and session IDs before database storage.
    Ensures raw tokens are never exposed in database dumps or logs.
    """
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def constant_time_compare(val1: str, val2: str) -> bool:
    """Constant-time string comparison to prevent timing attacks."""
    return hmac.compare_digest(val1.encode("utf-8"), val2.encode("utf-8"))


def generate_csrf_token() -> str:
    """Generates a random CSRF token."""
    return secrets.token_hex(24)


def generate_otp(length: int = 6) -> str:
    """Generates a cryptographically secure numeric OTP."""
    digits = [str(secrets.randbelow(10)) for _ in range(length)]
    if digits[0] == "0":
        digits[0] = str(secrets.randbelow(9) + 1)
    return "".join(digits)


def validate_email_deliverability(email: str) -> Tuple[bool, str]:
    """
    Validates email format and verifies destination domain existence and
    MX record deliverability before sending emails to avoid NDR / mailer-daemon bounces.
    """
    if not email or "@" not in email:
        return False, "Please enter a valid email address."

    parts = email.strip().split("@")
    if len(parts) != 2 or not parts[0] or not parts[1]:
        return False, "Please enter a valid email address."

    domain = parts[1].strip().lower()

    # 1. Quick host resolution check
    try:
        socket.gethostbyname(domain)
    except Exception:
        return False, f"The email domain '{domain}' does not exist. Please check for typos and enter a valid email address."

    # 2. MX Deliverability check via email_validator
    try:
        validate_email(email.strip(), check_deliverability=True, dns_resolver=_dns_resolver)
    except EmailUndeliverableError:
        return False, f"The email domain '{domain}' was not found or does not accept emails. Please check for typos and enter a valid email address."
    except EmailNotValidError as e:
        return False, f"Invalid email format: {str(e)}"
    except Exception:
        try:
            answers = _dns_resolver.resolve(domain, "MX")
            exchanges = [str(r.exchange).rstrip(".") for r in answers]
            if not exchanges or any(ex in ("", ".") for ex in exchanges):
                return False, f"The domain '{domain}' does not have a valid mail server. Please enter a valid email address."
        except Exception:
            return False, f"The email domain '{domain}' could not be verified. Please check for typos and enter a valid email address."

    return True, ""

