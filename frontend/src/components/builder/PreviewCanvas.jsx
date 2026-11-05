import React, { useState, useEffect, useRef, useMemo, Component } from 'react'
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  ExternalLink,
  AlertTriangle,
  Lock,
  Maximize2,
  Minimize2,
  X,
} from 'lucide-react'

/**
 * Standard Error Boundary for Catching React Rendering Errors in PreviewCanvas
 */
class PreviewErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('PreviewCanvas ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full min-h-[350px] flex flex-col items-center justify-center p-8 rounded-2xl bg-[#121217] border border-rose-500/30 text-center gap-4 animate-fadeIn">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-1.5 max-w-md">
            <h3 className="text-base font-bold text-white font-display">Preview Render Error</h3>
            <p className="text-xs text-[#9c978e] leading-relaxed">
              {this.state.error?.message || 'An unexpected rendering error occurred inside the preview component.'}
            </p>
          </div>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null })
              this.props.onReset?.()
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#ff6326] text-white hover:bg-[#ff7a45] transition-all cursor-pointer shadow-lg shadow-[#ff6326]/20"
          >
            Retry Render
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

/**
 * Default HTML generator when no external code is provided
 */
const getDefaultHtml = (prompt = 'AI-Generated Modern Landing Page') => `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FORMA Live Canvas Preview</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: #09090b;
      color: #fbf9f5;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
    }
    h1, h2, h3, h4 {
      font-family: 'Space Grotesk', sans-serif;
    }
    .glow-orange {
      box-shadow: 0 0 50px -10px rgba(255, 99, 38, 0.35);
    }
  </style>
</head>
<body class="min-h-screen bg-[#09090b] text-[#fbf9f5] flex flex-col justify-between selection:bg-[#ff6326]/30">
  <!-- Interactive Navbar -->
  <header class="w-full border-b border-white/10 bg-[#0c0c10]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
    <div class="flex items-center gap-2.5">
      <div class="w-7 h-7 rounded-lg bg-[#ff6326] flex items-center justify-center font-bold text-white text-xs">
        F
      </div>
      <span class="font-bold tracking-wider text-sm font-['Space_Grotesk']">FORMA CANVA</span>
    </div>
    <div class="hidden sm:flex items-center gap-5 text-xs text-neutral-400 font-medium">
      <a href="#features" class="hover:text-white transition-colors">Features</a>
      <a href="#metrics" class="hover:text-white transition-colors">Metrics</a>
      <a href="#showcase" class="hover:text-white transition-colors">Showcase</a>
    </div>
    <button class="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#ff6326] text-white hover:bg-[#ff7a45] transition-all cursor-pointer">
      Get Started
    </button>
  </header>

  <!-- Hero Section -->
  <main class="flex-1 max-w-4xl mx-auto px-6 py-12 sm:py-16 flex flex-col items-center text-center gap-6">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-[#ff6326] bg-[#ff6326]/10 border border-[#ff6326]/20">
      <span class="w-2 h-2 rounded-full bg-[#ff6326] animate-ping"></span>
      <span>Live Canvas Active</span>
    </div>

    <h1 class="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
      ${prompt}
    </h1>

    <p class="text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed">
      Synthesized in real-time via the FORMA natural language code generator. Responsive across desktop, tablet, and mobile displays.
    </p>

    <div class="flex flex-wrap items-center justify-center gap-3 mt-2">
      <button class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#ff6326] text-white hover:bg-[#ff7a45] active:scale-95 transition-all shadow-lg shadow-[#ff6326]/25 cursor-pointer">
        Explore Canvas
      </button>
      <button class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-[#14141a] border border-white/10 text-neutral-300 hover:text-white hover:bg-[#1a1a24] active:scale-95 transition-all cursor-pointer">
        View Code
      </button>
    </div>

    <!-- Feature Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-10 text-left">
      <div class="p-5 rounded-2xl bg-[#0f0f14] border border-white/10 hover:border-[#ff6326]/40 transition-all">
        <div class="text-[#ff6326] font-bold text-lg mb-1">01.</div>
        <h3 class="text-sm font-bold text-white mb-1">Zero Config</h3>
        <p class="text-xs text-neutral-400 leading-relaxed">Instant sandboxed preview with responsive viewport recalculations.</p>
      </div>

      <div class="p-5 rounded-2xl bg-[#0f0f14] border border-white/10 hover:border-[#ff6326]/40 transition-all">
        <div class="text-[#ff6326] font-bold text-lg mb-1">02.</div>
        <h3 class="text-sm font-bold text-white mb-1">Multi-Device</h3>
        <p class="text-xs text-neutral-400 leading-relaxed">Accurate bezel frames for desktop, tablet (768px), and mobile (375px).</p>
      </div>

      <div class="p-5 rounded-2xl bg-[#0f0f14] border border-white/10 hover:border-[#ff6326]/40 transition-all">
        <div class="text-[#ff6326] font-bold text-lg mb-1">03.</div>
        <h3 class="text-sm font-bold text-white mb-1">Error Guard</h3>
        <p class="text-xs text-neutral-400 leading-relaxed">Active error boundary and runtime exception interception.</p>
      </div>
    </div>
  </main>

  <!-- Mini Footer -->
  <footer class="w-full border-t border-white/10 py-5 text-center text-xs text-neutral-500">
    Generated with FORMA Engine &bull; Live Preview
  </footer>
</body>
</html>
`

