import React, { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { FormaLogo } from '../components/ui/FormaLogo'
import { Button } from '../components/ui/Button'
import { PreviewCanvas } from '../components/builder/PreviewCanvas'
import { PromptBar } from '../components/builder/PromptBar'
import { GenerationProgress } from '../components/builder/GenerationProgress'
import { CodeViewer } from '../components/builder/CodeViewer'
import { ExportModal } from '../components/builder/ExportModal'
import {
  ArrowLeft,
  Download,
  Eye,
  Code2,
  Columns2,
  UploadCloud,
} from 'lucide-react'

// Synthesizes custom code files based on user prompt and style preset
function synthesizeProjectCode(prompt, preset = 'obsidian-dark') {
  const accent = preset === 'minimal-clean' ? '#171717' : preset === 'vibrant-gradient' ? '#a855f7' : '#ff6326'
  const bg = preset === 'minimal-clean' ? '#fafafa' : '#09090b'
  const text = preset === 'minimal-clean' ? '#171717' : '#fbf9f5'

  const html = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${prompt}</title>
  <link rel="stylesheet" href="style.css" />
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-[${bg}] text-[${text}] flex flex-col justify-between selection:bg-[#ff6326]/30">
  <!-- Navigation Bar -->
  <header class="w-full border-b border-white/10 bg-[#0c0c10]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
    <div class="flex items-center gap-2.5">
      <div class="w-7 h-7 rounded-lg bg-[${accent}] flex items-center justify-center font-bold text-white text-xs shadow-sm">
        F
      </div>
      <span class="font-bold tracking-wider text-sm font-['Space_Grotesk']">FORMA CANVA</span>
    </div>

    <div class="hidden sm:flex items-center gap-6 text-xs text-neutral-400 font-medium">
      <a href="#overview" class="hover:text-white transition-colors">Overview</a>
      <a href="#features" class="hover:text-white transition-colors">Features</a>
      <a href="#showcase" class="hover:text-white transition-colors">Showcase</a>
    </div>

    <button id="cta-action-btn" class="px-4 py-2 rounded-xl text-xs font-semibold bg-[${accent}] text-white hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer">
      Get Started
    </button>
  </header>

  <!-- Hero Section -->
  <main class="flex-1 max-w-4xl mx-auto px-6 py-16 flex flex-col items-center text-center gap-6">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-[${accent}] bg-[${accent}]/10 border border-[${accent}]/20">
      <span class="w-2 h-2 rounded-full bg-[${accent}] animate-ping"></span>
      <span>Autonomous Agent Synthesis</span>
    </div>

    <h1 class="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-['Space_Grotesk']">
      ${prompt}
    </h1>

    <p class="text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed">
      Generated automatically by FORMA with responsive components, semantic HTML5 markup, and utility styling.
    </p>

    <div class="flex flex-wrap items-center justify-center gap-3 mt-2">
      <button class="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[${accent}] text-white hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-[${accent}]/25 cursor-pointer">
        Explore Experience
      </button>
      <button class="px-6 py-3 rounded-xl text-xs sm:text-sm font-medium bg-[#14141a] border border-white/10 text-neutral-300 hover:text-white hover:bg-[#1c1c24] active:scale-95 transition-all cursor-pointer">
        Documentation
      </button>
    </div>

    <!-- Features Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-12 text-left">
      <div class="p-5 rounded-2xl bg-[#0f0f14] border border-white/10 hover:border-[${accent}]/40 transition-all">
        <div class="text-[${accent}] font-bold text-lg mb-1">01</div>
        <h3 class="text-sm font-bold text-white mb-1">Architecture</h3>
        <p class="text-xs text-neutral-400 leading-relaxed">Structured components built for performance and maintainability.</p>
      </div>

      <div class="p-5 rounded-2xl bg-[#0f0f14] border border-white/10 hover:border-[${accent}]/40 transition-all">
        <div class="text-[${accent}] font-bold text-lg mb-1">02</div>
        <h3 class="text-sm font-bold text-white mb-1">Multi-Screen</h3>
        <p class="text-xs text-neutral-400 leading-relaxed">Adaptive viewport scaling across mobile, tablet, and desktop screens.</p>
      </div>

      <div class="p-5 rounded-2xl bg-[#0f0f14] border border-white/10 hover:border-[${accent}]/40 transition-all">
        <div class="text-[${accent}] font-bold text-lg mb-1">03</div>
        <h3 class="text-sm font-bold text-white mb-1">Export Ready</h3>
        <p class="text-xs text-neutral-400 leading-relaxed">Download clean source code or deploy directly to Vercel and Netlify.</p>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="w-full border-t border-white/10 py-6 text-center text-xs text-neutral-500">
    Synthesized with FORMA &bull; Give thought its form.
  </footer>

  <script src="script.js"></script>
</body>
</html>`

  const css = `/* FORMA Custom Stylesheet */
:root {
  --primary-accent: ${accent};
  --bg-color: ${bg};
}

body {
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  background-color: var(--bg-color);
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.glow-effect {
  box-shadow: 0 0 50px -10px ${accent}40;
}

/* Custom Scrollbars */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background: #27272a;
  border-radius: 3px;
}`

  const js = `// FORMA Interactive Behaviors
document.addEventListener('DOMContentLoaded', () => {
  const ctaBtn = document.getElementById('cta-action-btn');

  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      console.log('[FORMA]: Action button triggered.');
      ctaBtn.classList.add('scale-95');
      setTimeout(() => ctaBtn.classList.remove('scale-95'), 150);
    });
  }

  // Smooth scroll anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});`

  return { html, css, js }
}

export const BuilderPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const initialPromptFromUrl = searchParams.get('prompt') || 'AI-Generated Modern Landing Page'
  const projectId = searchParams.get('project') || 'new'

  const [currentPrompt, setCurrentPrompt] = useState(initialPromptFromUrl)
  const [activeCanvasPrompt, setActiveCanvasPrompt] = useState(initialPromptFromUrl)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState(4)
  const [generationStatus, setGenerationStatus] = useState('completed') // 'idle' | 'generating' | 'completed' | 'error'

  // Workspace modes: 'preview' | 'code' | 'split'
  const [workspaceMode, setWorkspaceMode] = useState('preview')
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)

  // Current project code state
  const [projectCode, setProjectCode] = useState(() =>
    synthesizeProjectCode(initialPromptFromUrl)
  )

  const handleGenerate = ({ prompt: newPrompt, preset }) => {
    setCurrentPrompt(newPrompt)
    setIsGenerating(true)
    setGenerationStatus('generating')
    setGenerationStep(1)

    // Simulate multi-phase progression through agent steps
    setTimeout(() => {
      setGenerationStep(2)
      setTimeout(() => {
        setGenerationStep(3)
        setTimeout(() => {
          setGenerationStep(4)
          setTimeout(() => {
            setActiveCanvasPrompt(newPrompt)
            setProjectCode(synthesizeProjectCode(newPrompt, preset))
            setIsGenerating(false)
            setGenerationStatus('completed')
          }, 800)
        }, 800)
      }, 800)
    }, 800)
  }

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-[#fbf9f5] flex flex-col font-sans">
      {/* Builder Top Bar */}
      <header className="w-full border-b border-[rgba(244,240,232,0.08)] bg-[#0c0c10]/90 backdrop-blur-md px-4 sm:px-6 py-3 flex items-center justify-between gap-4 sticky top-0 z-40">
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
          <span className="hidden md:inline-block px-2 py-0.5 rounded text-[10px] font-mono text-[#635f58] bg-[#14141a] border border-[rgba(244,240,232,0.06)]">
            id: {projectId}
          </span>
        </div>

        {/* Center: Workspace Mode Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#14141a] border border-[rgba(244,240,232,0.08)] shadow-inner">
          <button
            type="button"
            onClick={() => setWorkspaceMode('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              workspaceMode === 'preview'
                ? 'bg-[#ff6326] text-white shadow-sm'
                : 'text-[#9c978e] hover:text-white'
            }`}
            aria-label="Canvas preview mode"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview</span>
          </button>

          <button
            type="button"
            onClick={() => setWorkspaceMode('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              workspaceMode === 'code'
                ? 'bg-[#ff6326] text-white shadow-sm'
                : 'text-[#9c978e] hover:text-white'
            }`}
            aria-label="Code editor mode"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Code</span>
          </button>

          <button
            type="button"
            onClick={() => setWorkspaceMode('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer hidden md:flex ${
              workspaceMode === 'split'
                ? 'bg-[#ff6326] text-white shadow-sm'
                : 'text-[#9c978e] hover:text-white'
            }`}
            aria-label="Split view mode"
          >
            <Columns2 className="w-3.5 h-3.5" />
            <span>Split</span>
          </button>
        </div>

        {/* Right Actions: Status indicator & Export/Deploy */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#14141a] border border-[rgba(244,240,232,0.06)] text-[11px] font-mono text-[#9c978e]">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isGenerating ? 'bg-[#ff6326] animate-ping' : 'bg-emerald-400 animate-pulse'
              }`}
            />
            <span>{isGenerating ? 'SYNTHESIZING...' : 'READY'}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExportModalOpen(true)}
            className="border-[rgba(244,240,232,0.15)] text-[#fbf9f5] hover:text-white text-xs h-8 px-3 cursor-pointer flex items-center gap-1.5"
            aria-label="Open export and deploy dialog"
          >
            <Download className="w-3.5 h-3.5 text-[#ff6326]" />
            <span className="hidden sm:inline">Export</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsExportModalOpen(true)}
            className="bg-[#ff6326] hover:bg-[#ff7a45] text-white text-xs h-8 px-3 cursor-pointer flex items-center gap-1.5"
          >
            <UploadCloud className="w-3.5 h-3.5 fill-current" />
            <span>Deploy</span>
          </Button>
        </div>
      </header>

      {/* Main Canvas Workspace */}
      <main className="flex-1 flex flex-col p-4 sm:p-6 max-w-7xl w-full mx-auto gap-5">
        {/* PromptBar Console */}
        <PromptBar
          initialPrompt={currentPrompt}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />

        {/* Generation Progress Stepper & Terminal */}
        <GenerationProgress
          currentStep={generationStep}
          status={generationStatus}
        />

        {/* Workspace Display: Preview, Code, or Split */}
        <div className="flex-1 w-full">
          {workspaceMode === 'preview' && (
            <div className="w-full animate-fadeIn">
              <PreviewCanvas
                prompt={activeCanvasPrompt}
                html={projectCode.html}
                css={projectCode.css}
                js={projectCode.js}
              />
            </div>
          )}

          {workspaceMode === 'code' && (
            <div className="w-full animate-fadeIn">
              <CodeViewer
                html={projectCode.html}
                css={projectCode.css}
                js={projectCode.js}
              />
            </div>
          )}

          {workspaceMode === 'split' && (
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 animate-fadeIn">
              <PreviewCanvas
                prompt={activeCanvasPrompt}
                html={projectCode.html}
                css={projectCode.css}
                js={projectCode.js}
              />
              <CodeViewer
                html={projectCode.html}
                css={projectCode.css}
                js={projectCode.js}
              />
            </div>
          )}
        </div>
      </main>

      {/* Export & Deploy Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        html={projectCode.html}
        css={projectCode.css}
        js={projectCode.js}
        projectName={activeCanvasPrompt.slice(0, 30)}
        prompt={activeCanvasPrompt}
      />
    </div>
  )
}
