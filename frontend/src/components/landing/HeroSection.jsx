import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LightTunnel } from '../motion/LightTunnel'
import { ShinyText } from '../motion/ShinyText'
import {
  Sparkles,
  ArrowRight,
  Eye,
  Star,
  Lock,
  Laptop,
  Tablet,
  Smartphone,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react'

export const HeroSection = ({ activePrompt }) => {
  const [previewDevice, setPreviewDevice] = useState('desktop') // 'desktop' | 'tablet' | 'mobile'

  const targetRegisterUrl = activePrompt?.prompt
    ? `/register?prompt=${encodeURIComponent(activePrompt.prompt)}`
    : '/register'

  return (
    <section
      id="hero"
      className="snap-scroll-section relative min-h-screen flex flex-col justify-center items-center py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden select-none bg-[#08080A]"
    >
      {/* Background Interactive WebGL Light Tunnel */}
      <div className="absolute inset-0 z-0 pointer-events-auto overflow-hidden">
        <LightTunnel
          cableColor="#888899"
          pulseColor="#ffffff"
          tunnelColor="#000000"
          tunnelOpacity={0}
          cableCount={36}
          pulseDensity={0.4}
          speed={0.12}
          flowDirection="inward"
          mouseInteraction={true}
          mouseStrength={0.12}
          clickSurge={false}
          fadeNear={0.35}
          fadeFar={2.0}
          glow={1.0}
          dpr={1}
        />
        {/* Subtle radial vignette to soften tunnel edges and guarantee high text contrast */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(8, 8, 10, 0.4) 0%, rgba(8, 8, 10, 0.75) 70%, #08080A 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Main Split Grid: Hero 1 Pattern (Left Content + Right Product Preview) */}
      <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        {/* Left Column: Value Proposition & CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start text-left gap-6 pointer-events-none">
          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs shadow-sm hover:border-white/20 transition-all pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <ShinyText className="text-xs font-mono font-medium">
              FORMA 2.0 &bull; Autonomous Web Agent
            </ShinyText>
            <span className="text-neutral-500">&bull;</span>
            <span className="text-[11px] text-neutral-400">Production Ready</span>
          </div>

          {/* Primary Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold font-display tracking-tight text-white leading-[1.12]">
            From your ideas <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
              to a website that works.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed max-w-lg">
            Describe what you want to build. Forma turns your ideas into a fully responsive website you can preview, refine, and deploy in minutes.
          </p>

          {/* Dual Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2 pointer-events-auto w-full sm:w-auto">
            <Link
              to={targetRegisterUrl}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-white text-neutral-950 hover:bg-neutral-100 active:scale-98 transition-all shadow-xl shadow-white/10 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-neutral-900" />
              <span>Start Building Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#tech-stack"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium border border-white/15 bg-white/5 hover:bg-white/10 text-white backdrop-blur-md transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4 text-neutral-400" />
              <span>Explore Tech Stack</span>
            </a>
          </div>

          {/* Social Proof & Trust Strip */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6 pointer-events-auto">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-400 text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                ))}
              </div>
              <span className="text-xs font-semibold text-white">4.9/5</span>
              <span className="text-xs text-neutral-400 font-sans">by creators</span>
            </div>

            <span className="hidden sm:inline-block text-neutral-600">&bull;</span>

            {/* Zero Layout Shift metric */}
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Type-Safe Code</span>
            </div>
          </div>
        </div>

        {/* Right Column: Prominent Product Preview (Prompt + Website Interface) */}
        <div className="lg:col-span-6 w-full flex flex-col gap-4 pointer-events-auto">
          {/* Floating Prompt Bar Badge */}
          <div className="w-full rounded-2xl bg-[#0F0F14]/90 border border-white/15 p-4 sm:p-4.5 shadow-xl backdrop-blur-xl flex items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                  Input Prompt
                </span>
                <p className="text-xs sm:text-sm text-white font-medium truncate max-w-[280px] sm:max-w-[340px]">
                  &ldquo;Nordic architecture studio with dark portfolio and case study grid&rdquo;
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-mono bg-white/10 text-emerald-400 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>AST 0.8s</span>
            </div>
          </div>

          {/* Browser Chrome Product Preview Window */}
          <div className="w-full rounded-2xl border border-white/15 bg-[#0C0C10] shadow-2xl overflow-hidden flex flex-col">
            {/* Window Chrome Header Bar */}
            <div className="px-5 py-3.5 bg-[#121217] border-b border-white/10 flex items-center justify-between gap-3 select-none">
              {/* Window Dots & URL */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-neutral-400 font-mono">
                  <Lock className="w-2.5 h-2.5 text-neutral-400" />
                  <span>forma.build/studio-nord</span>
                </div>
              </div>

              {/* Viewport Width Controls */}
              <div className="flex items-center gap-1.5 text-neutral-400">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    previewDevice === 'desktop' ? 'bg-white/15 text-white' : 'hover:text-white'
                  }`}
                  title="Desktop Preview"
                >
                  <Laptop className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('tablet')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    previewDevice === 'tablet' ? 'bg-white/15 text-white' : 'hover:text-white'
                  }`}
                  title="Tablet Preview"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    previewDevice === 'mobile' ? 'bg-white/15 text-white' : 'hover:text-white'
                  }`}
                  title="Mobile Preview"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Generated Website Visual Canvas */}
            <div className="p-6 sm:p-7 bg-[#08080B] min-h-[290px] sm:min-h-[310px] flex flex-col justify-between transition-all">
              {/* Mini Site Header */}
              <div className="w-full flex items-center justify-between border-b border-white/10 pb-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-white text-black font-bold text-[10px] flex items-center justify-center font-display">
                    N
                  </div>
                  <span className="text-xs font-bold font-display tracking-tight text-white">
                    NORD ARCHITECTS
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-neutral-400">
                  <span className="text-white font-medium">Work</span>
                  <span>Studio</span>
                  <span>Contact</span>
                </div>
              </div>

              {/* Mini Site Hero */}
              <div className="flex flex-col gap-2 py-4 text-left">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                  Architecture &bull; Spatial Design
                </span>
                <h3 className="text-base sm:text-lg font-bold font-display text-white tracking-tight leading-snug">
                  Structures defined by light, landscape, and restraint.
                </h3>
                <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                  Crafting carbon-neutral monolithic residences and cultural spaces across Scandinavia.
                </p>
              </div>

              {/* Mini Site Project Cards Grid */}
              <div
                className={`grid gap-3 transition-all ${
                  previewDevice === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'
                }`}
              >
                {/* Project 1 */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between gap-2.5 text-left group hover:border-white/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">Residences</span>
                    <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Fjord Pavilion</h4>
                    <p className="text-[10px] text-neutral-400">Bergen, Norway &bull; 2026</p>
                  </div>
                </div>

                {/* Project 2 */}
                {previewDevice !== 'mobile' && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between gap-2.5 text-left group hover:border-white/20 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">Cultural</span>
                      <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">Atelier Glasshouse</h4>
                      <p className="text-[10px] text-neutral-400">Stockholm, SE &bull; 2026</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Live Code Callout Footer */}
              <div className="pt-3.5 mt-3.5 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                <span>Tailwind CSS v4 &bull; React 19</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Ready to deploy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
