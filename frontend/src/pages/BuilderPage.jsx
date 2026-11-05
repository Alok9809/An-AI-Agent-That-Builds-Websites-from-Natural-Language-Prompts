import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {
  Menu,
  ChevronDown,
  History,
  PanelLeft,
  Globe,
  FileText,
  Code2,
  Layers,
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  ExternalLink,
  Share2,
  Zap,
  ArrowUp,
  Plus,
  Mic,
  CheckCircle2,
  ChevronRight,
  MousePointer2,
  Type,
  Pencil,
  Box,
  Check,
  ArrowLeft,
  Sparkles,
  Download,
  UploadCloud,
  X,
  Play,
  Copy,
  Terminal,
} from 'lucide-react'
import { ExportModal } from '../components/builder/ExportModal'
import { CodeViewer } from '../components/builder/CodeViewer'

/**
 * Intelligent Prompt Analyzer and Frontend Code Synthesizer
 * Generates rich, authentic, responsive websites tailored to user prompt requirements
 */
function synthesizeWebsiteFromPrompt(promptText = 'Modern AI Web Platform', previousCode = null, modification = null) {
  const p = (promptText + ' ' + (modification || '')).toLowerCase().trim()

  // 1. Determine Industry / Niche
  let category = 'saas'
  let brandName = 'FORMA Platform'
  let accentColor = '#3867FF'
  let secondaryAccent = '#F052C7'
  let bg = '#080B14'
  let cardBg = '#111A30'
  let text = '#F5F5F7'
  let border = '#252B3A'

  // Extract clean title from prompt
  const words = promptText.split(/\s+/).filter((w) => w.length > 2)
  const titleCandidate = words.slice(0, 4).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const cleanTitle = titleCandidate || 'Nova Experience'

  if (p.includes('ecommerce') || p.includes('store') || p.includes('shop') || p.includes('coffee') || p.includes('product') || p.includes('shoes') || p.includes('clothing')) {
    category = 'ecommerce'
    brandName = p.includes('coffee') ? 'Aura Artisan Coffee' : `${cleanTitle} Store`
    accentColor = '#f59e0b'
    secondaryAccent = '#fbbf24'
  } else if (p.includes('portfolio') || p.includes('architecture') || p.includes('photography') || p.includes('agency') || p.includes('designer')) {
    category = 'portfolio'
    brandName = `${cleanTitle} Studio`
    accentColor = '#8b5cf6'
    secondaryAccent = '#ec4899'
  } else if (p.includes('fitness') || p.includes('gym') || p.includes('workout') || p.includes('health') || p.includes('bike') || p.includes('mobility')) {
    category = 'fitness'
    brandName = `${cleanTitle} Pulse`
    accentColor = '#10b981'
    secondaryAccent = '#34d399'
  } else if (p.includes('restaurant') || p.includes('food') || p.includes('dining') || p.includes('cafe') || p.includes('bakery')) {
    category = 'restaurant'
    brandName = `${cleanTitle} Bistro`
    accentColor = '#ef4444'
    secondaryAccent = '#f97316'
  } else if (p.includes('crypto') || p.includes('web3') || p.includes('fintech') || p.includes('banking') || p.includes('finance')) {
    category = 'fintech'
    brandName = `${cleanTitle} Capital`
    accentColor = '#06b6d4'
    secondaryAccent = '#3b82f6'
  } else if (p.includes('sound') || p.includes('music') || p.includes('audio') || p.includes('podcast')) {
    category = 'audio'
    brandName = `${cleanTitle} SoundLab`
    accentColor = '#a855f7'
    secondaryAccent = '#f43f5e'
  } else {
    category = 'saas'
    brandName = `${cleanTitle}`
    accentColor = '#3867FF'
    secondaryAccent = '#F052C7'
  }

  // Check if modification asks for color changes
  if (p.includes('emerald') || p.includes('green')) {
    accentColor = '#10b981'
  } else if (p.includes('pink') || p.includes('magenta')) {
    accentColor = '#F052C7'
  } else if (p.includes('cyan') || p.includes('blue')) {
    accentColor = '#06b6d4'
  } else if (p.includes('amber') || p.includes('gold') || p.includes('yellow')) {
    accentColor = '#f59e0b'
  }

  // 2. Generate Content tailored to Niche
  let navLinks = ['Overview', 'Features', 'Pricing', 'Contact']
  let heroBadge = 'Autonomous AI Synthesis'
  let heroHeading = promptText
  let heroSubhead = 'Engineered with clean modern typography, adaptive mobile layout, and zero-latency UI interactions.'
  let ctaPrimary = 'Explore Experience'
  let ctaSecondary = 'Learn More'

  let features = [
    { title: 'Autonomous Engine', desc: 'Synthesizes clean semantic HTML5 & Tailwind components according to prompt specs.', icon: '⚡' },
    { title: 'Adaptive Viewports', desc: 'Precision scaling for Desktop, Tablet (768px), and Mobile (375px) device frames.', icon: '📱' },
    { title: 'Instant Deployment', desc: 'Download production ZIP packages or publish live with a single click.', icon: '🚀' },
  ]

  let interactiveSectionHtml = ''

  if (category === 'ecommerce') {
    navLinks = ['Shop', 'Collections', 'About', 'Cart (<span id="cart-count">0</span>)']
    heroBadge = 'Curated Artisan Release'
    heroHeading = promptText.length > 3 ? promptText : 'Crafted Goods for Discerning Tastes'
    heroSubhead = 'Sustainable materials, ethical production, and fast global delivery right to your door.'
    ctaPrimary = 'Shop Collection'
    ctaSecondary = 'Our Philosophy'
    features = [
      { title: 'Ethical Craft', desc: 'Hand-selected materials crafted sustainably in limited batches.', icon: '🌿' },
      { title: '100% Guaranteed', desc: '30-day hassle-free return policy with global express dispatch.', icon: '📦' },
      { title: 'Direct to Customer', desc: 'Zero middlemen markup ensures transparent luxury pricing.', icon: '✨' },
    ]
    interactiveSectionHtml = `
    <!-- Interactive Product Catalog -->
    <section id="shop" class="w-full max-w-5xl mx-auto px-6 py-12">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-2xl font-bold font-['Space_Grotesk'] text-[#F5F5F7]">Featured Catalog</h2>
          <p class="text-xs text-[#8F9CAE] mt-1">Tap any item to add to your cart</p>
        </div>
        <div class="px-3 py-1 rounded-full bg-[${cardBg}] border border-[${border}] text-xs text-[#8F9CAE]">
          🛒 <span id="cart-status">0 items in cart</span>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="rounded-2xl bg-[${cardBg}]/90 border border-[${border}] hover:border-[${accentColor}]/60 p-5 flex flex-col justify-between gap-4 transition-all hover:-translate-y-1 shadow-xl">
          <div class="w-full h-36 rounded-xl bg-gradient-to-tr from-[#16213c] to-[#252f4c] flex items-center justify-center text-4xl">
            📦
          </div>
          <div>
            <span class="text-[10px] font-mono font-bold text-[${accentColor}] uppercase">Bestseller</span>
            <h3 class="text-base font-bold text-[#F5F5F7] mt-1">Signature Edition</h3>
            <p class="text-xs text-[#8F9CAE] mt-1">Precision engineered premium edition crafted with luxury materials.</p>
          </div>
          <div class="flex items-center justify-between pt-3 border-t border-[${border}]">
            <span class="text-sm font-bold font-mono text-[#F5F5F7]">$89.00</span>
            <button class="add-to-cart-btn px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[${accentColor}] hover:opacity-90 text-black active:scale-95 transition-all cursor-pointer">
              Add to Cart
            </button>
          </div>
        </div>

        <div class="rounded-2xl bg-[${cardBg}]/90 border border-[${border}] hover:border-[${accentColor}]/60 p-5 flex flex-col justify-between gap-4 transition-all hover:-translate-y-1 shadow-xl">
          <div class="w-full h-36 rounded-xl bg-gradient-to-tr from-[#16213c] to-[#252f4c] flex items-center justify-center text-4xl">
            ☕
          </div>
          <div>
            <span class="text-[10px] font-mono font-bold text-[${accentColor}] uppercase">Artisan Roast</span>
            <h3 class="text-base font-bold text-[#F5F5F7] mt-1">Single Origin Roast</h3>
            <p class="text-xs text-[#8F9CAE] mt-1">High-altitude Ethiopian beans with notes of wild honey and dark cocoa.</p>
          </div>
          <div class="flex items-center justify-between pt-3 border-t border-[${border}]">
            <span class="text-sm font-bold font-mono text-[#F5F5F7]">$24.00</span>
            <button class="add-to-cart-btn px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[${accentColor}] hover:opacity-90 text-black active:scale-95 transition-all cursor-pointer">
              Add to Cart
            </button>
          </div>
        </div>

        <div class="rounded-2xl bg-[${cardBg}]/90 border border-[${border}] hover:border-[${accentColor}]/60 p-5 flex flex-col justify-between gap-4 transition-all hover:-translate-y-1 shadow-xl">
          <div class="w-full h-36 rounded-xl bg-gradient-to-tr from-[#16213c] to-[#252f4c] flex items-center justify-center text-4xl">
            ✨
          </div>
          <div>
            <span class="text-[10px] font-mono font-bold text-[${accentColor}] uppercase">Collector</span>
            <h3 class="text-base font-bold text-[#F5F5F7] mt-1">Minimalist Vessel</h3>
            <p class="text-xs text-[#8F9CAE] mt-1">Double-walled insulated ceramic tumbler with magnetic splash lid.</p>
          </div>
          <div class="flex items-center justify-between pt-3 border-t border-[${border}]">
            <span class="text-sm font-bold font-mono text-[#F5F5F7]">$42.00</span>
            <button class="add-to-cart-btn px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[${accentColor}] hover:opacity-90 text-black active:scale-95 transition-all cursor-pointer">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
    `
  } else if (category === 'fitness') {
    navLinks = ['Programs', 'Trainers', 'Schedule', 'Join Now']
    heroBadge = 'High Performance Training'
    heroHeading = promptText.length > 3 ? promptText : 'Elevate Your Human Performance'
    heroSubhead = 'Science-backed conditioning, biometric tracking, and world-class athletic mentorship.'
    ctaPrimary = 'Start Free Trial'
    ctaSecondary = 'View Schedule'
    features = [
      { title: 'Biometric HUD', desc: 'Real-time heart rate, calorie burn and power output tracking during sessions.', icon: '⚡' },
      { title: 'Elite Mentorship', desc: '1-on-1 private coaching designed for accelerated conditioning.', icon: '🎯' },
      { title: 'Recovery Lab', desc: 'Cryotherapy, infrared saunas, and targeted contrast therapy suites.', icon: '❄️' },
    ]
    interactiveSectionHtml = `
    <!-- Interactive Membership Tier Calculator -->
    <section class="w-full max-w-5xl mx-auto px-6 py-12">
      <div class="text-center mb-10">
        <h2 class="text-2xl font-bold font-['Space_Grotesk'] text-[#F5F5F7]">Membership Tiers</h2>
        <p class="text-xs text-[#8F9CAE] mt-1">Select your commitment level to activate privileges</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="p-6 rounded-2xl bg-[${cardBg}]/90 border border-[${border}] flex flex-col justify-between gap-4">
          <div>
            <span class="text-xs font-mono text-[${accentColor}]">TIER 01</span>
            <h3 class="text-lg font-bold text-[#F5F5F7] mt-1">Core Access</h3>
            <div class="text-2xl font-black font-mono text-[#F5F5F7] mt-2">$49<span class="text-xs text-[#8F9CAE]">/mo</span></div>
            <ul class="text-xs text-[#8F9CAE] space-y-2 mt-4">
              <li>✓ All facility gym floors</li>
              <li>✓ Locker & steam access</li>
              <li>✓ Digital workout tracking</li>
            </ul>
          </div>
          <button class="w-full py-2.5 rounded-xl border border-[${border}] hover:border-[${accentColor}] text-xs font-bold text-[#F5F5F7] transition-all cursor-pointer">Select Plan</button>
        </div>

        <div class="p-6 rounded-2xl bg-gradient-to-b from-[#18233C] to-[${cardBg}] border-2 border-[${accentColor}] flex flex-col justify-between gap-4 shadow-2xl relative">
          <div class="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[${accentColor}] text-[10px] font-black text-black uppercase">Most Popular</div>
          <div>
            <span class="text-xs font-mono text-[${accentColor}]">TIER 02</span>
            <h3 class="text-lg font-bold text-[#F5F5F7] mt-1">Athletic Pro</h3>
            <div class="text-2xl font-black font-mono text-[#F5F5F7] mt-2">$99<span class="text-xs text-[#8F9CAE]">/mo</span></div>
            <ul class="text-xs text-[#F5F5F7] space-y-2 mt-4">
              <li>✓ Unlimited HIIT & Spin classes</li>
              <li>✓ Weekly 1-on-1 coaching call</li>
              <li>✓ Infrared recovery lounge</li>
              <li>✓ Nutrition meal planning</li>
            </ul>
          </div>
          <button class="w-full py-2.5 rounded-xl bg-[${accentColor}] hover:opacity-90 text-xs font-black text-black transition-all cursor-pointer">Get Started Pro</button>
        </div>

        <div class="p-6 rounded-2xl bg-[${cardBg}]/90 border border-[${border}] flex flex-col justify-between gap-4">
          <div>
            <span class="text-xs font-mono text-[${accentColor}]">TIER 03</span>
            <h3 class="text-lg font-bold text-[#F5F5F7] mt-1">Founder Elite</h3>
            <div class="text-2xl font-black font-mono text-[#F5F5F7] mt-2">$189<span class="text-xs text-[#8F9CAE]">/mo</span></div>
            <ul class="text-xs text-[#8F9CAE] space-y-2 mt-4">
              <li>✓ All Athletic Pro features</li>
              <li>✓ Dedicated private suite</li>
              <li>✓ 24/7 concierge physiotherapist</li>
            </ul>
          </div>
          <button class="w-full py-2.5 rounded-xl border border-[${border}] hover:border-[${accentColor}] text-xs font-bold text-[#F5F5F7] transition-all cursor-pointer">Select Plan</button>
        </div>
      </div>
    </section>
    `
  } else {
    // SaaS / AI Tech
    navLinks = ['Platform', 'Solutions', 'Architecture', 'Pricing']
    heroBadge = 'v2.8 Autonomous Engine'
    heroHeading = promptText.length > 3 ? promptText : 'Build Modern Web Systems with Natural Language'
    heroSubhead = 'Architect responsive frontend applications, high-performance web components, and live interactive prototypes instantly.'
    ctaPrimary = 'Start Building Free'
    ctaSecondary = 'Read Documentation'
    features = [
      { title: 'Zero Boilerplate', desc: 'Transforms natural language requirements into pristine semantic HTML5 & Tailwind components.', icon: '⚡' },
      { title: 'Responsive Canvas', desc: 'Precision viewport testing for Desktop, Tablet (768px), and Mobile (375px) devices.', icon: '📐' },
      { title: 'Production Export', desc: 'Download ready-to-ship ZIP packages with clean stylesheets and ECMAScript runtime.', icon: '📦' },
    ]
    interactiveSectionHtml = `
    <!-- Interactive Feature Showcase / Tab Switcher -->
    <section class="w-full max-w-5xl mx-auto px-6 py-12">
      <div class="rounded-3xl bg-[${cardBg}]/80 border border-[${border}] p-6 sm:p-10 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="flex flex-col gap-4 max-w-md text-left">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono text-[${accentColor}] bg-[${accentColor}]/10 border border-[${accentColor}]/30 w-fit">
            <span>LIVE REACTIVE RUNTIME</span>
          </div>
          <h3 class="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-[#F5F5F7] leading-tight">
            High performance without cognitive overhead
          </h3>
          <p class="text-xs sm:text-sm text-[#8F9CAE] leading-relaxed">
            Every element synthesized adheres to strict modern design tokens, accessible contrast standards, and responsive viewport guidelines.
          </p>
          <div class="flex items-center gap-3 pt-2">
            <button id="demo-btn" class="px-5 py-2.5 rounded-full text-xs font-bold bg-[${accentColor}] text-white hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-[${accentColor}]/30 cursor-pointer">
              Interactive Test Click
            </button>
            <span id="demo-feedback" class="text-xs font-mono text-emerald-400 opacity-0 transition-opacity">
              ✓ Event triggered!
            </span>
          </div>
        </div>

        <div class="w-full md:w-[360px] rounded-2xl bg-[#080B14] border border-[${border}] p-4 font-mono text-xs flex flex-col gap-2.5 shadow-xl text-left">
          <div class="flex items-center justify-between border-b border-[${border}] pb-2 text-[#8F9CAE]">
            <span>runtime.config.json</span>
            <span class="text-emerald-400 text-[10px]">ACTIVE</span>
          </div>
          <pre class="text-[11px] text-[#8F9CAE] overflow-x-auto leading-relaxed">
{
  <span class="text-[${accentColor}]">"project"</span>: "${cleanTitle}",
  <span class="text-[${accentColor}]">"category"</span>: "${category}",
  <span class="text-[${accentColor}]">"responsive"</span>: true,
  <span class="text-[${accentColor}]">"viewport_ready"</span>: [375, 768, 1440],
  <span class="text-[${accentColor}]">"status"</span>: <span class="text-emerald-400">"Synthesized"</span>
}</pre>
        </div>
      </div>
    </section>
    `
  }

  // HTML Generation
  const html = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${brandName} — ${heroHeading}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: ${bg};
      color: ${text};
      margin: 0;
      padding: 0;
      overflow-x: hidden;
    }
    h1, h2, h3, h4 {
      font-family: 'Space Grotesk', sans-serif;
    }
  </style>
