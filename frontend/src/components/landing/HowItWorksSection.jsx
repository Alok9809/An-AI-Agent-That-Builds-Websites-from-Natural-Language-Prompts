import React from 'react'
import { SpotlightCard } from '../motion/SpotlightCard'
import { MessageSquareCode, Cpu, Rocket, ArrowRight } from 'lucide-react'

export const HowItWorksSection = () => {
  const steps = [
    {
      number: '01',
      icon: <MessageSquareCode className="w-5 h-5 text-white" />,
      title: 'Describe Your Vision',
      tagline: 'Natural Language Prompting',
      description:
        'Tell Forma what you want to build—from an architectural portfolio to a high-converting SaaS landing page. Define your style, target audience, and key sections in plain English.',
      detailPill: 'Zero design tools required',
      badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    },
    {
      number: '02',
      icon: <Cpu className="w-5 h-5 text-white" />,
      title: 'Autonomous AST Synthesis',
      tagline: 'Deterministic Code Assembly',
      description:
        'Our reasoning engine plans the layout hierarchy, compiles responsive CSS box-models, and binds accessible interactive components into a unified Abstract Syntax Tree.',
      detailPill: 'Validated Tailwind & React 19',
      badgeColor: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    },
    {
      number: '03',
      icon: <Rocket className="w-5 h-5 text-white" />,
      title: 'Preview, Iterate & Export',
      tagline: 'Production-Ready Delivery',
      description:
        'Test your generated website across desktop, tablet, and mobile breakpoints. Fine-tune with follow-up prompts, copy clean modular JSX, or deploy directly to the edge.',
      detailPill: 'One-click global CDN hosting',
      badgeColor: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    },
  ]

  return (
    <section
      id="how-it-works"
      className="snap-scroll-section relative min-h-screen flex flex-col justify-center items-center py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#08080A] text-white border-t border-white/10 overflow-hidden select-none"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col justify-center gap-6 sm:gap-8 my-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-2.5 sm:gap-3 shrink-0">
          <span className="px-3.5 py-1 rounded-full text-xs font-mono font-medium text-neutral-400 bg-white/5 border border-white/10">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white">
            From raw thought to live website in 3 steps.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed">
            See how Forma translates natural language prompts into clean, production-grade web applications.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {steps.map((step, idx) => (
            <SpotlightCard
              key={step.number}
              className="flex flex-col justify-between gap-5 p-6 sm:p-8 bg-[#0C0C0E] border border-white/10 rounded-2xl relative group hover:border-white/25 transition-all min-h-[290px] sm:min-h-[320px]"
            >
              <div className="flex flex-col gap-4">
                {/* Step Top Bar: Icon + Step Number */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shadow-sm shrink-0">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-extrabold font-mono text-white/20 group-hover:text-white/40 transition-colors">
                    {step.number}
                  </span>
                </div>

                {/* Step Title & Tagline */}
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    {step.tagline}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Bottom Feature Pill & Step Connection Indicator */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className={`px-3 py-1 rounded-lg text-xs font-mono border ${step.badgeColor}`}>
                  {step.detailPill}
                </span>

                {idx < 2 && (
                  <div className="hidden md:flex items-center text-neutral-600 group-hover:text-neutral-400 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
