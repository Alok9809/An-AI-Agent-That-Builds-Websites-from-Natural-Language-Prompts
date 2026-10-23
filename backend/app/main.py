from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.auth import router as auth_router
from app.core.config import settings
from app.db.mongodb import db_manager


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Connect to MongoDB Atlas / Local
    await db_manager.connect()
    yield
    # Shutdown: Close database connections
    await db_manager.close()


app = FastAPI(
    title="FORMA API",
    description="Backend API for FORMA: An AI Agent That Builds Websites from Natural Language Prompts",
    version="1.0.0",
    lifespan=lifespan,
)

# Explicit CORS configuration for permitted frontend origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["Set-Cookie"],
)

# Register Authentication Router
app.include_router(auth_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to the FORMA API",
        "project": "FORMA - An AI Agent That Builds Websites from Natural Language Prompts",
        "tagline": settings.TAGLINE,
        "visual_direction": "Obsidian black, warm white, subtle orange accents, refined typography, and clean interfaces",
        "status": "running",
        "auth_endpoints": {
            "register": "/api/auth/register",
            "login": "/api/auth/login",
            "logout": "/api/auth/logout",
            "me": "/api/auth/me",
            "forgot_password": "/api/auth/forgot-password",
            "reset_password": "/api/auth/reset-password",
            "verify_email": "/api/auth/verify-email",
            "resend_verification": "/api/auth/resend-verification",
        },
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "database": "connected" if db_manager.is_connected else "in-memory fallback active",
    }