</head>
<body class="min-h-screen bg-[${bg}] text-[${text}] flex flex-col justify-between selection:bg-[${accentColor}]/35">
  <!-- Interactive Navigation -->
  <header class="w-full border-b border-[${border}] bg-[${bg}]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
    <div class="flex items-center gap-2.5">
      <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-[${accentColor}] to-[${secondaryAccent}] flex items-center justify-center font-black text-white text-xs shadow-md">
        ${brandName.charAt(0)}
      </div>
      <span class="font-bold tracking-wider text-sm font-['Space_Grotesk'] text-[#F5F5F7]">${brandName.toUpperCase()}</span>
    </div>

    <nav class="hidden sm:flex items-center gap-6 text-xs text-[#8F9CAE] font-medium">
      ${navLinks.map((link) => `<a href="#${link.toLowerCase()}" class="hover:text-[#F5F5F7] transition-colors">${link}</a>`).join('\n      ')}
    </nav>

    <div class="flex items-center gap-3">
      <button id="cta-header" class="px-4 py-2 rounded-full text-xs font-semibold bg-[${accentColor}] text-black hover:opacity-90 active:scale-95 transition-all shadow-md shadow-[${accentColor}]/25 cursor-pointer">
        ${ctaPrimary}
      </button>
    </div>
  </header>

  <!-- Hero Section -->
  <main class="flex-1 flex flex-col items-center">
    <section class="max-w-4xl mx-auto px-6 pt-16 pb-12 flex flex-col items-center text-center gap-6">
      <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold text-[${accentColor}] bg-[${accentColor}]/10 border border-[${accentColor}]/30 animate-pulse">
        <span class="w-2 h-2 rounded-full bg-[${accentColor}]"></span>
        <span>${heroBadge}</span>
      </div>

      <h1 class="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F5F5F7] leading-tight font-['Space_Grotesk'] max-w-3xl">
        ${heroHeading}
      </h1>

      <p class="text-sm sm:text-base text-[#8F9CAE] max-w-xl leading-relaxed">
        ${heroSubhead}
      </p>

      <div class="flex flex-wrap items-center justify-center gap-3.5 mt-2">
        <button id="hero-primary" class="px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-[${accentColor}] text-black hover:opacity-95 active:scale-95 transition-all shadow-lg shadow-[${accentColor}]/30 cursor-pointer">
          ${ctaPrimary}
        </button>
        <button id="hero-secondary" class="px-6 py-3 rounded-full text-xs sm:text-sm font-medium bg-[${cardBg}] border border-[${border}] text-[#8F9CAE] hover:text-[#F5F5F7] hover:border-[${accentColor}]/50 active:scale-95 transition-all cursor-pointer">
          ${ctaSecondary}
        </button>
      </div>

      <!-- Features Bento Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-12 text-left">
        ${features
          .map(
            (feat, i) => `
        <div class="p-5 rounded-2xl bg-[${cardBg}]/80 border border-[${border}] hover:border-[${accentColor}]/50 transition-all shadow-lg">
          <div class="text-2xl mb-2">${feat.icon}</div>
          <h3 class="text-sm font-bold text-[#F5F5F7] mb-1">${feat.title}</h3>
          <p class="text-xs text-[#8F9CAE] leading-relaxed">${feat.desc}</p>
        </div>`
          )
          .join('')}
      </div>
    </section>

    ${interactiveSectionHtml}
  </main>

  <!-- Footer -->
  <footer class="w-full border-t border-[${border}] py-8 px-6 text-center text-xs text-[#6B768E]">
    <div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <span>&copy; ${new Date().getFullYear()} ${brandName}. All rights reserved.</span>
      <div class="flex items-center gap-4 text-[#8F9CAE]">
        <a href="#" class="hover:text-white transition-colors">Privacy</a>
        <a href="#" class="hover:text-white transition-colors">Terms</a>
        <a href="#" class="hover:text-white transition-colors">Documentation</a>
      </div>
    </div>
  </footer>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // Cart counter for ecommerce
      let count = 0;
      const cartCountEl = document.getElementById('cart-count');
      const cartStatusEl = document.getElementById('cart-status');
      document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          count++;
          if (cartCountEl) cartCountEl.innerText = count;
          if (cartStatusEl) cartStatusEl.innerText = count + ' items in cart';
          btn.innerText = 'Added! ✓';
          setTimeout(() => { btn.innerText = 'Add to Cart'; }, 1200);
        });
      });

      // Interactive Test Button for SaaS
      const demoBtn = document.getElementById('demo-btn');
      const demoFeedback = document.getElementById('demo-feedback');
      if (demoBtn && demoFeedback) {
        demoBtn.addEventListener('click', () => {
          demoFeedback.classList.remove('opacity-0');
          setTimeout(() => { demoFeedback.classList.add('opacity-0'); }, 1800);
        });
      }
    });
  </script>
