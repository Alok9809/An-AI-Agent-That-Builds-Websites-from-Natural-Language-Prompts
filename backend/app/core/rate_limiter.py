import time
from collections import defaultdict
from typing import Dict, List
from fastapi import HTTPException, status
from app.core.config import settings


class InMemoryRateLimiter:
    """
    In-memory sliding-window rate limiter for sensitive authentication endpoints.
    Tracks timestamps per key: (action, identifier).
    """

    def __init__(self):
        # Maps key -> list of float timestamps
        self._requests: Dict[str, List[float]] = defaultdict(list)

    def is_allowed(self, key: str, max_attempts: int, window_seconds: int) -> bool:
        if not settings.RATE_LIMIT_ENABLED:
            return True

        now = time.time()
        window_start = now - window_seconds

        # Clean timestamps older than window
        self._requests[key] = [t for t in self._requests[key] if t > window_start]

        if len(self._requests[key]) >= max_attempts:
            return False

        self._requests[key].append(now)
        return True

    def check_rate_limit(
        self,
        action: str,
        identifier: str,
        max_attempts: int,
        window_seconds: int,
    ) -> None:
        key = f"{action}:{identifier.strip().lower()}"
        if not self.is_allowed(key, max_attempts, window_seconds):
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Too many attempts. Please wait a few minutes before trying again.",
            )

    def reset_key(self, action: str, identifier: str) -> None:
        key = f"{action}:{identifier.strip().lower()}"
        if key in self._requests:
            del self._requests[key]

    def clear(self) -> None:
        self._requests.clear()


rate_limiter = InMemoryRateLimiter()
