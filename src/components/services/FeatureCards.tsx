import { Reveal, GlassCard } from '@/components/shared';

interface FeatureItem {
  n?: string;
  title: string;
  body: string;
}

interface FeatureCardsProps {
  cols?: number;
  items: FeatureItem[];
}

export function FeatureCards({ cols = 3, items }: FeatureCardsProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 14 }}>
      {items.map((it, i) => (
        <Reveal key={i} delay={i * 60}>
          <GlassCard style={{ padding: 32, height: '100%' }}>
            {it.n && (
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'var(--accent)', lineHeight: 1, marginBottom: 16, filter: 'drop-shadow(0 0 14px rgba(253,218,22,0.25))' }}>
                {it.n}
              </div>
            )}
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 24, letterSpacing: '-0.01em', lineHeight: 1.15, margin: '0 0 12px' }}>
              {it.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 14.5, lineHeight: 1.6, color: 'var(--on-dark-2)' }}>
              {it.body}
            </p>
          </GlassCard>
        </Reveal>
      ))}
    </div>
  );
}
