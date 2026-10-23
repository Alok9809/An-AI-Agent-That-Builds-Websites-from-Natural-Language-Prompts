import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '../../lib/utils'
import { evaluatePasswordStrength } from '../../schemas/auth.schema'

export const PasswordStrengthMeter = ({ password = '', showEmpty = false }) => {
  if (!password && !showEmpty) return null

  const { requirements, score, label } = evaluatePasswordStrength(password)
  const isZero = !password

  // Segmented 4-bar indicator logic with real-time strength grading
  const getSegmentColor = (segmentIndex) => {
    if (isZero) return 'bg-neutral-200/70'
    const threshold = segmentIndex === 1 ? 1 : segmentIndex === 2 ? 2 : segmentIndex === 3 ? 3 : 4
    if (score < threshold) {
      return 'bg-neutral-200/70'
    }
    if (score <= 2) {
      return 'bg-rose-500'
    }
    if (score === 3) {
      return 'bg-amber-500'
    }
    return 'bg-emerald-500'
  }

  return (
    <div className="w-full flex flex-col gap-1 pt-0 text-left animate-fadeIn">
      {/* Strength Header */}
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-neutral-500">Password strength:</span>
        <span
          className={cn(
            'font-medium text-[11px]',
            isZero
              ? 'text-neutral-400'
              : score <= 2
              ? 'text-rose-600'
              : score === 3
              ? 'text-amber-600'
              : 'text-emerald-600'
          )}
        >
          {isZero ? 'Required' : label}
        </span>
      </div>

      {/* 4 Segmented Horizontal Pills */}
      <div className="grid grid-cols-4 gap-1.5 h-1 my-0.5">
        <div className={cn('h-1 rounded-full transition-all duration-300', getSegmentColor(1))} />
        <div className={cn('h-1 rounded-full transition-all duration-300', getSegmentColor(2))} />
        <div className={cn('h-1 rounded-full transition-all duration-300', getSegmentColor(3))} />
        <div className={cn('h-1 rounded-full transition-all duration-300', getSegmentColor(4))} />
      </div>

      {/* Granular Criteria Checklist */}
      <div className="grid grid-cols-2 gap-y-0.5 gap-x-2 text-[10px] sm:text-[11px]">
        {requirements.map((req) => (
          <div
            key={req.label}
            className={cn(
              'flex items-center gap-1 transition-colors leading-tight',
              req.met ? 'text-neutral-900 font-medium' : 'text-neutral-400'
            )}
          >
            {req.met ? (
              <Check className="w-3 h-3 text-emerald-600 shrink-0" strokeWidth={2.5} />
            ) : (
              <span className="w-3 h-3 flex items-center justify-center text-neutral-400 font-mono text-[10px] shrink-0">
                &mdash;
              </span>
            )}
            <span className="truncate">{req.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
