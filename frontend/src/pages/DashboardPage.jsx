import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FormaLogo } from '../components/ui/FormaLogo'
import { Button } from '../components/ui/Button'
import { SpotlightCard } from '../components/motion/SpotlightCard'
import {
  Sparkles,
  Plus,
  Search,
  MoreVertical,
  ExternalLink,
  Edit2,
  Trash2,
  Copy,
  Monitor,
  Smartphone,
  Tablet,
  Layers,
  Clock,
  LogOut,
  ArrowRight,
  X,
  Check,
  AlertTriangle,
  LayoutTemplate,
} from 'lucide-react'

const STORAGE_KEY = 'forma_projects_v1'

const DEFAULT_PROJECTS = [
  {
    id: 'proj-1',
    title: 'NeuralSync - AI Workflow Engine',
    prompt: 'Modern dark-mode SaaS dashboard with workflow builder, real-time metrics, and glassmorphic node editor with gradient accents.',
    device: 'Desktop',
    updatedAt: '15 mins ago',
    updatedTimestamp: Date.now() - 15 * 60 * 1000,
    status: 'Published',
    category: 'recent',
    accentColor: '#8b5cf6',
    previewType: 'saas',
  },
  {
    id: 'proj-2',
    title: 'Aura Studio - Architecture',
    prompt: 'Minimalist architecture portfolio with full-bleed hero gallery, brutalist typography, and interactive project index.',
    device: 'Desktop',
    updatedAt: '2 hours ago',
    updatedTimestamp: Date.now() - 2 * 60 * 60 * 1000,
    status: 'Published',
    category: 'recent',
    accentColor: '#f59e0b',
    previewType: 'portfolio',
  },
  {
    id: 'proj-3',
    title: 'Veloce - Hyper-Mobility',
    prompt: 'High-energy product launch page for electric hyper-bikes with 3D specs grid, battery HUD, and preorder configuration drawer.',
    device: 'Mobile',
    updatedAt: 'Yesterday',
    updatedTimestamp: Date.now() - 24 * 60 * 60 * 1000,
    status: 'In Progress',
    category: 'recent',
    accentColor: '#10b981',
    previewType: 'mobile',
  },
  {
    id: 'proj-4',
    title: 'Solstice - Ambient Soundscapes',
    prompt: 'Generative ambient soundscape web app with frequency visualizer, binaural beats synthesizer, and dusk aesthetic.',
    device: 'Tablet',
    updatedAt: '3 days ago',
    updatedTimestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
    status: 'Draft',
    category: 'drafts',
    accentColor: '#ff6326',
    previewType: 'creative',
  },
  {
    id: 'proj-5',
    title: 'Kroma Design System Tokens',
    prompt: 'Component library documentation and design token explorer with live interactive sandbox previews and code copy widgets.',
    device: 'Responsive',
    updatedAt: '5 days ago',
    updatedTimestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
    status: 'Draft',
    category: 'drafts',
    accentColor: '#06b6d4',
    previewType: 'docs',
  },
  {
    id: 'proj-6',
    title: 'Apex Capital - Web3 Treasury',
    prompt: 'Institutional treasury and asset management portal with fund performance charts, real-time APY ticker, and governance voting.',
    device: 'Desktop',
    updatedAt: '1 week ago',
    updatedTimestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
    status: 'Published',
    category: 'all',
    accentColor: '#ec4899',
    previewType: 'fintech',
  },
]

const QUICK_SUGGESTIONS = [
  '⚡ AI SaaS Landing Page with pricing calculator and testimonials',
  '🎨 Dark obsidian portfolio with interactive 3D work gallery',
  '🛍️ Minimalist luxury e-commerce with cart drawer and filter pills',
  '📊 FinTech dashboard with real-time analytics graphs',
]