</body>
</html>`

  const css = `/* FORMA Synthesized Custom Stylesheet for ${cleanTitle} */
:root {
  --primary: ${accentColor};
  --accent: ${secondaryAccent};
  --bg: ${bg};
  --card-bg: ${cardBg};
  --text: ${text};
  --border: ${border};
}

body {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  background-color: var(--bg);
  color: var(--text);
}

/* Custom scrollbars */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
}
`

  const js = `// FORMA Runtime Behaviors for ${cleanTitle}
console.log('[FORMA Runtime]: Initialized ${brandName} in ${category} mode.');
`

  return { html, css, js, brandName, category }
}

export const BuilderPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const rawPrompt = searchParams.get('prompt') || ''
  const promptParam = rawPrompt || 'Modern SaaS Platform with Interactive Bento Grid'

  // Code synthesis state (generated dynamically from user requirements)
  const [projectCode, setProjectCode] = useState(() => synthesizeWebsiteFromPrompt(promptParam))
  const [projectName, setProjectName] = useState(() => projectCode.brandName)

  // Studio Header States
  const [activeTab, setActiveTab] = useState('preview') // 'preview' | 'doc' | 'code' | 'mesh'
  const [deviceView, setDeviceView] = useState('desktop') // 'desktop' | 'tablet' | 'mobile'
  const [currentRoute, setCurrentRoute] = useState('Homepage')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [iframeKey, setIframeKey] = useState(0)

  // Chat & Agent Stepper States
  const [chatInput, setChatInput] = useState('')
  const [activeMode, setActiveMode] = useState('Build')
  const [toolsAccordionOpen, setToolsAccordionOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [activeToolHud, setActiveToolHud] = useState('select') // 'select' | 'text' | 'pencil' | 'box'
  const [copiedShare, setCopiedShare] = useState(false)

  // Dynamic Agent Activity Stream generated from user prompt
  const [activityItems, setActivityItems] = useState(() => [
    {
      title: `Analyzed user requirements: "${promptParam.slice(0, 48)}${promptParam.length > 48 ? '...' : ''}"`,
      tasks: [
        { name: `Extracted intent & category (${projectCode.category})`, time: '14s' },
        { name: 'Generated semantic component hierarchy', time: '21s' },
      ],
    },
    {
      title: 'Synthesized tailored visual design system',
      tasks: [
        { name: 'Compiled responsive Tailwind utility classes', time: '28s' },
        { name: 'Bound interactive client events & state', time: '16s' },
      ],
    },
    {
      title: 'Validated DOM accessibility & responsive viewports',
      tasks: [
        { name: 'Verified Desktop, Tablet (768px), and Mobile (375px)', time: '35s' },
      ],
    },
  ])

  // Update synthesis when search parameter changes
  useEffect(() => {
    if (rawPrompt) {
      const updated = synthesizeWebsiteFromPrompt(rawPrompt)
      setProjectCode(updated)
      setProjectName(updated.brandName)
      setActivityItems([
        {
          title: `Analyzed prompt: "${rawPrompt.slice(0, 48)}${rawPrompt.length > 48 ? '...' : ''}"`,
          tasks: [
            { name: `Identified niche: ${updated.category}`, time: '12s' },
            { name: 'Synthesized customized features & responsive layout', time: '24s' },
          ],
        },
        {
          title: 'Assembled interactive components',
          tasks: [
            { name: 'Rendered live preview canvas', time: '18s' },
          ],
        },
      ])
      setIframeKey((prev) => prev + 1)
    }
  }, [rawPrompt])

  // Handle new modification instruction from bottom chat input
  const handleSubmitPrompt = (e) => {
    e?.preventDefault()
    if (!chatInput.trim()) return

    const newInstruction = chatInput.trim()
    setChatInput('')

    // Generate updated website based on user modification
    const updated = synthesizeWebsiteFromPrompt(promptParam, projectCode, newInstruction)
    setProjectCode(updated)

    // Add new real activity step to agent log
    const newStep = {
      title: `Applied user modification: "${newInstruction}"`,
      tasks: [
        { name: 'Refactored component layout & styles', time: '9s' },
        { name: 'Updated DOM nodes in live canvas', time: '14s' },
      ],
    }

    setActivityItems((prev) => [...prev, newStep])
    setIframeKey((prev) => prev + 1)
  }

  // Reload iframe
  const handleReload = () => {
    setIframeKey((prev) => prev + 1)
  }

  // Open in new tab via Blob URL
  const handlePopout = () => {
    const blob = new Blob([projectCode.html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
  }

  // Share handler
  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href)
    setCopiedShare(true)
    setTimeout(() => setCopiedShare(false), 2000)
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#080B14] text-[#F5F5F7] flex flex-col font-sans select-none">
      {/* =========================================================================
          TOP STUDIO HEADER
      ========================================================================= */}
      <header className="h-[52px] shrink-0 border-b border-[#252B3A] bg-[#0A0E1A] px-3 sm:px-4 flex items-center justify-between gap-3 z-40">
        {/* Left Section: Menu, Project Title Dropdown, History, Sidebar Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            title="Dashboard Menu"
            className="p-1.5 text-[#8F9CAE] hover:text-[#F5F5F7] hover:bg-white/[0.05] rounded-lg transition-colors cursor-pointer"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Project Title with Dropdown Chevron */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer">
            <span className="text-xs sm:text-sm font-semibold text-[#F5F5F7] tracking-tight truncate max-w-[140px] sm:max-w-[200px]">
              {projectName}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#8F9CAE]" />
          </div>

          {/* History Icon */}
          <button
            type="button"
            onClick={() => {
              alert(`Revision history: 1 active revision based on "${promptParam}"`)
            }}
            title="Version History"
            className="p-1.5 text-[#8F9CAE] hover:text-[#F5F5F7] hover:bg-white/[0.05] rounded-lg transition-colors cursor-pointer hidden sm:flex"
          >
            <History className="w-4 h-4" />
          </button>

          {/* Sidebar Toggle */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            title="Toggle Sidebar"
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isSidebarOpen ? 'text-[#3867FF] bg-[#3867FF]/10' : 'text-[#8F9CAE] hover:text-[#F5F5F7] hover:bg-white/[0.05]'
            }`}
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Center-Left: Studio View Switcher Tabs (Preview, Doc, Code, Mesh) */}
        <div className="flex items-center gap-1 p-0.5 rounded-full bg-[#111A30]/80 border border-[#252B3A] shadow-inner">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-[#3867FF] text-[#F5F5F7] shadow-sm shadow-[#3867FF]/30'
                : 'text-[#8F9CAE] hover:text-[#F5F5F7]'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Preview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('doc')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'doc'
                ? 'bg-[#3867FF] text-[#F5F5F7] shadow-sm shadow-[#3867FF]/30'
                : 'text-[#8F9CAE] hover:text-[#F5F5F7]'
            }`}
            title="Documentation view"
          >
            <FileText className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'bg-[#3867FF] text-[#F5F5F7] shadow-sm shadow-[#3867FF]/30'
                : 'text-[#8F9CAE] hover:text-[#F5F5F7]'
            }`}
            title="Code editor view"
          >
            <Code2 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('mesh')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'mesh'
                ? 'bg-[#3867FF] text-[#F5F5F7] shadow-sm shadow-[#3867FF]/30'
                : 'text-[#8F9CAE] hover:text-[#F5F5F7]'
            }`}
            title="Visual DOM nodes"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center: Device, Reload, Route Dropdown, Popout */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Device switcher */}
          <div className="flex items-center gap-1 bg-[#111A30]/50 border border-[#252B3A] rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => setDeviceView('desktop')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                deviceView === 'desktop' ? 'bg-[#3867FF] text-white' : 'text-[#8F9CAE] hover:text-[#F5F5F7]'
              }`}
              title="Desktop viewport"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setDeviceView('tablet')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                deviceView === 'tablet' ? 'bg-[#3867FF] text-white' : 'text-[#8F9CAE] hover:text-[#F5F5F7]'
              }`}
              title="Tablet viewport"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setDeviceView('mobile')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                deviceView === 'mobile' ? 'bg-[#3867FF] text-white' : 'text-[#8F9CAE] hover:text-[#F5F5F7]'
              }`}
              title="Mobile viewport"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Reload Button */}
          <button
            type="button"
            onClick={handleReload}
            title="Reload live canvas (🔄)"
            className="p-1.5 text-[#8F9CAE] hover:text-[#F5F5F7] hover:bg-white/[0.05] rounded-lg transition-colors cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          {/* Route Dropdown */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#111A30]/50 border border-[#252B3A] text-xs text-[#F5F5F7] font-medium cursor-pointer">
            <span>{currentRoute}</span>
            <ChevronDown className="w-3 h-3 text-[#8F9CAE]" />
          </div>

          {/* External Window Popout */}
          <button
            type="button"
            onClick={handlePopout}
            title="Open in new window (↗)"
            className="p-1.5 text-[#8F9CAE] hover:text-[#F5F5F7] hover:bg-white/[0.05] rounded-lg transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Action Buttons: Share, Upgrade, Publish */}
        <div className="flex items-center gap-2">
          {/* Share */}
          <button
            type="button"
            onClick={handleShare}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#252B3A] bg-white/[0.03] hover:bg-white/[0.08] text-xs font-medium text-[#F5F5F7] transition-all cursor-pointer"
          >
            {copiedShare ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#8F9CAE]" />
                <span>Share</span>
              </>
            )}
          </button>

          {/* Primary Publish & Export Button */}
          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#3867FF] hover:bg-[#4d77ff] active:scale-95 text-xs font-semibold text-[#F5F5F7] shadow-md shadow-[#3867FF]/30 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export & Deploy</span>
          </button>
        </div>
      </header>

      {/* =========================================================================
          MAIN 2-COLUMN STUDIO WORKSPACE
      ========================================================================= */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* =====================================================================
            LEFT COLUMN: Real-Time Dynamic Agent Activity Stream
        ===================================================================== */}
        {isSidebarOpen && (
          <aside className="w-full sm:w-[380px] lg:w-[420px] shrink-0 border-r border-[#252B3A] bg-[#0A0E1A] flex flex-col h-[calc(100vh-52px)] z-30 transition-all duration-300">
            {/* Scrollable Agent Activity Stream */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5 text-left">
              {activityItems.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="text-xs text-[#8F9CAE] font-medium leading-relaxed flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3867FF]" />
                    <span>{item.title}</span>
                  </div>
                  {item.tasks.map((task, tIdx) => (
                    <div
                      key={tIdx}
                      className="flex items-center justify-between text-xs text-[#F5F5F7] pl-3 py-0.5"
                    >
                      <div className="flex items-center gap-2 text-[#8F9CAE]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{task.name}</span>
                      </div>
                      <span className="text-[11px] text-[#55607A] font-mono">{task.time}</span>
                    </div>
                  ))}
                </div>
              ))}

              {/* Tools Executed Accordion */}
              <div className="flex flex-col gap-2">
                <div className="text-xs text-[#8F9CAE] font-medium">Tools Executed</div>
                <button
                  type="button"
                  onClick={() => setToolsAccordionOpen(!toolsAccordionOpen)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#111A30]/80 hover:bg-[#16203A] border border-[#252B3A] text-xs text-[#F5F5F7] transition-all cursor-pointer font-mono"
                >
                  <span className="truncate">
                    Generated <code className="text-[#3867FF]">{projectCode.brandName}</code> in <code className="text-emerald-400">`src/`</code>
                  </span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 text-[#8F9CAE] transition-transform ${
                      toolsAccordionOpen ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {toolsAccordionOpen && (
                  <div className="p-3 rounded-xl bg-[#080B14] border border-[#252B3A] text-[11px] font-mono text-[#8F9CAE] flex flex-col gap-1.5">
                    <div>✓ forma-semantic-layout (HTML5)</div>
                    <div>✓ forma-tailwind-runtime (Utility Engine)</div>
                    <div>✓ forma-event-binder (Client Micro-Interactions)</div>
                  </div>
                )}
              </div>

              {/* Ready to Customize Card */}
              <div className="rounded-2xl bg-[#111A30]/90 border border-[#252B3A] p-4 flex flex-col gap-3 shadow-xl backdrop-blur-md mt-auto">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <div className="text-sm font-bold text-[#F5F5F7] font-display tracking-tight">
                    Website Generated
                  </div>
                </div>
                <p className="text-xs text-[#8F9CAE] leading-relaxed">
                  Your website was synthesized to your exact specifications. You can refine it with prompts below or export the code.
                </p>
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab('code')}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[#8F9CAE] hover:text-[#F5F5F7] hover:bg-white/[0.05] transition-all cursor-pointer"
                  >
                    View Code
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsExportModalOpen(true)}
                    className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#3867FF] hover:bg-[#4d77ff] active:scale-95 text-[#F5F5F7] shadow-md shadow-[#3867FF]/30 transition-all cursor-pointer"
                  >
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Prompt Studio Input */}
            <form onSubmit={handleSubmitPrompt} className="p-3 border-t border-[#252B3A] bg-[#080B14]">
              <div className="rounded-2xl bg-[#111A30]/80 border border-[#252B3A] p-3 flex flex-col gap-2.5 focus-within:border-[#3867FF]/60 transition-colors">
                <textarea
                  rows={2}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmitPrompt(e)
                    }
                  }}
                  placeholder="Tell Forma what to add or modify (e.g. 'Add a contact form', 'Make background dark emerald')..."
                  className="w-full bg-transparent text-xs sm:text-sm text-[#F5F5F7] placeholder:text-[#55607A] outline-none resize-none leading-relaxed selection:bg-[#3867FF]/35"
                />

                <div className="flex items-center justify-between gap-2 pt-1">
                  {/* Plus button */}
                  <button
                    type="button"
                    className="w-7 h-7 rounded-full border border-[#252B3A] hover:border-[#3867FF]/60 text-[#8F9CAE] hover:text-[#F5F5F7] flex items-center justify-center transition-colors cursor-pointer bg-white/[0.02]"
                    title="Attach context or file"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>

                  {/* Right toolbar: Build pill, Mic, ArrowUp Send Button */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveMode((prev) => (prev === 'Build' ? 'Edit' : 'Build'))
                      }
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-[#252B3A] text-[11px] text-[#8F9CAE] hover:text-[#F5F5F7] transition-all cursor-pointer font-medium"
                    >
                      <span>{activeMode}</span>
                      <ChevronDown className="w-3 h-3 text-[#6B768E]" />
                    </button>

                    <button
                      type="button"
                      className="p-1.5 text-[#8F9CAE] hover:text-[#F052C7] transition-colors rounded-full hover:bg-white/[0.05] cursor-pointer"
                      title="Voice command"
                    >
                      <Mic className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="submit"
                      disabled={!chatInput.trim()}
                      className="w-7 h-7 rounded-full bg-[#3867FF] hover:bg-[#4d77ff] disabled:opacity-30 disabled:cursor-not-allowed text-[#F5F5F7] flex items-center justify-center transition-all cursor-pointer shadow-sm shadow-[#3867FF]/30 active:scale-95"
                      title="Send instruction"
                    >
                      <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </aside>
        )}

        {/* =====================================================================
            RIGHT COLUMN: Main Full-Bleed Preview Canvas & Studio
        ===================================================================== */}
        <main className="flex-1 flex flex-col h-[calc(100vh-52px)] bg-[#080B14] relative overflow-hidden">
          {/* Active Tab: Preview */}
          {activeTab === 'preview' && (
            <div className="w-full h-full flex items-center justify-center p-3 sm:p-5 relative overflow-hidden bg-[#080B14]">
              {/* Responsive Device Framing */}
              <div
                className={`h-full transition-all duration-300 rounded-2xl overflow-hidden border border-[#252B3A] shadow-2xl bg-[#080B14] flex flex-col ${
                  deviceView === 'mobile'
                    ? 'w-[375px] max-h-[812px]'
                    : deviceView === 'tablet'
                    ? 'w-[768px] max-h-[1024px]'
                    : 'w-full'
                }`}
              >
                <iframe
                  key={iframeKey}
                  title="FORMA Live Canvas"
                  srcDoc={projectCode.html}
                  className="w-full h-full border-0 bg-transparent"
                  sandbox="allow-scripts allow-same-origin allow-modals"
                />
              </div>
            </div>
          )}

          {/* Active Tab: Code */}
          {activeTab === 'code' && (
            <div className="w-full h-full p-4 overflow-hidden bg-[#080B14]">
              <CodeViewer
                html={projectCode.html}
                css={projectCode.css}
                js={projectCode.js}
              />
            </div>
          )}

          {/* Active Tab: Doc (Dynamic Architecture Spec based on user prompt) */}
          {activeTab === 'doc' && (
            <div className="w-full h-full p-6 sm:p-10 overflow-y-auto bg-[#080B14] text-left">
              <div className="max-w-3xl mx-auto flex flex-col gap-6">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#3867FF]">
                  <span>ARCHITECTURE SPECIFICATION</span>
                </div>
                <h1 className="text-3xl font-bold text-[#F5F5F7] font-display">
                  {projectName}
                </h1>
                <p className="text-sm text-[#8F9CAE] leading-relaxed">
                  Autonomous synthesis specification generated by FORMA Agent Engine for user prompt: &ldquo;{promptParam}&rdquo;.
                </p>

                <div className="p-5 rounded-2xl bg-[#111A30]/80 border border-[#252B3A] flex flex-col gap-3">
                  <h3 className="text-sm font-semibold text-[#F5F5F7]">Synthesis Blueprint</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono text-[#8F9CAE]">
                    <div>Category: <span className="text-[#F5F5F7]">{projectCode.category}</span></div>
                    <div>Layout: <span className="text-[#F5F5F7]">Responsive Fluid</span></div>
                    <div>Styling: <span className="text-[#F5F5F7]">Tailwind CSS Utility</span></div>
                    <div>Typography: <span className="text-[#F5F5F7]">Plus Jakarta Sans</span></div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#111A30]/80 border border-[#252B3A] flex flex-col gap-3">
                  <h3 className="text-sm font-semibold text-[#F5F5F7]">Generated Component Hierarchy</h3>
                  <ul className="text-xs text-[#8F9CAE] list-disc list-inside space-y-1.5 font-mono">
                    <li><code>Header</code>: Sticky responsive brand bar with CTA</li>
                    <li><code>HeroSection</code>: Dynamic headline & value propositions</li>
                    <li><code>FeatureBento</code>: Multi-column responsive showcase cards</li>
                    <li><code>InteractiveWidget</code>: Reactive client events</li>
                    <li><code>Footer</code>: Legal & navigation links</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Active Tab: Mesh (Visual DOM Node Hierarchy) */}
          {activeTab === 'mesh' && (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center gap-6 bg-[#080B14] overflow-y-auto">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#3867FF] to-[#F052C7] flex items-center justify-center text-white shadow-lg">
                <Layers className="w-7 h-7" />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold text-[#F5F5F7] font-display">
                  Component Mesh Hierarchy
                </h2>
                <p className="text-xs text-[#8F9CAE] max-w-md leading-relaxed">
                  Active DOM nodes assembled for {projectName}.
                </p>
              </div>

              {/* Visual Node Graph */}
              <div className="flex flex-col items-center gap-3 w-full max-w-md">
                <div className="px-4 py-2 rounded-xl bg-[#111A30] border border-[#3867FF]/60 text-xs font-mono text-[#F5F5F7] shadow-lg">
                  &lt;DocumentRoot : HTML5&gt;
                </div>
                <div className="w-0.5 h-4 bg-[#252B3A]" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full text-[11px] font-mono text-[#8F9CAE]">
                  <div className="p-2.5 rounded-lg bg-[#111A30]/80 border border-[#252B3A] text-center">Header</div>
                  <div className="p-2.5 rounded-lg bg-[#111A30]/80 border border-[#252B3A] text-center">Hero</div>
                  <div className="p-2.5 rounded-lg bg-[#111A30]/80 border border-[#252B3A] text-center">BentoGrid</div>
                  <div className="p-2.5 rounded-lg bg-[#111A30]/80 border border-[#252B3A] text-center">Footer</div>
                </div>
              </div>
            </div>
          )}

          {/* Floating Canvas Tool HUD (Bottom Center) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111A30]/90 border border-[#252B3A] shadow-2xl backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setActiveToolHud('select')}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                activeToolHud === 'select'
                  ? 'bg-[#3867FF] text-white shadow-sm'
                  : 'text-[#8F9CAE] hover:text-[#F5F5F7] hover:bg-white/[0.05]'
              }`}
              title="Inspect element (⛶)"
            >
              <MousePointer2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setActiveToolHud('text')}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                activeToolHud === 'text'
                  ? 'bg-[#3867FF] text-white shadow-sm'
                  : 'text-[#8F9CAE] hover:text-[#F5F5F7] hover:bg-white/[0.05]'
              }`}
              title="Typography / Text (T)"
            >
              <Type className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setActiveToolHud('pencil')}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                activeToolHud === 'pencil'
                  ? 'bg-[#3867FF] text-white shadow-sm'
                  : 'text-[#8F9CAE] hover:text-[#F5F5F7] hover:bg-white/[0.05]'
              }`}
              title="Draw / Annotate (✎)"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setActiveToolHud('box')}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                activeToolHud === 'box'
                  ? 'bg-[#3867FF] text-white shadow-sm'
                  : 'text-[#8F9CAE] hover:text-[#F5F5F7] hover:bg-white/[0.05]'
              }`}
              title="Shapes / Components (⬡)"
            >
              <Box className="w-4 h-4" />
            </button>
          </div>
        </main>
      </div>

      {/* Export & Deploy Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        html={projectCode.html}
        css={projectCode.css}
        js={projectCode.js}
        projectName={projectName}
        prompt={promptParam}
      />
    </div>
  )
}
