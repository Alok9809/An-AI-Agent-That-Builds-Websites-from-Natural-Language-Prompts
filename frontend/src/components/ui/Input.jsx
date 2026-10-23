import React, { useId } from 'react'
import { cn } from '../../lib/utils'

export const Input = React.forwardRef(
  (
    {
      className,
      label,
      labelRight,
      error,
      helperText,
      leftElement,
      rightElement,
      id,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id || generatedId

    return (
      <div className="w-full flex flex-col text-left">
        {(label || labelRight) && (
          <div className="flex items-center justify-between mb-1 select-none">
            {label && (
              <label htmlFor={inputId} className="text-[11px] sm:text-xs font-medium text-neutral-700">
                {label}
              </label>
            )}
            {labelRight && (
              <div className="text-[11px] sm:text-xs text-neutral-500">
                {labelRight}
              </div>
            )}
          </div>
        )}

        <div className="relative flex items-center group">
          {leftElement && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-neutral-400 group-focus-within:text-neutral-900 transition-colors pointer-events-none z-10">
              {leftElement}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            type={type}
            className={cn(
              'w-full h-9 sm:h-9.5 bg-white border border-neutral-200/90 rounded-lg text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 transition-all duration-200 ease-out outline-none shadow-2xs',
              'hover:border-neutral-300 hover:shadow-xs',
              'focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/15 focus:shadow-sm',
              leftElement ? 'pl-9' : 'px-3',
              rightElement ? 'pr-9' : 'px-3',
              error && 'border-rose-500 hover:border-rose-500 focus:border-rose-500 focus:ring-rose-500/25',
              className
            )}
            {...props}
          />

          {rightElement && (
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-neutral-400 hover:text-neutral-700 transition-transform duration-150 active:scale-90 z-10">
              {rightElement}
            </div>
          )}
        </div>

        {error ? (
          <p className="text-[11px] text-rose-600 font-medium mt-0.5 animate-fadeIn leading-tight">{error}</p>
        ) : helperText ? (
          <p className="text-[10px] text-neutral-500 mt-0.5 leading-tight">{helperText}</p>
        ) : null}
      </div>
    )
  }
)

Input.displayName = 'Input'
