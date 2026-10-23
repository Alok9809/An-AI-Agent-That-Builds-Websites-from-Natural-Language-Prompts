import React from 'react'
import { Link } from 'react-router-dom'
import { FormaLogo } from '../ui/FormaLogo'

export const AuthLayout = ({
  children,
  title,
  subtitle,
  badgeIcon,
  topNavAction,
}) => {
  return (
    <div className="h-screen max-h-screen w-full flex flex-col justify-between bg-[#F8F9FA] text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white relative overflow-hidden">
      {/* Luminous Ambient Floating Glow Orbs (Hardware-accelerated CSS) */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-indigo-200/40 via-purple-100/30 to-sky-100/30 filter blur-3xl pointer-events-none animate-orb-1"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-amber-100/40 via-rose-100/30 to-violet-100/30 filter blur-3xl pointer-events-none animate-orb-2"
        aria-hidden="true"
      />

      {/* Subtle micro dot-grid ambient backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(#d4d4d8 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Top Navbar */}
      <header className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shrink-0 relative z-10">
        <Link
          to="/"
          className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-lg transition-transform duration-200 hover:scale-[1.02]"
        >
          <FormaLogo size="md" showTagline={true} variant="light" />
        </Link>
        {topNavAction && (
          <div className="flex items-center text-xs text-neutral-600 transition-colors">
            {topNavAction}
          </div>
        )}
      </header>

      {/* Main Centered Content: Non-scrollable viewport fit */}
      <main className="w-full flex-1 flex items-center justify-center px-4 py-1 sm:py-2 relative z-10 overflow-hidden">
        <div className="w-full max-w-[390px] sm:max-w-[410px] rounded-2xl border border-neutral-200/80 bg-white/70 backdrop-blur-xl p-1 sm:p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.09)] transition-all duration-300 animate-fade-slide-up">
          <div className="w-full rounded-xl border border-neutral-200/70 bg-white/95 backdrop-blur-md p-4 sm:p-5 shadow-xs text-left">
            {/* Top Brand / Glyph Squircle Badge */}
            <div className="w-8 h-8 rounded-lg bg-neutral-950 text-white flex items-center justify-center shadow-xs mb-2.5 transition-transform duration-300 hover:scale-110 hover:rotate-2">
              {badgeIcon || (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-white"
                  aria-hidden="true"
                >
                  <path d="M5 4H19L14 12H5V4Z" fill="currentColor" fillOpacity="1" />
                  <path d="M5 12H13L8 20H5V12Z" fill="currentColor" fillOpacity="0.5" />
                  <path d="M14 12L19 4L16 20L11 20L14 12Z" fill="currentColor" fillOpacity="0.25" />
                </svg>
              )}
            </div>

            {/* Header: Title and Subtitle */}
            <div className="mb-3 sm:mb-3.5 flex flex-col gap-0.5">
              <h1 className="text-lg sm:text-xl font-bold font-display tracking-tight text-neutral-900 leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-[11px] sm:text-xs text-neutral-500 font-sans leading-snug">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Form & Children Content */}
            <div className="w-full">
              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Legal Sub-footer */}
      <footer className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-2 sm:py-2.5 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[11px] text-neutral-400 shrink-0 relative z-10 border-t border-neutral-200/60">
        <span>&copy; {new Date().getFullYear()} Forma, Inc. All rights reserved.</span>
        <div className="flex items-center gap-3.5 text-neutral-500">
          <a href="#privacy" className="hover:text-neutral-900 transition-colors">Privacy</a>
          <span>&bull;</span>
          <a href="#terms" className="hover:text-neutral-900 transition-colors">Terms</a>
          <span>&bull;</span>
          <a href="#security" className="hover:text-neutral-900 transition-colors">Security</a>
        </div>
      </footer>
    </div>
  )
}
