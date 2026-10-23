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
import { ApiError } from '../lib/api'
import { loginSchema } from '../schemas/auth.schema'

export const LoginPage = () => {
  const { login, isAuthenticated, refreshUser } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialPrompt = searchParams.get('prompt') || (typeof window !== 'undefined' ? sessionStorage.getItem('forma_pending_prompt') : null)

  const [showPassword, setShowPassword] = useState(false)
  const oauthToken = searchParams.get('session_token') || searchParams.get('token')

  React.useEffect(() => {
    if (oauthToken) {
      localStorage.setItem('forma_auth_token', oauthToken)
      refreshUser()
    }
  }, [oauthToken, refreshUser])

  React.useEffect(() => {
    if (isAuthenticated) {
      const redirect = searchParams.get('redirect')
      const target = redirect && redirect.startsWith('/') && !redirect.startsWith('//') && !redirect.includes(':')
        ? redirect
        : '/dashboard'
      navigate(target, { replace: true })
    }
  }, [isAuthenticated, navigate, searchParams])

  const [serverError, setServerError] = useState(() => {
    return searchParams.get('error')
      ? 'Google sign-in could not be completed. Please try again or use email sign in.'
      : null
  })
  const [googleNotice, setGoogleNotice] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const handleGoogleClick = () => {
    window.location.href = '/api/auth/google'
  }

  const onSubmit = async (values) => {
    setServerError(null)
    setGoogleNotice(null)
    try {
      await login(values.email, values.password, values.rememberMe)
      if (initialPrompt && typeof window !== 'undefined') {
        sessionStorage.setItem('forma_initial_prompt', initialPrompt)
      }
      const redirect = searchParams.get('redirect')
      if (redirect && redirect.startsWith('/') && !redirect.startsWith('//') && !redirect.includes(':')) {
        navigate(redirect, { replace: true })
      } else {
        navigate('/dashboard', { replace: true })
      }
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 403 && (err.message.toLowerCase().includes('verify') || err.message.toLowerCase().includes('verification'))) {
          navigate(`/verify-email?email=${encodeURIComponent(values.email)}`, { replace: true })
          return
        }
        setServerError(err.message)
      } else {
        setServerError('Unable to sign in. Please check your credentials and network connection.')
      }
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your email and password to access your account."
      topNavAction={
        <Link to="/register" className="text-xs text-neutral-600 hover:text-neutral-900 transition-colors">
          Don&apos;t have an account? <span className="font-semibold text-neutral-900 underline ml-0.5">Sign up</span>
        </Link>
      }
    >
      <div className="flex flex-col gap-2.5 text-left">
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
          className="w-full h-9 sm:h-9.5 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-neutral-700 border border-neutral-200/90 hover:border-neutral-300 rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center gap-2.5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-2xs hover:shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 cursor-pointer"
        >
          <GoogleIcon className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-105" />
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

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2.5">
          <Input
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Password"
            labelRight={
              <Link
                to="/forgot-password"
                className="text-[11px] text-neutral-500 hover:text-neutral-900 hover:underline transition-colors"
              >
                Forgot password?
              </Link>
            }
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter your password"
            error={errors.password?.message}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-neutral-400 hover:text-neutral-700 focus:outline-none cursor-pointer transition-transform duration-150 active:scale-90"
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            }
            {...register('password')}
          />

          {/* Remember me option */}
          <div className="flex items-center justify-between text-[11px] pt-0">
            <label className="flex items-center gap-2 cursor-pointer select-none text-neutral-600 hover:text-neutral-900 transition-colors">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 accent-neutral-900 cursor-pointer transition-transform duration-150 active:scale-95"
                {...register('rememberMe')}
              />
              <span>Remember me for 30 days</span>
            </label>
          </div>

          {/* Prominent Full-Width Black Sign in Button */}
          <Button
            type="submit"
            size="md"
            isLoading={isSubmitting}
            className="w-full mt-1 h-9 sm:h-9.5 text-xs sm:text-sm font-medium cursor-pointer"
          >
            Sign in
          </Button>


          {/* Card Footer */}
          <div className="text-center text-[11px] text-neutral-500 pt-2 border-t border-neutral-100">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className="text-neutral-900 font-semibold hover:underline transition-colors ml-1"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}
