import { CountUp } from '@/components/shared';

const CELLS = [
  { n: 140, suf: '+',  label: 'CEX Integrations' },
  { n: 100, suf: '+',  label: 'Web3 Projects Supported', glow: true },
  { n: 15,  suf: '+',  label: 'Countries' },
  { txt: '24 / 7',    label: 'Programmatic Execution' },
] as const;

export function StatRail() {
  return (
    <section style={{ background: 'var(--ink-2)', padding: '0 40px', color: 'var(--on-dark)' }}>
      <div style={{ maxWidth: 1360, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid rgba(255,255,255,0.14)', borderBottom: '1px solid rgba(255,255,255,0.14)' }}>
          {CELLS.map((c, i) => (
            <div
              key={i}
              style={{
                padding: '40px 32px',
                borderRight: i < CELLS.length - 1 ? '1px solid var(--line-soft)' : 0,
                background: 'rgba(20,19,19,0.3)',
                backdropFilter: 'blur(6px)',
                boxShadow: 'glow' in c && c.glow ? 'inset 0 0 0 1px rgba(253,218,22,0.12), 0 0 32px 0 rgba(253,218,22,0.06)' : 'none',
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(44px, 4vw, 56px)', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums', lineHeight: 1, color: 'var(--on-dark)' }}>
                {'txt' in c ? c.txt : <CountUp to={c.n} suffix={c.suf} />}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--on-dark-3)', marginTop: 14 }}>
                {c.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
