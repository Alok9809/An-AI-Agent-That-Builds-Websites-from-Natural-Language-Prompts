import React from 'react'
import { InfiniteMarquee } from '../motion/InfiniteMarquee'
import { SpotlightCard } from '../motion/SpotlightCard'
import {
  Sparkles,
  Layers,
  Cpu,
  Flame,
} from 'lucide-react'

export const TechMarqueeSection = () => {
  const row1 = [
    { name: 'React 19', role: 'Concurrent UI Engine', color: 'text-cyan-400' },
    { name: 'Tailwind CSS v4', role: 'JIT Styling Compiler', color: 'text-sky-400' },
    { name: 'Claude 3.5 Sonnet', role: 'Deep AST Reasoning', color: 'text-amber-400' },
    { name: 'Gemini 1.5 Pro', role: 'Multimodal Vision', color: 'text-blue-400' },
    { name: 'FastAPI', role: 'Asynchronous REST Core', color: 'text-emerald-400' },
    { name: 'MongoDB & Motor', role: 'Document Database', color: 'text-green-400' },
    { name: 'Vite 6', role: 'Instant HMR Bundler', color: 'text-purple-400' },
    { name: 'Zod', role: 'Runtime Schema Validation', color: 'text-indigo-400' },
  ]

  const row2 = [
    { name: 'WebGL 2.0', role: 'GPU 3D Shader Pipeline', color: 'text-orange-400' },
    { name: 'GLSL Shaders', role: 'Real-Time Fragment Lighting', color: 'text-yellow-400' },
    { name: 'Argon2id', role: 'OWASP Password Cryptography', color: 'text-rose-400' },
    { name: 'PyJWT', role: 'Stateless Session Tokens', color: 'text-pink-400' },
    { name: 'Motion UI Engine', role: 'Subpixel Physics Curves', color: 'text-teal-400' },
    { name: 'Anycast Edge CDN', role: 'Global Low-Latency TTFB', color: 'text-emerald-400' },
    { name: 'Docker', role: 'Isolated Container Runtime', color: 'text-sky-300' },
    { name: 'Lucide Glyphs', role: 'Accessible Vector Icons', color: 'text-neutral-300' },
  ]

  const pillars = [
    {
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      title: 'Dual-AI Intelligence',
      subtitle: 'Claude 3.5 + Gemini 1.5',
      desc: 'Deep syntactic AST reasoning paired with multimodal layout verification.',
    },
    {
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      title: 'Modern Frontend',
      subtitle: 'React 19 + Tailwind v4',
      desc: 'Zero-runtime CSS box models with concurrent hydration and fluid grids.',
    },
    {
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      title: 'Async Cloud Backend',
      subtitle: 'FastAPI + Motor MongoDB',
      desc: 'High-throughput async event loops with Argon2id cryptographic sessions.',
    },
    {
      icon: <Flame className="w-5 h-5 text-orange-400" />,
      title: 'GPU Shader Motion',
      subtitle: 'WebGL 2.0 + GLSL',
      desc: 'Hardware-accelerated particle tunnels and dynamic radial spotlights.',
    },
  ]

  return (
    <section
      id="tech-stack"
      className="snap-scroll-section relative min-h-screen flex flex-col justify-center items-center py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#08080A] text-white border-t border-white/10 overflow-hidden select-none"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/[0.03] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto flex flex-col justify-center gap-6 sm:gap-8 my-auto relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-2.5 sm:gap-3 shrink-0">
          <span className="px-3.5 py-1 rounded-full text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            ENGINEERED WITH MODERN PRIMITIVES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white">
            The Modern Web Stack, Unified.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed">
            Forma unites frontier AI models, deterministic AST compilers, and hardware-accelerated shaders into an integrated SaaS toolchain.
          </p>
        </div>

        {/* 4 Tech Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 shrink-0">
          {pillars.map((p) => (
            <SpotlightCard
              key={p.title}
              className="p-5 sm:p-6 rounded-2xl bg-[#0C0C0E] border border-white/10 flex flex-col justify-between gap-3 text-left hover:border-white/20 transition-all min-h-[160px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  {p.icon}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold font-display text-white truncate">
                    {p.title}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 truncate">
                    {p.subtitle}
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mt-1">
                {p.desc}
              </p>
            </SpotlightCard>
          ))}
        </div>

        {/* Dual Infinite Marquee Streams */}
        <div className="flex flex-col gap-3 py-4 border-t border-b border-white/10 bg-[#060608]/90 rounded-2xl shadow-xl">
          {/* Row 1: Forward Direction */}
          <InfiniteMarquee speed="28s">
            {row1.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 shrink-0 hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
              >
                <span className={`w-2 h-2 rounded-full ${tech.color} bg-current`} />
                <span className="text-xs sm:text-sm font-semibold text-white font-display tracking-tight">
                  {tech.name}
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  / {tech.role}
                </span>
              </div>
            ))}
          </InfiniteMarquee>

          {/* Row 2: Reverse Direction */}
          <InfiniteMarquee speed="32s" reverse={true}>
            {row2.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 shrink-0 hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
              >
                <span className={`w-2 h-2 rounded-full ${tech.color} bg-current`} />
                <span className="text-xs sm:text-sm font-semibold text-white font-display tracking-tight">
                  {tech.name}
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  / {tech.role}
                </span>
              </div>
            ))}
          </InfiniteMarquee>
        </div>
      </div>
    </section>
  )
}
