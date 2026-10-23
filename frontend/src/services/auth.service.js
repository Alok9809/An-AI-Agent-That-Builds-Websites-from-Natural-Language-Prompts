import { api } from '../lib/api'

/**
 * AuthService handles all HTTP communication with the backend Authentication API endpoints.
 * Keeps React components and Context decoupled from URL structures, HTTP verbs, and network protocols.
 */
export const authService = {
  /**
   * Retrieves the currently authenticated user based on session cookie or auth token.
   */
  async getCurrentUser() {
    return api.get('/api/auth/me')
  },

  /**
   * Submits user credentials to authenticate a session.
   */
  async login(payload) {
    return api.post('/api/auth/login', payload)
  },

  /**
   * Registers a new user account with validated credentials.
   */
  async register(payload) {
    return api.post('/api/auth/register', payload)
  },

  /**
   * Logs out the current user, invalidating server session and removing cookies.
   */
  async logout() {
    try {
      await api.post('/api/auth/logout')
    } catch (err) {
      console.warn('Logout network notification failed:', err)
    }
  },

  /**
   * Requests a secure single-use password reset link.
   */
  async forgotPassword(email) {
    return api.post('/api/auth/forgot-password', { email })
  },

  /**
   * Confirms password reset using single-use cryptographically verified token.
   */
  async resetPassword(payload) {
    return api.post('/api/auth/reset-password', payload)
  },

  /**
   * Validates email verification via 6-digit OTP or link token.
   */
  async verifyEmail(payload) {
    if (typeof payload === 'string') {
      return api.post('/api/auth/verify-email', { token: payload })
    }
    return api.post('/api/auth/verify-email', payload)
  },

  /**
   * Requests a fresh verification email.
   */
  async resendVerification(email) {
    return api.post('/api/auth/resend-verification', { email })
  },
}
