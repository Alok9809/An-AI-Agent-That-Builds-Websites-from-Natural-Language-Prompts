import React, { useState, useEffect, useRef, useCallback } from 'react'
import { LandingNavbar } from '../components/landing/LandingNavbar'
import { HeroSection } from '../components/landing/HeroSection'
import { TechMarqueeSection } from '../components/landing/TechMarqueeSection'
import { BentoGridSection } from '../components/landing/BentoGridSection'
import { HowItWorksSection } from '../components/landing/HowItWorksSection'
import { ComponentLibraryShowcase } from '../components/landing/ComponentLibraryShowcase'
import { PricingSection } from '../components/landing/PricingSection'
import { CtaSection } from '../components/landing/CtaSection'

const SECTIONS = [
  { id: 'hero', label: 'Overview' },
  { id: 'tech-stack', label: 'Tech Stack' },
  { id: 'features', label: 'Architecture' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'components', label: 'Design System' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'get-started', label: 'Get Started' },
]

export const LandingPage = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const containerRef = useRef(null)

  const activePrompt = {
    id: 'architect',
    icon: '🏛️',
    title: 'Architect Portfolio',
    prompt: 'Minimalist architecture studio with dark mode, horizontal scroll showcase, and project details.',
  }

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, {
      root: container,
      threshold: 0.5,
    })

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    // Keyboard navigation (Arrow keys / PageUp / PageDown)
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection)
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentIndex < SECTIONS.length - 1) {
          e.preventDefault()
          scrollToSection(SECTIONS[currentIndex + 1].id)
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentIndex > 0) {
          e.preventDefault()
          scrollToSection(SECTIONS[currentIndex - 1].id)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      observer.disconnect()
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeSection, scrollToSection])

  return (
    <div
      ref={containerRef}
      className="snap-scroll-container h-screen w-full bg-[#08080A] text-white selection:bg-white selection:text-black font-sans antialiased overflow-y-auto overflow-x-hidden relative"
    >
      {/* Top Fixed Navigation */}
      <LandingNavbar activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Floating Right Slide Navigator Dots */}
      <aside
        className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 select-none pointer-events-auto"
        aria-label="Section navigation"
      >
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="group relative flex items-center justify-end p-1.5 focus:outline-none cursor-pointer"
              aria-label={`Jump to ${sec.label}`}
            >
              {/* Tooltip Label */}
              <span className="absolute right-7 px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider bg-[#121217] text-white border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                {sec.label}
              </span>

              {/* Indicator Dot */}
              <span
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-2.5 h-6 bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]'
                    : 'w-2 h-2 bg-white/20 group-hover:bg-white/50 group-hover:scale-125'
                }`}
              />
            </button>
          )
        })}
      </aside>

      {/* Main Snap Slides */}
      <main className="w-full flex flex-col">
        <HeroSection activePrompt={activePrompt} />

        <TechMarqueeSection />

        <BentoGridSection />

        <HowItWorksSection />

        <ComponentLibraryShowcase />

        <PricingSection />

        <CtaSection />
      </main>
    </div>
  )
}
