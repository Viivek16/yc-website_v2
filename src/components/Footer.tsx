'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--on-dark)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '100px 40px 0' }}>

        {/* Link grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1.2fr 1.2fr 1.2fr', gap: 36, paddingBottom: 56, borderBottom: '1px solid var(--line-soft)' }}>
          <div>
            <Image src="/assets/logo-dark-bg.png" alt="Yellow Capital" width={244} height={90} style={{ height: 90, width: 'auto', marginBottom: 18 }} />
            <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 13.5, lineHeight: 1.55, color: 'var(--on-dark-2)', maxWidth: 300, margin: '0 0 18px' }}>
              A Yellow Group company. Institutional-grade liquidity, treasury, and venture across digital assets since 2018.
            </p>
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
