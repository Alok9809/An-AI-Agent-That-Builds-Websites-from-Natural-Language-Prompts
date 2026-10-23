import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from '../components/auth/ProtectedRoute'
import { PublicOnlyRoute } from '../components/auth/PublicOnlyRoute'
import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage'
import { ResetPasswordPage } from '../pages/ResetPasswordPage'
import { VerifyEmailPage } from '../pages/VerifyEmailPage'
import { DashboardPlaceholderPage } from '../pages/DashboardPlaceholderPage'

/**
 * AppRoutes defines the route hierarchy and access control guards.
 * Separates route definitions from provider context setup.
 */
export const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Public Authentication Routes */}
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicOnlyRoute>
            <RegisterPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicOnlyRoute>
            <ForgotPasswordPage />
          </PublicOnlyRoute>
        }
      />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPlaceholderPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback 404 Route */}
      <Route
        path="*"
        element={
          <div className="min-h-screen bg-[#08080A] text-white flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-4xl font-bold font-display">404 - Page Not Found</h1>
            <p className="text-neutral-400 mt-2 text-sm">The requested URL could not be located on Forma.</p>
            <a href="/" className="mt-4 px-4 py-2 rounded-lg bg-white text-neutral-950 font-semibold text-xs">
              Back to Home
            </a>
          </div>
        }
      />
    </Routes>
  )
}
