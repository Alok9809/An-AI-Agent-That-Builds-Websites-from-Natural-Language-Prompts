import React from 'react'
import { Link } from 'react-router-dom'
import { FormaLogo } from '../ui/FormaLogo'

export const LandingFooter = () => {
  return (
    <footer className="w-full bg-[#050507]/95 text-neutral-400 border-t border-white/10 text-xs py-5 sm:py-6 px-6 sm:px-8 select-none shrink-0 relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="inline-block">
              <FormaLogo size="sm" showTagline={false} variant="dark" />
            </Link>
            <span className="text-xs text-neutral-500 hidden md:inline-block">
              Autonomous AI agent for high-performance website generation.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs">
            <a href="#hero" className="hover:text-white transition-colors">Top</a>
            <a href="#tech-stack" className="hover:text-white transition-colors">Tech Stack</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#components" className="hover:text-white transition-colors">Components</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <Link to="/login" className="hover:text-white transition-colors">Sign in</Link>
            <Link to="/register" className="text-white font-medium hover:underline">Get Started</Link>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 font-mono">
          <span>&copy; {new Date().getFullYear()} FORMA. All rights reserved.</span>
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>All systems operational &bull; Edge Anycast CDN</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
