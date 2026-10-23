import React from 'react'
import { cn } from '../../lib/utils'

export const FormaLogo = ({
  className,
  showTagline = false,
  showBadge = false,
  variant = 'light',
  size = 'md',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7 rounded-lg',
    md: 'w-8 h-8 rounded-lg',
    lg: 'w-10 h-10 rounded-xl',
  }

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  }

  const isLight = variant === 'light'

  return (
    <div className={cn('flex items-center gap-2.5 select-none', className)}>
      {/* Clean Architectural Prism Glyph */}
      <div
        className={cn(
          'flex items-center justify-center transition-all duration-200',
          iconSizes[size],
          isLight
            ? 'bg-neutral-950 text-white shadow-sm'
            : 'bg-neutral-900 border border-white/10 text-white shadow-sm'
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-white"
          aria-hidden="true"
        >
          {/* Architectural geometric prism structure */}
          <path
            d="M5 4H19L14 12H5V4Z"
            fill="currentColor"
            fillOpacity="1"
          />
          <path
            d="M5 12H13L8 20H5V12Z"
            fill="currentColor"
            fillOpacity="0.5"
          />
          <path
            d="M14 12L19 4L16 20L11 20L14 12Z"
            fill="currentColor"
            fillOpacity="0.25"
          />
        </svg>
      </div>

      <div className="flex flex-col text-left">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'font-bold tracking-[0.12em] font-display leading-none',
              textSizes[size],
              isLight ? 'text-neutral-900' : 'text-white'
            )}
          >
            FORMA
          </span>
          {showBadge && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium tracking-normal text-neutral-600 bg-neutral-100 border border-neutral-200">
              AGENT
            </span>
          )}
        </div>
        {showTagline && (
          <span
            className={cn(
              'text-[11px] tracking-normal font-normal mt-0.5',
              isLight ? 'text-neutral-500' : 'text-neutral-400'
            )}
          >
            Give thought its form.
          </span>
        )}
      </div>
    </div>
  )
}

