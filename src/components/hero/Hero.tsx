'use client';

import { MarketCanvas } from './MarketCanvas';
import { Eyebrow, BtnPrimary, BtnGhost, MAIL } from '@/components/shared';

export function Hero() {
  return (
    <section
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
        <div style={{ maxWidth: 960 }}>
          <Eyebrow accentRule>01 · Liquidity</Eyebrow>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(56px, 7vw, 108px)',
            letterSpacing: '-0.02em',
            lineHeight: 1.02,
            margin: '20px 0 24px',
          }}>
            <span>Institutional<br /></span>
            <span>Market Making<br /></span>
            <em style={{ fontStyle: 'italic' }}>Aligned Liquidity.</em>
          </h1>

          <p style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 300,
            fontSize: 18,
            lineHeight: 1.55,
            color: 'var(--on-dark-2)',
            maxWidth: 640,
          }}>
            <em style={{ fontStyle: 'italic', color: 'var(--on-dark-2)' }}>
              Compliance-first algorithmic market making across eleven major venues. We replace hidden price pressure and sudden volatility with a multi-layered liquidity framework engineered for sustainable growth.
            </em>
          </p>

          <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' }}>
            <BtnPrimary href={MAIL} size="lg">Schedule a Consultation</BtnPrimary>
            <BtnGhost href="/services/market-making">Our Services</BtnGhost>
          </div>
        </div>
      </div>
    </section>
  );
}
