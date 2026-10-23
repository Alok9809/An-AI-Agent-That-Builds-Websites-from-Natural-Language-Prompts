import React from 'react'
import { cn } from '../../lib/utils'

/**
 * InfiniteMarquee Component
 * Smooth continuous infinite scrolling marquee with gradient edge masks and pause-on-hover.
 */
export const InfiniteMarquee = ({
  children,
  className,
  speed = '35s',
  reverse = false,
}) => {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden select-none py-3',
        className
      )}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
      }}
    >
      <div
        className="flex w-max gap-8 items-center"
        style={{
          animation: `marquee ${speed} linear infinite ${reverse ? 'reverse' : 'normal'}`,
        }}
      >
        <div className="flex shrink-0 items-center gap-8">{children}</div>
        <div className="flex shrink-0 items-center gap-8" aria-hidden="true">{children}</div>
        <div className="flex shrink-0 items-center gap-8" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}
