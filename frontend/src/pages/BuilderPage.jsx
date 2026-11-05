import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { FormaLogo } from '../components/ui/FormaLogo'
import { Button } from '../components/ui/Button'
import { ArrowLeft, Sparkles, Monitor, Smartphone, Tablet, Code2, Play } from 'lucide-react'

export const BuilderPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const prompt = searchParams.get('prompt') || 'Blank Canvas Project'
  const projectId = searchParams.get('project') || 'new'

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-[#fbf9f5] flex flex-col font-sans">
      {/* Builder Top Bar */}
      <header className="w-full border-b border-[rgba(244,240,232,0.08)] bg-[#0c0c10]/90 backdrop-blur-md px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="border-[rgba(244,240,232,0.12)] text-[#9c978e] hover:text-white text-xs h-8 px-2.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Dashboard</span>
          </Button>
          <div className="h-4 w-px bg-white/10 hidden sm:block" />
          <FormaLogo size="sm" showBadge={true} variant="dark" />
        </div>

        {/* Viewport Toggles */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-[#14141a] border border-[rgba(244,240,232,0.06)]">
          <button className="p-1.5 rounded-lg bg-[#ff6326]/20 text-[#ff6326]">
            <Monitor className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg text-[#9c978e] hover:text-white">
            <Tablet className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg text-[#9c978e] hover:text-white">
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#14141a] border border-[rgba(244,240,232,0.06)] text-[11px] font-mono text-[#9c978e]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>CANVAS READY</span>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="bg-[#ff6326] hover:bg-[#ff7a45] text-white text-xs h-8 px-3 cursor-pointer"
          >
            <Play className="w-3 h-3 mr-1 fill-current" />
            <span>Deploy</span>
          </Button>
        </div>
      </header>

      {/* Main Canvas Workspace */}
      <main className="flex-1 flex flex-col p-4 sm:p-6 max-w-7xl w-full mx-auto gap-4">
        {/* Active Prompt Banner */}
        <div className="p-4 rounded-xl bg-[#0f0f14] border border-[rgba(244,240,232,0.08)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ff6326]/10 border border-[#ff6326]/30 flex items-center justify-center text-[#ff6326] flex-shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-[#ff6326] uppercase tracking-wider">
                Active Prompt
              </span>
              <p className="text-xs sm:text-sm text-[#fbf9f5] font-medium leading-relaxed">
                &ldquo;{prompt}&rdquo;
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-[#635f58] self-end sm:self-auto">
            ID: {projectId}
          </span>
        </div>

        {/* Canvas Visual Mock Area */}
        <div className="flex-1 min-h-[460px] rounded-2xl bg-[#0b0b0e] border border-[rgba(244,240,232,0.1)] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,99,38,0.05)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 max-w-md flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#14141a] border border-[#ff6326]/30 flex items-center justify-center text-[#ff6326] shadow-xl animate-float">
              <Code2 className="w-8 h-8" />
            </div>

            <div className="flex flex-col gap-1.5">
              <h2 className="text-xl font-bold font-display text-white">Visual Canvas Engine</h2>
              <p className="text-xs text-[#9c978e] leading-relaxed">
                The visual code generation stream is ready. Real-time DOM editing, component inspection, and LLM synthesis are enabled.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="mt-2 text-xs border-[rgba(244,240,232,0.15)] text-[#fbf9f5] cursor-pointer"
            >
              Return to Project Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
