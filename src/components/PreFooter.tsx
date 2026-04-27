import { Eyebrow, BtnPrimary, BtnGhost, MAIL } from '@/components/shared';

interface PreFooterProps {
  eyebrow?: string;
  headline: string;
  subhead?: string;
  primary?: string;
  ghost?: string;
  ghostTo?: string;
}

export function PreFooter({
  eyebrow = '',
  headline,
  subhead,
  primary = 'Schedule consultation',
  ghost,
  ghostTo = '/about',
}: PreFooterProps) {
  return (
    <section
      style={{
        background: 'var(--ink)',
        color: 'var(--on-dark)',
        padding: '140px 40px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--line-soft)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 780,
          height: 520,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(253,218,22,0.10), transparent 62%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          animation: 'pulseGlow 6s ease-in-out infinite',
        }}
      />
      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
        {eyebrow && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        )}
        <h2
          className="h2"
          style={{ margin: eyebrow ? '0 0 28px' : '0 0 28px' }}
          dangerouslySetInnerHTML={{ __html: headline }}
        />
        {subhead && (
          <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 17, lineHeight: 1.55, color: 'var(--on-dark-2)', maxWidth: 580, margin: '0 auto 36px' }}>
            {subhead}
          </p>
        )}
        <div style={{ display: 'inline-flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <BtnPrimary size="lg" href={MAIL}>{primary}</BtnPrimary>
          {ghost && <BtnGhost href={ghostTo} arrow="←">{ghost}</BtnGhost>}
        </div>
      </div>
    </section>
  );
}
