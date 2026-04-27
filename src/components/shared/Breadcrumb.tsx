interface BreadcrumbProps {
  items: string[];
  dark?: boolean;
}

export function Breadcrumb({ items, dark = true }: BreadcrumbProps) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: dark ? 'var(--on-dark-3)' : 'var(--mute-2)',
        marginBottom: 28,
      }}
    >
      {items.map((item, i) => (
        <span key={i}>
          <span style={{ color: i === items.length - 1 ? (dark ? 'var(--on-dark)' : 'var(--text)') : 'inherit' }}>
            {item}
          </span>
          {i < items.length - 1 && (
            <span style={{ padding: '0 10px', opacity: 0.5 }}>/</span>
          )}
        </span>
      ))}
    </div>
  );
}