export const DashboardPage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Projects state
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch {
      // Fallback on storage errors
    }
    return DEFAULT_PROJECTS
  })

  // UI state
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'recent' | 'drafts'
  const [searchQuery, setSearchQuery] = useState('')
  const [promptInput, setPromptInput] = useState('')
  const [activeMenuId, setActiveMenuId] = useState(null)

  // Modals state
  const [renamingProject, setRenamingProject] = useState(null)
  const [renameValue, setRenameValue] = useState('')
  const [deletingProject, setDeletingProject] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)

  const menuRef = useRef(null)

  // Save projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
    } catch {
      // Ignore quota errors
    }
  }, [projects])

  // Close actions menu on outside click or escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenuId(null)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveMenuId(null)
        setRenamingProject(null)
        setDeletingProject(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Auto-dismiss toast
  useEffect(() => {
    if (!toastMessage) return
    const timer = setTimeout(() => setToastMessage(null), 3000)
    return () => clearTimeout(timer)
  }, [toastMessage])

  const showToast = (msg) => {
    setToastMessage(msg)
  }

  // Handle Logout
  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  // Handle Prompt Submission (Redirects to /builder?prompt=...)
  const handleGeneratePrompt = (e) => {
    e?.preventDefault()
    const cleanPrompt = promptInput.trim()
    if (!cleanPrompt) return
    navigate(`/builder?prompt=${encodeURIComponent(cleanPrompt)}`)
  }

  // Handle Quick Blank Project
  const handleOpenBlankProject = () => {
    navigate('/builder')
  }

  // Open Project in Builder
  const handleOpenBuilder = (project) => {
    setActiveMenuId(null)
    navigate(`/builder?project=${project.id}&prompt=${encodeURIComponent(project.prompt)}`)
  }

  // Rename Flow
  const startRename = (project) => {
    setActiveMenuId(null)
    setRenamingProject(project)
    setRenameValue(project.title)
  }

  const confirmRename = (e) => {
    e.preventDefault()
    if (!renameValue.trim() || !renamingProject) return

    setProjects((prev) =>
      prev.map((p) =>
        p.id === renamingProject.id
          ? {
              ...p,
              title: renameValue.trim(),
              updatedAt: 'Just now',
              updatedTimestamp: Date.now(),
            }
          : p
      )
    )
    showToast(`Renamed to "${renameValue.trim()}"`)
    setRenamingProject(null)
  }

  // Delete Flow
  const startDelete = (project) => {
    setActiveMenuId(null)
    setDeletingProject(project)
  }

  const confirmDelete = () => {
    if (!deletingProject) return
    const targetTitle = deletingProject.title
    setProjects((prev) => prev.filter((p) => p.id !== deletingProject.id))
    showToast(`Deleted "${targetTitle}"`)
    setDeletingProject(null)
  }

  // Duplicate Flow
  const handleDuplicate = (project) => {
    setActiveMenuId(null)
    const newProject = {
      ...project,
      id: `proj-${Date.now()}`,
      title: `${project.title} (Copy)`,
      status: 'Draft',
      category: 'drafts',
      updatedAt: 'Just now',
      updatedTimestamp: Date.now(),
    }
    setProjects((prev) => [newProject, ...prev])
    showToast(`Duplicated "${project.title}"`)
  }

  // Filter & Search Logic
  const filteredProjects = projects.filter((project) => {
    // Tab filter
    if (activeTab === 'recent') {
      if (project.category !== 'recent') return false
    } else if (activeTab === 'drafts') {
      const isDraft = project.status === 'Draft' || project.category === 'drafts'
      if (!isDraft) return false
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      const titleMatch = project.title.toLowerCase().includes(q)
      const promptMatch = project.prompt.toLowerCase().includes(q)
      return titleMatch || promptMatch
    }

    return true
  })

  // Tab counts
  const recentCount = projects.filter((p) => p.category === 'recent').length
  const draftsCount = projects.filter(
    (p) => p.status === 'Draft' || p.category === 'drafts'
  ).length

  // User Initials
  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U'

  // Device icon helper
  const renderDeviceIcon = (device) => {
    switch (device) {
      case 'Mobile':
        return <Smartphone className="w-3 h-3" />
      case 'Tablet':
        return <Tablet className="w-3 h-3" />
      case 'Responsive':
        return <Layers className="w-3 h-3" />
      default:
        return <Monitor className="w-3 h-3" />
    }
  }

  // Status badge styling helper
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Published':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Published
          </span>
        )
      case 'Draft':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Draft
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            In Progress
          </span>
        )
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-[#fbf9f5] flex flex-col font-sans selection:bg-[#ff6326]/30 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-slide-up flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#14141a] border border-[#ff6326]/30 text-xs text-[#fbf9f5] shadow-2xl backdrop-blur-md">
          <Check className="w-4 h-4 text-[#ff6326]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-[rgba(244,240,232,0.08)] bg-[#0c0c10]/85 backdrop-blur-xl px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Engine Indicator */}
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="focus:outline-none cursor-pointer">
              <FormaLogo size="md" showTagline={true} variant="dark" />
            </a>
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#14141a] border border-[rgba(244,240,232,0.06)] text-[11px] font-mono text-[#9c978e]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>AGENT ENGINE ACTIVE</span>
            </div>
          </div>

          {/* User Controls & Logout */}
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={handleOpenBlankProject}
              className="bg-[#ff6326] text-white hover:bg-[#ff7a45] active:bg-[#e0551e] border-0 text-xs shadow-lg shadow-[#ff6326]/20 font-medium cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              <span className="hidden sm:inline">New Website</span>
              <span className="sm:hidden">New</span>
            </Button>

            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#121217] border border-[rgba(244,240,232,0.08)]">
              <div className="w-6 h-6 rounded-full bg-[#ff6326] text-white flex items-center justify-center text-[11px] font-bold font-mono shadow-sm">
                {initials}
              </div>
              <span className="text-xs text-[#dcd7ce] font-medium max-w-[140px] truncate">
                {user?.email || 'Creator'}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-[rgba(244,240,232,0.12)] text-[#9c978e] hover:text-white hover:bg-white/5 text-xs h-9 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 sm:mr-1.5" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col gap-10">
        {/* Hero Section: "Create New Website" Prompt Input */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121217] via-[#0f0f14] to-[#0a0a0d] border border-[rgba(244,240,232,0.1)] p-6 sm:p-10 shadow-2xl text-left">
          {/* Ambient Glows */}
          <div
            className="pointer-events-none absolute -top-24 right-0 w-96 h-96 bg-[#ff6326]/10 rounded-full blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 left-1/4 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl flex flex-col gap-5">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-[#ff6326] bg-[#ff6326]/10 border border-[#ff6326]/20 w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Website Synthesis</span>
            </div>

            {/* Hero Heading */}
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fbf9f5] font-display">
                Create New Website
              </h1>
              <p className="text-sm sm:text-base text-[#9c978e] leading-relaxed">
                Describe the website, landing page, or web application you want to build. FORMA will synthesize the architecture, components, and code in real time.
              </p>
            </div>

            {/* Quick Prompt Input Bar */}
            <form onSubmit={handleGeneratePrompt} className="w-full mt-2">
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 rounded-2xl bg-[#09090b]/90 border border-[rgba(244,240,232,0.14)] shadow-xl transition-all duration-200 focus-within:border-[#ff6326]/60 focus-within:ring-2 focus-within:ring-[#ff6326]/20">
                <div className="flex items-center flex-1 pl-3 gap-3">
                  <Sparkles className="w-5 h-5 text-[#ff6326] flex-shrink-0 animate-pulse" />
                  <input
                    type="text"
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    placeholder="E.g., A minimalist dark portfolio for an AI engineer with live interactive demos..."
                    className="w-full bg-transparent py-2.5 text-sm sm:text-base text-[#fbf9f5] placeholder:text-[#635f58] outline-none font-sans"
                  />
                  {promptInput && (
                    <button
                      type="button"
                      onClick={() => setPromptInput('')}
                      className="p-1 text-[#635f58] hover:text-[#fbf9f5] transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={!promptInput.trim()}
                  className="bg-[#ff6326] hover:bg-[#ff7a45] active:bg-[#e0551e] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all sm:w-auto w-full flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>Build Website</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>

            {/* Quick Suggestion Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-semibold text-[#635f58] uppercase tracking-wider mr-1">
                Try:
              </span>
              {QUICK_SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPromptInput(sug.slice(2).trim())}
                  className="px-3 py-1 rounded-full text-xs text-[#9c978e] hover:text-[#fbf9f5] bg-[#14141a] hover:bg-[#1c1c24] border border-[rgba(244,240,232,0.06)] hover:border-[rgba(244,240,232,0.15)] transition-all cursor-pointer truncate max-w-full text-left"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Control Bar: Tabs & Search */}
        <section className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[rgba(244,240,232,0.08)] pb-5">
          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#ff6326]/10 text-[#ff6326] border border-[#ff6326]/30 shadow-sm'
                  : 'text-[#9c978e] hover:text-[#fbf9f5] hover:bg-[#14141a] border border-transparent'
              }`}
            >
              <span>All Projects</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                  activeTab === 'all'
                    ? 'bg-[#ff6326]/20 text-[#ff6326]'
                    : 'bg-[#14141a] text-[#635f58]'
                }`}
              >
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('recent')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'recent'
                  ? 'bg-[#ff6326]/10 text-[#ff6326] border border-[#ff6326]/30 shadow-sm'
                  : 'text-[#9c978e] hover:text-[#fbf9f5] hover:bg-[#14141a] border border-transparent'
              }`}
            >
              <span>Recent</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                  activeTab === 'recent'
                    ? 'bg-[#ff6326]/20 text-[#ff6326]'
                    : 'bg-[#14141a] text-[#635f58]'
                }`}
              >
                {recentCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('drafts')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'drafts'
                  ? 'bg-[#ff6326]/10 text-[#ff6326] border border-[#ff6326]/30 shadow-sm'
                  : 'text-[#9c978e] hover:text-[#fbf9f5] hover:bg-[#14141a] border border-transparent'
              }`}
            >
              <span>Drafts</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                  activeTab === 'drafts'
                    ? 'bg-[#ff6326]/20 text-[#ff6326]'
                    : 'bg-[#14141a] text-[#635f58]'
                }`}
              >
                {draftsCount}
              </span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#635f58] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full bg-[#121217] border border-[rgba(244,240,232,0.1)] rounded-xl pl-9 pr-8 py-2 text-xs sm:text-sm text-[#fbf9f5] placeholder:text-[#635f58] outline-none focus:border-[#ff6326]/50 focus:ring-1 focus:ring-[#ff6326]/30 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#635f58] hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </section>

        {/* Projects Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Empty State Card: "+ Blank Project" */}
          <div
            onClick={handleOpenBlankProject}
            className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-[rgba(244,240,232,0.12)] hover:border-[#ff6326]/60 bg-[#0c0c10]/40 hover:bg-[#121218]/60 transition-all duration-300 cursor-pointer min-h-[320px] text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#14141a] group-hover:bg-[#ff6326]/10 border border-[rgba(244,240,232,0.1)] group-hover:border-[#ff6326]/30 flex items-center justify-center text-[#9c978e] group-hover:text-[#ff6326] transition-all duration-300 mb-4 group-hover:scale-110 shadow-lg">
              <Plus className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-[#fbf9f5] group-hover:text-[#ff6326] transition-colors font-display">
              + Blank Project
            </h3>
            <p className="text-xs text-[#9c978e] max-w-xs mt-2 leading-relaxed">
              Start with a clean canvas. Design and assemble components freely with the FORMA engine.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#9c978e] group-hover:text-white transition-colors">
              <span>Open Blank Canvas</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>

          {/* Render Mock Project Cards */}
          {filteredProjects.map((project) => {
            const isMenuOpen = activeMenuId === project.id

            return (
              <SpotlightCard
                key={project.id}
                spotlightColor="rgba(255, 99, 38, 0.12)"
                borderColor="rgba(255, 99, 38, 0.25)"
                className="bg-[#0f0f14] border-[rgba(244,240,232,0.08)] p-0 rounded-2xl flex flex-col justify-between overflow-visible transition-all duration-300 hover:border-[rgba(244,240,232,0.2)] shadow-xl"
              >
                {/* Visual Preview Header (Mini Browser Chrome) */}
                <div className="relative w-full h-36 bg-[#09090b] rounded-t-2xl border-b border-[rgba(244,240,232,0.06)] overflow-hidden flex flex-col p-3">
                  {/* Browser Bar */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500/70" />
                      <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                    </div>
                    <div className="flex-1 max-w-[150px] mx-auto px-2 py-0.5 rounded bg-[#14141a] text-[10px] text-[#635f58] font-mono truncate text-center">
                      forma.run/{project.id}
                    </div>
                    {/* Device Badge */}
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#14141a] border border-[rgba(244,240,232,0.06)] text-[10px] font-mono text-[#9c978e]">
                      {renderDeviceIcon(project.device)}
                      <span>{project.device}</span>
                    </div>
                  </div>

                  {/* Stylized Miniature Page Layout Mock */}
                  <div className="flex-1 rounded-lg bg-[#0e0e13] border border-[rgba(244,240,232,0.04)] p-2.5 flex flex-col gap-2 relative overflow-hidden">
                    <div
                      className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-xl opacity-30"
                      style={{ backgroundColor: project.accentColor }}
                    />
                    <div className="w-1/2 h-2 rounded bg-white/20" />
                    <div className="w-3/4 h-1.5 rounded bg-white/10" />
                    <div className="grid grid-cols-3 gap-1.5 mt-auto">
                      <div className="h-7 rounded bg-white/5 border border-white/5" />
                      <div className="h-7 rounded bg-white/5 border border-white/5" />
                      <div className="h-7 rounded bg-white/5 border border-white/5" />
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4 text-left">
                  <div className="flex flex-col gap-2">
                    {/* Status & Actions Row */}
                    <div className="flex items-center justify-between gap-2">
                      {renderStatusBadge(project.status)}

                      {/* Dropdown Menu Container */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveMenuId(isMenuOpen ? null : project.id)
                          }}
                          aria-label="Project actions"
                          className="p-1.5 rounded-lg text-[#9c978e] hover:text-[#fbf9f5] hover:bg-[#1c1c24] transition-colors cursor-pointer"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {/* Actions Menu Dropdown */}
                        {isMenuOpen && (
                          <div
                            ref={menuRef}
                            className="absolute right-0 top-8 z-50 w-44 rounded-xl bg-[#14141a] border border-[rgba(244,240,232,0.12)] shadow-2xl py-1.5 flex flex-col animate-fadeIn text-left backdrop-blur-xl"
                          >
                            <button
                              type="button"
                              onClick={() => handleOpenBuilder(project)}
                              className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#fbf9f5] hover:bg-[#1f1f28] hover:text-[#ff6326] transition-colors cursor-pointer"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Open Builder</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => startRename(project)}
                              className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#fbf9f5] hover:bg-[#1f1f28] transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5 text-[#9c978e]" />
                              <span>Rename</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDuplicate(project)}
                              className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#fbf9f5] hover:bg-[#1f1f28] transition-colors cursor-pointer"
                            >
                              <Copy className="w-3.5 h-3.5 text-[#9c978e]" />
                              <span>Duplicate</span>
                            </button>

                            <div className="my-1 border-t border-[rgba(244,240,232,0.06)]" />

                            <button
                              type="button"
                              onClick={() => startDelete(project)}
                              className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-[#fbf9f5] font-display tracking-tight group-hover:text-white transition-colors truncate">
                      {project.title}
                    </h3>

                    {/* Prompt Preview Quote */}
                    <p className="text-xs text-[#9c978e] line-clamp-2 leading-relaxed italic">
                      &ldquo;{project.prompt}&rdquo;
                    </p>
                  </div>

                  {/* Card Footer: Updated Time & Open Builder Button */}
                  <div className="pt-3 border-t border-[rgba(244,240,232,0.06)] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#635f58] font-mono">
                      <Clock className="w-3 h-3 text-[#9c978e]" />
                      <span>{project.updatedAt}</span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenBuilder(project)}
                      className="border-[rgba(244,240,232,0.12)] text-[#fbf9f5] hover:text-[#ff6326] hover:border-[#ff6326]/40 hover:bg-[#ff6326]/5 text-xs h-8 px-3 rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Open Builder</span>
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </SpotlightCard>
            )
          })}
        </section>

        {/* Empty Search / Filter Feedback */}
        {filteredProjects.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-[#0f0f14] border border-[rgba(244,240,232,0.08)] flex flex-col items-center gap-3">
            <LayoutTemplate className="w-10 h-10 text-[#635f58]" />
            <h4 className="text-base font-semibold text-[#fbf9f5]">No matching projects</h4>
            <p className="text-xs text-[#9c978e] max-w-sm">
              We couldn&apos;t find any projects matching &ldquo;{searchQuery}&rdquo; in the selected tab.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('')
                setActiveTab('all')
              }}
              className="mt-2 text-xs border-[rgba(244,240,232,0.15)] text-[#fbf9f5] cursor-pointer"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </main>

      {/* Rename Modal */}
      {renamingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-[#121217] border border-[rgba(244,240,232,0.15)] p-6 shadow-2xl flex flex-col gap-5 text-left">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#fbf9f5] font-display">Rename Project</h3>
              <button
                onClick={() => setRenamingProject(null)}
                className="text-[#9c978e] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={confirmRename} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#9c978e]">Project Name</label>
                <input
                  type="text"
                  autoFocus
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  className="w-full bg-[#09090b] border border-[rgba(244,240,232,0.15)] rounded-xl px-3.5 py-2.5 text-sm text-[#fbf9f5] outline-none focus:border-[#ff6326] focus:ring-1 focus:ring-[#ff6326] transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setRenamingProject(null)}
                  className="border-[rgba(244,240,232,0.15)] text-[#9c978e] hover:text-white text-xs cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={!renameValue.trim()}
                  className="bg-[#ff6326] hover:bg-[#ff7a45] text-white text-xs cursor-pointer font-semibold border-0"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-[#121217] border border-[rgba(244,240,232,0.15)] p-6 shadow-2xl flex flex-col gap-4 text-left">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg font-bold text-[#fbf9f5] font-display">Delete Project</h3>
              <p className="text-xs text-[#9c978e] leading-relaxed">
                Are you sure you want to delete <strong className="text-white">&ldquo;{deletingProject.title}&rdquo;</strong>? This action will permanently remove this project and its generated code canvas.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[rgba(244,240,232,0.06)]">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setDeletingProject(null)}
                className="border-[rgba(244,240,232,0.15)] text-[#9c978e] hover:text-white text-xs cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={confirmDelete}
                className="bg-rose-600 hover:bg-rose-500 text-white text-xs cursor-pointer font-semibold border-0"
              >
                Delete Project
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full border-t border-[rgba(244,240,232,0.06)] py-6 text-center text-xs text-[#635f58] mt-12">
        FORMA &bull; Give thought its form. &bull; Project Dashboard
      </footer>
    </div>
  )
}
