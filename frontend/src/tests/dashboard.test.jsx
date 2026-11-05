// @vitest-environment jsdom
import React from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DashboardPage } from '../pages/DashboardPage'
import { AuthContext } from '../context/AuthContext'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('DashboardPage Component', () => {
  const mockUser = {
    id: 'user-123',
    name: 'Ada Lovelace',
    email: 'ada@forma.ai',
  }

  const mockLogout = vi.fn().mockResolvedValue({})

  const renderDashboard = (user = mockUser) => {
    return render(
      <MemoryRouter>
        <AuthContext.Provider
          value={{
            user,
            isAuthenticated: true,
            isLoading: false,
            logout: mockLogout,
          }}
        >
          <DashboardPage />
        </AuthContext.Provider>
      </MemoryRouter>
    )
  }

  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('renders top navigation with Forma brand logo, user initials and status indicator', () => {
    renderDashboard()
    expect(screen.getByText('FORMA')).toBeDefined()
    expect(screen.getByText('AGENT ENGINE ACTIVE')).toBeDefined()
    expect(screen.getByText('AL')).toBeDefined() // Initials of Ada Lovelace
    expect(screen.getByText('ada@forma.ai')).toBeDefined()
  })

  it('renders Hero Section with "Create New Website" heading and prompt input bar', () => {
    renderDashboard()
    expect(screen.getByText('Create New Website')).toBeDefined()
    const promptInput = screen.getByPlaceholderText(/Describe the website you want to build/i)
    expect(promptInput).toBeDefined()
    expect(screen.getByRole('button', { name: /^Build$/i })).toBeDefined()
  })

  it('submits hero prompt and navigates to /builder?prompt=...', () => {
    renderDashboard()
    const promptInput = screen.getByPlaceholderText(/Describe the website you want to build/i)
    fireEvent.change(promptInput, { target: { value: 'Sleek luxury ecommerce store' } })
    
    const submitBtn = screen.getByRole('button', { name: /^Build$/i })
    fireEvent.click(submitBtn)

    expect(mockNavigate).toHaveBeenCalledWith('/builder?prompt=Sleek%20luxury%20ecommerce%20store')
  })

  it('populates prompt input when suggestion pill is clicked', () => {
    renderDashboard()
    const suggestionBtn = screen.getByText(/AI SaaS Landing Page with pricing calculator/i)
    fireEvent.click(suggestionBtn)

    const promptInput = screen.getByPlaceholderText(/Describe the website you want to build/i)
    expect(promptInput.value).toBe('AI SaaS Landing Page with pricing calculator and testimonials')
  })

  it('renders Quick Filter Tabs: "All Projects", "Recent", "Drafts"', () => {
    renderDashboard()
    expect(screen.getByText('All Projects')).toBeDefined()
    expect(screen.getByText('Recent')).toBeDefined()
    expect(screen.getByText('Drafts')).toBeDefined()
  })

  it('filters project cards when clicking "Drafts" and "Recent" tabs', () => {
    renderDashboard()
    
    // Switch to Drafts
    const draftsTab = screen.getByText('Drafts')
    fireEvent.click(draftsTab)
    expect(screen.getByText('Solstice - Ambient Soundscapes')).toBeDefined()
    expect(screen.queryByText('NeuralSync - AI Workflow Engine')).toBeNull()

    // Switch to Recent
    const recentTab = screen.getByText('Recent')
    fireEvent.click(recentTab)
    expect(screen.getByText('NeuralSync - AI Workflow Engine')).toBeDefined()
  })

  it('filters project cards in real-time when searching', () => {
    renderDashboard()
    const searchInput = screen.getByPlaceholderText('Search projects...')
    fireEvent.change(searchInput, { target: { value: 'Hyper-Mobility' } })

    expect(screen.getByText('Veloce - Hyper-Mobility')).toBeDefined()
    expect(screen.queryByText('Aura Studio - Architecture')).toBeNull()
  })

  it('renders the "+ Blank Project" empty state card and navigates to /builder', () => {
    renderDashboard()
    const blankCard = screen.getByText('+ Blank Project')
    expect(blankCard).toBeDefined()

    fireEvent.click(blankCard)
    expect(mockNavigate).toHaveBeenCalledWith('/builder')
  })

  it('renders mock project cards with title, prompt, device preview badge, and status', () => {
    renderDashboard()
    expect(screen.getByText('NeuralSync - AI Workflow Engine')).toBeDefined()
    expect(screen.getByText('Aura Studio - Architecture')).toBeDefined()
    expect(screen.getAllByText('Desktop').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Published').length).toBeGreaterThan(0)
  })

  it('opens action menu and handles project rename flow', async () => {
    renderDashboard()
    const actionButtons = screen.getAllByLabelText('Project actions')
    fireEvent.click(actionButtons[0])

    const renameBtn = screen.getByText('Rename')
    fireEvent.click(renameBtn)

    // Modal appears
    expect(screen.getByText('Rename Project')).toBeDefined()
    const renameInput = screen.getByDisplayValue('NeuralSync - AI Workflow Engine')
    fireEvent.change(renameInput, { target: { value: 'QuantumFlow Studio' } })

    const saveBtn = screen.getByText('Save Changes')
    fireEvent.click(saveBtn)

    expect(screen.getByText('QuantumFlow Studio')).toBeDefined()
  })

  it('opens action menu and handles project delete flow', async () => {
    renderDashboard()
    const targetProjectTitle = 'NeuralSync - AI Workflow Engine'
    expect(screen.getByText(targetProjectTitle)).toBeDefined()

    const actionButtons = screen.getAllByLabelText('Project actions')
    fireEvent.click(actionButtons[0])

    const deleteMenuItem = screen.getByText('Delete')
    fireEvent.click(deleteMenuItem)

    // Confirmation modal appears
    expect(screen.getByRole('button', { name: 'Delete Project' })).toBeDefined()
    const confirmDeleteBtn = screen.getByRole('button', { name: 'Delete Project' })
    fireEvent.click(confirmDeleteBtn)

    expect(screen.queryByText(targetProjectTitle)).toBeNull()
  })

  it('handles user sign out', async () => {
    renderDashboard()
    const signOutBtn = screen.getByText('Sign out')
    fireEvent.click(signOutBtn)

    expect(mockLogout).toHaveBeenCalled()
  })
})
