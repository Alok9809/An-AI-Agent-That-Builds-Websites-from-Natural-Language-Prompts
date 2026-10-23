import React from 'react'
import { SpotlightCard } from '../motion/SpotlightCard'
import {
  Cpu,
  Layers,
  Smartphone,
  ShieldCheck,
  Globe,
  Sparkles,
} from 'lucide-react'

export const BentoGridSection = () => {
  return (
    <section
      id="features"
      className="snap-scroll-section relative min-h-screen flex flex-col justify-center items-center py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#08080A] text-white border-t border-white/10 overflow-hidden select-none"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col justify-center gap-6 sm:gap-8 my-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-2.5 sm:gap-3 shrink-0">
          <span className="px-3.5 py-1 rounded-full text-xs font-mono font-medium text-neutral-400 bg-white/5 border border-white/10">
            SYSTEM ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white">
            Engineered for perfection.{' '}
            <span className="text-neutral-500">Not generic templates.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed">
            Every website created with Forma is dynamically generated from raw components and design tokens tailored to your exact prompt.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Bento Card 1: Main Autonomous AST Engine (2 cols) */}
          <SpotlightCard className="md:col-span-2 flex flex-col justify-between gap-5 p-6 sm:p-8 min-h-[220px] sm:min-h-[250px] rounded-2xl">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                  Autonomous AST Reasoning Engine
                </h3>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-xl">
                Forma doesn&apos;t just spit out markdown snippets. Our agent parses layout structure, verifies CSS box-models, and optimizes responsive grids in an integrated sandbox before rendering.
              </p>
            </div>

            {/* Micro Graphic: Simulated AST flow */}
            <div className="py-2.5 px-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-neutral-300 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Prompt: &ldquo;Design studio site with dark theme&rdquo;</span>
              </div>
              <span className="text-emerald-400 font-medium">AST Validated &bull; 0.9s</span>
            </div>
          </SpotlightCard>

          {/* Bento Card 2: Curated Design Tokens */}
          <SpotlightCard className="flex flex-col justify-between gap-5 p-6 sm:p-8 min-h-[220px] sm:min-h-[250px] rounded-2xl">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                  Curated Design Harmony
                </h3>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Color palettes, fluid type scales, and micro-spacing computed using mathematical proportions for a bespoke studio finish.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#08080A] border border-white/20" />
              <span className="w-6 h-6 rounded-lg bg-[#18181B] border border-white/20" />
              <span className="w-6 h-6 rounded-lg bg-[#ff6326] border border-white/20" />
              <span className="w-6 h-6 rounded-lg bg-white border border-white/20" />
              <span className="text-xs font-mono text-neutral-400 ml-2">Harmonic scale</span>
            </div>
          </SpotlightCard>

          {/* Bento Card 3: Multi-Breakpoint Fluidity */}
          <SpotlightCard className="flex flex-col justify-between gap-4 p-6 sm:p-7 min-h-[190px] sm:min-h-[210px] rounded-2xl">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                  <Smartphone className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold font-display text-white">
                  Fluid Responsive Grids
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Every generated page is tested across Mobile (375px), Tablet (768px), and Ultrawide displays with zero horizontal overflow.
              </p>
            </div>

            <div className="text-xs font-mono text-emerald-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>375px &bull; 768px &bull; 1440px Validated</span>
            </div>
          </SpotlightCard>

          {/* Bento Card 4: Global Edge Deployment */}
          <SpotlightCard className="flex flex-col justify-between gap-4 p-6 sm:p-7 min-h-[190px] sm:min-h-[210px] rounded-2xl">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold font-display text-white">
                  Instant Edge CDN
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Publish your generated website with one click. Automatic SSL certificates, global anycast routing, and custom domains.
              </p>
            </div>

            <div className="text-xs font-mono text-neutral-400">
              <span>Avg global TTFB: <strong className="text-white font-semibold">18ms</strong></span>
            </div>
          </SpotlightCard>

          {/* Bento Card 5: Production Security & Auth */}
          <SpotlightCard className="flex flex-col justify-between gap-4 p-6 sm:p-7 min-h-[190px] sm:min-h-[210px] rounded-2xl">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold font-display text-white">
                  Production-Minded Security
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Built-in session revocation, HttpOnly secure cookies, CSRF protection, and real-time password criteria validation.
              </p>
            </div>

            <div className="text-xs font-mono text-emerald-400">
              <span>OWASP Level 2 Compliant</span>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  )
}
