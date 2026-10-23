import { z } from 'zod'

/**
 * Validation schema for the Sign-In / Login form.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.')
    .max(255, 'Email cannot exceed 255 characters.'),
  password: z.string().min(1, 'Password is required.'),
  rememberMe: z.boolean().default(false),
})

/**
 * Validation schema for User Registration.
 * Enforces strong password rules (8+ chars, lowercase, uppercase, digit, symbol)
 * and mandatory terms acceptance.
 */
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Full name must be at least 2 characters.')
      .max(100, 'Full name cannot exceed 100 characters.')
      .regex(/^[\p{L}\p{M}\s.'-]+$/u, 'Name contains invalid characters.'),
    email: z
      .string()
      .min(1, 'Email is required.')
      .email('Please enter a valid email address.')
      .max(255, 'Email cannot exceed 255 characters.'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters.')
      .max(128, 'Password cannot exceed 128 characters.')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
      .regex(/\d/, 'Password must contain at least one numeric digit.')
      .regex(
        /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
        'Password must contain at least one special symbol.'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password.'),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: 'You must accept the Terms of Service and Privacy Policy to proceed.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

/**
 * Validation schema for Forgot Password request.
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.')
    .max(255, 'Email cannot exceed 255 characters.'),
})

/**
 * Validation schema for Reset Password form with token confirmation.
 */
export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters.')
      .max(128, 'Password cannot exceed 128 characters.')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
      .regex(/\d/, 'Password must contain at least one numeric digit.')
      .regex(
        /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
        'Password must contain at least one special symbol.'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

/**
 * Password strength evaluation domain utility.
 */
export function evaluatePasswordStrength(password) {
  const requirements = [
    { label: '8+ characters', met: password.length >= 8 },
    { label: 'Lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Numeric digit', met: /\d/.test(password) },
    { label: 'Special symbol', met: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) },
  ]

  const score = requirements.filter((r) => r.met).length

  if (score <= 2) {
    return { requirements, score, label: 'Weak', color: 'bg-rose-500', width: 'w-1/4' }
  }
  if (score === 3) {
    return { requirements, score, label: 'Fair', color: 'bg-amber-500', width: 'w-2/4' }
  }
  if (score === 4) {
    return { requirements, score, label: 'Good', color: 'bg-[#ff6326]', width: 'w-3/4' }
  }
  return { requirements, score, label: 'Strong', color: 'bg-emerald-500', width: 'w-full' }
}
