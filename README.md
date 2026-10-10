# ThreatGraph 🛡️🕸️

[![ThreatGraph CI](https://github.com/Alok9809/An-AI-Agent-That-Builds-Websites-from-Natural-Language-Prompts/actions/workflows/ci.yml/badge.svg)](https://github.com/Alok9809/An-AI-Agent-That-Builds-Websites-from-Natural-Language-Prompts/actions/workflows/ci.yml)
[![FastAPI](https://img.shields.io/badge/FastAPI-1.0.0-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**ThreatGraph** is a Cyber Threat Intelligence (CTI) platform designed to ingest, model, correlate, and visualize threat data and security entities using graph databases and modern web technologies.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#1-backend-setup)
  - [Frontend Setup](#2-frontend-setup)
- [Testing & Quality Assurance](#-testing--quality-assurance)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

ThreatGraph enables security teams and analysts to:
- Correlate Indicators of Compromise (IOCs), threat actors, attack patterns, and campaigns.
- Model multi-dimensional threat relationships using **Neo4j** graph queries.
- Store flexible, rich intelligence feeds and metadata with **MongoDB**.
- Authenticate and manage access securely via **Argon2** password hashing and **JWT**.
- Interact with threat intelligence seamlessly via a high-performance **FastAPI** backend and responsive **React** dashboard.

---

## 🛠️ Tech Stack

### Backend
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python 3.12)
- **Graph Database:** [Neo4j](https://neo4j.com/) via `neo4j` Python driver
- **Document Store:** [MongoDB](https://www.mongodb.com/) via `pymongo`
- **Security & Auth:** `pwdlib[argon2]`, `pyjwt`
- **Testing:** `pytest`, `httpx`

### Frontend
- **Framework:** [React 19](https://react.dev/)
- **Bundler & Tooling:** [Vite](https://vite.dev/)
- **Linter:** ESLint

### DevOps & CI/CD
- **Automation:** GitHub Actions (`.github/workflows/ci.yml`)

---

## 📁 Project Structure

```text
ThreatGraph/
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI workflow (lint, test, build)
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   └── main.py            # FastAPI application entry point & routes
│   ├── tests/
│   │   └── test_main.py       # Pytest backend test suite
│   ├── .env                   # Backend environment configuration
│   ├── .gitignore
│   └── requirements.txt       # Python dependencies
├── frontend/
│   ├── public/                # Static public assets
│   ├── src/
│   │   ├── assets/            # Component images and icons
│   │   ├── App.jsx            # Main React component
│   │   ├── main.jsx           # React DOM root entry
│   │   └── index.css          # Global styling
│   ├── eslint.config.js       # ESLint configuration
│   ├── package.json           # Frontend dependencies and npm scripts
│   └── vite.config.js         # Vite configuration
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have installed:
- **Python** (version 3.12 or newer)
- **Node.js** (version 20 or 22 LTS) & **npm**
- **Git**
- *(Optional / For DB connections)*: Running instances of **Neo4j** and **MongoDB**

---

### 1. Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment:**
   - **Windows:**
     ```bash
     python -m venv .venv
     .venv\Scripts\activate
     ```
   - **macOS / Linux:**
     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**
   Create or edit `backend/.env` with your database credentials and secret keys:
   ```env
   # Example configuration
   NEO4J_URI=bolt://localhost:7687
   NEO4J_USER=neo4j
   NEO4J_PASSWORD=your_password
   MONGO_URI=mongodb://localhost:27017/threatgraph
   JWT_SECRET_KEY=your_secret_key
   ```

5. **Start the development server:**
   ```bash
   uvicorn app.main:app --reload
   ```

   The backend will be running at [http://127.0.0.1:8000](http://127.0.0.1:8000).  
   Interactive API docs (Swagger UI) are available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

---

### 2. Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install npm dependencies:**
   ```bash
   npm install
   ```

3. **Start the Vite development server:**
   ```bash
   npm run dev
   ```

   Open your browser at [http://localhost:5173](http://localhost:5173) to see the application.

---

## 🧪 Testing & Quality Assurance

### Run Backend Tests
From the `backend/` directory with your virtual environment active:
```bash
pytest -v
```

### Run Frontend Linter & Build
From the `frontend/` directory:
```bash
npm run lint
npm run build
```

---

## 🔄 CI/CD Pipeline

The repository includes a GitHub Actions CI workflow in `.github/workflows/ci.yml` that runs automatically on every `push` or `pull_request` targeting `main` or `develop`:

- **Frontend Job:** Runs Node.js 22, installs dependencies via `npm ci`, runs ESLint, and builds the production bundle.
- **Backend Job:** Sets up Python 3.12, installs requirements, validates syntax, and executes the `pytest` suite.

---

## 🗺️ Roadmap

- [x] Initial project skeleton (FastAPI + React Vite)
- [x] Basic health check & home endpoints
- [x] GitHub Actions automated CI
- [ ] Neo4j graph schemas & Cypher query service
- [ ] MongoDB STIX/TAXII threat feed ingestion pipeline
- [ ] JWT authentication & role-based access control (RBAC)
- [ ] Interactive graph visualization (Cytoscape.js / D3 / Force-Graph)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m "Add amazing feature"`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
