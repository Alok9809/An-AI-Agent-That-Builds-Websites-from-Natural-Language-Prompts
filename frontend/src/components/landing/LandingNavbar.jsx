import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FormaLogo } from '../ui/FormaLogo'
import { ShinyText } from '../motion/ShinyText'
import { ArrowRight, Menu, X, Sparkles } from 'lucide-react'

export const LandingNavbar = ({ activeSection = 'hero', onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (e, id) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate(id)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  const navItems = [
    { id: 'tech-stack', label: 'Tech Stack' },
    { id: 'features', label: 'Features' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'components', label: 'Components' },
    { id: 'pricing', label: 'Pricing' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#08080A]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, 'hero')}
          className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-lg cursor-pointer"
        >
          <FormaLogo size="md" showTagline={true} variant="dark" />
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-neutral-400">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`transition-colors cursor-pointer ${
                  isActive ? 'text-white font-semibold' : 'hover:text-white'
                }`}
              >
                {item.label}
              </a>
            )
          })}
          <a
            href="#components"
            onClick={(e) => handleNavClick(e, 'components')}
            className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ShinyText baseColor="rgba(255,255,255,0.4)" shimmerColor="#ffffff">
              Design System
            </ShinyText>
          </a>
        </div>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/login"
            className="px-3.5 py-2 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white text-neutral-950 hover:bg-neutral-200 active:scale-95 transition-all shadow-md group cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-neutral-950 transition-transform group-hover:rotate-12" />
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden p-2 text-neutral-400 hover:text-white focus:outline-none cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0A0A0D] border-b border-white/10 px-6 py-4 flex flex-col gap-3 animate-fadeIn">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`text-sm py-1 transition-colors ${
                activeSection === item.id ? 'text-white font-semibold' : 'text-neutral-300 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#components"
            onClick={(e) => handleNavClick(e, 'components')}
            className="text-sm text-neutral-300 hover:text-white py-1"
          >
            Design System
          </a>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link
              to="/login"
              className="text-sm text-neutral-300 hover:text-white py-1"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white text-neutral-950"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
