import React, { createContext, useEffect, useState } from 'react'
import { authService } from '../services/auth.service'

export const AuthContext = createContext(undefined)

/**
 * AuthProvider manages user authentication state across the application lifecycle.
 * Communicates with the backend exclusively via authService.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = async () => {
    try {
      const userData = await authService.getCurrentUser()
      setUser(userData)
    } catch {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('forma_auth_token')
      }
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true

    authService
      .getCurrentUser()
      .then((userData) => {
        if (isMounted) setUser(userData)
      })
      .catch(() => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('forma_auth_token')
        }
        if (isMounted) setUser(null)
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const login = async (email, password, rememberMe = false) => {
    const res = await authService.login({
      email,
      password,
      remember_me: rememberMe,
    })
    if (res.token) {
      localStorage.setItem('forma_auth_token', res.token)
    }
    setUser(res.user)
    return res.user
  }

  const register = async (name, email, password, confirmPassword, termsAccepted) => {
    const res = await authService.register({
      name,
      email,
      password,
      confirm_password: confirmPassword,
      terms_accepted: termsAccepted,
    })
    if (res.token) {
      localStorage.setItem('forma_auth_token', res.token)
    }
    setUser(res.user)
    return res
  }

  const verifyOtp = async (email, otp) => {
    const res = await authService.verifyEmail({ email, otp })
    if (res.token) {
      localStorage.setItem('forma_auth_token', res.token)
    }
    setUser(res.user)
    return res.user
  }

  const logout = async () => {
    try {
      await authService.logout()
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('forma_auth_token')
      }
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        verifyOtp,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { useAuth } from './useAuth'
