import { Breadcrumb, BtnPrimary, BtnGhost, MAIL } from '@/components/shared';

interface RailCell { l: string; v: string }

interface ServiceHeroProps {
  n: string;
  section: string;
  title: string;
  em: string;
  lede: string;
  rail?: RailCell[];
  primary?: string;
  ghost?: string;
  ghostHref?: string;
}

export function ServiceHero({ n, section, title, em, lede, rail, primary = 'Get in Touch', ghost = 'Know More', ghostHref = '#content' }: ServiceHeroProps) {
  return (
    <section style={{ background: 'var(--ink)', color: 'var(--on-dark)', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line-soft)', padding: '72px 40px 80px' }}>
      <div style={{ position: 'absolute', top: -180, right: -140, width: 760, height: 760, background: 'radial-gradient(circle, rgba(253,218,22,0.06), transparent 62%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1360, margin: '0 auto', position: 'relative' }}>
        <Breadcrumb items={['Yellow Capital', `Services · ${n}`, section]} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 11fr', gap: 28, alignItems: 'start' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(80px, 9vw, 140px)', letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--on-dark-3)', filter: 'drop-shadow(0 0 40px rgba(253,218,22,0.18))' }}>
            {n}
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(52px, 6.4vw, 96px)', letterSpacing: '-0.02em', lineHeight: 1.02, margin: '0 0 24px' }}>
              {title} <em style={{ fontStyle: 'italic', color: 'var(--accent)', filter: 'drop-shadow(0 0 20px rgba(253,218,22,0.3))' }}>{em}</em>
            </h1>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.35, color: 'var(--on-dark-2)', maxWidth: 760, margin: 0, fontStyle: 'italic', fontWeight: 400 }}>
              {lede}
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap' }}>
              <BtnPrimary size="lg" href={MAIL}>{primary}</BtnPrimary>
              <BtnGhost href={ghostHref} arrow="↓">{ghost}</BtnGhost>
            </div>
          </div>
        </div>

        {rail && (
          <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: `repeat(${rail.length}, 1fr)`, borderTop: '1px solid rgba(255,255,255,0.14)', borderBottom: '1px solid rgba(255,255,255,0.14)' }}>
            {rail.map((c, i) => (
              <div key={i} style={{ padding: '26px 24px', borderRight: i < rail.length - 1 ? '1px solid var(--line-soft)' : 0, background: 'rgba(20,19,19,0.3)', backdropFilter: 'blur(6px)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>{c.l}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 36, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums', marginTop: 8, lineHeight: 1 }}>{c.v}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
