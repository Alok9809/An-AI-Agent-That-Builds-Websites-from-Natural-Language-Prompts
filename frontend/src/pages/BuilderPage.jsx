import React, { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { FormaLogo } from '../components/ui/FormaLogo'
import { Button } from '../components/ui/Button'
import { PreviewCanvas } from '../components/builder/PreviewCanvas'
import { PromptBar } from '../components/builder/PromptBar'
import { GenerationProgress } from '../components/builder/GenerationProgress'
import { ArrowLeft, Play } from 'lucide-react'

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

  const handleGenerate = ({ prompt: newPrompt }) => {
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

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#14141a] border border-[rgba(244,240,232,0.06)] text-[11px] font-mono text-[#9c978e]">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isGenerating ? 'bg-[#ff6326] animate-ping' : 'bg-emerald-400 animate-pulse'
              }`}
            />
            <span>{isGenerating ? 'SYNTHESIZING DOM...' : 'LIVE PREVIEW READY'}</span>
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

        {/* Live Canvas Preview Component */}
        <div className="flex-1 w-full">
          <PreviewCanvas prompt={activeCanvasPrompt} />
        </div>
      </main>
    </div>
  )
}
