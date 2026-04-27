'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Chip } from '@/components/shared';

const COLS = [
  { h: 'Services', items: [
    ['Market Making',      '/services/market-making'],
    ['Treasury Management','/services/treasury-management'],
    ['Programmatic Sales', '/services/programmatic-sales'],
    ['Venture Investment', '/services/venture-investment'],
  ]},
  { h: 'Company', items: [
    ['About Us',  '/about'],
    ['Ecosystem', '/ecosystem'],
    ['Insights',  '/insights'],
    ['Careers',   '/careers'],
    ['Contact',   '/contact'],
  ]},
  { h: 'Yellow Group', items: [
    ['Yellow.com', 'https://yellow.com'],
    ['Yellow.org', 'https://yellow.org'],
    ['Yellow.pro', 'https://yellow.pro'],
    ['Openware',   'https://openware.com'],
  ]},
  { h: 'Legal', items: [
    ['Terms',        '/terms'],
    ['Privacy',      '/privacy'],
    ['Disclosures',  '/disclosures'],
    ['Transparency', '/disclosures'],
  ]},
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const isExternal = href.startsWith('http');

  const style: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-ui)',
    fontSize: 13.5,
    color: hovered ? 'var(--accent)' : 'var(--on-dark)',
    textDecoration: 'none',
    padding: '6px 0',
    transition: 'color 200ms',
    fontWeight: 300,
  };

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={style}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {children} <span style={{ color: 'var(--on-dark-3)', marginLeft: 4 }}>↗</span>
      </a>
    );
  }

  return (
    <Link href={href} style={style}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {children}
    </Link>
  );
}

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--on-dark)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '100px 40px 0' }}>

        {/* Link grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1.2fr 1.2fr 1.2fr', gap: 36, paddingBottom: 56, borderBottom: '1px solid var(--line-soft)' }}>
          <div>
            <Image src="/assets/logo-dark-bg.png" alt="Yellow Capital" width={120} height={28} style={{ height: 28, width: 'auto', marginBottom: 18 }} />
            <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 13.5, lineHeight: 1.55, color: 'var(--on-dark-2)', maxWidth: 300, margin: '0 0 18px' }}>
              A Yellow Group company. Institutional-grade liquidity, treasury, and venture across digital assets since 2018.
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <Chip>Montana GP</Chip>
              <Chip>Chainalysis</Chip>
              <Chip>Est. 2018</Chip>
            </div>
          </div>

          {COLS.map(col => (
            <div key={col.h}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--on-dark-3)', marginBottom: 18 }}>
                {col.h}
              </div>
              {col.items.map(([label, href]) => (
                <FooterLink key={label} href={href}>{label}</FooterLink>
              ))}
            </div>
          ))}
        </div>

        {/* Giant YELLOW wordmark */}
        <div ref={ref} style={{ position: 'relative', padding: '60px 0 20px', height: 'clamp(180px, 18vw, 300px)' }}>
          <div style={{
            position: 'absolute', left: '50%', top: '50%', width: 700, height: 340,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(253,218,22,0.08), transparent 62%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }} />
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(120px, 18vw, 280px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              textAlign: 'center',
              color: 'var(--on-dark-3)',
              position: 'relative',
              transform: v ? 'translateY(-8px)' : 'translateY(24px)',
              opacity: v ? 1 : 0.6,
              transition: 'all 1200ms cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            YELLOW
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px 0 32px',
            borderTop: '1px solid var(--line-soft)',
            fontFamily: 'var(--font-mono)',
            fontSize: 10.5,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--on-dark-3)',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <span>© 2026 Yellow Capital · All rights reserved</span>
          <span>Not investment advice · No performance guaranteed · See disclosures</span>
        </div>
      </div>
    </footer>
  );
}
