import React from 'react'
import { cn } from '../../lib/utils'

/**
 * HorizonBloom Component
 * Renders an atmospheric dark hero backdrop with a glowing horizon bloom and perspective grid.
 */
export const HorizonBloom = ({
  className,
  glowColor = 'rgba(255, 99, 38, 0.18)',
  bloomColor = 'rgba(120, 119, 198, 0.22)',
  showGrid = true,
}) => {
  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none select-none overflow-hidden bg-[#08080A]',
        className
      )}
      aria-hidden="true"
    >
      {/* Deep radial ambient bloom */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] rounded-full blur-[140px] opacity-40 animate-pulse-glow"
        style={{
          background: `radial-gradient(circle, ${bloomColor} 0%, ${glowColor} 50%, transparent 80%)`,
        }}
      />

      {/* Sharp Horizon Arc Line */}
      <div
        className="absolute top-[38%] left-1/2 -translate-x-1/2 w-[1200px] h-[2px] opacity-35"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
          boxShadow: '0 0 25px 3px rgba(255, 255, 255, 0.25)',
        }}
      />

      {/* Perspective Grid Floor */}
      {showGrid && (
        <div
          className="absolute inset-x-0 bottom-0 top-[38%] opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 85%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 85%)',
            transform: 'perspective(600px) rotateX(45deg)',
            transformOrigin: 'top center',
          }}
        />
      )}

      {/* Soft Vignette Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, transparent 20%, #08080A 80%)',
        }}
      />
    </div>
  )
}
