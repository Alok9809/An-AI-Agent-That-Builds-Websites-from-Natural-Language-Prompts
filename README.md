# FORMA 🌐🤖

> **Give thought its form.**  
> *An AI Agent That Builds Websites from Natural Language Prompts*

[![CI Pipeline](https://github.com/Alok9809/An-AI-Agent-That-Builds-Websites-from-Natural-Language-Prompts/actions/workflows/ci.yml/badge.svg)](https://github.com/Alok9809/An-AI-Agent-That-Builds-Websites-from-Natural-Language-Prompts/actions/workflows/ci.yml)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19.x%20(React.js)-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20%2F%20Motor-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Argon2id](https://img.shields.io/badge/Security-Argon2id-critical.svg)](https://en.wikipedia.org/wiki/Argon2)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**FORMA** is an intelligent, prompt-driven website creation system that transforms natural language ideas into production-ready, responsive websites.

This document details the **Production-Minded Authentication Module** implemented for FORMA.

---

## 📑 Table of Contents

- [Overview & Architecture](#-overview--architecture)
- [Visual Direction & Brand Identity](#-visual-direction--brand-identity)
- [Tech Stack](#-tech-stack)
- [Security & Authentication Design](#-security--authentication-design)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Backend Setup](#1-backend-setup)
  - [2. Frontend Setup](#2-frontend-setup)
- [API Endpoints](#-api-endpoints)
- [Testing & Quality Assurance](#-testing--quality-assurance)
- [Environment Configuration](#-environment-configuration)
- [Troubleshooting](#-troubleshooting)
- [Scope & Future Roadmap](#-scope--future-roadmap)
- [License](#-license)

---

## 🌟 Overview & Architecture

The **FORMA Authentication Module** provides a secure, ergonomic foundation for user accounts:
- **Server-Managed Sessions:** Uses cryptographically secure random session tokens stored as SHA-256 hashes in MongoDB, delivered to the client via `HttpOnly`, `SameSite=Lax`, and `Secure` (in HTTPS) cookies.
- **Double Submit CSRF Defense:** Issues a readable `forma_csrf` cookie matched against an `x-csrf-token` header on state-changing requests.
- **Argon2id Password Hashing:** Employs RFC 9106 recommended Argon2id parameters (64MB memory, 2 iterations, 1 parallelism thread).
- **Anti-Enumeration Safeguards:** Generic responses on authentication failures and password reset queries prevent user discovery.
- **Single-Use Expiring Tokens:** Reset and verification tokens are stored as hashes with TTL indexes and verified in service logic.
- **Sliding-Window Rate Limiting:** In-memory throttling prevents brute-force credential stuffing and password-reset abuse.

---

## 🎨 Visual Direction & Brand Identity

> **Tagline:** *"Give thought its form."*

- **Obsidian Black (`#09090b` / `#0e0e12` / `#131318`):** Deep, tactile, focused surfaces engineered for low eye fatigue.
- **Warm White (`#fbf9f5` / `#dcd7ce`):** High-legibility typography evoking editorial printing.
- **Subtle Orange Accents (`#ff6326` / `#ff7536`):** Focused kinetic energy on interactive triggers.
- **Refined Typography:** Expressive geometric headings (`Space Grotesk`) paired with proportional sans body (`Plus Jakarta Sans`).
- **Clean Interfaces:** Balanced spacing, soft translucent borders (`rgba(244, 240, 232, 0.08)`), and split-screen layouts.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 (React.js) + JavaScript + Vite 8
- **Styling:** Tailwind CSS v4 + Vanilla Design System
- **Icons:** Lucide React
- **Routing:** React Router v7
- **Forms & Validation:** React Hook Form + Zod
- **Testing:** Vitest + Testing Library + jsdom

### Backend
- **Framework:** FastAPI (Python 3.12)
- **Settings & Validation:** Pydantic v2 + Pydantic Settings
- **Database:** MongoDB Atlas via `motor` (Async PyMongo) with resilient memory-backed fallback
- **Cryptography:** `argon2-cffi` (Argon2id)
- **Testing:** `pytest` + `pytest-asyncio` + `httpx`

---

## 🔒 Security & Authentication Design

### 1. MongoDB Collections & Indexes

```text
users collection:
├── _id: ObjectId / string
├── name: string
├── email: string (lowercase, indexed unique)
├── password_hash: string (Argon2id)
├── email_verified: boolean
├── is_active: boolean
├── created_at: datetime (UTC)
└── updated_at: datetime (UTC)

sessions collection:
├── _id: ObjectId / string
├── session_id_hash: string (SHA-256 hash, indexed unique)
├── user_id: string (indexed)
├── created_at: datetime
├── expires_at: datetime (indexed TTL)
├── is_revoked: boolean
├── user_agent: string
└── ip_address: string

password_resets collection:
├── _id: ObjectId / string
├── token_hash: string (SHA-256 hash, indexed unique)
├── user_id: string
├── email: string
├── created_at: datetime
├── expires_at: datetime (indexed TTL)
└── is_used: boolean
```

### 2. Password Policy
- Minimum 8 characters, maximum 128 characters.
- Requires at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special symbol.
- Client-side visual strength indicator + independent server-side validation.

---

## 📁 Project Structure

```text
An-AI-Agent-That-Builds-Websites-from-Natural-Language-Prompts/
├── .github/
│   └── workflows/
│       └── ci.yml                     # GitHub Actions CI (frontend & backend lint/test/build)
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth.py                # Authentication endpoints & cookie controllers
│   │   │   └── deps.py                # Route dependencies & security guards (Separation of Concerns)
│   │   ├── core/
│   │   │   ├── config.py              # Pydantic Settings
│   │   │   ├── security.py            # Argon2id hasher & token utilities
│   │   │   └── rate_limiter.py        # Sliding-window rate limiter
│   │   ├── db/
│   │   │   └── mongodb.py             # Motor async MongoDB client & fallback
│   │   ├── schemas/
│   │   │   └── auth.py                # Pydantic request & response DTO schemas
│   │   ├── services/
│   │   │   ├── auth_service.py        # Dedicated authentication service layer
│   │   │   └── email_service.py       # Email delivery (SMTP & dev outbox)
│   │   ├── __init__.py
│   │   └── main.py                    # FastAPI application & lifespan
│   ├── tests/
│   │   └── test_auth.py               # Comprehensive pytest test suite (12 tests)
│   ├── .env.example                   # Backend environment template
│   ├── .gitignore
│   └── requirements.txt               # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── AuthLayout.jsx     # Split-screen desktop auth layout
│   │   │   │   ├── PasswordStrengthMeter.jsx
│   │   │   │   ├── ProtectedRoute.jsx # Route guard for private views
│   │   │   │   └── PublicOnlyRoute.jsx # Route guard with open-redirect defense
│   │   │   └── ui/
│   │   │       ├── Button.jsx
│   │   │       ├── FormaLogo.jsx      # Custom typographic wordmark + geometric symbol
│   │   │       └── Input.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx        # Authentication state provider
│   │   │   └── useAuth.js             # useAuth hook
│   │   ├── lib/
│   │   │   ├── api.js                 # Centralized fetch client with CSRF & cookies
│   │   │   └── utils.js
│   │   ├── pages/
│   │   │   ├── DashboardPlaceholderPage.jsx # Protected placeholder view
│   │   │   ├── ForgotPasswordPage.jsx # Request password reset link
│   │   │   ├── LoginPage.jsx          # Sign in view
│   │   │   ├── RegisterPage.jsx       # Account creation view
│   │   │   ├── ResetPasswordPage.jsx  # Token password reset
│   │   │   └── VerifyEmailPage.jsx    # Email verification & resend
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx          # Dedicated router definitions & guard mappings
│   │   ├── schemas/
│   │   │   └── auth.schema.js         # Zod validation schemas & password evaluator
│   │   ├── services/
│   │   │   └── auth.service.js        # Dedicated auth API service layer (Separation of Concerns)
│   │   ├── tests/
│   │   │   └── auth.test.jsx          # Vitest frontend tests (14 tests)
│   │   ├── App.jsx                    # Root provider composition
│   │   ├── index.css                  # Obsidian black & warm white design tokens
│   │   └── main.jsx                   # React DOM entry
│   ├── eslint.config.js               # ESLint configuration
│   ├── index.html
│   ├── jsconfig.json                  # JavaScript path aliases & IDE config
│   ├── package.json
│   └── vite.config.js                 # Vite + Tailwind + Proxy configuration
├── .env.example
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Python** 3.12+
- **Node.js** 20+ or 22+ & **npm**
- *(Optional)* Running instance of **MongoDB** or **MongoDB Atlas** connection string (an in-memory store acts as automatic fallback for testing and offline runs).

---

### 1. Backend Setup

1. **Navigate to `backend/`:**
   ```bash
   cd backend
   ```

2. **Configure environment variables:**
   ```bash
   copy .env.example .env
   ```
   *(Optional)* Fill in your `MONGODB_URI` from MongoDB Atlas. If omitted, the backend runs gracefully using the built-in async fallback.

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the FastAPI server:**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   - API: [http://127.0.0.1:8000](http://127.0.0.1:8000)
   - Interactive Swagger Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

### 2. Frontend Setup

1. **Navigate to `frontend/`:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the Vite development server:**
   ```bash
   npm run dev
   ```
   Open your browser at [http://localhost:5173](http://localhost:5173).

---

## 🌐 API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new account & create session | No |
| `POST` | `/api/auth/login` | Authenticate credentials & set HttpOnly cookie | No |
| `POST` | `/api/auth/logout` | Revoke session & clear cookies | Optional |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | **Yes** |
| `POST` | `/api/auth/forgot-password` | Request password reset token | No |
| `POST` | `/api/auth/reset-password` | Update password with single-use token | No |
| `POST` | `/api/auth/verify-email` | Confirm email address via token | No |
| `POST` | `/api/auth/resend-verification` | Request a fresh verification link | No |

---

## 🧪 Testing & Quality Assurance

### Run Backend Tests (Pytest)
From `backend/`:
```bash
python -m pytest -v
```
*Validates registration, duplicate accounts, input bounds, login verification, session cookies, unauthenticated rejections, logout session invalidation, forgot-password anti-enumeration, reset token single-use, and rate limiting.*

### Run Frontend Tests (Vitest)
From `frontend/`:
```bash
npm test
```
*Validates Zod validation schemas, password mismatch rules, terms acceptance, password strength meter scores, FormaLogo typography, and open-redirect attack defenses.*

### Run Frontend Linter & Build
From `frontend/`:
```bash
npm run lint
npm run build
```

---

## ⚙️ Environment Configuration

| Variable | Description | Default |
| :--- | :--- | :--- |
| `ENV` | Environment (`development`, `production`, `test`) | `development` |
| `MONGODB_URI` | MongoDB Atlas or local connection URI | `mongodb://localhost:27017` |
| `MONGODB_DATABASE` | Database name | `forma_auth` |
| `FRONTEND_ORIGIN` | Permitted frontend CORS origin | `http://localhost:5173` |
| `BACKEND_URL` | Backend URL | `http://localhost:8000` |
| `SESSION_SECRET` | 32+ character key for session cryptographic signatures | Set in `.env` |
| `SESSION_MAX_AGE_SECONDS` | Standard session duration | `604800` (7 days) |
| `SESSION_REMEMBER_ME_DAYS` | Remember-me session duration | `30` (30 days) |
| `COOKIE_SECURE` | Enable HTTPS-only cookie flag | `false` (auto-true in prod) |
| `EMAIL_PROVIDER` | Email delivery service (`console`, `smtp`, `mock`) | `console` |
| `SMTP_HOST`, `SMTP_PORT` | SMTP server credentials for live email | Optional |

---

## 🔍 Troubleshooting

- **Email Delivery in Local Dev:** By default, `EMAIL_PROVIDER=console`. When requesting password resets in development, reset links are displayed directly in the FastAPI terminal console and recorded in `email_service.dev_outbox`.
- **CORS & Cookies:** The Vite dev server proxies `/api` requests to `http://127.0.0.1:8000`, ensuring cookies work seamlessly without cross-origin domain barriers.
- **Rate Limit Triggered:** If you submit too many failed login attempts within 60 seconds, the API returns `429 Too Many Requests`. Wait 60 seconds or restart the backend to clear the in-memory window.

---

## 🗺️ Scope & Future Roadmap

**Implemented in this Milestone:**
- [x] Complete, production-minded Authentication Module
- [x] Desktop split-screen layout & responsive mobile/tablet forms
- [x] Argon2id password security & complexity verification
- [x] Server-side session tokens with HttpOnly SameSite cookies
- [x] Double-submit CSRF defense
- [x] Forgot password & single-use password reset workflow
- [x] Email verification endpoints & resend capability
- [x] Protected dashboard placeholder (`/dashboard`)
- [x] Comprehensive automated test suites (Backend Pytest + Frontend Vitest)

**Intentionally Deferred to Future Milestones:**
- [ ] AI prompt-to-website generation engine
- [ ] Visual canvas & block website editor
- [ ] Multi-page site manager & export to deployment

---

## 📄 License

This project is licensed under the MIT License.
