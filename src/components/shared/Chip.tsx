import { ReactNode } from 'react';

interface ChipProps {
  children: ReactNode;
  dark?: boolean;
}

export function Chip({ children, dark = true }: ChipProps) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10.5,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        padding: '5px 9px',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.14)' : 'rgba(10,10,10,0.14)'}`,
        borderRadius: 2,
        color: dark ? 'var(--on-dark-2)' : 'var(--muted)',
      }}
    >
      {children}
    </span>
  );
}
