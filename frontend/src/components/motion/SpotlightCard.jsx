import React, { useRef, useState } from 'react'
import { cn } from '../../lib/utils'

/**
 * SpotlightCard Component
 * Renders a card with an interactive cursor-following spotlight glow.
 */
export const SpotlightCard = ({
  children,
  className,
  spotlightColor = 'rgba(255, 255, 255, 0.08)',
  borderColor = 'rgba(255, 255, 255, 0.15)',
  radius = 300,
  ...props
}) => {
  const cardRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative rounded-2xl border border-white/10 bg-[#0E0E11] p-6 text-white overflow-hidden transition-all duration-300 shadow-sm group',
        className
      )}
      {...props}
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(${radius}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`
            : '',
        }}
        aria-hidden="true"
      />

      {/* Subtle Border Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          border: `1px solid ${borderColor}`,
          maskImage: isHovered
            ? `radial-gradient(${radius / 2}px circle at ${position.x}px ${position.y}px, black, transparent 100%)`
            : '',
          WebkitMaskImage: isHovered
            ? `radial-gradient(${radius / 2}px circle at ${position.x}px ${position.y}px, black, transparent 100%)`
            : '',
        }}
        aria-hidden="true"
      />

      {/* Card Interior Content */}
      <div className="relative z-10 flex flex-col h-full">
        {children}
      </div>
    </div>
  )
}
