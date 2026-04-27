import { Section, Eyebrow, Reveal, GlassCard } from '@/components/shared';

const PILLARS = [
  { n: 'I',   t: 'Legitimacy.',           b: 'Montana-registered GP. Chainalysis on every counterparty. Symmetric-spread execution only. Weekly PnL that can be audited line by line.' },
  { n: 'II',  t: 'Ecosystem.',            b: 'Trading infrastructure, editorial media, protocol layer, and token distribution — one relationship that compounds across the token lifecycle.' },
  { n: 'III', t: 'Algorithmic precision.', b: 'A proprietary engine with seven-tier spread configuration, WebSocket feeds, and a 7× inventory buffer.' },
];

export function HomePillars() {
  return (
    <Section bg="ink2">
      <div style={{ marginBottom: 56 }}>
        <Eyebrow accentRule>05 · Pillars</Eyebrow>
        <h2 className="h2" style={{ margin: '18px 0 0' }}>Why counterparties <em>stay.</em></h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {PILLARS.map((p, i) => (
          <Reveal key={i} delay={i * 70}>
            <GlassCard style={{ padding: 32, height: '100%' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 52, color: 'var(--accent)', lineHeight: 1, filter: 'drop-shadow(0 0 18px rgba(253,218,22,0.25))' }}>{p.n}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 26, letterSpacing: '-0.01em', margin: '20px 0 12px' }}>{p.t}</h3>
              <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 14.5, lineHeight: 1.6, color: 'var(--on-dark-2)' }}>{p.b}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
