// @vitest-environment jsdom
import React from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PromptBar } from '../components/builder/PromptBar'

describe('PromptBar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders textarea with placeholder and generate button', () => {
    render(<PromptBar />)
    const textarea = screen.getByLabelText('Natural language website prompt')
    expect(textarea).toBeDefined()
    expect(screen.getByRole('button', { name: /Generate Website/i })).toBeDefined()
  })

  it('renders all suggestion chips', () => {
    render(<PromptBar />)
    expect(screen.getByText('🚀 SaaS Landing Page')).toBeDefined()
    expect(screen.getByText('🎨 Minimal Portfolio')).toBeDefined()
    expect(screen.getByText('⚡ Crypto Web3 App')).toBeDefined()
    expect(screen.getByText('🛍️ E-Commerce Boutique')).toBeDefined()
    expect(screen.getByText('📱 Mobile Waitlist')).toBeDefined()
  })

  it('populates textarea when clicking a suggestion chip', () => {
    render(<PromptBar />)
    const chip = screen.getByText('⚡ Crypto Web3 App')
    fireEvent.click(chip)

    const textarea = screen.getByLabelText('Natural language website prompt')
    expect(textarea.value).toContain('Web3 staking dashboard')
  })

  it('allows selecting different style presets from dropdown', () => {
    render(<PromptBar />)
    const presetBtn = screen.getByLabelText('Select style preset')
    expect(presetBtn).toBeDefined()
    expect(screen.getByText('Obsidian Dark')).toBeDefined()

    // Open dropdown
    fireEvent.click(presetBtn)
    expect(screen.getByText('Minimal Clean')).toBeDefined()
    expect(screen.getByText('Vibrant Gradient')).toBeDefined()

    // Select Vibrant Gradient
    fireEvent.click(screen.getByText('Vibrant Gradient'))
    expect(screen.getAllByText('Vibrant Gradient').length).toBeGreaterThanOrEqual(1)
  })

  it('calls onGenerate when clicking generate button', () => {
    const handleGenerate = vi.fn()
    render(<PromptBar initialPrompt="A minimalist portfolio" onGenerate={handleGenerate} />)

    const generateBtn = screen.getByRole('button', { name: /Generate Website/i })
    fireEvent.click(generateBtn)

    expect(handleGenerate).toHaveBeenCalledWith({
      prompt: 'A minimalist portfolio',
      preset: 'obsidian-dark',
    })
  })

  it('triggers onGenerate when pressing Ctrl+Enter in textarea', () => {
    const handleGenerate = vi.fn()
    render(<PromptBar onGenerate={handleGenerate} />)

    const textarea = screen.getByLabelText('Natural language website prompt')
    fireEvent.change(textarea, { target: { value: 'FinTech analytics platform' } })

    fireEvent.keyDown(textarea, { key: 'Enter', ctrlKey: true })

    expect(handleGenerate).toHaveBeenCalledWith({
      prompt: 'FinTech analytics platform',
      preset: 'obsidian-dark',
    })
  })

  it('triggers onGenerate when pressing Cmd+Enter (metaKey) in textarea', () => {
    const handleGenerate = vi.fn()
    render(<PromptBar onGenerate={handleGenerate} />)

    const textarea = screen.getByLabelText('Natural language website prompt')
    fireEvent.change(textarea, { target: { value: 'Design agency portfolio' } })

    fireEvent.keyDown(textarea, { key: 'Enter', metaKey: true })

    expect(handleGenerate).toHaveBeenCalledWith({
      prompt: 'Design agency portfolio',
      preset: 'obsidian-dark',
    })
  })

  it('clears prompt when clicking clear button', () => {
    render(<PromptBar initialPrompt="Some test prompt" />)
    const textarea = screen.getByLabelText('Natural language website prompt')
    expect(textarea.value).toBe('Some test prompt')

    const clearBtn = screen.getByLabelText('Clear prompt text')
    fireEvent.click(clearBtn)

    expect(textarea.value).toBe('')
  })
})
