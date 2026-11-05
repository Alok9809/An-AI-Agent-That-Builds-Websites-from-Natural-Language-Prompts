// @vitest-environment jsdom
import React from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { GenerationProgress } from '../components/builder/GenerationProgress'

describe('GenerationProgress Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all 4 AI generation phases', () => {
    render(<GenerationProgress currentStep={1} />)
    expect(screen.getByText('Analyzing Prompt')).toBeDefined()
    expect(screen.getByText('Designing Architecture & Color Palette')).toBeDefined()
    expect(screen.getByText('Generating HTML/CSS/Tailwind')).toBeDefined()
    expect(screen.getByText('Final Polish & Interactivity')).toBeDefined()
  })

  it('displays Running state for active step and Pending for upcoming steps', () => {
    render(<GenerationProgress currentStep={2} />)
    expect(screen.getByText('Done')).toBeDefined() // Step 1 is done
    expect(screen.getByText('Running...')).toBeDefined() // Step 2 is running
    expect(screen.getAllByText('Pending').length).toBe(2) // Steps 3 and 4 are pending
  })

  it('displays completed state when status is completed', () => {
    render(<GenerationProgress currentStep={4} status="completed" />)
    expect(screen.getByText('Website Generation Complete')).toBeDefined()
    expect(screen.getByText('100%')).toBeDefined()
  })

  it('toggles live terminal drawer when clicking the Live Logs button', () => {
    render(<GenerationProgress currentStep={2} />)
    const toggleBtn = screen.getByLabelText('Toggle live agent terminal logs')
    expect(toggleBtn).toBeDefined()

    // Terminal closed initially
    expect(screen.queryByText(/agent-process.log/i)).toBeNull()

    // Click to open
    fireEvent.click(toggleBtn)
    expect(screen.getByText(/agent-process.log/i)).toBeDefined()
    expect(screen.getByText(/\[AI Agent\]: Received natural language input stream/i)).toBeDefined()

    // Click to close
    fireEvent.click(toggleBtn)
    expect(screen.queryByText(/agent-process.log/i)).toBeNull()
  })

  it('renders custom logs passed via props', () => {
    const customLogs = [
      '[AI Agent]: Custom test log line 1',
      '[Code Generator]: Injected navbar successfully',
    ]
    render(<GenerationProgress currentStep={3} logs={customLogs} />)

    const toggleBtn = screen.getByLabelText('Toggle live agent terminal logs')
    fireEvent.click(toggleBtn)

    expect(screen.getByText(/Custom test log line 1/i)).toBeDefined()
    expect(screen.getByText(/Injected navbar successfully/i)).toBeDefined()
  })
})
