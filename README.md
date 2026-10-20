# An AI Agent That Builds Websites from Natural Language Prompts 🌐🤖

[![CI Pipeline](https://github.com/Alok9809/An-AI-Agent-That-Builds-Websites-from-Natural-Language-Prompts/actions/workflows/ci.yml/badge.svg)](https://github.com/Alok9809/An-AI-Agent-That-Builds-Websites-from-Natural-Language-Prompts/actions/workflows/ci.yml)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

An intelligent, prompt-driven website creation system that transforms natural language ideas into production-ready, responsive websites.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [The Challenge with Existing Methods](#-the-challenge-with-existing-methods)
- [Our Solution](#-our-solution)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#1-backend-setup)
  - [Frontend Setup](#2-frontend-setup)
- [Testing & Quality Assurance](#-testing--quality-assurance)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🌟 Overview

Building modern web applications traditionally requires an intersection of design theory, technical programming proficiency, and rapid prototyping capabilities. 

**An AI Agent That Builds Websites from Natural Language Prompts** closes this divide by allowing non-technical creators, designers, and developers to describe their website concepts in plain English and receive fully structured, responsive, and aesthetically refined websites in seconds.

---

## ⚠️ The Challenge with Existing Methods

Existing website-building methods face several persistent challenges:

1. **High Technical & Design Barrier:** Website development demands proficiency in HTML, CSS, JavaScript, responsive layouts, and UI/UX design heuristics.
2. **Time-Consuming & Error-Prone Manual Coding:** Crafting layouts, responsive breakpoints, typography hierarchies, and component states by hand is tedious and susceptible to syntax and layout bugs.
3. **Limited Flexibility in Drag-and-Drop Builders:** Traditional No-Code/WYSIWYG website builders lock users into rigid templates, proprietary vendor lock-in, and restrictive customization walls.
4. **Difficulty Translating Ideas into Technical Structure:** Creators often have vivid conceptual visions for their digital presence but struggle to translate vague ideas into semantic DOM trees, data models, and CSS architectures.
5. **Slow, Costly Iterations:** Frequent adjustments and design tweaks require continuous developer intervention, slowing release cycles and elevating costs.

---

## 💡 Our Solution

These challenges highlight the need for an intelligent, prompt-driven website creation system:

- **Natural Language Understanding:** Parses user prompts to infer intent, audience, color schemes, typography, and required functional sections.
- **Automated Blueprint & Component Architecture:** Synthesizes semantic HTML5 layouts, modern CSS variables, and clean interactive elements.
- **Instant Preview & Iteration:** Enables rapid visual feedback where users can refine sections, change themes, or regenerate layouts through natural dialogue.
- **Clean, Exportable Code:** Generates standard, portable web code without proprietary lock-in.

---

## 🛠️ Tech Stack

### Backend
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python 3.12)
- **Validation & Schemas:** [Pydantic](https://docs.pydantic.dev/) v2
- **Environment Management:** `python-dotenv`

### Frontend
- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vite.dev/)
- **Linting:** ESLint 10

### DevOps & Automation
- **Continuous Integration:** GitHub Actions (`.github/workflows/ci.yml`)

---

## 📁 Project Structure

```text
An-AI-Agent-That-Builds-Websites-from-Natural-Language-Prompts/
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI workflow (lint, test, build)
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   └── main.py            # FastAPI entry point & prompt-driven website generator API
│   ├── .gitignore
│   └── requirements.txt       # Backend dependencies
├── frontend/
│   ├── public/                # Static public assets (icons, favicon)
│   ├── src/
│   │   ├── assets/            # Project static assets
│   │   ├── App.css            # Component styles
│   │   ├── App.jsx            # Interactive AI website builder workspace & preview
│   │   ├── index.css          # Design system & global styles
│   │   └── main.jsx           # React DOM root entry
│   ├── eslint.config.js       # ESLint configuration
│   ├── index.html             # HTML entry point
│   ├── package.json           # Frontend package manifest & scripts
│   ├── README.md              # Frontend documentation
│   └── vite.config.js         # Vite configuration
└── README.md                  # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Python** (version 3.12 or newer)
- **Node.js** (version 20 or 22 LTS) & **npm**
- **Git**

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

4. **Start the FastAPI backend server:**
   ```bash
   uvicorn app.main:app --reload
   ```
   The backend API will run at [http://127.0.0.1:8000](http://127.0.0.1:8000).  
   Interactive API docs are available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

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
   Open your browser at [http://localhost:5173](http://localhost:5173).

---

## 🧪 Quality Assurance & Validation

### Validate Backend Syntax
From the `backend/` directory:
```bash
python -m compileall app
```

### Run Frontend Linter & Build
From the `frontend/` directory:
```bash
npm run lint
npm run build
```

---

## 🔄 CI/CD Pipeline

The GitHub Actions workflow in `.github/workflows/ci.yml` automates:
- **Frontend Job:** Verifies code styling via ESLint and validates production bundling with Vite.
- **Backend Job:** Installs Python 3.12 dependencies, checks syntax compilation, and executes the `pytest` test suite.

---

## 🗺️ Roadmap

- [x] Project architecture realignment for Prompt-Driven Website Generation
- [x] Interactive Prompt-to-Website studio & live preview interface
- [x] FastAPI website specification & code generation endpoints
- [x] Automated CI validation pipeline for backend & frontend
- [ ] Multi-page routing and dynamic asset generation integration
- [ ] Export to one-click deployment (Vercel / Netlify / GitHub Pages)

---

## 📄 License

This project is licensed under the MIT License.
