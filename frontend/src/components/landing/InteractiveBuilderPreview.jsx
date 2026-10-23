import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Laptop,
  Tablet,
  Smartphone,
  Code2,
  Eye,
  Palette,
  Sparkles,
  Check,
  Copy,
  RefreshCw,
  Lock,
  ArrowRight,
} from 'lucide-react'

export const InteractiveBuilderPreview = ({ activePrompt }) => {
  const navigate = useNavigate()
  const [device, setDevice] = useState('desktop') // 'desktop' | 'tablet' | 'mobile'
  const [viewMode, setViewMode] = useState('preview') // 'preview' | 'code' | 'tokens'
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState(null)
  const [copied, setCopied] = useState(false)
  const [customInput, setCustomInput] = useState('')

  const handleStartInWorkspace = () => {
    const promptText = customInput || activePrompt?.prompt || ''
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('forma_pending_prompt', promptText)
    }
    navigate(`/register?prompt=${encodeURIComponent(promptText)}`)
  }

  const handleGenerate = () => {
    const promptText = customInput || activePrompt?.prompt || ''
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('forma_pending_prompt', promptText)
    }
    setIsGenerating(true)
    setGenerationStep('Analyzing prompt requirements...')

    setTimeout(() => {
      setGenerationStep('Synthesizing design tokens & typography...')
    }, 400)

    setTimeout(() => {
      setGenerationStep('Assembling React components & Tailwind styles...')
    }, 800)

    setTimeout(() => {
      setGenerationStep('Validating responsive breakpoints...')
    }, 1200)

    setTimeout(() => {
      setIsGenerating(false)
      setGenerationStep(null)
    }, 1600)
  }

  const copyCode = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getDeviceWidth = () => {
    switch (device) {
      case 'mobile':
        return 'max-w-[375px]'
      case 'tablet':
        return 'max-w-[720px]'
      default:
        return 'w-full'
    }
  }

  return (
    <section id="demo" className="relative py-16 px-4 sm:px-6 bg-[#08080A] text-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-medium text-neutral-400 bg-white/5 border border-white/10">
            INTERACTIVE AI STUDIO
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white">
            See Forma build a website live.
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl">
            Choose a preset or type a custom prompt. Watch our reasoning agent craft clean code and live UI.
          </p>
        </div>

        {/* Prompt Input Box */}
        <div className="w-full max-w-3xl mx-auto rounded-2xl border border-white/15 bg-neutral-900/90 p-2 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center gap-2">
          <div className="flex-1 flex items-center gap-2.5 px-3 py-2 w-full">
            <Sparkles className="w-4 h-4 text-neutral-400 shrink-0" />
            <input
              type="text"
              value={customInput || activePrompt?.prompt || ''}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="e.g. Build an architectural studio website with projects grid..."
              className="w-full bg-transparent text-sm text-white placeholder:text-neutral-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white text-neutral-950 hover:bg-neutral-200 active:scale-95 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleStartInWorkspace}
              className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/15 flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
              title="Start with this prompt in Forma"
            >
              <span>Build Live</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* AI Generating Indicator */}
        {isGenerating && (
          <div className="w-full max-w-md mx-auto p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 flex items-center gap-3 animate-fadeIn">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono">{generationStep}</span>
          </div>
        )}

        {/* Browser Chrome Canvas Window */}
        <div className="w-full rounded-2xl border border-white/15 bg-[#0C0C0E] shadow-2xl overflow-hidden flex flex-col">
          {/* Top Window Bar Controls */}
          <div className="px-4 py-3 bg-[#111114] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 select-none">
            {/* macOS Window Dots & URL Pill */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-neutral-400 font-mono">
                <Lock className="w-3 h-3 text-neutral-400" />
                <span>forma.build/{activePrompt?.id || 'architect'}-live</span>
              </div>
            </div>

            {/* View Switchers (Preview, Code, Tokens) */}
            <div className="flex items-center p-0.5 rounded-lg bg-black/40 border border-white/10 text-xs">
              <button
                onClick={() => setViewMode('preview')}
                className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'preview' ? 'bg-white/15 text-white font-medium' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>
              <button
                onClick={() => setViewMode('code')}
                className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'code' ? 'bg-white/15 text-white font-medium' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>React Code</span>
              </button>
              <button
                onClick={() => setViewMode('tokens')}
                className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'tokens' ? 'bg-white/15 text-white font-medium' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Tokens</span>
              </button>
            </div>

            {/* Responsive Viewport Switcher */}
            <div className="flex items-center gap-1 text-neutral-400">
              <button
                onClick={() => setDevice('desktop')}
                title="Desktop View (100%)"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  device === 'desktop' ? 'bg-white/15 text-white' : 'hover:text-white'
                }`}
              >
                <Laptop className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevice('tablet')}
                title="Tablet View (768px)"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  device === 'tablet' ? 'bg-white/15 text-white' : 'hover:text-white'
                }`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevice('mobile')}
                title="Mobile View (375px)"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  device === 'mobile' ? 'bg-white/15 text-white' : 'hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Window Interior Content */}
          <div className="p-4 sm:p-8 bg-[#070709] min-h-[460px] flex items-center justify-center overflow-x-auto">
            {viewMode === 'preview' && (
              <div
                className={`transition-all duration-300 mx-auto rounded-xl border border-white/10 bg-neutral-950 p-6 overflow-hidden ${getDeviceWidth()} shadow-2xl`}
              >
                {/* Simulated Generated Website Inside Preview */}
                {(!activePrompt || activePrompt?.id === 'architect') && (
                  <div className="flex flex-col gap-6 text-left">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="font-bold tracking-widest font-display text-white text-sm">
                        KINETIC &bull; ARCHITECTURE
                      </span>
                      <div className="flex gap-4 text-xs text-neutral-400">
                        <span className="text-white">Selected Works</span>
                        <span>Monographs</span>
                        <span>Studio</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                      <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider">
                        Design Principle / 01
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                        Structures composed from sunlight and brutalist concrete.
                      </h3>
                      <p className="text-xs text-neutral-400 leading-relaxed max-w-lg">
                        Transforming urban typologies into serene spatial experiences with monolithic geometry and raw materiality.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-3">
                        <div className="h-28 rounded-lg bg-neutral-800 flex items-center justify-center text-xs text-neutral-500 font-mono">
                          [Pavilion Osaka &bull; 2026]
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-medium text-white">Cantilevered Pavilions</span>
                          <span className="text-neutral-500 font-mono">Kyoto</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-3">
                        <div className="h-28 rounded-lg bg-neutral-800 flex items-center justify-center text-xs text-neutral-500 font-mono">
                          [Atrium Residence &bull; 2025]
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-medium text-white">Subterranean Lightwell</span>
                          <span className="text-neutral-500 font-mono">Zurich</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activePrompt?.id === 'saas' && (
                  <div className="flex flex-col gap-6 text-left">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-400" />
                        <span className="font-bold font-display text-white text-sm">PULSE CLOUD</span>
                      </div>
                      <span className="text-xs font-mono text-emerald-400">99.99% UPTIME</span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                        Real-time infrastructure observability.
                      </h3>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        Telemetry streams, microservice tracing, and automatic bottleneck resolution.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex flex-col">
                        <span className="text-[10px] text-neutral-500 font-mono">P99 LATENCY</span>
                        <span className="text-lg font-bold text-white font-display">12.4ms</span>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex flex-col">
                        <span className="text-[10px] text-neutral-500 font-mono">THROUGHPUT</span>
                        <span className="text-lg font-bold text-white font-display">42.8k/s</span>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex flex-col">
                        <span className="text-[10px] text-neutral-500 font-mono">ERROR RATE</span>
                        <span className="text-lg font-bold text-emerald-400 font-display">0.001%</span>
                      </div>
                    </div>
                  </div>
                )}

                {(activePrompt?.id === 'bakery' || activePrompt?.id === 'agency') && (
                  <div className="flex flex-col gap-6 text-left">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="font-bold tracking-wider font-display text-white text-sm uppercase">
                        {activePrompt.title}
                      </span>
                      <span className="text-xs text-neutral-400">Open Daily &bull; 7am - 4pm</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                        Naturally fermented, stone-milled sourdough &amp; pastries.
                      </h3>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        Hand-shaped every morning using 100% organic heirloom grains sourced directly from local regenerative farms.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-xs font-semibold text-white block">Country Loaf</span>
                        <span className="text-[11px] text-neutral-400">$10 &bull; Fresh daily</span>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-xs font-semibold text-white block">Cardamom Knot</span>
                        <span className="text-[11px] text-neutral-400">$6 &bull; House churned butter</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {viewMode === 'code' && (
              <div className="w-full max-w-3xl rounded-xl border border-white/10 bg-[#0A0A0D] p-5 text-left font-mono text-xs text-neutral-300 relative overflow-x-auto shadow-2xl">
                <button
                  onClick={copyCode}
                  className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-[11px] text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
                <pre className="text-neutral-300 leading-relaxed">
{`// Generated with Forma Autonomous Agent Engine
import React from 'react'

export const GeneratedWebsite = () => {
  return (
    <div className="min-h-screen bg-[#09090B] text-white selection:bg-white selection:text-black">
      <header className="border-b border-white/10 px-8 py-5 flex items-center justify-between">
        <h1 className="font-display font-bold tracking-wider text-sm">
          ${activePrompt?.title?.toUpperCase() || 'FORMA SITE'}
        </h1>
        <nav className="flex gap-6 text-xs text-neutral-400">
          <a href="#works" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>
      </header>
      <main className="max-w-5xl mx-auto px-8 py-16">
        <h2 className="text-4xl font-extrabold tracking-tight">
          ${activePrompt?.prompt || 'Crafted with precision.'}
        </h2>
      </main>
    </div>
  )
}`}
                </pre>
              </div>
            )}

            {viewMode === 'tokens' && (
              <div className="w-full max-w-3xl rounded-xl border border-white/10 bg-[#0A0A0D] p-6 text-left flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-mono uppercase text-neutral-400">Color Palette Tokens</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-lg bg-[#08080A] border border-white/15">
                      <span className="text-[10px] font-mono text-neutral-400">Primary Deep</span>
                      <span className="text-xs font-mono font-bold block text-white mt-1">#08080A</span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#111114] border border-white/15">
                      <span className="text-[10px] font-mono text-neutral-400">Surface Card</span>
                      <span className="text-xs font-mono font-bold block text-white mt-1">#111114</span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#ff6326] text-white">
                      <span className="text-[10px] font-mono opacity-80">Forma Accent</span>
                      <span className="text-xs font-mono font-bold block mt-1">#FF6326</span>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-500 text-neutral-950 font-bold">
                      <span className="text-[10px] font-mono opacity-80">Live Emerald</span>
                      <span className="text-xs font-mono block mt-1">#10B981</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                  <span className="text-xs font-mono uppercase text-neutral-400">Typography Pairing</span>
                  <div className="flex items-center justify-between text-xs text-neutral-300">
                    <span>Headings: <strong className="text-white font-display">Space Grotesk (500, 700)</strong></span>
                    <span>Body: <strong className="text-white font-sans">Plus Jakarta Sans (400, 500)</strong></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
