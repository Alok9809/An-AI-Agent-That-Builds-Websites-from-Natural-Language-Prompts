import React from 'react'
import { cn } from '../../lib/utils'

export const Button = React.forwardRef(
  ({ className, variant = 'primary', size = 'md', isLoading = false, disabled, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-out active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none relative overflow-hidden'

    const variants = {
      primary:
        'bg-neutral-900 text-white hover:bg-neutral-800 active:bg-black shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0',
      secondary:
        'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 hover:border-neutral-400 active:bg-neutral-100 shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0',
      outline:
        'bg-transparent text-neutral-700 border border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 hover:border-neutral-400 active:bg-neutral-100',
      ghost:
        'bg-transparent text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200/70',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-xs h-9',
      md: 'px-4 py-2.5 text-sm h-11',
      lg: 'px-5 py-3 text-base h-12',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <span className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin inline-block" />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
