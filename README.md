# Handoff: Yellow Capital Website

## Overview
Full marketing website for Yellow Capital — an institutional-grade digital asset market-making firm. The site covers 10 routes: Home, 4 Service pages, Ecosystem, About, Contact, plus Insights/Careers/Legal stubs. It is a high-fidelity prototype with final copy, colors, typography, interactions, and animations.

## About the Design Files
The files in this bundle are **design references created in HTML/React** — they are prototypes demonstrating the intended look and behavior, not production code to copy directly. The task is to **recreate these designs in your target codebase** (e.g. Next.js, Remix, or another React framework) using established patterns, routing, and component libraries. The HTML files serve as a living spec; open them in a browser and interact with every page to understand expected behavior.

## Fidelity
**High-fidelity.** Pixel-perfect designs with final colors, typography, spacing, copy, and interactions. Recreate the UI precisely using your codebase's libraries and patterns.

---

## Design Tokens

### Colors
```css
--ink:          #0a0a0a   /* page background */
--ink-2:        #141413   /* section bg dark */
--ink-3:        #1c1b19   /* card bg */
--surface:      #f4f3ef   /* light section bg */
--surface-2:    #e8e6df
--line:         #24231f   /* hard border */
--line-soft:    #2e2d28   /* subtle border */
--line-lite:    #dcd9d0   /* light mode border */
--text:         #0a0a0a
--text-2:       #3b3636
--muted:        #524e48
--on-dark:      #e9e6df   /* primary text on dark */
--on-dark-2:    #a8a49a   /* secondary text on dark */
--on-dark-3:    #6e6a61   /* tertiary / labels */
--accent:       #fdda16   /* Yellow brand yellow */
--cta:          #ffb100   /* CTA amber */
```

### Typography
```
Display:  'Playfair Display' — serif — weights 400, 500 — used for all headings and hero text
UI:       'Inter Tight' — sans-serif — weights 300, 400, 500, 600 — body, labels, buttons
Mono:     'JetBrains Mono' — monospace — weights 400, 500 — eyebrows, chips, data
```

#### Type Scale
| Role | Size | Weight | Letter-spacing | Notes |
|---|---|---|---|---|
| Hero H1 | clamp(56px, 7vw, 108px) | 400 | -0.02em | Playfair Display |
| H2 | clamp(40px, 5vw, 72px) | 400 | -0.02em | Playfair Display, often italic em |
| Body large | 17–18px | 300 | — | Inter Tight |
| Body | 14–16px | 300–400 | — | Inter Tight |
| Eyebrow | 10–11px | 400 | 0.22em | JetBrains Mono, uppercase |
| Mono data | 10.5–13px | 400 | 0.12–0.18em | JetBrains Mono |

### Spacing
- Max content width: **1360px**, centered, padding: `0 40px`
- Section vertical padding: `120px 40px`
- Grid gaps: `14px` (cards), `48–72px` (content grids)
- Border radius: `4px` (cards, buttons, chips)

### Shadows
```css
--sh-sm: 0 2px 8px rgba(0,0,0,0.45);
--sh-md: 0 8px 32px rgba(0,0,0,0.55);
--sh-lg: 0 24px 64px rgba(0,0,0,0.65);
```

### Glass Card
```css
background: rgba(20,19,19,0.55);
backdrop-filter: blur(10px);
border: 1px solid rgba(255,255,255,0.08);
border-radius: 4px;
```

---

## Routes / Screens

### `/` — Home
**Purpose:** Marketing homepage. Introduces Yellow Capital, hero slides cycle through 3 key propositions, then surfaces stats, services, pillars, founder, ecosystem teaser, and CTA.

