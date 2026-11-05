// @vitest-environment jsdom
import React from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ExportModal } from '../components/builder/ExportModal'

describe('ExportModal Component', () => {
  const sampleHtml = '<html><body><h1>Test</h1></body></html>'
  const sampleCss = 'body { color: red; }'
  const sampleJs = 'console.log("test");'

  beforeEach(() => {
    vi.clearAllMocks()
    window.URL.createObjectURL = vi.fn().mockReturnValue('blob:mock-url')
    window.URL.revokeObjectURL = vi.fn()
  })

  it('does not render when isOpen is false', () => {
    const { container } = render(<ExportModal isOpen={false} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders modal dialog when isOpen is true', () => {
    render(<ExportModal isOpen={true} />)
    expect(screen.getByRole('dialog')).toBeDefined()
    expect(screen.getByText('Export & Deploy Website')).toBeDefined()
    expect(screen.getByText('Download .ZIP')).toBeDefined()
    expect(screen.getByText('Deploy Integrations')).toBeDefined()
  })

  it('displays the file manifest list in Download tab', () => {
    render(<ExportModal isOpen={true} />)
    expect(screen.getByText('index.html')).toBeDefined()
    expect(screen.getByText('style.css')).toBeDefined()
    expect(screen.getByText('script.js')).toBeDefined()
    expect(screen.getByText('README.md')).toBeDefined()
  })

  it('switches to Deploy Integrations tab showing Vercel and Netlify', () => {
    render(<ExportModal isOpen={true} />)
    const deployTab = screen.getByText('Deploy Integrations')
    fireEvent.click(deployTab)

    expect(screen.getByText('Deploy to Vercel')).toBeDefined()
    expect(screen.getByText('Deploy to Netlify (Drag & Drop)')).toBeDefined()
    expect(screen.getByText('npx vercel deploy')).toBeDefined()
    expect(screen.getByText('npx netlify deploy --prod')).toBeDefined()
  })

  it('calls onClose when clicking close button or pressing Escape', () => {
    const handleClose = vi.fn()
    render(<ExportModal isOpen={true} onClose={handleClose} />)

    const closeBtn = screen.getByLabelText('Close modal')
    fireEvent.click(closeBtn)
    expect(handleClose).toHaveBeenCalled()

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(handleClose).toHaveBeenCalledTimes(2)
  })

  it('generates zip and downloads archive on button click', async () => {
    const clickMock = vi.fn()
    const originalCreateElement = document.createElement.bind(document)
    vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      const el = originalCreateElement(tagName)
      if (tagName === 'a') {
        el.click = clickMock
      }
      return el
    })

    render(
      <ExportModal
        isOpen={true}
        html={sampleHtml}
        css={sampleCss}
        js={sampleJs}
        projectName="Test Project"
      />
    )

    const downloadZipBtn = screen.getByRole('button', { name: /Download .zip Package/i })
    fireEvent.click(downloadZipBtn)

    await waitFor(() => {
      expect(clickMock).toHaveBeenCalled()
    })
  })
})
