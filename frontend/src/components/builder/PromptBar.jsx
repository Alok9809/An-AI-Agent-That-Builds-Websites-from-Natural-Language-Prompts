import React, { useState, useEffect, useRef } from 'react'
import { Sparkles, ArrowRight, X, ChevronDown, Check, Palette, Wand2 } from 'lucide-react'

export const STYLE_PRESETS = [
  {
    id: 'obsidian-dark',
    name: 'Obsidian Dark',
    desc: 'Deep obsidian #09090b with flame orange #ff6326 accents',
    badgeColor: 'bg-[#ff6326]',
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    desc: 'Monochrome high-contrast design with spacious whitespace',
    badgeColor: 'bg-neutral-300',
  },
  {
    id: 'vibrant-gradient',
    name: 'Vibrant Gradient',
    desc: 'Rich glowing mesh gradients and dark glassmorphic layers',
    badgeColor: 'bg-purple-500',
  },
]

export const SUGGESTION_CHIPS = [
  {
    label: '🚀 SaaS Landing Page',
    prompt: 'Modern SaaS landing page for an AI developer platform with interactive code editor, feature breakdown, and pricing tiers.',
  },
  {
    label: '🎨 Minimal Portfolio',
    prompt: 'Minimalist creative portfolio for an architectural designer with full-bleed project gallery, dark mode, and typography.',
  },
  {
    label: '⚡ Crypto Web3 App',
    prompt: 'Web3 staking dashboard with real-time APY analytics ticker, token swap card, and wallet connect modal.',
  },
  {
    label: '🛍️ E-Commerce Boutique',
    prompt: 'Luxury boutique e-commerce storefront with product grid, slide-over cart drawer, and review carousel.',
  },
  {
    label: '📱 Mobile Waitlist',
    prompt: 'High-conversion viral mobile app waitlist with animated countdown timer and referral link generator.',
  },
]

export const PromptBar = ({
  initialPrompt = '',
  onGenerate,
  isGenerating = false,
  className = '',
}) => {
  const [prompt, setPrompt] = useState(initialPrompt)
  const [prevInitialPrompt, setPrevInitialPrompt] = useState(initialPrompt)
  const [preset, setPreset] = useState(STYLE_PRESETS[0].id)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const textareaRef = useRef(null)
  const dropdownRef = useRef(null)

  // Sync state if initialPrompt prop changes
  if (initialPrompt !== prevInitialPrompt) {
    setPrevInitialPrompt(initialPrompt)
    setPrompt(initialPrompt)
  }

  // Auto-resize textarea height as content changes
  useEffect(() => {
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = `${Math.min(el.scrollHeight, 180)}px`
    }
  }, [prompt])

  // Close dropdown on outside click or escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsDropdownOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleKeyDown = (e) => {
    // Ctrl+Enter or Cmd+Enter triggers generation
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      triggerGenerate()
    }
  }

  const triggerGenerate = () => {
    if (!prompt.trim() || isGenerating) return
    onGenerate?.({
      prompt: prompt.trim(),
      preset,
    })
  }

  const selectedPresetObj = STYLE_PRESETS.find((p) => p.id === preset) || STYLE_PRESETS[0]

  return (
    <div className={`w-full flex flex-col gap-3 font-sans text-left ${className}`}>
      {/* Main Prompt Console Container */}
      <div className="relative rounded-2xl bg-gradient-to-b from-[#121217] to-[#0d0d12] border border-[rgba(244,240,232,0.12)] p-3 sm:p-4 shadow-2xl transition-all focus-within:border-[#ff6326]/60 focus-within:ring-2 focus-within:ring-[#ff6326]/15">
        {/* Top Control Bar: Preset Selector & Shortcuts hint */}
        <div className="flex items-center justify-between gap-3 pb-2.5 mb-2 border-b border-[rgba(244,240,232,0.06)]">
          {/* Style Preset Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#14141a] hover:bg-[#1c1c24] border border-[rgba(244,240,232,0.08)] text-xs text-[#fbf9f5] transition-all cursor-pointer shadow-sm"
              aria-label="Select style preset"
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
            >
              <Palette className="w-3.5 h-3.5 text-[#ff6326]" />
              <span className="font-semibold text-[11px] sm:text-xs">{selectedPresetObj.name}</span>
              <ChevronDown className="w-3 h-3 text-[#9c978e]" />
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 top-9 z-50 w-64 rounded-xl bg-[#14141a] border border-[rgba(244,240,232,0.12)] shadow-2xl py-1.5 flex flex-col animate-fadeIn backdrop-blur-xl">
                <div className="px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-[#635f58]">
                  Style Presets
                </div>
                {STYLE_PRESETS.map((p) => {
                  const isSelected = p.id === preset
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setPreset(p.id)
                        setIsDropdownOpen(false)
                      }}
                      className={`flex flex-col px-3 py-2 text-left hover:bg-[#1f1f28] transition-colors cursor-pointer ${
                        isSelected ? 'bg-[#1b1b24]' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white">{p.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#ff6326]" />}
                      </div>
                      <span className="text-[10px] text-[#9c978e] mt-0.5 leading-snug">{p.desc}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Keyboard Shortcut Hint */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[#635f58]">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#14141a] border border-[rgba(244,240,232,0.08)] text-[#9c978e] text-[10px] font-mono shadow-xs">
              Ctrl+↵
            </kbd>
            <span>or</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#14141a] border border-[rgba(244,240,232,0.08)] text-[#9c978e] text-[10px] font-mono shadow-xs">
              ⌘↵
            </kbd>
            <span>to generate</span>
          </div>
        </div>

        {/* Textarea Input Row */}
        <div className="relative flex items-start gap-2.5">
          <Wand2 className="w-4 h-4 text-[#ff6326] mt-2.5 flex-shrink-0 animate-pulse hidden sm:block" />

          <textarea
            ref={textareaRef}
            rows={2}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your dream website or UI component in detail... (e.g. A sleek dark-mode crypto staking app with real-time graphs and wallet connect)"
            className="w-full bg-transparent text-sm sm:text-base text-[#fbf9f5] placeholder:text-[#635f58] outline-none resize-none font-sans leading-relaxed py-1.5 max-h-[180px] overflow-y-auto"
            aria-label="Natural language website prompt"
          />

          {prompt && (
            <button
              type="button"
              onClick={() => setPrompt('')}
              className="p-1 text-[#635f58] hover:text-[#fbf9f5] transition-colors mt-1.5 cursor-pointer"
              title="Clear prompt"
              aria-label="Clear prompt text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Bottom Action Footer */}
        <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[rgba(244,240,232,0.06)]">
          <div className="flex items-center gap-2 text-[11px] text-[#635f58]">
            <span className="font-mono">{prompt.length} chars</span>
          </div>

          <button
            type="button"
            disabled={!prompt.trim() || isGenerating}
            onClick={triggerGenerate}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#ff6326] hover:bg-[#ff7a45] active:bg-[#e0551e] text-white flex items-center gap-2 shadow-lg shadow-[#ff6326]/20 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
                <span>Synthesizing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>Generate Website</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Suggestion Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold text-[#635f58] uppercase tracking-wider mr-1">
          Suggestions:
        </span>
        {SUGGESTION_CHIPS.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setPrompt(chip.prompt)}
            className="px-3 py-1 rounded-full text-xs text-[#9c978e] hover:text-[#fbf9f5] bg-[#14141a] hover:bg-[#1e1e28] border border-[rgba(244,240,232,0.06)] hover:border-[rgba(244,240,232,0.15)] transition-all cursor-pointer text-left"
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  )
}
