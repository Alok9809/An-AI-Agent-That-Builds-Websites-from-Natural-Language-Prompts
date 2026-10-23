import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft, ShieldCheck, KeyRound } from 'lucide-react'
import { AuthLayout } from '../components/auth/AuthLayout'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { PasswordStrengthMeter } from '../components/auth/PasswordStrengthMeter'
import { authService } from '../services/auth.service'
import { ApiError } from '../lib/api'
import { resetPasswordSchema } from '../schemas/auth.schema'

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [revokeSessions, setRevokeSessions] = useState(true)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  const watchedPassword = watch('newPassword', '')

  const onSubmit = async (values) => {
    if (!token) {
      setServerError('Missing reset token. Please use the link sent to your email.')
      return
    }
    setServerError(null)
    try {
      await authService.resetPassword({
        token,
        new_password: values.newPassword,
        confirm_password: values.confirmPassword,
      })
      setIsSuccess(true)
    } catch (err) {
      if (err instanceof ApiError) {
        setServerError(err.message)
      } else {
        setServerError('Password reset failed. The link may have expired.')
      }
    }
  }

  if (!token) {
    return (
      <AuthLayout
        title="Invalid Link"
        subtitle="Password recovery requires a valid reset link."
        badgeIcon={<KeyRound className="w-4 h-4 text-white" />}
        topNavAction={
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to sign in</span>
          </Link>
        }
      >
        <div className="flex flex-col items-center gap-3 text-center py-2 animate-fadeIn text-left">
          <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <AlertCircle className="w-5 h-5 text-rose-600" />
          </div>
          <div className="flex flex-col gap-0.5 text-center">
            <h3 className="text-sm font-semibold text-neutral-900">Missing Reset Token</h3>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-sm">
              No reset token was detected in your URL. Please request a new recovery link.
            </p>
          </div>
          <Link to="/forgot-password" className="w-full mt-1">
            <Button size="md" className="w-full h-9 bg-neutral-900 hover:bg-neutral-800 text-white shadow-xs text-xs">
              Request new link
            </Button>
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Set new password"
      subtitle="Choose a strong password with at least 8 characters."
      badgeIcon={<ShieldCheck className="w-4 h-4 text-white" />}
      topNavAction={
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to sign in</span>
        </Link>
      }
    >
      {isSuccess ? (
        <div className="flex flex-col items-center gap-3 text-center py-2 animate-fadeIn">
          <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>

          <div className="flex flex-col gap-0.5 text-center">
            <h3 className="text-sm font-semibold text-neutral-900">Password updated</h3>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-sm">
              Your password has been changed. Existing sessions have been invalidated.
            </p>
          </div>

          <Button
            onClick={() => navigate('/login', { replace: true })}
            size="md"
            className="w-full mt-2 h-9 sm:h-9.5 bg-neutral-900 text-white hover:bg-neutral-800 shadow-xs cursor-pointer text-xs"
          >
            Sign in with new password
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 text-left">
          {serverError && (
            <div className="flex items-start gap-2 p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs animate-fadeIn">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-500" />
              <span>{serverError}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <Input
              label="New password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Min 8 chars"
              error={errors.newPassword?.message}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-0.5 text-neutral-400 hover:text-neutral-700 focus:outline-none cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              }
              {...register('newPassword')}
            />

            <Input
              label="Confirm"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Confirm password"
              error={errors.confirmPassword?.message}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="p-0.5 text-neutral-400 hover:text-neutral-700 focus:outline-none cursor-pointer"
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

          <PasswordStrengthMeter password={watchedPassword} showEmpty={true} />

          {/* Session Revocation Security Setting */}
          <div className="p-2 rounded-lg bg-neutral-50 border border-neutral-200/80">
            <label className="flex items-start gap-2 cursor-pointer text-[11px] select-none">
              <input
                type="checkbox"
                checked={revokeSessions}
                onChange={(e) => setRevokeSessions(e.target.checked)}
                className="mt-0.5 w-3.5 h-3.5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 accent-neutral-900 cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="font-medium text-neutral-800 leading-tight">Revoke all other active sessions</span>
                <span className="text-[10px] text-neutral-500 leading-tight">
                  Signs out of other browsers for enhanced protection.
                </span>
              </div>
            </label>
          </div>

          <Button
            type="submit"
            size="md"
            isLoading={isSubmitting}
            className="w-full mt-0.5 h-8.5 sm:h-9 bg-neutral-900 hover:bg-neutral-800 active:bg-black text-white text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Update password
          </Button>

          <div className="text-center pt-1.5 border-t border-neutral-100">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-[11px] text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to sign in</span>
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  )
}
