// @vitest-environment jsdom
import React from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CodeViewer } from '../components/builder/CodeViewer'

describe('CodeViewer Component', () => {
  const sampleHtml = '<div class="hero"><h1>Hello World</h1></div>'
  const sampleCss = '.hero { background: #09090b; }'
  const sampleJs = 'console.log("Interactive setup");'

  beforeEach(() => {
    vi.clearAllMocks()
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    })
  })

  it('renders all language tabs: HTML, CSS, JavaScript, and Combined', () => {
    render(<CodeViewer html={sampleHtml} css={sampleCss} js={sampleJs} />)
    expect(screen.getByRole('button', { name: /HTML/i })).toBeDefined()
    expect(screen.getByRole('button', { name: /CSS/i })).toBeDefined()
    expect(screen.getByRole('button', { name: /JavaScript/i })).toBeDefined()
    expect(screen.getByRole('button', { name: /Combined/i })).toBeDefined()
  })

  it('switches between tabs and displays respective code', () => {
    render(<CodeViewer html={sampleHtml} css={sampleCss} js={sampleJs} />)
    
    // Switch to CSS
    const cssTab = screen.getByRole('button', { name: /CSS/i })
    fireEvent.click(cssTab)
    expect(screen.getByText('.hero')).toBeDefined()

    // Switch to JavaScript
    const jsTab = screen.getByRole('button', { name: /JavaScript/i })
    fireEvent.click(jsTab)
    expect(screen.getByText('"Interactive setup"')).toBeDefined()
  })

  it('renders line numbers in gutter', () => {
    render(<CodeViewer html={sampleHtml} />)
    expect(screen.getByText('1')).toBeDefined()
  })

  it('handles copy code to clipboard with visual feedback', async () => {
    render(<CodeViewer html={sampleHtml} />)
    const copyBtn = screen.getByLabelText('Copy code to clipboard')
    expect(copyBtn).toBeDefined()

    fireEvent.click(copyBtn)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(sampleHtml)
    expect(screen.getByText('Copied!')).toBeDefined()
  })

  it('triggers download single file when clicking download', () => {
    const clickMock = vi.fn()
    const originalCreateElement = document.createElement.bind(document)
    vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      const el = originalCreateElement(tagName)
      if (tagName === 'a') {
        el.click = clickMock
      }
      return el
    })

    render(<CodeViewer html={sampleHtml} />)
    const downloadBtn = screen.getByLabelText('Download active file')
    fireEvent.click(downloadBtn)

    expect(clickMock).toHaveBeenCalled()
  })
})
