import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#09090b] flex flex-col items-center justify-center gap-4 text-[#fbf9f5]">
        <div className="w-10 h-10 rounded-lg bg-[#181820] border border-[#ff6326]/40 flex items-center justify-center font-bold text-[#ff6326] animate-pulse shadow-[0_0_20px_rgba(255,99,38,0.25)]">
          F
        </div>
        <div className="text-xs text-[#9c978e] tracking-widest uppercase">Checking session...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Preserve internal return path
    const returnUrl = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/login?redirect=${returnUrl}`} replace />
  }

  if (user && user.email_verified === false) {
    return <Navigate to={`/verify-email?email=${encodeURIComponent(user.email)}`} replace />
  }

  return <>{children}</>
}
