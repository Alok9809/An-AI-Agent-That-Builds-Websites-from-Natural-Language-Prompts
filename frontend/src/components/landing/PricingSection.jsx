import React from 'react'
import { Link } from 'react-router-dom'
import { Check, Sparkles, ArrowRight } from 'lucide-react'
import { SpotlightCard } from '../motion/SpotlightCard'

export const PricingSection = () => {
  const features = [
    'Unlimited AI website generations',
    'Deterministic AST code compilation',
    'Full React 19 & Tailwind CSS export',
    'Multi-device responsive preview (Desktop, Tablet, Mobile)',
    'Instant forma.build subdomain hosting',
    'Direct code copy and export with zero lock-in',
  ]

  return (
    <section
      id="pricing"
      className="snap-scroll-section relative min-h-screen flex flex-col justify-center items-center py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 bg-[#08080A] text-white overflow-hidden select-none"
    >
      <div className="max-w-4xl w-full mx-auto flex flex-col items-center justify-center gap-8 sm:gap-10 my-auto text-center">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-2.5 sm:gap-3 shrink-0">
          <span className="px-3.5 py-1 rounded-full text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            100% FREE ACCESS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white">
            Start building for $0.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed">
            No credit card required, no subscriptions. Everything you need to turn natural language into production websites.
          </p>
        </div>

        {/* Single Starter Plan Card */}
        <div className="w-full max-w-2xl mx-auto">
          <SpotlightCard className="p-7 sm:p-9 rounded-3xl bg-[#0D0D10] border border-white/20 shadow-2xl relative text-left flex flex-col gap-6 sm:gap-8">
            {/* Top row: Plan Name + Free Forever Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  Community Edition
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">Starter Plan</h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 w-fit">
                FREE FOREVER
              </span>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-2 pb-4 border-b border-white/10">
              <span className="text-5xl sm:text-6xl font-extrabold font-display text-white tracking-tight">
                $0
              </span>
              <span className="text-sm sm:text-base text-neutral-400 font-mono">/ forever &bull; no card needed</span>
            </div>

            {/* Included Features Grid */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-medium">
                Everything Included:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 pt-1">
                {features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-sm font-semibold bg-white text-neutral-950 hover:bg-neutral-100 active:scale-98 transition-all shadow-xl shadow-white/10 cursor-pointer text-center"
              >
                <Sparkles className="w-4 h-4 text-neutral-900" />
                <span>Start Building Free Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-xs text-neutral-500 font-mono text-center sm:text-right shrink-0">
                Instant access in &lt; 30 seconds
              </span>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  )
}
