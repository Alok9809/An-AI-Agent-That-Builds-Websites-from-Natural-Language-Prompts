import React from 'react'
import { cn } from '../../lib/utils'

/**
 * ShinyText Component
 * Renders text with an animated linear-gradient shimmer sheen.
 */
export const ShinyText = ({
  children,
  className,
  shimmerColor = 'rgba(255, 255, 255, 0.95)',
  baseColor = 'rgba(255, 255, 255, 0.45)',
  speed = '3s',
}) => {
  return (
    <span
      className={cn('inline-block font-medium tracking-tight select-none', className)}
      style={{
        backgroundImage: `linear-gradient(120deg, ${baseColor} 0%, ${baseColor} 35%, ${shimmerColor} 50%, ${baseColor} 65%, ${baseColor} 100%)`,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: `shimmer ${speed} linear infinite`,
      }}
    >
      {children}
    </span>
  )
}
