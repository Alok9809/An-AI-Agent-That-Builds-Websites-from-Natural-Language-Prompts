# FORMA 🌐🤖

> **Give thought its form.**  
> *An AI Agent That Builds Websites from Natural Language Prompts*

[![CI Pipeline](https://github.com/Alok9809/An-AI-Agent-That-Builds-Websites-from-Natural-Language-Prompts/actions/workflows/ci.yml/badge.svg)](https://github.com/Alok9809/An-AI-Agent-That-Builds-Websites-from-Natural-Language-Prompts/actions/workflows/ci.yml)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19.x%20(React.js)-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20%2F%20Motor-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vitest](https://img.shields.io/badge/Vitest-57%20Passed-FCC72B?logo=vitest&logoColor=black)](https://vitest.dev/)
[![Pytest](https://img.shields.io/badge/Pytest-12%20Passed-0A9EDC?logo=pytest&logoColor=white)](https://docs.pytest.org/)
[![Security](https://img.shields.io/badge/Security-Argon2id%20%7C%20CSRF%20Protected-critical.svg)](https://en.wikipedia.org/wiki/Argon2)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**FORMA** is an intelligent, prompt-driven website synthesis platform that turns natural language thoughts and ideas into responsive, production-ready web experiences in real time. It pairs a **dynamic AI Website Studio & Builder Canvas** with an **enterprise-grade, production-minded Authentication and Security core**.

---

## 📑 Table of Contents

- [Key Features](#-key-features)
- [System Architecture & Workflow](#-system-architecture--workflow)
- [Visual Direction & Brand Identity](#-visual-direction--brand-identity)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Security & Authentication Engine](#-security--authentication-engine)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Backend Setup](#1-backend-setup)
  - [2. Frontend Setup](#2-frontend-setup)
- [API Reference](#-api-reference)
- [Testing & Quality Assurance](#-testing--quality-assurance)
- [Environment Configuration](#-environment-configuration)
- [Troubleshooting](#-troubleshooting)
- [Roadmap & Milestone Status](#-roadmap--milestone-status)
- [License](#-license)

---

## 🌟 Key Features

### 1. 🤖 Prompt-Driven AI Website Builder Studio
- **Dynamic Synthesis Engine:** Translates free-form prompts into full website layouts (Hero, Features, Showcase, Pricing, Testimonials, Interactive CTAs, and Navigation).
- **Live Sandboxed Preview Canvas:** Real-time multi-device iframe rendering with instant viewport switching:
  - 🖥️ **Desktop:** 1440px wide-screen view
  - 📱 **Tablet:** 768px portrait/responsive view
  - 📲 **Mobile:** 375px mobile-first layout
- **Multi-Stage Assembly Visualizer:** Step-by-step progress HUD tracking Tokenization, Layout Architecture, Responsive Styling, and Component Wiring.
- **In-Studio Prompt Refinement:** Edit, regenerate, or evolve websites live using the in-canvas floating Prompt Bar.
- **Source Code Inspector:** Live tabbed viewer for raw HTML and CSS syntax with one-click clipboard copying.
- **One-Click Export:** Download synthesized websites as standalone HTML or compressed ZIP packages ready for static hosting.

### 2. ⚡ Cinematic Dashboard Experience
- **Auto-Expanding Prompt Composer:** Downward auto-growing input field with zero awkward scrollbars on multi-line typing or wrapping.
- **Dynamic Rotating Headlines:** Fluid typographic rotation (*"What should we build / design / launch / code today?"*).
- **Holographic Build Trigger:** Cinematic gradient pulsing HUD animation with soundless visual feedback on `Enter` or `Build` click.
- **Direct Asset Uploader:** Circular attachment trigger `(+)` for reference images, wireframes, and brand guidelines.
- **Curated Templates & Mockups:** Pre-configured architectures including *NOVA SaaS*, *SwiftMart Quickcommerce*, *Veloce Mobility*, and *Solstice Generative Audio*.

### 3. 🛡️ Production-Grade Security & Authentication
- **HttpOnly Session Cookies:** Cryptographically random session tokens stored as SHA-256 hashes in MongoDB.
- **Double Submit CSRF Defense:** Paired `forma_csrf` cookie matched with `x-csrf-token` header verification on state-changing requests.
- **Argon2id Password Hashing:** RFC 9106 parameters (64MB memory, 2 iterations, 1 parallelism thread).
- **Anti-Enumeration Protections:** Blind timing-safe responses prevent user discovery on failed logins and reset requests.
- **Sliding-Window Rate Limiter:** Protects against credential stuffing and brute-force abuse.
- **Tokenized Password Resets & Email Verification:** Time-limited, single-use cryptographically hashed tokens.

---

## 🏗️ System Architecture & Workflow

```text
  [ User Prompt / Voice / Image ]
                 │
                 ▼
      ┌─────────────────────┐
      │   Dashboard Studio   │ ── (Auto-expanding Prompt Composer & HUD)
      └──────────┬──────────┘
                 │ (Prompt Payload + Context)
                 ▼
      ┌─────────────────────┐
      │  Builder Generator  │ ── (Multi-stage AI Generation Pipeline)
      └──────────┬──────────┘
                 ├────────────────────────┬────────────────────────┐
                 ▼                        ▼                        ▼
       [Responsive Canvas]       [Source Code Viewer]      [ZIP / HTML Export]
     Desktop / Tablet / Mobile        HTML5 + CSS3           Production Bundle
```

---

## 🎨 Visual Direction & Brand Identity

> **Tagline:** *"Give thought its form."*

- **Deep Space Void (`#080B14`, `#0C101D`, `#111A30`):** Ultra-dark, tactile surfaces with zero eye fatigue and rich ambient depth.
- **Electric Indigo & Cyber Magenta (`#3867FF`, `#F052C7`):** Vivid kinetic energy applied to focus rings, primary action buttons, and holographic aurora glows.
- **Frosted Glass Panels:** Floating cards styled with `bg-[#0c101d]/85`, `backdrop-blur-3xl`, and delicate sub-pixel borders (`border-[#252B3A]/60`).
- **Warm Platinum Typography (`#F5F5F7`, `#94A3B8`):** High-contrast editorial typography paired with `Space Grotesk` headings and `Plus Jakarta Sans` body copy.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 (React.js) + JavaScript (ES2022)
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Icons:** Lucide React
- **Routing:** React Router v7
- **Forms & Validation:** React Hook Form + Zod
- **Testing:** Vitest + Testing Library + jsdom (57 comprehensive tests)

### Backend
- **Framework:** FastAPI (Python 3.12)
- **Database:** MongoDB Atlas via `motor` (Async PyMongo) with resilient memory-backed fallback
- **Validation & Settings:** Pydantic v2 + Pydantic Settings
- **Cryptography:** `argon2-cffi` (Argon2id) + SHA-256
- **Testing:** `pytest` + `pytest-asyncio` + `httpx` (12 comprehensive tests)

---

## 📁 Project Structure

```text
An-AI-Agent-That-Builds-Websites-from-Natural-Language-Prompts/
├── .github/
│   └── workflows/
│       └── ci.yml                     # GitHub Actions CI (immutable pinned commit SHAs)
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth.py                # Authentication endpoints & cookie controllers
│   │   │   └── deps.py                # Security dependencies & session guards
│   │   ├── core/
│   │   │   ├── config.py              # Pydantic Settings & environment parsing
│   │   │   ├── rate_limiter.py        # Sliding-window rate limiter
│   │   │   └── security.py            # Argon2id hasher & cryptographic token generators
│   │   ├── db/
│   │   │   └── mongodb.py             # Motor async MongoDB client & in-memory fallback
│   │   ├── schemas/
│   │   │   └── auth.py                # Request and response DTO validation schemas
│   │   ├── services/
│   │   │   ├── auth_service.py        # User authentication & session service layer
│   │   │   └── email_service.py       # Email delivery (SMTP, console, and mock outbox)
│   │   ├── __init__.py
│   │   └── main.py                    # FastAPI application initialization & lifespan
│   ├── tests/
│   │   └── test_auth.py               # Backend pytest test suite (12 tests)
│   ├── .env.example
│   ├── .gitignore
│   └── requirements.txt               # Backend Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── AuthLayout.jsx     # Split-screen responsive authentication container
│   │   │   │   ├── PasswordStrengthMeter.jsx
│   │   │   │   ├── ProtectedRoute.jsx # Authentication route guard
│   │   │   │   └── PublicOnlyRoute.jsx# Open-redirect protected public guard
│   │   │   ├── builder/
│   │   │   │   ├── CodeViewerModal.jsx# Raw HTML/CSS syntax-highlighted code inspector
│   │   │   │   ├── ExportModal.jsx    # Standalone HTML and ZIP export modal
│   │   │   │   ├── GenerationProgress.jsx # AI multi-stage synthesis HUD
│   │   │   │   ├── PreviewCanvas.jsx  # Multi-device responsive sandboxed preview iframe
│   │   │   │   └── PromptBar.jsx      # In-studio real-time iteration prompt composer
│   │   │   ├── landing/               # Marketing & feature showcase components
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── HowItWorksSection.jsx
│   │   │   │   ├── InteractiveDemoSection.jsx
│   │   │   │   ├── TestimonialsSection.jsx
│   │   │   │   ├── PricingSection.jsx
│   │   │   │   └── LandingNavbar.jsx
│   │   │   ├── motion/                # Kinetic UI primitives (Shimmer, Spotlight, Marquee)
│   │   │   └── ui/                    # Core UI primitives (Button, Input, FormaLogo)
│   │   ├── context/
│   │   │   ├── AuthContext.jsx        # Auth state provider
│   │   │   └── useAuth.js             # useAuth custom hook
│   │   ├── lib/
│   │   │   ├── api.js                 # Centralized fetch client with automatic CSRF & cookies
│   │   │   └── utils.js               # Class merge & string formatting utilities
│   │   ├── pages/
│   │   │   ├── BuilderPage.jsx        # Live AI Website Synthesis Studio & Canvas
│   │   │   ├── DashboardPage.jsx      # Studio Dashboard with auto-growing prompt bar
│   │   │   ├── LandingPage.jsx        # Production marketing landing page
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── ForgotPasswordPage.jsx
│   │   │   ├── ResetPasswordPage.jsx
│   │   │   └── VerifyEmailPage.jsx
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx          # Route definitions, guards, and navigation mappings
│   │   ├── schemas/
│   │   │   └── auth.schema.js         # Zod schemas for forms and credentials
│   │   ├── services/
│   │   │   └── auth.service.js        # Authentication API service client
│   │   ├── tests/                     # Vitest test suite (57 tests)
│   │   │   ├── auth.test.jsx          # Auth workflows & security tests
│   │   │   ├── builder.test.jsx       # Studio generator & canvas tests
│   │   │   ├── codeViewer.test.jsx    # Code inspector & copy tests
│   │   │   ├── dashboard.test.jsx     # Dashboard prompt composer & mockup tests
│   │   │   ├── exportModal.test.jsx   # ZIP & HTML export tests
│   │   │   ├── generationProgress.test.jsx # Synthesis progress pipeline tests
│   │   │   ├── previewCanvas.test.jsx # Multi-device responsive viewport tests
│   │   │   └── promptBar.test.jsx     # Studio prompt bar tests
│   │   ├── App.jsx
│   │   ├── index.css                  # Dark mode design tokens & animations
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── .env.example
├── .gitignore
└── README.md
```

---

## 🔒 Security & Authentication Engine

### MongoDB Collections & Index Schema

```text
users collection:
├── _id: ObjectId / string
├── name: string
├── email: string (lowercase, unique index)
├── password_hash: string (Argon2id)
├── email_verified: boolean
├── is_active: boolean
├── created_at: datetime (UTC)
└── updated_at: datetime (UTC)

sessions collection:
├── _id: ObjectId / string
├── session_id_hash: string (SHA-256 hash, unique index)
├── user_id: string (indexed)
├── created_at: datetime
├── expires_at: datetime (indexed TTL auto-purge)
├── is_revoked: boolean
├── user_agent: string
└── ip_address: string

password_resets collection:
├── _id: ObjectId / string
├── token_hash: string (SHA-256 hash, unique index)
├── user_id: string
├── email: string
├── created_at: datetime
├── expires_at: datetime (indexed TTL auto-purge)
└── is_used: boolean
```

---

## 🚀 Getting Started

### Prerequisites

- **Python** 3.12+
- **Node.js** 20+ or 22+ & **npm**
- *(Optional)* Local **MongoDB** instance or **MongoDB Atlas** cluster URI (in-memory async fallback activates automatically if unavailable).

---

### 1. Backend Setup

1. **Navigate to `backend/`:**
   ```bash
   cd backend
   ```

2. **Configure environment variables:**
   ```bash
   copy .env.example .env
   # On macOS/Linux: cp .env.example .env
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the FastAPI backend server:**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   - **API Base:** [http://127.0.0.1:8000](http://127.0.0.1:8000)
   - **Interactive Swagger Docs:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
   - **Redoc Documentation:** [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

### 2. Frontend Setup

1. **Navigate to `frontend/`:**
   ```bash
   cd frontend
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the Vite development server:**
   ```bash
   npm run dev
   ```
   Open your browser at [http://localhost:5173](http://localhost:5173).

---

## 🌐 API Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Create account & issue session cookie | No |
| `POST` | `/api/auth/login` | Authenticate credentials & issue HttpOnly cookie | No |
| `POST` | `/api/auth/logout` | Invalidate active session & clear cookies | Optional |
| `GET` | `/api/auth/me` | Return authenticated user profile | **Yes** |
| `POST` | `/api/auth/forgot-password` | Issue single-use password reset token | No |
| `POST` | `/api/auth/reset-password` | Set new password using verified token | No |
| `POST` | `/api/auth/verify-email` | Validate email address confirmation token | No |
| `POST` | `/api/auth/resend-verification` | Issue a fresh email verification link | No |

---

## 🧪 Testing & Quality Assurance

### Run Frontend Test Suite (Vitest)
Executes **57 unit and integration tests** across 7 test suites validating the prompt composer, multi-device viewport canvas, code inspector, ZIP exporter, authentication guards, and CSRF token handling:
```bash
npm --prefix frontend test
```

### Run Frontend Linter & Build
```bash
npm --prefix frontend run lint
npm --prefix frontend run build
```

### Run Backend Test Suite (Pytest)
Executes **12 asynchronous pytest tests** validating registration, Argon2id hashing, session lifecycle, CSRF protection, and anti-enumeration:
```bash
cd backend
python -m pytest -v
```

---

## ⚙️ Environment Configuration

| Variable | Description | Default |
| :--- | :--- | :--- |
| `ENV` | Application environment (`development`, `production`, `test`) | `development` |
| `MONGODB_URI` | MongoDB Atlas URI or local connection string | `mongodb://localhost:27017` |
| `MONGODB_DATABASE` | Database name | `forma_auth` |
| `FRONTEND_ORIGIN` | Allowed CORS frontend origin | `http://localhost:5173` |
| `BACKEND_URL` | Backend server URL | `http://localhost:8000` |
| `SESSION_SECRET` | 32+ character key for session cryptographic signatures | Set in `.env` |
| `SESSION_MAX_AGE_SECONDS` | Standard session lifetime | `604800` (7 days) |
| `SESSION_REMEMBER_ME_DAYS` | Remember-me extended session duration | `30` (30 days) |
| `COOKIE_SECURE` | Enforces HTTPS-only cookies | `false` (auto `true` in prod) |
| `EMAIL_PROVIDER` | Email delivery service (`console`, `smtp`, `mock`) | `console` |
| `SMTP_HOST`, `SMTP_PORT` | SMTP credentials for production email delivery | Optional |

---

## 🔍 Troubleshooting

- **Email Links in Development:** When `EMAIL_PROVIDER=console`, password reset links and verification tokens are logged directly to the FastAPI terminal console.
- **Cross-Origin Cookies:** The Vite development server automatically proxies `/api` requests to `http://127.0.0.1:8000`, eliminating third-party cookie restrictions during local development.
- **Rate Limit Triggered:** If too many failed authentication attempts occur within 60 seconds, the API responds with `429 Too Many Requests`. Wait 60 seconds or restart the backend to reset the window.
- **GitHub Actions Language Server Warnings:** In VS Code/Antigravity IDE, the built-in language server queries the GitHub API to resolve external actions like `actions/checkout@v4`. If unauthenticated or offline, it can show false-positive squiggly warnings (`Unable to resolve action`). This is resolved by associating `.github/workflows/*.yml` files as standard `yaml` in `.vscode/settings.json`.

---

## 🗺️ Roadmap & Milestone Status

- [x] **Milestone 1: Production Authentication Core**
  - [x] Argon2id password security & complexity verification
  - [x] Server-managed sessions via HttpOnly SameSite cookies & double-submit CSRF defense
  - [x] Password reset & email verification flows with single-use tokens
  - [x] 12/12 Pytest tests passing

- [x] **Milestone 2: Modern Marketing Experience**
  - [x] High-conversion dark landing page (`/`) with interactive showcases
  - [x] Motion components (Marquee, Spotlight, Shimmer, Light Pillar)

- [x] **Milestone 3: Studio Dashboard & Generation UI**
  - [x] Downward auto-expanding prompt composer without scrollbars
  - [x] Rotating typography and circular asset attachment trigger `(+)`
  - [x] Holographic synthesis HUD and seamless ambient gradient mesh

- [x] **Milestone 4: Interactive AI Website Builder**
  - [x] Natural language prompt synthesis studio (`/builder`)
  - [x] Multi-device responsive sandbox canvas (Desktop 1440px / Tablet 768px / Mobile 375px)
  - [x] Live syntax-highlighted HTML & CSS code viewer modal
  - [x] Standalone HTML & ZIP export engine
  - [x] 57/57 Vitest tests passing

- [ ] **Milestone 5: Advanced Generation & Cloud Deployment**
  - [ ] Multi-page site generation and visual section drag-and-drop
  - [ ] One-click Netlify / Vercel cloud deployment webhook integration

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
