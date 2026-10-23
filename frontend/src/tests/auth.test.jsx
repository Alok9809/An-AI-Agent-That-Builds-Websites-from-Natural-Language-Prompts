// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { PasswordStrengthMeter } from '../components/auth/PasswordStrengthMeter'
import { FormaLogo } from '../components/ui/FormaLogo'
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  evaluatePasswordStrength,
} from '../schemas/auth.schema'
import { authService } from '../services/auth.service'

describe('FormaLogo Component', () => {
  it('renders FORMA wordmark and custom glyph', () => {
    render(<FormaLogo showTagline={true} />)
    expect(screen.getByText('FORMA')).toBeDefined()
    expect(screen.getByText('Give thought its form.')).toBeDefined()
  })
})

describe('PasswordStrengthMeter & evaluatePasswordStrength Domain Logic', () => {
  it('does not render when password is empty', () => {
    const { container } = render(<PasswordStrengthMeter password="" />)
    expect(container.firstChild).toBeNull()
  })

  it('evaluates weak password correctly', () => {
    render(<PasswordStrengthMeter password="abc" />)
    expect(screen.getByText('Weak')).toBeDefined()
    const meta = evaluatePasswordStrength('abc')
    expect(meta.label).toBe('Weak')
    expect(meta.score).toBeLessThanOrEqual(2)
  })

  it('evaluates strong password with all criteria satisfied', () => {
    render(<PasswordStrengthMeter password="ComplexPassword123!@#" />)
    expect(screen.getByText('Strong')).toBeDefined()
    const meta = evaluatePasswordStrength('ComplexPassword123!@#')
    expect(meta.label).toBe('Strong')
    expect(meta.score).toBe(5)
  })
})

describe('Production Validation Schemas (Zod)', () => {
  it('validates correct login credentials using production loginSchema', () => {
    const valid = loginSchema.safeParse({
      email: 'alex.mercer@forma.ai',
      password: 'SecurePassword123!',
      rememberMe: true,
    })
    expect(valid.success).toBe(true)
  })

  it('rejects invalid email formats in loginSchema', () => {
    const invalid = loginSchema.safeParse({
      email: 'not-an-email',
      password: 'SecurePassword123!',
    })
    expect(invalid.success).toBe(false)
  })

  it('rejects registration when passwords mismatch in production registerSchema', () => {
    const res = registerSchema.safeParse({
      name: 'Alex Mercer',
      email: 'alex@forma.ai',
      password: 'Password123!',
      confirmPassword: 'MismatchPassword999!',
      termsAccepted: true,
    })
    expect(res.success).toBe(false)
    if (!res.success) {
      expect(res.error.issues[0].message).toBe('Passwords do not match.')
    }
  })

  it('rejects registration when terms are not accepted', () => {
    const res = registerSchema.safeParse({
      name: 'Alex Mercer',
      email: 'alex@forma.ai',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      termsAccepted: false,
    })
    expect(res.success).toBe(false)
    if (!res.success) {
      expect(res.error.issues[0].message).toContain('Terms of Service')
    }
  })

  it('rejects passwords lacking special characters or numbers', () => {
    const res = registerSchema.safeParse({
      name: 'Alex Mercer',
      email: 'alex@forma.ai',
      password: 'OnlyLettersHere',
      confirmPassword: 'OnlyLettersHere',
      termsAccepted: true,
    })
    expect(res.success).toBe(false)
  })

  it('validates forgotPasswordSchema and resetPasswordSchema correctly', () => {
    expect(forgotPasswordSchema.safeParse({ email: 'valid@forma.ai' }).success).toBe(true)
    expect(forgotPasswordSchema.safeParse({ email: 'invalid' }).success).toBe(false)

    expect(
      resetPasswordSchema.safeParse({
        newPassword: 'Password123!',
        confirmPassword: 'Password123!',
      }).success
    ).toBe(true)

    expect(
      resetPasswordSchema.safeParse({
        newPassword: 'Password123!',
        confirmPassword: 'Mismatch!',
      }).success
    ).toBe(false)
  })
})

describe('authService API Abstraction Layer', () => {
  it('exposes all expected authentication lifecycle methods', () => {
    expect(typeof authService.login).toBe('function')
    expect(typeof authService.register).toBe('function')
    expect(typeof authService.logout).toBe('function')
    expect(typeof authService.getCurrentUser).toBe('function')
    expect(typeof authService.forgotPassword).toBe('function')
    expect(typeof authService.resetPassword).toBe('function')
    expect(typeof authService.verifyEmail).toBe('function')
    expect(typeof authService.resendVerification).toBe('function')
  })
})

describe('Open Redirect Prevention', () => {
  function getSafeRedirectUrl(rawUrl) {
    if (!rawUrl) return '/dashboard'
    if (rawUrl.startsWith('/') && !rawUrl.startsWith('//') && !rawUrl.includes(':')) {
      return rawUrl
    }
    return '/dashboard'
  }

  it('allows safe internal return paths', () => {
    expect(getSafeRedirectUrl('/dashboard/settings')).toBe('/dashboard/settings')
    expect(getSafeRedirectUrl('/workspace?view=grid')).toBe('/workspace?view=grid')
  })

  it('blocks protocol-relative open redirects', () => {
    expect(getSafeRedirectUrl('//evil.com')).toBe('/dashboard')
  })

  it('blocks absolute external open redirects', () => {
    expect(getSafeRedirectUrl('https://malicious-site.com')).toBe('/dashboard')
    expect(getSafeRedirectUrl('javascript:alert(1)')).toBe('/dashboard')
  })
})
