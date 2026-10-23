import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, AlertCircle, Info, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { AuthLayout } from '../components/auth/AuthLayout'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { GoogleIcon } from '../components/ui/GoogleIcon'
import { PasswordStrengthMeter } from '../components/auth/PasswordStrengthMeter'
import { ApiError } from '../lib/api'
import { registerSchema } from '../schemas/auth.schema'

export const RegisterPage = () => {
  const { register: registerAuth } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialPrompt = searchParams.get('prompt') || (typeof window !== 'undefined' ? sessionStorage.getItem('forma_pending_prompt') : null)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [serverError, setServerError] = useState(() => {
    return searchParams.get('error')
      ? 'Google sign-up could not be completed. Please try again or use email registration.'
      : null
  })
  const [googleNotice, setGoogleNotice] = useState(null)

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: true,
    },
  })

  const watchedPassword = watch('password', '')

  const handleGoogleClick = () => {
    window.location.href = '/api/auth/google'
  }

  const onSubmit = async (values) => {
    setServerError(null)
    setGoogleNotice(null)
    try {
      const res = await registerAuth(
        values.name,
        values.email,
        values.password,
        values.confirmPassword,
        values.termsAccepted
      )
      if (initialPrompt && typeof window !== 'undefined') {
        sessionStorage.setItem('forma_initial_prompt', initialPrompt)
      }
      if (res?.requires_verification || !res?.user?.email_verified) {
        navigate(`/verify-email?email=${encodeURIComponent(values.email)}`, { replace: true })
      } else {
        navigate('/dashboard', { replace: true })
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setServerError(err.message)
        const msg = err.message.toLowerCase()
        if (msg.includes('email') || msg.includes('domain') || msg.includes('address') || msg.includes('typo')) {
          setError('email', { type: 'server', message: err.message })
        }
      } else {
        setServerError('Registration failed. Please check your network and try again.')
      }
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start building websites with AI in minutes."
      topNavAction={
        <Link to="/login" className="text-xs text-neutral-600 hover:text-neutral-900 transition-colors">
          Already have an account? <span className="font-semibold text-neutral-900 underline ml-0.5">Sign in</span>
        </Link>
      }
    >
      <div className="flex flex-col gap-2 text-left">
        {initialPrompt && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
            <span className="truncate">
              Selected prompt: <strong className="font-semibold">&ldquo;{initialPrompt}&rdquo;</strong>
            </span>
          </div>
        )}

        {serverError && (
          <div className="flex items-start gap-2 p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs animate-fadeIn">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-500" />
            <span>{serverError}</span>
          </div>
        )}

        {googleNotice && (
          <div className="flex items-start gap-2 p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs animate-fadeIn">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
            <span>{googleNotice}</span>
          </div>
        )}

        {/* Continue with Google SSO */}
        <button
          type="button"
          onClick={handleGoogleClick}
          className="w-full h-8.5 sm:h-9 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-neutral-700 border border-neutral-200/90 hover:border-neutral-300 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-2xs hover:shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 cursor-pointer"
        >
          <GoogleIcon className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:scale-105" />
          <span>Continue with Google</span>
        </button>

        {/* Subtle OR Divider */}
        <div className="relative flex items-center my-0.5">
          <div className="flex-grow border-t border-neutral-200/80" />
          <span className="shrink-0 px-2 text-[10px] font-medium uppercase tracking-wider text-neutral-400 bg-white">
            OR
          </span>
          <div className="flex-grow border-t border-neutral-200/80" />
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          {/* Name & Work Email 2-column or tight stack */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Input
              label="Full name"
              type="text"
              autoComplete="name"
              placeholder="Alex Mercer"
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="Work email"
              type="email"
              autoComplete="email"
              placeholder="name@company.com"
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          {/* Password & Confirm Password in 2-column row */}
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Min 8 chars"
              error={errors.password?.message}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-0.5 text-neutral-400 hover:text-neutral-700 focus:outline-none cursor-pointer transition-transform duration-150 active:scale-90"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              }
              {...register('password')}
            />

            <Input
              label="Confirm"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Repeat password"
              error={errors.confirmPassword?.message}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="p-0.5 text-neutral-400 hover:text-neutral-700 focus:outline-none cursor-pointer transition-transform duration-150 active:scale-90"
                  title={showConfirmPassword ? 'Hide password' : 'Show password'}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              }
              {...register('confirmPassword')}
            />
          </div>

          {/* Real-time 4-Segment Strength Indicator & Requirements */}
          <PasswordStrengthMeter password={watchedPassword} showEmpty={true} />

          {/* Interactive Terms & Privacy Agreement */}
          <div className="flex flex-col gap-0.5 pt-0.5">
            <label className="flex items-start gap-2 cursor-pointer text-[11px] text-neutral-600 select-none hover:text-neutral-900 transition-colors">
              <input
                type="checkbox"
                className="mt-0.5 w-3.5 h-3.5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 accent-neutral-900 cursor-pointer transition-transform duration-150 active:scale-95"
                {...register('termsAccepted')}
              />
              <span className="leading-tight">
                I agree to the{' '}
                <a href="#terms" className="text-neutral-900 underline hover:text-black transition-colors">
                  Terms
                </a>{' '}
                and{' '}
                <a href="#privacy" className="text-neutral-900 underline hover:text-black transition-colors">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            {errors.termsAccepted && (
              <p className="text-[11px] text-rose-600 font-medium animate-fadeIn leading-tight">
                {errors.termsAccepted.message}
              </p>
            )}
          </div>

          {/* Prominent Full-Width Black Submit Button */}
          <Button
            type="submit"
            size="md"
            isLoading={isSubmitting}
            className="w-full mt-0.5 h-8.5 sm:h-9 text-xs sm:text-sm font-medium cursor-pointer"
          >
            Create account
          </Button>

          {/* Card Footer */}
          <div className="text-center text-[11px] text-neutral-500 pt-1.5 border-t border-neutral-100">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-neutral-900 font-semibold hover:underline transition-colors ml-0.5"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}