/**
 * Helper to build the complete sandboxed HTML bundle
 */
function buildSrcDocBundle({ rawHtml, rawCss, rawJs, prompt }) {
  const contentHtml = rawHtml && rawHtml.trim().length > 0 ? rawHtml : getDefaultHtml(prompt)

  // Injection script to capture runtime errors in the iframe and notify the host
  const errorInterceptorScript = `
    <script>
      (function() {
        window.onerror = function(message, source, lineno, colno, error) {
          try {
            window.parent.postMessage({
              type: 'FORMA_PREVIEW_ERROR',
              message: message || (error && error.message) || 'Unknown Script Error',
              lineno: lineno
            }, '*');
          } catch(e) {}
          return false;
        };
        window.addEventListener('unhandledrejection', function(event) {
          try {
            window.parent.postMessage({
              type: 'FORMA_PREVIEW_ERROR',
              message: event.reason ? (event.reason.message || String(event.reason)) : 'Unhandled Promise Rejection'
            }, '*');
          } catch(e) {}
        });
      })();
    </script>
  `

  let finalDoc = contentHtml

  if (rawCss && rawCss.trim()) {
    const styleBlock = `<style>\n${rawCss}\n</style>`
    finalDoc = finalDoc.includes('</head>')
      ? finalDoc.replace('</head>', `${styleBlock}\n</head>`)
      : `${styleBlock}\n${finalDoc}`
  }

  if (rawJs && rawJs.trim()) {
    const scriptBlock = `<script>\ntry {\n${rawJs}\n} catch (err) {\n  window.parent.postMessage({ type: 'FORMA_PREVIEW_ERROR', message: err.message }, '*');\n}\n</script>`
    finalDoc = finalDoc.includes('</body>')
      ? finalDoc.replace('</body>', `${scriptBlock}\n</body>`)
      : `${finalDoc}\n${scriptBlock}`
  }

  // Insert error interceptor inside <head> or at the very beginning
  if (finalDoc.includes('<head>')) {
    finalDoc = finalDoc.replace('<head>', `<head>\n${errorInterceptorScript}`)
  } else {
    finalDoc = `${errorInterceptorScript}\n${finalDoc}`
  }

  return finalDoc
}

/**
 * PreviewCanvas Component
 * Responsive, sandboxed iframe canvas preview with device bezel frames, dimension indicator,
 * reload control, and error boundary.
 */
