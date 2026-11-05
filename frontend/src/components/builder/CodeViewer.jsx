import React, { useState, useMemo } from 'react'
import { Copy, Check, Download, FileCode, Layers, Code2 } from 'lucide-react'

/**
 * Tokenizes and highlights code lines for HTML, CSS, and JS with obsidian dark palette
 */
function highlightCode(code, language) {
  if (!code) return []

  const lines = code.split('\n')

  return lines.map((line) => {
    let formatted = line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    if (language === 'html' || language === 'combined') {
      // Comments
      formatted = formatted.replace(
        /(&lt;!--.*?--&gt;)/g,
        '<span class="text-[#635f58] italic">$1</span>'
      )
      // Tags
      formatted = formatted.replace(
        /(&lt;\/?)([a-zA-Z0-9-]+)(\s|&gt;|\/)/g,
        '$1<span class="text-rose-400 font-medium">$2</span>$3'
      )
      // Attributes
      formatted = formatted.replace(
        /\s([a-zA-Z0-9-:@]+)=/g,
        ' <span class="text-sky-300 font-medium">$1</span>='
      )
      // Attribute values / strings
      formatted = formatted.replace(
        /(=".*?"|='.*?')/g,
        '<span class="text-emerald-300">$1</span>'
      )
    } else if (language === 'css') {
      // Comments
      formatted = formatted.replace(
        /(\/\*.*?\*\/)/g,
        '<span class="text-[#635f58] italic">$1</span>'
      )
      // Properties
      formatted = formatted.replace(
        /([a-zA-Z0-9-]+)\s*:/g,
        '<span class="text-cyan-300">$1</span>:'
      )
      // Values
      formatted = formatted.replace(
        /:\s*([^;{}]+);/g,
        ': <span class="text-amber-300">$1</span>;'
      )
      // Selectors
      formatted = formatted.replace(
        /(^|\s|\n)([.#]?[a-zA-Z0-9_-]+)(?=\s*\{)/g,
        '$1<span class="text-purple-400 font-medium">$2</span>'
      )
    } else if (language === 'javascript') {
      // Comments
      formatted = formatted.replace(
        /(\/\/.*$)/g,
        '<span class="text-[#635f58] italic">$1</span>'
      )
      // Keywords
      const keywords = ['const', 'let', 'var', 'function', 'return', 'import', 'export', 'default', 'if', 'else', 'true', 'false', 'null', 'async', 'await', 'try', 'catch']
      keywords.forEach((kw) => {
        const regex = new RegExp(`\\b(${kw})\\b`, 'g')
        formatted = formatted.replace(regex, '<span class="text-[#ff6326] font-semibold">$1</span>')
      })
      // Strings
      formatted = formatted.replace(
        /(".*?"|'.*?'|`.*?`)/g,
        '<span class="text-emerald-300">$1</span>'
      )
      // Function calls
      formatted = formatted.replace(
        /\b([a-zA-Z0-9_$]+)(?=\()/g,
        '<span class="text-sky-400">$1</span>'
      )
    }

    return formatted
  })
}

const DEFAULT_SAMPLE_HTML = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FORMA - Generated Website</title>
  <link rel="stylesheet" href="style.css" />
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-[#09090b] text-[#fbf9f5] flex flex-col justify-between">
  <!-- Top Navigation -->
  <header class="w-full border-b border-white/10 px-6 py-4 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <div class="w-7 h-7 rounded-lg bg-[#ff6326] flex items-center justify-center font-bold text-white text-xs">F</div>
      <span class="font-bold tracking-wider text-sm font-display">FORMA</span>
    </div>
    <button id="cta-btn" class="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#ff6326] text-white">
      Get Started
    </button>
  </header>

  <!-- Hero Content -->
  <main class="flex-1 max-w-4xl mx-auto px-6 py-16 text-center flex flex-col items-center gap-6">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-[#ff6326] bg-[#ff6326]/10 border border-[#ff6326]/20">
      <span>AI Generated Canvas</span>
    </div>
    <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-white font-display">
      Give Thought Its Form.
    </h1>
    <p class="text-sm text-neutral-400 max-w-lg leading-relaxed">
      Synthesized with modern Tailwind CSS utilities and interactive JavaScript behaviors.
    </p>
  </main>

  <script src="script.js"></script>
</body>
</html>`

const DEFAULT_SAMPLE_CSS = `/* FORMA Custom Stylesheet */
:root {
  --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-display: 'Space Grotesk', sans-serif;
}

body {
  font-family: var(--font-sans);
  background-color: #09090b;
  color: #fbf9f5;
  margin: 0;
  padding: 0;
}

.font-display {
  font-family: var(--font-display);
}

.glow-flame {
  box-shadow: 0 0 40px -10px rgba(255, 99, 38, 0.4);
}

/* Custom Webkit Scrollbars */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background: #27272a;
  border-radius: 3px;
}`

const DEFAULT_SAMPLE_JS = `// FORMA Interactive Client Scripts
document.addEventListener('DOMContentLoaded', () => {
  const ctaBtn = document.getElementById('cta-btn');
  
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      console.log('[FORMA]: CTA button clicked.');
      ctaBtn.classList.add('scale-95');
      setTimeout(() => ctaBtn.classList.remove('scale-95'), 150);
    });
  }

  // Smooth scroll anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});`

export const CodeViewer = ({
  html,
  css,
  js,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState('html') // 'html' | 'css' | 'javascript' | 'combined'
  const [copied, setCopied] = useState(false)

  const activeHtml = html && html.trim() ? html : DEFAULT_SAMPLE_HTML
  const activeCss = css && css.trim() ? css : DEFAULT_SAMPLE_CSS
  const activeJs = js && js.trim() ? js : DEFAULT_SAMPLE_JS

  // Construct combined single document
  const combinedCode = useMemo(() => {
    let doc = activeHtml
    if (activeCss && !doc.includes('<style>')) {
      doc = doc.replace('</head>', `<style>\n${activeCss}\n</style>\n</head>`)
    }
    if (activeJs && !doc.includes('<script>')) {
      doc = doc.replace('</body>', `<script>\n${activeJs}\n</script>\n</body>`)
    }
    return doc
  }, [activeHtml, activeCss, activeJs])

  const currentCode = useMemo(() => {
    switch (activeTab) {
      case 'css':
        return activeCss
      case 'javascript':
        return activeJs
      case 'combined':
        return combinedCode
      default:
        return activeHtml
    }
  }, [activeTab, activeHtml, activeCss, activeJs, combinedCode])

  const currentLanguage = activeTab === 'javascript' ? 'javascript' : activeTab === 'css' ? 'css' : 'html'

  const highlightedLines = useMemo(() => {
    return highlightCode(currentCode, currentLanguage)
  }, [currentCode, currentLanguage])

  // Copy code handler
  const handleCopy = () => {
    navigator.clipboard?.writeText(currentCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Download single file handler
  const handleDownloadFile = () => {
    const filename =
      activeTab === 'css'
        ? 'style.css'
        : activeTab === 'javascript'
        ? 'script.js'
        : activeTab === 'combined'
        ? 'bundle.html'
        : 'index.html'

    const mime =
      activeTab === 'css'
        ? 'text/css'
        : activeTab === 'javascript'
        ? 'application/javascript'
        : 'text/html'

    const blob = new Blob([currentCode], { type: mime })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }

  const linesCount = highlightedLines.length
  const byteSize = (new Blob([currentCode]).size / 1024).toFixed(1)

  return (
    <div
      className={`w-full rounded-2xl bg-[#09090b] border border-[rgba(244,240,232,0.1)] flex flex-col overflow-hidden shadow-2xl text-left font-sans ${className}`}
    >
      {/* Editor Header Bar */}
      <div className="w-full px-4 py-2.5 bg-[#0f0f14] border-b border-[rgba(244,240,232,0.08)] flex flex-wrap items-center justify-between gap-3 select-none">
        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#09090b] border border-[rgba(244,240,232,0.06)]">
          <button
            type="button"
            onClick={() => setActiveTab('html')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'html'
                ? 'bg-[#ff6326] text-white shadow-sm'
                : 'text-[#9c978e] hover:text-[#fbf9f5] hover:bg-white/5'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>HTML</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('css')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'css'
                ? 'bg-[#ff6326] text-white shadow-sm'
                : 'text-[#9c978e] hover:text-[#fbf9f5] hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>CSS</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('javascript')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'javascript'
                ? 'bg-[#ff6326] text-white shadow-sm'
                : 'text-[#9c978e] hover:text-[#fbf9f5] hover:bg-white/5'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>JavaScript</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('combined')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'combined'
                ? 'bg-[#ff6326] text-white shadow-sm'
                : 'text-[#9c978e] hover:text-[#fbf9f5] hover:bg-white/5'
            }`}
          >
            <span>Combined</span>
          </button>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-[#635f58]">
            <span>{linesCount} lines</span>
            <span>&bull;</span>
            <span>{byteSize} KB</span>
          </div>

          <button
            type="button"
            onClick={handleDownloadFile}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#14141a] hover:bg-[#1f1f28] border border-[rgba(244,240,232,0.08)] text-xs text-[#dcd7ce] hover:text-white transition-all cursor-pointer"
            title="Download active file"
            aria-label="Download active file"
          >
            <Download className="w-3.5 h-3.5 text-[#9c978e]" />
            <span className="hidden sm:inline">Download</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#ff6326]/10 hover:bg-[#ff6326]/20 border border-[#ff6326]/30 text-xs text-[#ff6326] font-semibold transition-all cursor-pointer shadow-sm"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Display Area with Line Numbers */}
      <div className="flex-1 w-full max-h-[600px] overflow-auto bg-[#09090b] font-mono text-xs sm:text-[13px] leading-relaxed flex scrollbar-thin">
        {/* Line Numbers Gutter */}
        <div className="py-4 px-3 select-none text-right bg-[#0c0c10] border-r border-[rgba(244,240,232,0.06)] text-[#635f58] flex flex-col font-mono min-w-[48px]">
          {highlightedLines.map((_, i) => (
            <span key={i} className="leading-6">
              {i + 1}
            </span>
          ))}
        </div>

        {/* Code Content */}
        <div className="py-4 px-4 flex-1 overflow-x-auto text-[#fbf9f5] whitespace-pre">
          {highlightedLines.map((lineHtml, i) => (
            <div
              key={i}
              className="leading-6 hover:bg-white/[0.02] px-1 -mx-1 rounded"
              dangerouslySetInnerHTML={{ __html: lineHtml || '&nbsp;' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
