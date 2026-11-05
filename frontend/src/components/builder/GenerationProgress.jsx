import React, { useState, useEffect, useRef } from 'react'
import {
  Check,
  Loader2,
  Terminal,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
} from 'lucide-react'

export const GENERATION_PHASES = [
  {
    step: 1,
    title: 'Analyzing Prompt',
    desc: 'Extracting user intent, semantic structure, and component hierarchy',
  },
  {
    step: 2,
    title: 'Designing Architecture & Color Palette',
    desc: 'Synthesizing responsive tokens, typography, and dark obsidian palette',
  },
  {
    step: 3,
    title: 'Generating HTML/CSS/Tailwind',
    desc: 'Writing semantic markup, layout flexbox/grid, and Tailwind classes',
  },
  {
    step: 4,
    title: 'Final Polish & Interactivity',
    desc: 'Injecting event listeners, micro-interactions, and a11y ARIA attributes',
  },
]

const DEFAULT_LOGS_BY_STEP = {
  1: [
    '[AI Agent]: Received natural language input stream.',
    '[AI Agent]: Parsing semantic tokens and core layout requirements.',
    '[AI Agent]: Identified target domain: Responsive dark web application.',
  ],
  2: [
    '[Design Engine]: Resolving color palette: Obsidian (#09090b), Flame (#ff6326), Slate (#9c978e).',
    '[Design Engine]: Configuring Plus Jakarta Sans & Space Grotesk font hierarchy.',
    '[Design Engine]: Designing responsive grid breakages for Desktop, Tablet, and Mobile.',
  ],
  3: [
    '[Code Generator]: Synthesizing HTML5 semantic document tree.',
    '[Code Generator]: Building navbar with brand logo, links, and action buttons.',
    '[Code Generator]: Writing hero section with prompt headline and CTA badges.',
    '[Code Generator]: Injecting feature card grid with hover transitions.',
  ],
  4: [
    '[DOM Polisher]: Binding interactive JavaScript event handlers.',
    '[DOM Polisher]: Injecting accessibility tags (ARIA roles, focus states).',
    '[Compiler]: Compiling final bundle and mounting to live canvas preview.',
    '[Success]: Generation completed with 0 errors.',
  ],
}

