# FORMA — Frontend 💻✨

> **Give thought its form.**  
> *Production-Minded Authentication Module*

The interactive frontend for **FORMA**, built with React 19, TypeScript, Tailwind CSS v4, and React Router v7.

## 🚀 Implemented Routes & Features

- **`/login`:** Split-screen layout with visual branding mockup, email/password inputs with visibility toggle, remember-me checkbox, and inline Zod validation.
- **`/register`:** Full name, email, password strength meter, password confirm matching, and mandatory Terms of Service & Privacy Policy agreement.
- **`/forgot-password`:** Anti-enumeration password reset link dispatcher.
- **`/reset-password`:** Cryptographic single-use token validator and password updater.
- **`/verify-email`:** Token confirmation and link resend form.
- **`/dashboard`:** Protected placeholder view displaying session and account status, with sign-out action.

## 🛠️ Commands

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run local development server
npm run dev

# Run ESLint linter
npm run lint

# Run Vitest test suite
npm test

# Build production bundle
npm run build
```
