import React, { useState } from 'react'
import { cn } from '../../lib/utils'

/**
 * Dock Component
 * Interactive floating navigation dock with icon magnification.
 */
export const Dock = ({ items = [], className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 p-2 rounded-2xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl shadow-2xl select-none',
        className
      )}
    >
      {items.map((item, index) => {
        const isHovered = hoveredIndex === index
        const isNeighbor =
          hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1

        const scale = isHovered ? 'scale-125 -translate-y-1' : isNeighbor ? 'scale-110 -translate-y-0.5' : 'scale-100'

        return (
          <button
            key={index}
            onClick={item.onClick}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            title={item.label}
            className={cn(
              'relative p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer',
              isHovered
                ? 'bg-white/15 text-white'
                : 'bg-white/5 text-neutral-400 hover:text-white',
              scale
            )}
          >
            {item.icon}
            {isHovered && item.label && (
              <span className="absolute -top-8 px-2 py-0.5 rounded-md bg-neutral-950 border border-white/10 text-[10px] font-mono text-white whitespace-nowrap shadow-md pointer-events-none animate-fadeIn">
                {item.label}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
