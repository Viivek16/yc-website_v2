'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MarketCanvas } from './MarketCanvas';
import { Eyebrow, BtnPrimary, BtnGhost, MAIL } from '@/components/shared';

const HERO_SLIDES = [
  {
    n: '01', section: 'Liquidity',
    headline: { lines: ['Institutional', 'Market Making'], em: 'Aligned Liquidity.' },
    sub: 'Compliance-first algorithmic market making across eleven major venues. We replace hidden price pressure and sudden volatility with a multi-layered liquidity framework engineered for sustainable growth.',
    ctas: [
      { label: 'Schedule a Consultation', primary: true, href: MAIL },
      { label: 'Our Services',            ghost: true,   href: '/services/market-making' },
    ],
  },
  {
    n: '02', section: 'Treasury',
    headline: { lines: ['Strategy', 'Treasury Building'], em: 'Zero Market Impact.' },
    sub: 'Build a sustainable runway with our algorithmic model, liquidating tokens to accumulate a diversified treasury at favorable prices. 30% minimum USDT payback, guaranteed.',
    ctas: [
      { label: 'Get in Touch', primary: true, href: MAIL },
      { label: 'Know More',    ghost: true,   href: '/services/treasury-management' },
    ],
  },
  {
    n: '03', section: 'Ecosystem',
    headline: { lines: ['One Group,'], em: 'Five Disciplines.' },
    sub: 'Yellow Capital is one operating company inside Yellow Group. The whole stack — listing, liquidity, editorial, research, infrastructure — reports through a single governance layer.',
    ctas: [
      { label: 'Get in Touch',       primary: true, href: MAIL },
      { label: 'Explore Ecosystem',  ghost: true,   href: '/ecosystem' },
    ],
  },
];

export function Hero() {
  const [idx,      setIdx]      = useState(0);
  const [paused,   setPaused]   = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (paused) return;
    let start = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const elapsed = t - start;
      const p = Math.min(1, elapsed / 6000);
      setProgress(p);
      if (p >= 1) {
        setIdx(i => (i + 1) % HERO_SLIDES.length);
        start = t;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, idx]);

  const jump = (i: number) => { setIdx(i); setProgress(0); };
  const slide = HERO_SLIDES[idx];

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        background: 'var(--ink)',
        color: 'var(--on-dark)',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--line-soft)',
        minHeight: 'calc(100vh - 61px)',
      }}
    >
      <MarketCanvas />

      {/* Subtle accent glow top-right */}
      <div style={{ position: 'absolute', top: -260, right: -200, width: 900, height: 900, background: 'radial-gradient(circle, rgba(253,218,22,0.05), transparent 60%)', pointerEvents: 'none', zIndex: 1 }} />

      <div
        style={{
          maxWidth: 1360,
          margin: '0 auto',
          padding: '72px 40px 96px',
          position: 'relative',
          zIndex: 3,
          minHeight: 'calc(100vh - 61px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
            exit={{    opacity: 0, y: -10, filter: 'blur(2px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: 960 }}
          >
            <Eyebrow accentRule>{slide.n} · {slide.section}</Eyebrow>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(56px, 7vw, 108px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.02,
              margin: '20px 0 24px',
            }}>
              {slide.headline.lines.map((l, i) => (
                <span key={i}>{l}<br /></span>
              ))}
              <em style={{ fontStyle: 'italic' }}>{slide.headline.em}</em>
            </h1>

            <p style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 300,
              fontSize: 18,
              lineHeight: 1.55,
              color: 'var(--on-dark-2)',
              maxWidth: 640,
            }}>
              <em style={{ fontStyle: 'italic', color: 'var(--on-dark-2)' }}>{slide.sub}</em>
            </p>

            <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' }}>
              {slide.ctas.map((cta, i) =>
                cta.primary ? (
                  <BtnPrimary key={i} href={cta.href} size="lg">{cta.label}</BtnPrimary>
                ) : (
                  <BtnGhost key={i} href={cta.href}>{cta.label}</BtnGhost>
                )
              )}
            </div>

            {/* Slide progress indicators */}
            <div style={{ display: 'flex', gap: 12, marginTop: 48 }}>
              {HERO_SLIDES.map((s, i) => {
                const active = i === idx;
                return (
                  <button
                    key={i}
                    onClick={() => jump(i)}
                    aria-label={`Slide ${i + 1}`}
                    style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 8, minWidth: 60 }}
                  >
                    <div style={{ height: 2, width: 60, background: active ? 'transparent' : 'var(--on-dark-3)', position: 'relative', overflow: 'hidden' }}>
                      <div style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: active ? `${progress * 100}%` : '0%',
                        background: 'var(--accent)',
                        boxShadow: active ? '0 0 8px rgba(253,218,22,0.5)' : 'none',
                        transition: 'width 0ms',
                      }} />
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 9.5,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: active ? 'var(--on-dark)' : 'var(--on-dark-3)',
                    }}>0{i + 1}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
