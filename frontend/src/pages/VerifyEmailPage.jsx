import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle2, AlertCircle, ArrowLeft, MailCheck, RefreshCw } from 'lucide-react'
import { AuthLayout } from '../components/auth/AuthLayout'
import { Button } from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import { authService } from '../services/auth.service'
import { ApiError } from '../lib/api'

export const VerifyEmailPage = () => {
  const { user, refreshUser } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const emailFromUrlOrUser = searchParams.get('email') || user?.email || ''
  const tokenParam = searchParams.get('token')
  const initialOtp = searchParams.get('otp') || ''

  const [manualEmail, setManualEmail] = useState('')
  const email = emailFromUrlOrUser || manualEmail

  const [otpDigits, setOtpDigits] = useState(() => {
    if (initialOtp && initialOtp.length === 6) {
      return initialOtp.split('')
    }
    return ['', '', '', '', '', '']
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [resendStatus, setResendStatus] = useState(null)
  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [isVerified, setIsVerified] = useState(false)

  const inputRefs = useRef([])

  // Cooldown countdown timer
  useEffect(() => {
    if (resendCooldown <= 0) return
    const timer = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [resendCooldown])

  // Auto-focus first input on mount
  useEffect(() => {
    if (!tokenParam && inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [tokenParam])

  // Fallback: If URL contains a raw link token, verify directly
  useEffect(() => {
    if (!tokenParam) return

    let isMounted = true
    const verifyToken = async () => {
      setIsSubmitting(true)
      try {
        const res = await authService.verifyEmail(tokenParam)
        if (res?.token) {
          localStorage.setItem('forma_auth_token', res.token)
        }
        await refreshUser()
        if (isMounted) {
          setIsVerified(true)
          setTimeout(() => navigate('/dashboard', { replace: true }), 1200)
        }
      } catch (err) {
        if (isMounted) {
          setErrorMessage(err instanceof ApiError ? err.message : 'Verification link has expired or is invalid.')
        }
      } finally {
        if (isMounted) setIsSubmitting(false)
      }
    }

    verifyToken()
    return () => {
      isMounted = false
    }
  }, [tokenParam, refreshUser, navigate])

  const handleDigitChange = (index, value) => {
    setErrorMessage(null)
    const char = value.replace(/\D/g, '').slice(-1) // single digit

    const newDigits = [...otpDigits]
    newDigits[index] = char
    setOtpDigits(newDigits)

    if (char && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otpDigits[index] && index > 0 && inputRefs.current[index - 1]) {
        const newDigits = [...otpDigits]
        newDigits[index - 1] = ''
        setOtpDigits(newDigits)
        inputRefs.current[index - 1].focus()
      } else {
        const newDigits = [...otpDigits]
        newDigits[index] = ''
        setOtpDigits(newDigits)
      }
    } else if (e.key === 'ArrowLeft' && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus()
    } else if (e.key === 'ArrowRight' && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    setErrorMessage(null)
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!pasteData) return

    const newDigits = [...otpDigits]
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pasteData[i] || ''
    }
    setOtpDigits(newDigits)

    const focusIdx = Math.min(pasteData.length, 5)
    if (inputRefs.current[focusIdx]) {
      inputRefs.current[focusIdx].focus()
    }
  }

  const handleSubmit = async (e) => {
    e?.preventDefault()
    setErrorMessage(null)
    setResendStatus(null)

    const otp = otpDigits.join('')
    if (otp.length !== 6) {
      setErrorMessage('Please enter the complete 6-digit verification code.')
      return
    }

    if (!email) {
      setErrorMessage('Please provide your email address.')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await authService.verifyEmail({ email, otp })
      if (res?.token) {
        localStorage.setItem('forma_auth_token', res.token)
      }
      await refreshUser()
      setIsVerified(true)
      setTimeout(() => {
        navigate('/dashboard', { replace: true })
      }, 1000)
    } catch (err) {
      setErrorMessage(
        err instanceof ApiError ? err.message : 'Invalid verification code. Please check your email and try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResend = async () => {
    if (resendCooldown > 0 || isResending) return
    if (!email) {
      setErrorMessage('Please enter your email address to receive a new code.')
      return
    }

    setIsResending(true)
    setErrorMessage(null)
    setResendStatus(null)

    try {
      await authService.resendVerification(email)
      setResendStatus(`A new 6-digit code has been sent to ${email}`)
      setResendCooldown(60)
      setOtpDigits(['', '', '', '', '', ''])
      if (inputRefs.current[0]) inputRefs.current[0].focus()
    } catch (err) {
      setErrorMessage(
        err instanceof ApiError ? err.message : 'Unable to resend code right now. Please wait a moment and try again.'
      )
    } finally {
      setIsResending(false)
    }
  }

  return (
    <AuthLayout
      title="Verify your email"
      subtitle={
        email ? (
          <>
            Enter the 6-digit code sent to <strong className="text-neutral-900 font-semibold">{email}</strong>
          </>
        ) : (
          'Enter the 6-digit verification code sent to your email.'
        )
      }
      badgeIcon={<MailCheck className="w-4 h-4 text-white" />}
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
      {isVerified ? (
        <div className="flex flex-col items-center gap-3.5 text-center py-4 animate-fadeIn">
          <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-semibold text-neutral-900">Email verified successfully</h3>
            <p className="text-xs text-neutral-500">Redirecting you to your Forma workspace...</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3.5 text-left animate-fadeIn">
          {errorMessage && (
            <div className="flex items-start gap-2 p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs animate-fadeIn">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {resendStatus && (
            <div className="flex items-start gap-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs animate-fadeIn">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-600" />
              <span>{resendStatus}</span>
            </div>
          )}

          {!emailFromUrlOrUser && (
            <div className="flex flex-col gap-1 mb-1">
              <label className="text-[11px] font-medium text-neutral-700">Account email</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={manualEmail}
                onChange={(e) => setManualEmail(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-neutral-200 text-xs bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-all"
                required
              />
            </div>
          )}

          {/* 6-Digit OTP Boxes */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-1.5 sm:gap-2 my-1" onPaste={handlePaste}>
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  aria-label={`Digit ${idx + 1}`}
                  className="w-10.5 h-12 sm:w-12 sm:h-13.5 text-center font-mono text-xl sm:text-2xl font-bold rounded-xl border border-neutral-200 bg-white text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 shadow-2xs transition-all duration-150 selection:bg-transparent"
                />
              ))}
            </div>

            {/* Submit Verification Button */}
            <Button
              type="submit"
              size="md"
              isLoading={isSubmitting}
              disabled={otpDigits.join('').length !== 6 || isSubmitting}
              className="w-full h-9 sm:h-9.5 text-xs sm:text-sm font-medium cursor-pointer"
            >
              Verify Code
            </Button>
          </form>

          {/* Resend Action & Cooldown */}
          <div className="flex items-center justify-between text-xs pt-1 border-t border-neutral-100">
            <span className="text-neutral-500 text-[11px]">Didn&apos;t receive code?</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={resendCooldown > 0 || isResending}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-neutral-900 hover:underline disabled:text-neutral-400 disabled:no-underline disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              {isResending ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : resendCooldown > 0 ? (
                <span>Resend in {resendCooldown}s</span>
              ) : (
                <span>Resend code</span>
              )}
            </button>
          </div>

          <div className="text-center pt-2">
            <Link
              to="/register"
              className="text-[11px] text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Used wrong email? <span className="font-medium underline ml-0.5">Register with another</span>
            </Link>
          </div>
        </div>
      )}
    </AuthLayout>
  )
}
