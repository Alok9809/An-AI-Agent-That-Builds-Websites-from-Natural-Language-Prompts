import React from 'react'
import { Link } from 'react-router-dom'
import { TrueFocus } from '../motion/TrueFocus'
import { Sparkles, ArrowRight, ShieldCheck, Zap, Check } from 'lucide-react'
import { LandingFooter } from './LandingFooter'

export const CtaSection = () => {
  return (
    <section
      id="get-started"
      className="snap-scroll-section relative min-h-screen flex flex-col justify-between items-center pt-16 sm:pt-20 lg:pt-24 pb-0 px-0 bg-[#08080A] text-white overflow-hidden text-center border-t border-white/10 select-none"
    >
      {/* Background Radial Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] rounded-full blur-[140px] opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 99, 38, 0.4) 0%, rgba(120, 119, 198, 0.3) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* Main Center CTA */}
      <div className="relative z-10 max-w-4xl w-full mx-auto my-auto flex flex-col items-center gap-6 sm:gap-8 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <TrueFocus sentence="Give thought its form" glowColor="#ff6326" />

        <p className="text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed">
          Ready to build your next website? Join thousands of creators turning natural language into production reality.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Link
            to="/register"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-semibold bg-white text-neutral-950 hover:bg-neutral-100 active:scale-98 transition-all shadow-xl shadow-white/10 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-neutral-900" />
            <span>Create Your Free Website</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-medium border border-white/15 bg-white/5 hover:bg-white/10 text-white backdrop-blur-md transition-all cursor-pointer"
          >
            <span>Sign In</span>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-7 text-xs text-neutral-400 font-mono pt-3">
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" /> No credit card required
          </span>
          <span className="text-neutral-600">&bull;</span>
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" /> Instant live preview
          </span>
          <span className="text-neutral-600">&bull;</span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Free forever tier
          </span>
        </div>
      </div>

      {/* Sleek Built-in Footer */}
      <LandingFooter />
    </section>
  )
}
