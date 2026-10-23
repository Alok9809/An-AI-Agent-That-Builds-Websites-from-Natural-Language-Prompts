import React, { useState } from 'react'
import { cn } from '../../lib/utils'

/**
 * TrueFocus Component
 * Highlights and frames hovered words with an interactive focus frame.
 */
export const TrueFocus = ({
  sentence = 'Give thought its form',
  className,
  glowColor = '#ff6326',
}) => {
  const words = sentence.split(' ')
  const [activeIndex, setActiveIndex] = useState(1)

  return (
    <div className={cn('relative inline-flex flex-wrap items-center gap-2 select-none', className)}>
      {words.map((word, index) => {
        const isFocused = activeIndex === index
        return (
          <span
            key={index}
            onMouseEnter={() => setActiveIndex(index)}
            className={cn(
              'relative px-2.5 py-1 text-2xl sm:text-3xl lg:text-4xl font-bold font-display transition-all duration-300 cursor-pointer rounded-lg',
              isFocused ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
            )}
          >
            {isFocused && (
              <span
                className="absolute inset-0 rounded-lg pointer-events-none transition-all duration-300"
                style={{
                  border: `1.5px solid ${glowColor}`,
                  boxShadow: `0 0 16px -2px ${glowColor}66`,
                }}
              />
            )}
            {word}
          </span>
        )
      })}
    </div>
  )
}
