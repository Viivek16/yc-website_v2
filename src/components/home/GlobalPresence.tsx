'use client';
import { useState, useEffect } from 'react';

// ── Card component ─────────────────────────────────────────────────
function PresenceCard({ src, w, h }: { src: string; w: number; h: number }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: w, height: h, flexShrink: 0, borderRadius: 4,
        overflow: 'hidden', position: 'relative', cursor: 'crosshair',
      }}
    >
      {/* Photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          filter: hov
            ? 'grayscale(0) brightness(1) contrast(1.05)'
            : 'grayscale(1) brightness(0.45)',
          transform: hov ? 'scale(1.05)' : 'scale(1)',
          transition: 'filter 600ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      {/* Bottom gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,10,10,0) 40%, rgba(10,10,10,0.55) 100%)',
        opacity: hov ? 0.6 : 0.4,
        transition: 'opacity 500ms',
        pointerEvents: 'none',
      }} />

      {/* Yellow top-border sweep */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: '#fdda16',
        transform: hov ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
      }} />

      {/* Yellow glowing dot */}
      <div style={{
        position: 'absolute', top: 14, right: 14,
        width: 7, height: 7, borderRadius: '50%',
        background: '#fdda16',
        boxShadow: hov ? '0 0 16px 4px rgba(253,218,22,0.55)' : 'none',
        opacity: hov ? 1 : 0,
        transition: 'all 400ms cubic-bezier(0.16,1,0.3,1)',
      }} />
    </div>
  );
}

// ── Column layout ─────────────────────────────────────────────────
const H = 480;
const GAP = 10;

type SingleCol = { type: 'single'; w: number; src: string };
type DoubleCol = { type: 'double'; w: number; cards: { src: string }[] };
type Column = SingleCol | DoubleCol;

const COLUMNS: Column[] = [
  { type: 'single', w: 440, src: '/assets/events/speaker-keynote.jpg' },
  { type: 'single', w: 300, src: '/assets/events/panel-two-speakers.jpg' },
  { type: 'single', w: 380, src: '/assets/events/binance-stage.jpg' },
  { type: 'single', w: 360, src: '/assets/events/ceo-panel-speaking.jpg' },
  { type: 'single', w: 300, src: '/assets/events/office-entrance.jpg' },
  { type: 'double', w: 340, cards: [
    { src: '/assets/events/group-hedge-wall.jpg' },
    { src: '/assets/events/speaker-on-stage.jpg' },
  ]},
  { type: 'single', w: 420, src: '/assets/events/networking.jpg' },
  { type: 'single', w: 300, src: '/assets/events/yellow-shirts.jpg' },
];

// Duplicate for seamless loop
const ALL_COLS: Column[] = [...COLUMNS, ...COLUMNS];

// ── Section ────────────────────────────────────────────────────────
export function GlobalPresence() {
  const [paused, setPaused] = useState(false);

  // Inject keyframe on mount (avoids global CSS dependency)
  useEffect(() => {
    if (document.getElementById('gp-keyframe')) return;
    const s = document.createElement('style');
    s.id = 'gp-keyframe';
    s.textContent = '@keyframes gpScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }';
    document.head.appendChild(s);
    return () => { s.remove(); };
  }, []);

  return (
    <section style={{
      background: 'var(--ink)', color: 'var(--on-dark)',
      paddingTop: 120, overflow: 'hidden',
      borderBottom: '1px solid var(--line-soft)', position: 'relative',
    }}>
      {/* Subtle yellow glow */}
      <div style={{
        position: 'absolute', left: '50%', top: '60%', width: 1200, height: 400,
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(ellipse, rgba(253,218,22,0.05), transparent 65%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      {/* Section header */}
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 40px 56px', position: 'relative' }}>
        {/* Eyebrow */}
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--on-dark-3)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ width: 24, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
          03 · Global Presence
        </div>

        {/* H2 */}
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 400,
          fontSize: 'clamp(40px, 5vw, 68px)', letterSpacing: '-0.02em',
          lineHeight: 1.04, margin: '18px 0 20px', color: 'var(--on-dark)',
        }}>
          Across all the major stages.
        </h2>

        {/* Subtitle */}
        <p style={{
          fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 16, lineHeight: 1.65,
          color: 'var(--on-dark-2)', maxWidth: 580, margin: 0,
        }}>
          With a global team across 10+ countries and even a wider presence,
          we are often featured across major global events &amp; conferences.
        </p>
      </div>

      {/* Auto-scrolling photo strip */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ width: '100%', overflow: 'hidden', position: 'relative', paddingBottom: 48 }}
      >
        {/* Left fade */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 4,
          background: 'linear-gradient(to right, #0a0a0a 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        {/* Right fade */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 4,
          background: 'linear-gradient(to left, #0a0a0a 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Scrolling track */}
        <div style={{
          display: 'flex',
          gap: GAP,
          alignItems: 'flex-start',
          width: 'max-content',
          height: H,
          paddingLeft: 40,
          paddingRight: 40,
          animation: 'gpScroll 65s linear infinite',
          animationPlayState: paused ? 'paused' : 'running',
        }}>
          {ALL_COLS.map((col, ci) =>
            col.type === 'single' ? (
              <PresenceCard key={ci} src={col.src} w={col.w} h={H} />
            ) : (
              <div key={ci} style={{
                width: col.w, flexShrink: 0,
                display: 'flex', flexDirection: 'column', gap: GAP,
              }}>
                {col.cards.map((c, i) => (
                  <PresenceCard key={i} src={c.src} w={col.w} h={(H - GAP) / 2} />
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
