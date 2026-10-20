from typing import Any, Dict, List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="AI Website Builder Agent API",
    description="Backend API for An AI Agent That Builds Websites from Natural Language Prompts",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PromptRequest(BaseModel):
    prompt: str = Field(..., min_length=3, description="Natural language description of the website")
    theme: Optional[str] = Field("dark", description="Visual theme preference (dark, light, cyber, vibrant)")
    style: Optional[str] = Field("modern", description="Aesthetic style (modern, minimal, bold)")


class WebsiteSection(BaseModel):
    id: str
    type: str
    title: str
    content: str


class WebsiteResponse(BaseModel):
    project_name: str
    summary: str
    theme: str
    design_tokens: Dict[str, str]
    sections: List[WebsiteSection]
    html: str
    status: str = "success"


def _synthesize_website(prompt: str, theme: str = "dark", style: str = "modern") -> Dict[str, Any]:
    cleaned = prompt.strip()
    words = cleaned.split()
    primary_topic = " ".join(words[:4]).title() if words else "Modern Web Project"

    # Determine theme palette
    if theme == "light":
        bg_color = "#f8fafc"
        card_bg = "#ffffff"
        text_color = "#0f172a"
        muted_text = "#64748b"
        accent_color = "#4f46e5"
        border_color = "#e2e8f0"
    elif theme == "cyber":
        bg_color = "#090d16"
        card_bg = "#0f172a"
        text_color = "#f8fafc"
        muted_text = "#94a3b8"
        accent_color = "#06b6d4"
        border_color = "#1e293b"
    else:  # modern dark default
        bg_color = "#0b0f19"
        card_bg = "#111827"
        text_color = "#f9fafb"
        muted_text = "#9ca3af"
        accent_color = "#8b5cf6"
        border_color = "#1f2937"

    sections = [
        WebsiteSection(
            id="hero",
            type="hero",
            title=f"{primary_topic}",
            content=f"Crafted dynamically from the prompt: \"{cleaned}\". Zero manual coding required.",
        ),
        WebsiteSection(
            id="features",
            type="features",
            title="Core Highlights",
            content="Intelligent structure, accessible typography, and responsive grid layouts synthesized on demand.",
        ),
        WebsiteSection(
            id="challenge-solution",
            type="problem-solution",
            title="Why Prompt-Driven Creation",
            content="Eliminating technical friction, rigid template lock-in, and repetitive manual iteration.",
        ),
        WebsiteSection(
            id="cta",
            type="cta",
            title="Ready to Launch?",
            content="Iterate seamlessly using natural prompts or export clean HTML/CSS code directly.",
        ),
    ]

    generated_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{primary_topic} | Generated Website</title>
  <style>
    :root {{
      --bg: {bg_color};
      --card-bg: {card_bg};
      --text: {text_color};
      --muted: {muted_text};
      --accent: {accent_color};
      --border: {border_color};
    }}
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
    }}
    header {{
      padding: 1.5rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border);
    }}
    .brand {{ font-weight: 700; font-size: 1.25rem; color: var(--accent); }}
    .nav-links a {{
      color: var(--muted);
      text-decoration: none;
      margin-left: 1.5rem;
      font-size: 0.95rem;
      transition: color 0.2s;
    }}
    .nav-links a:hover {{ color: var(--text); }}
    .hero-section {{
      text-align: center;
      padding: 5rem 1.5rem 4rem;
      max-width: 900px;
      margin: 0 auto;
    }}
    .badge {{
      display: inline-block;
      padding: 0.35rem 0.85rem;
      background: rgba(139, 92, 246, 0.15);
      color: var(--accent);
      border-radius: 9999px;
      font-size: 0.85rem;
      margin-bottom: 1.5rem;
      font-weight: 600;
    }}
    h1 {{
      font-size: clamp(2.25rem, 5vw, 3.5rem);
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 1.25rem;
    }}
    .hero-desc {{
      font-size: 1.2rem;
      color: var(--muted);
      max-width: 680px;
      margin: 0 auto 2.5rem;
    }}
    .cta-btn {{
      display: inline-block;
      background: var(--accent);
      color: #fff;
      padding: 0.85rem 2rem;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      transition: transform 0.2s, opacity 0.2s;
    }}
    .cta-btn:hover {{ opacity: 0.92; transform: translateY(-1px); }}
    .grid-section {{
      padding: 4rem 1.5rem;
      max-width: 1100px;
      margin: 0 auto;
    }}
    .cards-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }}
    .card {{
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 2rem;
    }}
    .card h3 {{ font-size: 1.25rem; margin-bottom: 0.75rem; color: var(--text); }}
    .card p {{ color: var(--muted); font-size: 0.95rem; }}
    footer {{
      text-align: center;
      padding: 3rem 1.5rem;
      border-top: 1px solid var(--border);
      color: var(--muted);
      font-size: 0.9rem;
    }}
  </style>
</head>
<body>
  <header>
    <div class="brand">{primary_topic}</div>
    <nav class="nav-links">
      <a href="#features">Features</a>
      <a href="#about">About</a>
      <a href="#cta">Contact</a>
    </nav>
  </header>

  <main>
    <section class="hero-section">
      <span class="badge">AI Prompt Generated</span>
      <h1>{primary_topic}</h1>
      <p class="hero-desc">{sections[0].content}</p>
      <a href="#cta" class="cta-btn">Get Started Now</a>
    </section>

    <section id="features" class="grid-section">
      <div class="cards-grid">
        <div class="card">
          <h3>⚡ Instant Synthesis</h3>
          <p>Converts prompts into structured semantic layouts without manual HTML/CSS wrangling.</p>
        </div>
        <div class="card">
          <h3>🎨 Design Harmony</h3>
          <p>Automatic token resolution for high-contrast palettes, typography, and responsive spacing.</p>
        </div>
        <div class="card">
          <h3>🔄 Frictionless Iteration</h3>
          <p>Modify sections, themes, and structures through ongoing natural language interaction.</p>
        </div>
      </div>
    </section>
  </main>

  <footer id="cta">
    <p>&copy; 2026 {primary_topic}. Generated by AI Website Builder Agent.</p>
  </footer>
</body>
</html>"""

    return {
        "project_name": primary_topic,
        "summary": f"Prompt-driven website synthesized for: '{cleaned}'",
        "theme": theme,
        "design_tokens": {
            "background": bg_color,
            "card_background": card_bg,
            "text": text_color,
            "muted_text": muted_text,
            "accent": accent_color,
            "border": border_color,
        },
        "sections": [s.model_dump() for s in sections],
        "html": generated_html,
        "status": "success",
    }


@app.get("/")
def home():
    return {
        "message": "Welcome to the AI Website Builder Agent API",
        "project": "An AI Agent That Builds Websites from Natural Language Prompts",
        "status": "running",
        "challenges_addressed": [
            "Website development requires technical skills and design knowledge",
            "Manual coding is time-consuming and error-prone",
            "Drag-and-drop builders offer limited flexibility",
            "Users struggle to translate ideas into technical structure",
            "Frequent iteration requires repeated developer involvement",
        ],
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.post("/api/generate", response_model=WebsiteResponse)
def generate_website(req: PromptRequest):
    if not req.prompt or len(req.prompt.strip()) < 3:
        raise HTTPException(status_code=400, detail="Prompt must be at least 3 characters long")
    return _synthesize_website(req.prompt, req.theme or "dark", req.style or "modern")
