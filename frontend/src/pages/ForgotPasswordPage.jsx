import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, ArrowLeft, AlertCircle, KeyRound } from 'lucide-react'
import { AuthLayout } from '../components/auth/AuthLayout'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { authService } from '../services/auth.service'
import { ApiError } from '../lib/api'
import { forgotPasswordSchema } from '../schemas/auth.schema'

export const ForgotPasswordPage = () => {
  const [submittedEmail, setSubmittedEmail] = useState(null)
  const [serverError, setServerError] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (values) => {
    setServerError(null)
    try {
      await authService.forgotPassword(values.email)
      setSubmittedEmail(values.email)
    } catch (err) {
      if (err instanceof ApiError) {
        setServerError(err.message)
        const msg = err.message.toLowerCase()
        if (msg.includes('email') || msg.includes('domain') || msg.includes('address') || msg.includes('typo') || msg.includes('account')) {
          setError('email', { type: 'server', message: err.message })
        }
      } else {
        setServerError('Unable to process request. Please check your connection.')
      }
    }
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email address and we'll send you a recovery link."
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
      {submittedEmail ? (
        <div className="flex flex-col items-center gap-3 text-center py-2 animate-fadeIn">
          <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>

          <div className="flex flex-col gap-1 text-center">
            <h3 className="text-sm font-semibold text-neutral-900">Check your inbox</h3>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-sm">
              If an account exists for <span className="text-neutral-900 font-medium">{submittedEmail}</span>, we have sent instructions to reset your password.
            </p>
          </div>

          <div className="pt-3 w-full border-t border-neutral-100 flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSubmittedEmail(null)}
              className="w-full text-xs h-9 border-neutral-200/90 hover:bg-neutral-50 text-neutral-700"
            >
              Send another link
            </Button>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-900 font-medium transition-colors py-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to sign in</span>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2.5 text-left">
          {serverError && (
            <div className="flex items-start gap-2 p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs animate-fadeIn">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-500" />
              <span>{serverError}</span>
            </div>
          )}

          <Input
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Button
            type="submit"
            size="md"
            isLoading={isSubmitting}
            className="w-full mt-1 h-9 sm:h-9.5 bg-neutral-900 hover:bg-neutral-800 active:bg-black text-white text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Send reset link
          </Button>

          <div className="text-center pt-2 border-t border-neutral-100">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to sign in</span>
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  )
}