**Sections (top → bottom):**
1. **Nav** — sticky, glassmorphic on scroll. Logo left, nav links center, "Get in Touch" CTA right. Services dropdown with 4 items.
2. **Hero** — Full-viewport. Animated market canvas (`<canvas>`) as background — draws live candlestick chart + order book grid with yellow accent lines. Three rotating slides (auto-advance 6s, pause on hover) each with: slide number eyebrow, H1 (3 lines: 2 plain + 1 italic em), body copy, 2 CTAs. Progress bar at bottom. Prev/next arrows.
3. **StatRail** — 4 cells: `140+ Centralized Exchanges`, `100+ Web3 Projects Supported`, `7+ yrs Market Experience`, `24/7 Programmatic Execution`. Dark bg, large counter animation on enter, accent glow on middle cell.
4. **Standard of Care** — 2-col grid. Left: H2 + body. Right: 4 bullet rows with accent dot + label + description.
5. **Services** — 2×2 card grid. Each card: large italic number, service name, description, "Explore →" link.
6. **Order Book Exhibit** — Full-width dark section. Left: copy. Right: animated live order book viz (bids/asks tick in real time).
7. **Ecosystem** — 2-col. Left: copy + button. Right: interactive orbital system (Yellow Capital at center, 4 siblings orbit at different speeds, hover to pin + see label/description in HUD below).
8. **Pillars** — 3 horizontal rows, alternating rule + text layout. "Systemic approach", "Governance first", "Full-stack group".
9. **Captain (Founder)** — 2-col. Left: photo of Alexis Sirkia with gradient overlay + name tag. Right: eyebrow, H2, body, 3 chips (GSR co-founder, Rocket Scientist, Chairman).
10. **PreFooter CTA** — Centered on ink. H2: "Read first," / "Engage second." + subhead + primary CTA.
11. **Footer** — 4 link columns + logo + copyright.

---

### `/services/market-making`
### `/services/treasury-building`
### `/services/token-distribution`
### `/services/venture`
Each service page has:
- **ServiceHero** — slide number eyebrow, H1 with em, lede, stat rail (3 cells)
- **Body sections** — 2–3 content sections with copy + GlassCard grids
- **PreFooter CTA**

---

### `/ecosystem`
- Hero: "One group, five disciplines."
- 5-company grid: Yellow Capital (highlighted), Yellow.pro, Yellow.com, Yellow.org, Openware
- Timeline (2013 → 2025)
- PreFooter

---

### `/about`
- Hero: "Let us take the wheel."
- Firm description + **CoverageGlobe** (animated SVG: yellow core, 140 orbiting dots representing venues, 8 labeled planets with hover tooltips; facts strip below)
- Timeline (2017 → present)
- **Leadership & Team grid** (4 columns): 4 Principals + 3 Team members. Portrait cards with photos, role, name, "Prior ·" bio line. Team cards link to LinkedIn.
- PreFooter

---

### `/contact`
- Hero: "Start a conversation."
- 3-col layout:
  1. **Intake form** — Name, Role, Company, Client type (radio), Interests (checkboxes), Stage/timeline, Notes. Submit → success state.
  2. **Direct lines** — Sales: nem@yellow.com, Marketing & Partnerships: marketing@yellow.com, Official: capital@yellow.com. Each is a mailto link with hover accent.
  3. **Desk hours** — 24/7 availability, timezone info.

---

## Key Interactions & Animations

### Hero Canvas
- Full-bleed `<canvas>` behind hero text
- Draws animated candlestick chart: random walk price, 60 candles, yellow up candles / muted down candles
- Order book grid: thin horizontal lines at bid/ask levels, pulses on update
- Gradient overlay dims canvas toward center

### Hero Slides
- Auto-advance every 6s, pauses on `mouseenter`
- Progress bar animates width 0→100% over 6s, resets on slide change
- Slide content animates in via `slideIn` keyframe (translateY + opacity)
- Prev/Next arrows navigate manually

### StatRail CountUp
- Numbers count up from 0 using `requestAnimationFrame` easing when scrolled into view
- `IntersectionObserver` triggers on 12% threshold

### Reveal
- Every content block uses `IntersectionObserver` → opacity 0→1, translateY 14px→0 on enter
- 700ms `cubic-bezier(0.16,1,0.3,1)` easing; staggered via `delay` prop

### Orbital Ecosystem
- `requestAnimationFrame` loop, pauses on hover
- 4 orbiting nodes on elliptical paths (different speeds + phases)
- Mouse-parallax: tracks cursor relative to container, applies 4% parallax shift
- Active node: ring highlights, spoke thickens, HUD shows label + description

