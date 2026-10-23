import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShinyText } from '../motion/ShinyText'
import { SpotlightCard } from '../motion/SpotlightCard'
import { TrueFocus } from '../motion/TrueFocus'
import { Dock } from '../motion/Dock'
import {
  Sparkles,
  Folder,
  FileCode,
  Terminal,
  Settings,
  ArrowRight,
  Copy,
  Check,
} from 'lucide-react'

export const ComponentLibraryShowcase = () => {
  const [activeTab, setActiveTab] = useState('shiny')
  const [copiedCode, setCopiedCode] = useState(null)

  const dockItems = [
    { icon: <Terminal className="w-4 h-4" />, label: 'Terminal', onClick: () => {} },
    { icon: <FileCode className="w-4 h-4" />, label: 'React Code', onClick: () => {} },
    { icon: <Folder className="w-4 h-4" />, label: 'File Explorer', onClick: () => {} },
    { icon: <Sparkles className="w-4 h-4" />, label: 'AI Agent', onClick: () => {} },
    { icon: <Settings className="w-4 h-4" />, label: 'Settings', onClick: () => {} },
  ]

  const components = [
    {
      id: 'shiny',
      label: 'ShinyText',
      category: 'Text Animation',
      description: 'Continuous linear gradient shimmer sweep with GPU-accelerated subpixel rendering.',
      code: '<ShinyText baseColor="rgba(255,255,255,0.4)" shimmerColor="#ffffff">Give thought its form</ShinyText>',
      tokens: 'speed: 3.5s • cubic-bezier(0.16, 1, 0.3, 1)',
    },
    {
      id: 'spotlight',
      label: 'SpotlightCard',
      category: 'UI & Surface',
      description: 'Dynamic cursor-following radial gradient illumination that responds to mouse coordinates.',
      code: '<SpotlightCard spotlightColor="rgba(255,255,255,0.12)">Content</SpotlightCard>',
      tokens: 'radius: 350px • falloff: linear-to-transparent',
    },
    {
      id: 'truefocus',
      label: 'TrueFocus',
      category: 'Interactive Focus',
      description: 'Spring-physics bounding box that tracks hover focus across individual words.',
      code: '<TrueFocus sentence="Autonomous Website Builder" glowColor="#ff6326" />',
      tokens: 'stiffness: 300 • damping: 25 • glow: #ff6326',
    },
    {
      id: 'dock',
      label: 'Magnification Dock',
      category: 'Navigation',
      description: 'macOS-inspired responsive interactive dock with trigonometric scale distortion.',
      code: '<Dock items={dockItems} magnification={1.6} />',
      tokens: 'scale: 1.6x • distance: 120px • ease: spring',
    },
  ]

  const currentComp = components.find((c) => c.id === activeTab) || components[0]

  const handleCopy = (id, code) => {
    setCopiedCode(id)
    navigator.clipboard?.writeText?.(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <section
      id="components"
      className="snap-scroll-section relative min-h-screen flex flex-col justify-center items-center py-24 sm:py-28 lg:py-32 px-6 sm:px-8 lg:px-12 bg-[#08080A] text-white border-t border-white/10 overflow-hidden select-none"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col justify-center gap-6 sm:gap-8 my-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 shrink-0">
          <div className="flex flex-col gap-2 text-left">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-medium text-neutral-400 bg-white/5 border border-white/10 w-fit">
              FORMA DESIGN SYSTEM
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white">
              Production-ready interactive UI components.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed">
              Explore the animated, accessible React components created dynamically by Forma&apos;s autonomous engine.
            </p>
          </div>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all w-fit cursor-pointer shrink-0"
          >
            <span>Start Building</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Component Selector Tabs */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {components.map((comp) => (
            <button
              key={comp.id}
              onClick={() => setActiveTab(comp.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all cursor-pointer ${
                activeTab === comp.id
                  ? 'border-white/30 bg-white text-neutral-950 font-semibold shadow-md'
                  : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:border-white/20'
              }`}
            >
              <span>{comp.label}</span>
            </button>
          ))}
        </div>

        {/* Live Interactive Stage Window */}
        <div className="w-full rounded-3xl border border-white/15 bg-[#0C0C0E] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[360px] sm:min-h-[420px]">
          {/* Left Metadata & Code Panel */}
          <div className="w-full md:w-88 p-6 sm:p-8 bg-[#0A0A0D] border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold font-display text-white">
                  {currentComp.label}
                </span>
                <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-white/10 text-neutral-300">
                  {currentComp.category}
                </span>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {currentComp.description}
              </p>
              <div className="pt-2 text-xs font-mono text-neutral-500">
                {currentComp.tokens}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-500">
                React 19 &bull; Tailwind v4
              </span>
              <button
                onClick={() => handleCopy(currentComp.id, currentComp.code)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                title="Copy JSX Component"
              >
                {copiedCode === currentComp.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="text-xs">Copy JSX</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Live Interactive Playground Canvas */}
          <div className="flex-1 p-8 sm:p-14 flex flex-col items-center justify-center bg-[#070709] relative min-h-[260px]">
            {activeTab === 'shiny' && (
              <div className="flex flex-col items-center text-center gap-2">
                <ShinyText className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display">
                  Give thought its form.
                </ShinyText>
                <p className="text-xs text-neutral-500 font-mono">
                  Autonomous Web Generation Engine &bull; Continuous Shimmer Sweep
                </p>
              </div>
            )}

            {activeTab === 'spotlight' && (
              <SpotlightCard className="w-full max-w-md p-6 bg-black/80 border border-white/15 rounded-2xl flex flex-col items-center justify-center text-center cursor-default min-h-[160px]">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-2">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-semibold text-white">Move cursor across this card</span>
                <span className="text-xs text-neutral-400 mt-1">Real-time radial cursor illumination</span>
              </SpotlightCard>
            )}

            {activeTab === 'truefocus' && (
              <div className="flex flex-col items-center text-center gap-3">
                <TrueFocus sentence="Autonomous Website Builder" glowColor="#ff6326" />
                <span className="text-[11px] text-neutral-500 font-mono">
                  Hover individual words to move focus box
                </span>
              </div>
            )}

            {activeTab === 'dock' && (
              <div className="flex flex-col items-center text-center gap-4 w-full">
                <div className="p-4 rounded-2xl bg-black/60 border border-white/10">
                  <Dock items={dockItems} />
                </div>
                <span className="text-[11px] text-neutral-500 font-mono">
                  Hover icons to experience magnification curve
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
