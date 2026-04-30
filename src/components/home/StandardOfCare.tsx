import { Section, Eyebrow, Reveal } from '@/components/shared';

const PILLARS = [
  { n: 'I',   title: 'Symmetric by design.',      body: "Spreads are published and reviewed weekly. No asymmetric fill advantage retained by the desk. We don't profit from asymmetry against the projects we represent." },
  { n: 'II',  title: 'Inventory as a constraint.', body: 'A 7× inventory buffer caps exposure per pair. If the cap is breached, the desk widens before it holds.' },
  { n: 'III', title: 'Auditable by default.',      body: 'Weekly PnL, fill quality, and counterparty reports formatted to be verified line by line. No black boxes.' },
  { n: 'IV',  title: 'Disciplined intake.',        body: 'Every counterparty passes Chainalysis screening. We decline mandates that cannot meet our compliance standard.' },
];

export function StandardOfCare() {
  return (
    <Section bg="ink">
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 48, marginBottom: 72 }}>
        <div>
          <Eyebrow accentRule>02 · Standard of Care</Eyebrow>
          <h2 className="h2" style={{ margin: '18px 0 0' }}>
            The standard <em>a counterparty should expect.</em>
          </h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid var(--line-soft)' }}>
        {PILLARS.map((p, i) => (
          <Reveal key={i} delay={i * 80}>
            <div
              className="pillar"
              style={{
                padding: '36px 28px',
                borderRight: i < PILLARS.length - 1 ? '1px solid var(--line-soft)' : 0,
                background: 'rgba(20,19,19,0.4)',
                borderBottom: '1px solid var(--line-soft)',
                height: '100%',
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontStyle: 'italic', fontSize: 56, color: 'var(--accent)', lineHeight: 1, filter: 'drop-shadow(0 0 18px rgba(253,218,22,0.3))' }}>
                {p.n}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 24, letterSpacing: '-0.01em', lineHeight: 1.15, margin: '20px 0 12px' }}>
                {p.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 14.5, lineHeight: 1.6, color: 'var(--on-dark-2)' }}>
                {p.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