export const PreviewCanvas = ({
  html,
  css = '',
  js = '',
  code,
  prompt = 'AI-Generated Modern Landing Page',
  initialDevice = 'desktop',
  className = '',
  onDeviceChange,
}) => {
  const [device, setDevice] = useState(initialDevice) // 'desktop' | 'tablet' | 'mobile'
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)
  const [isReloading, setIsReloading] = useState(false)
  const [runtimeError, setRuntimeError] = useState(null)
  const canvasContainerRef = useRef(null)

  const rawHtml = code?.html ?? html
  const rawCss = code?.css ?? css
  const rawJs = code?.js ?? js

  const srcDocBundle = useMemo(
    () => buildSrcDocBundle({ rawHtml, rawCss, rawJs, prompt }),
    [rawHtml, rawCss, rawJs, prompt]
  )

  // Notify parent on device change if listener provided
  const handleDeviceSwitch = (newDevice) => {
    setDevice(newDevice)
    onDeviceChange?.(newDevice)
  }

  // Trigger preview reload
  const handleReload = () => {
    setIsReloading(true)
    setRuntimeError(null)
    setReloadKey((prev) => prev + 1)
    setTimeout(() => setIsReloading(false), 500)
  }

  // Pop out preview into a new browser window/tab
  const handlePopout = () => {
    const newWindow = window.open('', '_blank')
    if (newWindow) {
      newWindow.document.write(srcDocBundle)
      newWindow.document.close()
    }
  }

  // Listen to runtime script errors dispatched from the sandboxed iframe
  useEffect(() => {
    const handleWindowMessage = (event) => {
      if (event.data?.type === 'FORMA_PREVIEW_ERROR') {
        setRuntimeError(event.data.message || 'An unknown script error occurred in the preview.')
      }
    }

    window.addEventListener('message', handleWindowMessage)
    return () => window.removeEventListener('message', handleWindowMessage)
  }, [])

  // Device configuration metadata
  const deviceConfig = {
    desktop: {
      label: 'Desktop',
      widthClass: 'w-full h-full min-h-[580px]',
      dimensionText: '100% (Fluid)',
      bezelClass: 'rounded-xl border border-[rgba(244,240,232,0.1)] bg-[#0c0c10] shadow-2xl',
    },
    tablet: {
      label: 'Tablet',
      widthClass: 'w-[768px] max-w-[95%] h-[820px] max-h-[82vh]',
      dimensionText: '768 × 1024 px',
      bezelClass: 'border-[8px] sm:border-[10px] border-[#18181f] rounded-[28px] sm:rounded-[36px] bg-[#18181f] shadow-2xl ring-1 ring-white/10',
    },
    mobile: {
      label: 'Mobile',
      widthClass: 'w-[375px] max-w-[92%] h-[740px] max-h-[82vh]',
      dimensionText: '375 × 812 px',
      bezelClass: 'border-[10px] sm:border-[12px] border-[#18181f] rounded-[40px] sm:rounded-[46px] bg-[#18181f] shadow-2xl ring-1 ring-white/10',
    },
  }

  const currentConfig = deviceConfig[device]

  return (
    <PreviewErrorBoundary onReset={() => setRuntimeError(null)}>
      <div
        ref={canvasContainerRef}
        className={`w-full flex flex-col gap-3 font-sans ${
          isFullscreen
            ? 'fixed inset-0 z-50 bg-[#09090b] p-4 sm:p-6 overflow-hidden'
            : className
        }`}
      >
        {/* Device Toolbar Header */}
        <div className="w-full flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-[#0f0f14] border border-[rgba(244,240,232,0.08)] shadow-lg backdrop-blur-md">
          {/* Left: Device Mode Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#09090b] border border-[rgba(244,240,232,0.06)]">
            <button
              type="button"
              onClick={() => handleDeviceSwitch('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                device === 'desktop'
                  ? 'bg-[#ff6326] text-white shadow-sm'
                  : 'text-[#9c978e] hover:text-[#fbf9f5] hover:bg-white/5'
              }`}
              title="Desktop View (100%)"
              aria-label="Desktop preview mode"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>

            <button
              type="button"
              onClick={() => handleDeviceSwitch('tablet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                device === 'tablet'
                  ? 'bg-[#ff6326] text-white shadow-sm'
                  : 'text-[#9c978e] hover:text-[#fbf9f5] hover:bg-white/5'
              }`}
              title="Tablet View (768px)"
              aria-label="Tablet preview mode"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tablet</span>
            </button>

            <button
              type="button"
              onClick={() => handleDeviceSwitch('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                device === 'mobile'
                  ? 'bg-[#ff6326] text-white shadow-sm'
                  : 'text-[#9c978e] hover:text-[#fbf9f5] hover:bg-white/5'
              }`}
              title="Mobile View (375px)"
              aria-label="Mobile preview mode"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          {/* Center: Current Dimensions Indicator */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#14141a] border border-[rgba(244,240,232,0.06)] text-[11px] font-mono text-[#dcd7ce] shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff6326]" />
            <span className="font-semibold text-white">{currentConfig.label}</span>
            <span className="text-[#635f58]">&bull;</span>
            <span className="text-[#9c978e]">{currentConfig.dimensionText}</span>
          </div>

          {/* Right: Actions Controls */}
          <div className="flex items-center gap-2">
            {/* Reload Button */}
            <button
              type="button"
              onClick={handleReload}
              title="Reload preview"
              aria-label="Reload preview"
              className="p-2 rounded-xl bg-[#14141a] hover:bg-[#1f1f28] border border-[rgba(244,240,232,0.08)] text-[#9c978e] hover:text-white transition-all cursor-pointer"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isReloading ? 'animate-spin text-[#ff6326]' : ''}`} />
            </button>

            {/* Pop out / Open in new window */}
            <button
              type="button"
              onClick={handlePopout}
              title="Open preview in new tab"
              aria-label="Open in new window"
              className="p-2 rounded-xl bg-[#14141a] hover:bg-[#1f1f28] border border-[rgba(244,240,232,0.08)] text-[#9c978e] hover:text-white transition-all cursor-pointer hidden sm:flex"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Exit full screen' : 'Expand full screen'}
              aria-label="Toggle full screen"
              className="p-2 rounded-xl bg-[#14141a] hover:bg-[#1f1f28] border border-[rgba(244,240,232,0.08)] text-[#9c978e] hover:text-white transition-all cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Runtime Error Banner (if script error detected) */}
        {runtimeError && (
          <div className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs animate-fadeIn">
            <div className="flex items-center gap-2 truncate">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span className="font-semibold text-rose-200">Runtime Issue:</span>
              <span className="truncate">{runtimeError}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={handleReload}
                className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-[11px] font-semibold text-rose-200 cursor-pointer"
              >
                Reload
              </button>
              <button
                type="button"
                onClick={() => setRuntimeError(null)}
                className="p-1 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Device Canvas Frame Container */}
        <div className="flex-1 w-full min-h-[580px] flex items-center justify-center p-3 sm:p-6 rounded-2xl bg-[#09090b] border border-[rgba(244,240,232,0.06)] overflow-auto relative">
          {/* Subtle Canvas Dot Grid Background */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(244, 240, 232, 0.25) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
            aria-hidden="true"
          />

          {/* Device Mock Frame */}
          <div
            className={`transition-all duration-300 flex flex-col items-center justify-center relative ${currentConfig.widthClass}`}
          >
            <div className={`w-full h-full flex flex-col overflow-hidden relative ${currentConfig.bezelClass}`}>
              {/* Desktop Browser Chrome Header */}
              {device === 'desktop' && (
                <div className="w-full px-4 py-2.5 bg-[#121217] border-b border-[rgba(244,240,232,0.08)] flex items-center justify-between gap-3 select-none flex-shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>

                  <div className="flex-1 max-w-sm mx-auto px-3 py-1 rounded-lg bg-[#09090b] border border-[rgba(244,240,232,0.06)] text-[11px] text-[#9c978e] font-mono flex items-center justify-center gap-1.5 truncate">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>forma.run/preview/live</span>
                  </div>

                  <div className="w-10" />
                </div>
              )}

              {/* Tablet Front Camera Notch */}
              {device === 'tablet' && (
                <div className="w-full h-5 bg-[#18181f] flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#0a0a0d] border border-white/10" />
                </div>
              )}

              {/* Mobile Dynamic Island / Notch Pill */}
              {device === 'mobile' && (
                <div className="w-full h-7 bg-[#18181f] flex items-center justify-center flex-shrink-0 pt-1">
                  <div className="w-24 h-4 rounded-full bg-[#09090b] flex items-center justify-end px-2 border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-[#18181f] border border-white/10" />
                  </div>
                </div>
              )}

              {/* Sandboxed Iframe Rendering Canvas */}
              <div className="flex-1 w-full h-full relative bg-black overflow-hidden">
                <iframe
                  key={reloadKey}
                  title="FORMA Live Preview Canvas"
                  srcDoc={srcDocBundle}
                  sandbox="allow-scripts allow-same-origin"
                  className="w-full h-full border-0 bg-[#09090b]"
                />
              </div>

              {/* Mobile Home Bar Pill Indicator */}
              {device === 'mobile' && (
                <div className="w-full h-4 bg-[#18181f] flex items-center justify-center flex-shrink-0">
                  <div className="w-28 h-1 rounded-full bg-white/20" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PreviewErrorBoundary>
  )
}
