'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Section, Eyebrow, Reveal } from '@/components/shared';

const ITEMS = [
  { n: '01', name: 'Market Making',       desc: '24/7 algorithmic liquidity provision across eleven major centralized venues. Symmetric-spread execution. Weekly transparency ledger.',             path: '/services/market-making' },
  { n: '02', name: 'Treasury Management', desc: 'Strategic treasury building with zero market impact. 30% minimum USDT payback, guaranteed.',                                                    path: '/services/treasury-management' },
  { n: '03', name: 'Programmatic Sales',  desc: 'Discreet, algorithmic liquidation of token allocations at favorable prices, without disrupting the market.',                                    path: '/services/programmatic-sales' },
  { n: '04', name: 'Venture Investment',  desc: 'Strategic capital and advisory for early-stage token projects, channeled through the Yellow Group ecosystem.',                                  path: '/services/venture-investment' },
];

function ServiceCard({ n, name, desc, path }: typeof ITEMS[0]) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={parseInt(n) * 60}>
      <Link
        href={path}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'rgba(20,19,19,0.6)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 4,
          padding: '32px 32px 28px',
          textDecoration: 'none',
          color: 'var(--on-dark)',
          boxShadow: hovered ? 'var(--sh-md)' : 'var(--sh-sm)',
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          transition: 'all 220ms',
          display: 'block',
          position: 'relative',
          height: '100%',
        }}
      >
        <div style={{ height: 1, background: 'var(--accent)', width: hovered ? '100%' : 40, marginBottom: 22, transition: 'width 320ms cubic-bezier(0.16,1,0.3,1)' }} />
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>Service · {n}</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 34, letterSpacing: '-0.018em', lineHeight: 1.08, margin: '12px 0 14px' }}>{name}</h3>
        <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 14.5, lineHeight: 1.6, color: 'var(--on-dark-2)', margin: '0 0 24px' }}>{desc}</p>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Learn more</span>
          <span style={{ transition: 'transform 200ms', transform: hovered ? 'translateX(4px)' : 'translateX(0)' }}>→</span>
        </div>
      </Link>
    </Reveal>
  );
}

export function HomeServices() {
  return (
    <Section id="services" bg="ink">
      <div style={{ marginBottom: 72, maxWidth: 720 }}>
        <Eyebrow accentRule>02 · Services</Eyebrow>
        <h2 className="h2" style={{ margin: '18px 0 22px' }}>Four capabilities. <em>One desk.</em></h2>
        <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 17, lineHeight: 1.55, color: 'var(--on-dark-2)', margin: 0 }}>
          Each service is designed to operate independently, or compound together across a token&apos;s full lifecycle.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {ITEMS.map(it => <ServiceCard key={it.n} {...it} />)}
      </div>
    </Section>
  );
}
