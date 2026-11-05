// @vitest-environment jsdom
import React from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PreviewCanvas } from '../components/builder/PreviewCanvas'

describe('PreviewCanvas Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders device toolbar with Desktop, Tablet, and Mobile buttons', () => {
    render(<PreviewCanvas prompt="Test AI Website" />)
    expect(screen.getByLabelText('Desktop preview mode')).toBeDefined()
    expect(screen.getByLabelText('Tablet preview mode')).toBeDefined()
    expect(screen.getByLabelText('Mobile preview mode')).toBeDefined()
  })

  it('displays default Desktop fluid dimension indicator', () => {
    render(<PreviewCanvas prompt="Test AI Website" />)
    expect(screen.getByText('100% (Fluid)')).toBeDefined()
    expect(screen.getAllByText('Desktop').length).toBeGreaterThanOrEqual(1)
  })

  it('switches to Tablet view and updates dimensions to 768 × 1024 px', () => {
    const handleDeviceChange = vi.fn()
    render(<PreviewCanvas prompt="Test AI Website" onDeviceChange={handleDeviceChange} />)

    const tabletBtn = screen.getByLabelText('Tablet preview mode')
    fireEvent.click(tabletBtn)

    expect(handleDeviceChange).toHaveBeenCalledWith('tablet')
    expect(screen.getByText('768 × 1024 px')).toBeDefined()
  })

  it('switches to Mobile view and updates dimensions to 375 × 812 px', () => {
    const handleDeviceChange = vi.fn()
    render(<PreviewCanvas prompt="Test AI Website" onDeviceChange={handleDeviceChange} />)

    const mobileBtn = screen.getByLabelText('Mobile preview mode')
    fireEvent.click(mobileBtn)

    expect(handleDeviceChange).toHaveBeenCalledWith('mobile')
    expect(screen.getByText('375 × 812 px')).toBeDefined()
  })

  it('renders sandboxed iframe with proper sandbox attributes and srcDoc', () => {
    const customHtml = '<div><h1>Custom Generated Website</h1></div>'
    render(<PreviewCanvas html={customHtml} />)

    const iframe = screen.getByTitle('FORMA Live Preview Canvas')
    expect(iframe).toBeDefined()
    expect(iframe.getAttribute('sandbox')).toBe('allow-scripts allow-same-origin')
    expect(iframe.getAttribute('srcDoc')).toContain('Custom Generated Website')
  })

  it('triggers reload when clicking the reload button', () => {
    render(<PreviewCanvas prompt="Test AI Website" />)
    const reloadBtn = screen.getByLabelText('Reload preview')
    expect(reloadBtn).toBeDefined()

    fireEvent.click(reloadBtn)
    // iframe re-rendered
    const iframe = screen.getByTitle('FORMA Live Preview Canvas')
    expect(iframe).toBeDefined()
  })

  it('displays runtime issue banner when receiving a preview error message', () => {
    render(<PreviewCanvas prompt="Test AI Website" />)

    // Simulate postMessage error event from iframe
    fireEvent(
      window,
      new MessageEvent('message', {
        data: {
          type: 'FORMA_PREVIEW_ERROR',
          message: 'Uncaught TypeError: Cannot read properties of undefined',
        },
      })
    )

    expect(screen.getByText(/Runtime Issue:/i)).toBeDefined()
    expect(screen.getByText(/Cannot read properties of undefined/i)).toBeDefined()
  })
})
