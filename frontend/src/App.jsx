import { useState, useEffect, useId } from 'react'
import './App.css'

const PRESET_PROMPTS = [
  {
    label: '🚀 SaaS Platform',
    prompt: 'High-converting SaaS landing page for an AI developer platform with feature highlights, performance stats, and sleek dark mode.',
  },
  {
    label: '💼 Designer Portfolio',
    prompt: 'Minimalist creative portfolio for a senior product designer with featured case studies, skills grid, and contact modal.',
  },
  {
    label: '☕ Artisan Coffee',
    prompt: 'Warm artisanal coffee roastery website with signature single-origin beans menu, brewing guides, and store location.',
  },
  {
    label: '⚡ Web3 Protocol',
    prompt: 'Futuristic decentralized finance analytics dashboard with real-time liquidity stats, tokenomics, and protocol security metrics.',
  },
]

const CHALLENGES = [
  {
    problem: 'Technical skills & design barrier',
    solution: 'Natural language agent translates ideas into harmonious typography and palettes',
  },
  {
    problem: 'Manual coding is time-consuming',
    solution: 'Automated synthesis generates semantic, production-ready code in seconds',
  },
  {
    problem: 'Rigid drag-and-drop builder limits',
    solution: 'Open, customizable HTML5 and CSS3 without proprietary template lock-in',
  },
  {
    problem: 'Translating ideas into structure',
    solution: 'Infers semantic architecture, component hierarchies, and responsive grids',
  },
  {
    problem: 'Repeated developer involvement',
    solution: 'Frictionless, autonomous iteration through follow-up natural language prompts',
  },
]