export const GenerationProgress = ({
  currentStep = 1,
  status = 'generating', // 'idle' | 'generating' | 'completed' | 'error'
  progress = 0,
  logs,
  className = '',
}) => {
  const [showTerminal, setShowTerminal] = useState(false)
  const [copied, setCopied] = useState(false)
  const terminalRef = useRef(null)

  // Accumulate logs based on currentStep if no external logs passed
  const activeLogs = logs || [
    ...(DEFAULT_LOGS_BY_STEP[1] || []),
    ...(currentStep >= 2 ? DEFAULT_LOGS_BY_STEP[2] || [] : []),
    ...(currentStep >= 3 ? DEFAULT_LOGS_BY_STEP[3] || [] : []),
    ...(currentStep >= 4 ? DEFAULT_LOGS_BY_STEP[4] || [] : []),
  ]

  // Auto-scroll terminal when new logs arrive
  useEffect(() => {
    if (showTerminal && terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [showTerminal, activeLogs.length])

  // Copy logs handler
  const handleCopyLogs = () => {
    navigator.clipboard?.writeText(activeLogs.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Calculate percentage if not provided
  const calculatedPercent =
    progress > 0
      ? progress
      : status === 'completed'
      ? 100
      : Math.min(Math.round(((currentStep - 0.5) / 4) * 100), 95)

  return (
    <div
      className={`w-full rounded-2xl bg-[#0f0f14] border border-[rgba(244,240,232,0.1)] p-4 sm:p-6 shadow-xl flex flex-col gap-5 text-left font-sans ${className}`}
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[rgba(244,240,232,0.06)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#ff6326]/10 border border-[#ff6326]/30 flex items-center justify-center text-[#ff6326]">
            {status === 'completed' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : status === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400" />
            ) : (
              <Sparkles className="w-4 h-4 animate-pulse" />
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm sm:text-base font-bold text-white font-display">
              {status === 'completed'
                ? 'Website Generation Complete'
                : status === 'error'
                ? 'Generation Interrupted'
                : 'FORMA Agent Generation Stream'}
            </h3>
            <span className="text-[11px] text-[#9c978e]">
              Phase {Math.min(currentStep, 4)} of 4 &bull;{' '}
              {status === 'completed' ? 'All assets compiled' : 'Autonomous AI agent active'}
            </span>
          </div>
        </div>

        {/* Live Terminal Drawer Toggle Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowTerminal(!showTerminal)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#14141a] hover:bg-[#1c1c24] border border-[rgba(244,240,232,0.08)] text-xs text-[#dcd7ce] hover:text-white transition-all cursor-pointer shadow-xs"
            aria-expanded={showTerminal}
            aria-label="Toggle live agent terminal logs"
          >
            <Terminal className="w-3.5 h-3.5 text-[#ff6326]" />
            <span className="font-semibold text-[11px] sm:text-xs">
              {showTerminal ? 'Hide Terminal' : 'Live Logs'}
            </span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-[#ff6326]/20 text-[#ff6326]">
              {activeLogs.length}
            </span>
            {showTerminal ? <ChevronUp className="w-3 h-3 text-[#9c978e]" /> : <ChevronDown className="w-3 h-3 text-[#9c978e]" />}
          </button>
        </div>
      </div>

      {/* Visual Stepper Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {GENERATION_PHASES.map((phase) => {
          const isDone = currentStep > phase.step || status === 'completed'
          const isCurrent = currentStep === phase.step && status !== 'completed'

          return (
            <div
              key={phase.step}
              className={`p-3.5 rounded-xl border transition-all duration-300 flex flex-col gap-2 relative overflow-hidden ${
                isCurrent
                  ? 'bg-[#181820] border-[#ff6326]/50 shadow-lg shadow-[#ff6326]/10 ring-1 ring-[#ff6326]/30'
                  : isDone
                  ? 'bg-[#121217] border-emerald-500/20'
                  : 'bg-[#0d0d10] border-[rgba(244,240,232,0.05)] opacity-60'
              }`}
            >
              {/* Top Step Row */}
              <div className="flex items-center justify-between">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold font-mono transition-all ${
                    isDone
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : isCurrent
                      ? 'bg-[#ff6326] text-white shadow-sm'
                      : 'bg-[#1a1a22] text-[#635f58] border border-white/5'
                  }`}
                >
                  {isDone ? (
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : isCurrent ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    phase.step
                  )}
                </div>

                <span
                  className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                    isDone
                      ? 'text-emerald-400'
                      : isCurrent
                      ? 'text-[#ff6326]'
                      : 'text-[#635f58]'
                  }`}
                >
                  {isDone ? 'Done' : isCurrent ? 'Running...' : 'Pending'}
                </span>
              </div>

              {/* Title & Desc */}
              <div className="flex flex-col">
                <h4
                  className={`text-xs font-bold font-display ${
                    isCurrent ? 'text-white' : isDone ? 'text-neutral-200' : 'text-neutral-400'
                  }`}
                >
                  {phase.title}
                </h4>
                <p className="text-[11px] text-[#9c978e] leading-snug mt-1">
                  {phase.desc}
                </p>
              </div>

              {/* Bottom Glowing Bar for current phase */}
              {isCurrent && (
                <div className="w-full h-1 bg-[#ff6326]/20 rounded-full overflow-hidden mt-1">
                  <div className="h-full bg-[#ff6326] rounded-full animate-pulse w-3/4" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Overall Progress Bar */}
      <div className="flex flex-col gap-1.5 pt-1">
        <div className="flex items-center justify-between text-xs text-[#9c978e]">
          <span>Overall Synthesis Progress</span>
          <span className="font-mono font-semibold text-white">{calculatedPercent}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-[#14141a] border border-[rgba(244,240,232,0.06)] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#ff6326] to-[#ff7a45] rounded-full transition-all duration-500"
            style={{ width: `${calculatedPercent}%` }}
          />
        </div>
      </div>

      {/* Terminal Drawer (Collapsible) */}
      {showTerminal && (
        <div className="w-full rounded-xl bg-[#09090b] border border-[rgba(244,240,232,0.1)] overflow-hidden shadow-2xl animate-fadeIn">
          {/* Terminal Title Bar */}
          <div className="px-4 py-2 bg-[#101015] border-b border-[rgba(244,240,232,0.06)] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-[11px] text-[#9c978e]">
                agent-process.log &bull; FORMA LIVE STREAM
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyLogs}
              className="flex items-center gap-1 text-[11px] font-mono text-[#9c978e] hover:text-white transition-colors cursor-pointer"
            >
              <Copy className="w-3 h-3" />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          {/* Terminal Console Output */}
          <div
            ref={terminalRef}
            className="p-4 max-h-52 overflow-y-auto font-mono text-xs text-[#dcd7ce] leading-relaxed flex flex-col gap-1.5 scrollbar-thin"
          >
            {activeLogs.map((log, index) => {
              const isAiAgent = log.includes('[AI Agent]')
              const isDesign = log.includes('[Design Engine]')
              const isCode = log.includes('[Code Generator]')
              const isSuccess = log.includes('[Success]')

              return (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-[#635f58] select-none">&gt;</span>
                  <span
                    className={
                      isSuccess
                        ? 'text-emerald-400 font-semibold'
                        : isCode
                        ? 'text-[#ff6326]'
                        : isDesign
                        ? 'text-amber-300'
                        : isAiAgent
                        ? 'text-cyan-400'
                        : 'text-[#dcd7ce]'
                    }
                  >
                    {log}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
