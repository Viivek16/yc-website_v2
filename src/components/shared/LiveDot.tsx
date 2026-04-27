interface LiveDotProps {
  size?: number;
}

export function LiveDot({ size = 7 }: LiveDotProps) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'var(--accent)',
        boxShadow: '0 0 10px rgba(253,218,22,0.7)',
        animation: 'pulse 1.8s ease-in-out infinite',
        flexShrink: 0,
      }}
    />
  );
}