### CoverageGlobe (About)
- 140 nodes orbiting a yellow core at 3°/s
- 8 named venue nodes (Binance, OKX, Coinbase, etc.) with hover tooltips + spoke beams
- Breathing animation on orbit radius (sin wave)
- Tooltip: yellow pill shows venue name on hover

### Page Transitions
- Route change → key change on wrapper div → CSS `fadeIn` (opacity 0→1, 400ms)
- Scroll position resets to top on navigation

### Nav Scroll State
- Transparent on top → `background: rgba(10,10,10,0.85)` + `backdrop-filter: blur(16px)` after 20px scroll

### Glass Cards (hover)
- `translateY(-2px)` + shadow upgrade on hover (250ms)

---

## Component Inventory

| Component | Location | Notes |
|---|---|---|
| `Nav` | src/nav.jsx | Sticky, scroll-aware, dropdown |
| `Footer` | src/footer.jsx | 4-col links + logo |
| `PreFooter` | src/footer.jsx | Full-width CTA section |
| `Hero` + `MarketCanvas` | src/hero.jsx | Canvas + slide system |
| `StatRail` | src/home.jsx | Count-up cells |
| `EcosystemConstellation` | src/home.jsx | Orbital viz |
| `Captain` | src/home.jsx | Founder section |
| `GlassCard` | src/shared.jsx | Glassmorphic card |
| `Reveal` | src/shared.jsx | Scroll-reveal wrapper |
| `CountUp` | src/shared.jsx | Animated number |
| `BtnPrimary` / `BtnGhost` | src/shared.jsx | Button variants |
| `Eyebrow` | src/shared.jsx | Uppercase label chip |
| `Section` | src/shared.jsx | Padded section wrapper |
| `CoverageGlobe` | src/shared.jsx | Animated venue globe |
| `AboutPage` | src/pages.jsx | Team + timeline |
| `ContactPage` | src/pages.jsx | Form + direct lines |
| `EcosystemPage` | src/pages.jsx | Group companies |
| Service pages (×4) | src/services.jsx | MM, Treasury, Dist, Venture |

---

## Team Photos (Assets)
All in `assets/team/`:
| File | Person |
|---|---|
| alexis.jpg | Alexis Sirkia — Founder & Chairman |
| diego.png | Diego Martin — CEO |
| bakhtiyar.png | Bakhtiyar Mammadov — CFO |
| nem.png | Nem Popov — Head of BD |
| viivek.jpg | Viivek Mehata — Portfolio Manager |
| pedro.png | Pedro Miranda — Head of Client Acquisition |

Logo files in `assets/`:
- `logo-dark-bg.png` — for dark backgrounds
- `logo-white-bg.png` — for light backgrounds

---

## Files in This Bundle
| File | Purpose |
|---|---|
| `index.html` | Main entry point — React app shell, router, Tweaks |
| `src/shared.jsx` | Design tokens, primitives, GlassCard, CoverageGlobe |
| `src/nav.jsx` | Navigation |
| `src/hero.jsx` | Hero + canvas |
| `src/home.jsx` | Home page sections |
| `src/services.jsx` | 4 service pages |
| `src/pages.jsx` | Ecosystem, About, Contact pages |
| `src/footer.jsx` | Footer + PreFooter |
| `styles/tokens.css` | Raw CSS custom properties (copy into your global CSS) |
| `Yellow Capital - Standalone.html` | Single-file bundle — open this to interact with the full prototype offline |

---

## Implementation Notes for Developers

1. **Use the standalone HTML first** — open `Yellow Capital - Standalone.html` in a browser, click every page, hover interactive elements. This is your ground truth.
2. **Router** — the prototype uses a simple `useState` router. Replace with `next/router`, React Router, etc.
3. **Canvas** — the `MarketCanvas` in `src/hero.jsx` is self-contained. Lift it as-is or rewrite using a charting library.
4. **Animations** — `IntersectionObserver` + CSS transitions are used everywhere. Works fine in production; no extra deps needed.
5. **Fonts** — loaded from Google Fonts. In production, self-host via `next/font` or similar for performance.
6. **Forms** — the contact form is UI-only (no backend). Wire to your form handler / API.
7. **Email links** — all mailto: links are hardcoded. Confirm addresses before going live.
