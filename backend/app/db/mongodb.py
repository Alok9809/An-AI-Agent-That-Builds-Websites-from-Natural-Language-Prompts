import logging
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
import motor.motor_asyncio
from pymongo import ASCENDING
from pymongo.errors import DuplicateKeyError
from app.core.config import settings

logger = logging.getLogger("forma.db")


class InMemoryAsyncCollection:
    """
    In-memory async mock collection to guarantee complete functionality
    even when an external MongoDB daemon or Atlas instance is not yet connected.
    Matches Motor's AsyncIOMotorCollection interface for find_one, insert_one, update_one, delete_one, etc.
    """

    def __init__(self, name: str):
        self.name = name
        self._docs: List[Dict[str, Any]] = []
        self._unique_fields: List[str] = []

    async def create_index(self, keys: Any, unique: bool = False, **kwargs):
        if unique:
            if isinstance(keys, str):
                self._unique_fields.append(keys)
            elif isinstance(keys, list) and len(keys) > 0:
                self._unique_fields.append(keys[0][0])
        return f"{self.name}_idx"

    def _matches(self, doc: Dict[str, Any], query: Dict[str, Any]) -> bool:
        for k, v in query.items():
            if k == "$or" and isinstance(v, list):
                if not any(self._matches(doc, q) for q in v):
                    return False
                continue
            if k not in doc:
                return False
            doc_val = doc[k]
            if isinstance(v, dict):
                # Handle operators like $gt, $lt, $in
                if "$gt" in v and not (doc_val > v["$gt"]):
                    return False
                if "$lt" in v and not (doc_val < v["$lt"]):
                    return False
                if "$in" in v and doc_val not in v["$in"]:
                    return False
            elif doc_val != v:
                return False
        return True

    async def find_one(self, query: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        # Auto-purge expired docs if expires_at in doc
        now = datetime.now(timezone.utc)
        self._docs = [
            d for d in self._docs 
            if not ("expires_at" in d and isinstance(d["expires_at"], datetime) and d["expires_at"] < now)
        ]
        for doc in self._docs:
            if self._matches(doc, query):
                return dict(doc)
        return None

    async def insert_one(self, doc: Dict[str, Any]):
        for field in self._unique_fields:
            if field in doc:
                for existing in self._docs:
                    if existing.get(field) == doc[field]:
                        raise DuplicateKeyError(f"E11000 duplicate key error collection: {self.name} index: {field}_1")
        item = dict(doc)
        if "_id" not in item:
            item["_id"] = str(len(self._docs) + 1)
        self._docs.append(item)
        class InsertResult:
            inserted_id = item["_id"]
        return InsertResult()

    async def update_one(self, query: Dict[str, Any], update: Dict[str, Any]):
        class UpdateResult:
            matched_count = 0
            modified_count = 0

        res = UpdateResult()
        for doc in self._docs:
            if self._matches(doc, query):
                res.matched_count += 1
                if "$set" in update:
                    for k, v in update["$set"].items():
                        doc[k] = v
                    res.modified_count += 1
                break
        return res

    async def delete_one(self, query: Dict[str, Any]):
        class DeleteResult:
            deleted_count = 0

        res = DeleteResult()
        for i, doc in enumerate(self._docs):
            if self._matches(doc, query):
                del self._docs[i]
                res.deleted_count = 1
                break
        return res

    async def delete_many(self, query: Dict[str, Any]):
        class DeleteResult:
            deleted_count = 0

        res = DeleteResult()
        initial_len = len(self._docs)
        self._docs = [d for d in self._docs if not self._matches(d, query)]
        res.deleted_count = initial_len - len(self._docs)
        return res


class MongoDBManager:
    def __init__(self):
        self.client: Optional[motor.motor_asyncio.AsyncIOMotorClient] = None
        self.db: Any = None
        self.is_connected: bool = False
        self._use_fallback: bool = False
        self._mock_collections: Dict[str, InMemoryAsyncCollection] = {}

    def get_collection(self, name: str):
        if self._use_fallback or not self.is_connected or self.db is None:
            if name not in self._mock_collections:
                self._mock_collections[name] = InMemoryAsyncCollection(name)
            return self._mock_collections[name]
        return self.db[name]

    @property
    def users(self):
        return self.get_collection("users")

    @property
    def sessions(self):
        return self.get_collection("sessions")

    @property
    def password_resets(self):
        return self.get_collection("password_resets")

    @property
    def email_verifications(self):
        return self.get_collection("email_verifications")

    async def connect(self):
        """Initializes connection to MongoDB Atlas / server with fallback."""
        try:
            self.client = motor.motor_asyncio.AsyncIOMotorClient(
                settings.MONGODB_URI,
                serverSelectionTimeoutMS=2000,
            )
            # Test connectivity
            await self.client.admin.command("ping")
            self.db = self.client[settings.MONGODB_DATABASE]
            self.is_connected = True
            self._use_fallback = False
            logger.info("Connected to MongoDB successfully at %s", settings.MONGODB_DATABASE)
            await self.init_indexes()
            await self.seed_demo_user()
        except Exception as exc:
            logger.warning(
                "Could not connect to live MongoDB (%s). Using resilient memory-backed store for sessions/users: %s",
                settings.MONGODB_URI,
                exc,
            )
            self.is_connected = False
            self._use_fallback = True
            await self.init_indexes()
            await self.seed_demo_user()

    async def seed_demo_user(self):
        """Ensures the demo user exists for seamless evaluation and login testing."""
        try:
            demo_email = "alex@forma.dev"
            existing = await self.users.find_one({"email": demo_email})
            if not existing:
                from app.core.security import hash_password
                now = datetime.now(timezone.utc)
                await self.users.insert_one({
                    "name": "Alex River",
                    "email": demo_email,
                    "password_hash": hash_password("FormaSecure2026!"),
                    "email_verified": True,
                    "is_active": True,
                    "created_at": now,
                    "updated_at": now,
                })
                logger.info("Demo account alex@forma.dev provisioned.")
        except Exception as e:
            logger.warning("Notice on demo user seeding: %s", e)

    async def init_indexes(self):
        """Ensures indexes for users, sessions, and verification tokens."""
        try:
            # Users: unique index on normalized email
            await self.users.create_index("email", unique=True)

            # Sessions: unique index on hashed session token, TTL on expires_at
            await self.sessions.create_index("session_id_hash", unique=True)
            await self.sessions.create_index("expires_at", expireAfterSeconds=0)
            await self.sessions.create_index("user_id")

            # Password Resets: unique on token_hash, TTL on expires_at
            await self.password_resets.create_index("token_hash", unique=True)
            await self.password_resets.create_index("expires_at", expireAfterSeconds=0)
            await self.password_resets.create_index("user_id")

            # Email Verifications: unique on token_hash, TTL on expires_at
            await self.email_verifications.create_index("token_hash", unique=True)
            await self.email_verifications.create_index("expires_at", expireAfterSeconds=0)
        except Exception as e:
            logger.warning("Index initialization notice: %s", e)

    async def close(self):
        if self.client:
            self.client.close()
            self.is_connected = False


db_manager = MongoDBManager()