function createDefaultWebsite(prompt, theme = 'dark') {
  const primaryTopic = prompt.split(' ').slice(0, 4).join(' ') || 'Modern Web Project'
  const isLight = theme === 'light'
  const isCyber = theme === 'cyber'

  const bg = isLight ? '#f8fafc' : isCyber ? '#090d16' : '#0b0f19'
  const cardBg = isLight ? '#ffffff' : isCyber ? '#0f172a' : '#111827'
  const text = isLight ? '#0f172a' : '#f8fafc'
  const muted = isLight ? '#64748b' : '#94a3b8'
  const accent = isLight ? '#4f46e5' : isCyber ? '#06b6d4' : '#8b5cf6'
  const border = isLight ? '#e2e8f0' : isCyber ? '#1e293b' : '#1f2937'

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${primaryTopic}</title>
  <style>
    :root {
      --bg: ${bg};
      --card-bg: ${cardBg};
      --text: ${text};
      --muted: ${muted};
      --accent: ${accent};
      --border: ${border};
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
    }
    header {
      padding: 1.25rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border);
    }
    .brand { font-weight: 700; font-size: 1.25rem; color: var(--accent); }
    .nav-links a {
      color: var(--muted);
      text-decoration: none;
      margin-left: 1.5rem;
      font-size: 0.95rem;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--text); }
    .hero-section {
      text-align: center;
      padding: 5rem 1.5rem 4rem;
      max-width: 860px;
      margin: 0 auto;
    }
    .badge {
      display: inline-block;
      padding: 0.35rem 0.85rem;
      background: rgba(139, 92, 246, 0.15);
      color: var(--accent);
      border-radius: 9999px;
      font-size: 0.85rem;
      margin-bottom: 1.5rem;
      font-weight: 600;
    }
    h1 {
      font-size: clamp(2.25rem, 5vw, 3.5rem);
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 1.25rem;
    }
    .hero-desc {
      font-size: 1.2rem;
      color: var(--muted);
      max-width: 680px;
      margin: 0 auto 2.5rem;
    }
    .cta-btn {
      display: inline-block;
      background: var(--accent);
      color: #fff;
      padding: 0.85rem 2rem;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      transition: transform 0.2s, opacity 0.2s;
    }
    .cta-btn:hover { opacity: 0.92; transform: translateY(-1px); }
    .grid-section {
      padding: 4rem 1.5rem;
      max-width: 1100px;
      margin: 0 auto;
    }
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 2rem;
    }
    .card h3 { font-size: 1.25rem; margin-bottom: 0.75rem; color: var(--text); }
    .card p { color: var(--muted); font-size: 0.95rem; }
    footer {
      text-align: center;
      padding: 3rem 1.5rem;
      border-top: 1px solid var(--border);
      color: var(--muted);
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <header>
    <div class="brand">${primaryTopic}</div>
    <nav class="nav-links">
      <a href="#features">Features</a>
      <a href="#solutions">Solutions</a>
      <a href="#cta">Contact</a>
    </nav>
  </header>
  <main>
    <section class="hero-section">
      <span class="badge">AI Prompt Generated</span>
      <h1>${primaryTopic}</h1>
      <p class="hero-desc">Generated from prompt: "${prompt}". Designed to be fast, responsive, and intuitive.</p>
      <a href="#cta" class="cta-btn">Explore Platform</a>
    </section>
    <section id="features" class="grid-section">
      <div class="cards-grid">
        <div class="card">
          <h3>⚡ Instant Layouts</h3>
          <p>No manual HTML/CSS wrangling. Built from natural language intent.</p>
        </div>
        <div class="card">
          <h3>🎨 Harmonious Design</h3>
          <p>Curated color tokens, modern typography, and structured content blocks.</p>
        </div>
        <div class="card">
          <h3>🔄 Rapid Iteration</h3>
          <p>Easily tweak wording, themes, or layouts through continuous conversational prompts.</p>
        </div>
      </div>
    </section>
  </main>
  <footer id="cta">
    <p>&copy; 2026 ${primaryTopic}. Created by AI Website Builder Agent.</p>
  </footer>
</body>
</html>`

  return {
    project_name: primaryTopic,
    summary: `Prompt-driven website synthesized for: "${prompt}"`,
    theme,
    design_tokens: {
      background: bg,
      card_background: cardBg,
      text,
      muted_text: muted,
      accent,
      border,
    },
    sections: [
      { id: 'hero', type: 'hero', title: primaryTopic, content: `Synthesized from: "${prompt}"` },
      { id: 'features', type: 'features', title: 'Feature Highlights', content: 'Instant semantic synthesis, layout grids, design tokens' },
      { id: 'cta', type: 'cta', title: 'Call To Action', content: 'Ready to launch without developer bottleneck' },
    ],
    html,
  }
}

function App() {
  const promptId = useId()
  const themeId = useId()
  const styleId = useId()

  const [prompt, setPrompt] = useState(PRESET_PROMPTS[0].prompt)
  const [theme, setTheme] = useState('dark')
  const [style, setStyle] = useState('modern')
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState('preview')
  const [viewport, setViewport] = useState('desktop')
  const [backendOnline, setBackendOnline] = useState(false)
  const [websiteData, setWebsiteData] = useState(() => createDefaultWebsite(PRESET_PROMPTS[0].prompt, 'dark'))
  const [copyStatus, setCopyStatus] = useState('Copy Code')

  // Check backend health on mount
  useEffect(() => {
    let isMounted = true
    const checkBackend = async () => {
      try {
        const res = await fetch('http://localhost:8000/health')
        if (res.ok && isMounted) {
          setBackendOnline(true)
        }
      } catch {
        if (isMounted) {
          setBackendOnline(false)
        }
      }
    }
    checkBackend()
    return () => {
      isMounted = false
    }
  }, [])

  const handleGenerate = async (e) => {
    if (e) e.preventDefault()
    if (!prompt.trim()) return

    setIsGenerating(true)
    try {
      if (backendOnline) {
        const response = await fetch('http://localhost:8000/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, theme, style }),
        })
        if (response.ok) {
          const data = await response.json()
          setWebsiteData(data)
          setIsGenerating(false)
          return
        }
      }
      // Built-in autonomous synthesis fallback
      setTimeout(() => {
        setWebsiteData(createDefaultWebsite(prompt, theme))
        setIsGenerating(false)
      }, 350)
    } catch {
      setWebsiteData(createDefaultWebsite(prompt, theme))
      setIsGenerating(false)
    }
  }

  const handlePresetClick = (presetPrompt) => {
    setPrompt(presetPrompt)
  }

  const handleRefine = (refinement) => {
    const refined = `${prompt}. ${refinement}`
    setPrompt(refined)
  }

  const handleCopyCode = async () => {
    if (websiteData?.html) {
      await navigator.clipboard.writeText(websiteData.html)
      setCopyStatus('Copied!')
      setTimeout(() => setCopyStatus('Copy Code'), 2000)
    }
  }

  const handleDownload = () => {
    if (!websiteData?.html) return
    const blob = new Blob([websiteData.html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'index.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="app-container">
      {/* Top Header */}
      <header className="header-nav">
        <div className="brand-wrapper">
          <div className="brand-logo-icon">🌐</div>
          <div>
            <h1 className="brand-title">WebAgent Studio</h1>
            <span className="brand-badge">Prompt to Website</span>
          </div>
        </div>
        <div className="header-meta">
          <div className="status-indicator">
            <span className={`status-dot ${backendOnline ? '' : 'offline'}`}></span>
            <span>{backendOnline ? 'FastAPI Agent Connected' : 'Local Synthesis Ready'}</span>
          </div>
        </div>
      </header>

      {/* Hero Problem Statement & Intro */}
      <section className="hero-header">
        <div className="hero-pill">
          <span>✨ Autonomous Web Generation</span>
        </div>
        <h2 className="hero-title">
          An AI Agent That Builds Websites from <span className="hero-title-highlight">Natural Language Prompts</span>
        </h2>
        <p className="hero-subtitle">
          Eliminate technical friction, manual coding bottlenecks, and rigid drag-and-drop templates. Describe your vision in plain English and let the agent synthesize responsive, production-ready web experiences.
        </p>

        {/* Challenges Addressed Matrix */}
        <div className="challenges-matrix">
          <div className="challenges-header">
            <h3 className="challenges-heading">
              <span>🎯</span> Key Challenges Overcome by Our Agent
            </h3>
          </div>
          <div className="challenges-grid">
            {CHALLENGES.map((c) => (
              <div key={c.problem} className="challenge-item">
                <div className="challenge-problem">
                  <span>✕</span> {c.problem}
                </div>
                <div className="challenge-solution">
                  <span>✓</span> {c.solution}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Workspace */}
      <div className="studio-layout">
        {/* Left: Prompt Controls */}
        <div className="prompt-panel">
          <div className="panel-header">
            <h3 className="panel-title">
              <span>✍️</span> Prompt Studio
            </h3>
          </div>

          <div>
            <div className="preset-chips-label">Quick Concept Starters</div>
            <div className="preset-chips">
              {PRESET_PROMPTS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="chip-btn"
                  onClick={() => handlePresetClick(item.prompt)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleGenerate} className="prompt-input-wrapper">
            <label htmlFor={promptId} className="control-label">
              Describe your website concept:
            </label>
            <textarea
              id={promptId}
              className="prompt-textarea"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g. A modern dark landing page for an AI robotics startup with hero section, feature cards, and interactive CTA..."
              rows={4}
            />

            <div className="controls-grid">
              <div className="control-group">
                <label htmlFor={themeId} className="control-label">
                  Visual Theme
                </label>
                <select
                  id={themeId}
                  className="control-select"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="dark">Modern Dark</option>
                  <option value="light">Clean Light</option>
                  <option value="cyber">Cyber Neon</option>
                </select>
              </div>

              <div className="control-group">
                <label htmlFor={styleId} className="control-label">
                  Aesthetic Style
                </label>
                <select
                  id={styleId}
                  className="control-select"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                >
                  <option value="modern">Modern & Clean</option>
                  <option value="minimal">Minimalist</option>
                  <option value="bold">Bold & Expressive</option>
                </select>
              </div>
            </div>

            <button type="submit" className="generate-btn" disabled={isGenerating || !prompt.trim()}>
              {isGenerating ? (
                <>
                  <div className="spinner"></div>
                  Synthesizing Website...
                </>
              ) : (
                <>
                  <span>⚡</span> Generate Website
                </>
              )}
            </button>
          </form>

          {/* Prompt Iteration / Refinement */}
          <div className="refinements-section">
            <div className="refinements-title">Instant Conversational Iterations</div>
            <div className="refinement-list">
              <button
                type="button"
                className="refinement-btn"
                onClick={() => handleRefine('Add customer testimonials and social proof')}
              >
                + Add customer testimonials and social proof
              </button>
              <button
                type="button"
                className="refinement-btn"
                onClick={() => handleRefine('Include a 3-tier pricing table with Monthly and Yearly toggle')}
              >
                + Include a 3-tier pricing table with toggle
              </button>
              <button
                type="button"
                className="refinement-btn"
                onClick={() => handleRefine('Add an interactive FAQ accordion section')}
              >
                + Add an interactive FAQ accordion section
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live Interactive Preview & Inspector */}
        <div className="preview-panel">
          <div className="preview-topbar">
            {/* View Tabs */}
            <div className="tab-switcher">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
                onClick={() => setActiveTab('preview')}
              >
                🖥️ Live Preview
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'blueprint' ? 'active' : ''}`}
                onClick={() => setActiveTab('blueprint')}
              >
                📐 Blueprint & Tokens
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'code' ? 'active' : ''}`}
                onClick={() => setActiveTab('code')}
              >
                💻 Code Inspector
              </button>
            </div>

            {/* Viewport Toggles for Live Preview */}
            {activeTab === 'preview' && (
              <div className="viewport-controls">
                <button
                  type="button"
                  className={`viewport-btn ${viewport === 'desktop' ? 'active' : ''}`}
                  onClick={() => setViewport('desktop')}
                  title="Desktop (100%)"
                >
                  🖥️ Desktop
                </button>
                <button
                  type="button"
                  className={`viewport-btn ${viewport === 'tablet' ? 'active' : ''}`}
                  onClick={() => setViewport('tablet')}
                  title="Tablet (768px)"
                >
                  📱 Tablet
                </button>
                <button
                  type="button"
                  className={`viewport-btn ${viewport === 'mobile' ? 'active' : ''}`}
                  onClick={() => setViewport('mobile')}
                  title="Mobile (375px)"
                >
                  📱 Mobile
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="export-actions">
              <button type="button" className="secondary-btn" onClick={handleCopyCode}>
                <span>📋</span> {copyStatus}
              </button>
              <button type="button" className="secondary-btn" onClick={handleDownload}>
                <span>💾</span> Download HTML
              </button>
            </div>
          </div>

          {/* Active Tab Views */}
          {activeTab === 'preview' && (
            <div className="preview-stage">
              <div className={`preview-frame-wrapper ${viewport}`}>
                <iframe
                  title="Generated Website Preview"
                  className="preview-iframe"
                  srcDoc={websiteData?.html || ''}
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          )}

          {activeTab === 'blueprint' && (
            <div className="blueprint-stage">
              <div className="tokens-card">
                <h4>Design Tokens & Palette</h4>
                <div className="tokens-grid">
                  {websiteData?.design_tokens &&
                    Object.entries(websiteData.design_tokens).map(([key, value]) => (
                      <div key={key} className="token-swatch">
                        <div className="swatch-color" style={{ backgroundColor: value }}></div>
                        <div>
                          <div>{key}</div>
                          <code style={{ fontSize: '0.72rem' }}>{value}</code>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="tokens-card">
                <h4>Synthesized Component Architecture</h4>
                <div className="sections-list" style={{ marginTop: '0.75rem' }}>
                  {websiteData?.sections?.map((sec) => (
                    <div key={sec.id} className="section-item-card">
                      <div className="section-header">
                        <span className="section-name">{sec.title}</span>
                        <span className="section-type-badge">&lt;{sec.type}&gt;</span>
                      </div>
                      <div className="section-desc">{sec.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="code-stage">
              <div className="code-wrapper">
                <pre className="code-pre">
                  <code>{websiteData?.html}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>An AI Agent That Builds Websites from Natural Language Prompts &bull; Production-Ready HTML &amp; CSS Generator</p>
      </footer>
    </div>
  )
}

export default App
