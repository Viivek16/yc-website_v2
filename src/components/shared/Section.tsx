import { ReactNode, CSSProperties } from 'react';

type BgVariant = 'ink' | 'ink2' | 'surface' | 'surface2';

interface SectionProps {
  id?: string;
  bg?: BgVariant;
  children: ReactNode;
  style?: CSSProperties;
  pad?: number;
}

const MAP: Record<BgVariant, { bg: string; color: string; border: string }> = {
  ink:      { bg: 'var(--ink)',       color: 'var(--on-dark)', border: '1px solid var(--line-soft)' },
  ink2:     { bg: 'var(--ink-2)',     color: 'var(--on-dark)', border: '1px solid var(--line-soft)' },
  surface:  { bg: 'var(--surface)',   color: 'var(--text)',    border: '1px solid var(--line-lite)' },
  surface2: { bg: 'var(--surface-2)', color: 'var(--text)',    border: '1px solid var(--line-lite)' },
};

export function Section({ id, bg = 'ink', children, style = {}, pad = 120 }: SectionProps) {
  const s = MAP[bg];
  return (
    <section
      id={id}
      style={{
        background: s.bg,
        color: s.color,
        padding: `${pad}px 40px`,
        borderBottom: s.border,
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div style={{ maxWidth: 1360, margin: '0 auto', position: 'relative' }}>
        {children}
      </div>
    </section>
  );
}
