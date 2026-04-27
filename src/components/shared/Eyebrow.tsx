import { ReactNode } from 'react';

interface EyebrowProps {
  children: ReactNode;
  dark?: boolean;
  accentRule?: boolean;
}

export function Eyebrow({ children, dark = true, accentRule = false }: EyebrowProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {accentRule && (
        <span style={{ width: 24, height: 1, background: 'var(--accent)', flexShrink: 0 }} />
      )}
      <span
        className="eyebrow"
        style={{ color: dark ? 'var(--on-dark-3)' : 'var(--mute-2)' }}
      >
        {children}
      </span>
    </div>
  );
}
