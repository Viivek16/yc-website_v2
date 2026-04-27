// shared.jsx — design tokens, glyphs, helpers, primitives
const MAIL = 'mailto:nem@yellow.com';

// ──────────────────────────────────────────────────────────────
// Reveal helpers
// ──────────────────────────────────────────────────────────────
const useInView = (opts = {}) => {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px', ...opts });
    io.observe(el); return () => io.disconnect();
  }, []);
  return [ref, inView];
};

const Reveal = ({ children, delay = 0, y = 14, as: Tag = 'div', style = {}, ...rest }) => {
  const [ref, v] = useInView();
  return (
    <Tag ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      ...style,
    }} {...rest}>{children}</Tag>
  );
};

// Word-level mask-slide reveal for headlines
const RevealHeading = ({ children, className, style, level = 'h1' }) => {
  const [ref, v] = useInView();
  const Tag = level;
  const words = React.Children.toArray(children);
  // If single string, split by word preserving <em>
  let parts;
  if (typeof children === 'string') {
    parts = children.split(/(\s+)/).map((w, i) => ({ t: w, i }));
  } else {
    parts = null;
  }
  return (
    <Tag ref={ref} className={className} style={style}>
      {parts ? parts.map((p, i) => (
        p.t.match(/^\s+$/) ? <span key={i}>{p.t}</span> : (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
            <span style={{
              display: 'inline-block',
              transform: v ? 'translateY(0)' : 'translateY(108%)',
              transition: `transform 800ms cubic-bezier(0.16,1,0.3,1) ${i * 40}ms`,
            }}>{p.t}</span>
          </span>
        )
      )) : children}
    </Tag>
  );
};

// CountUp number
const CountUp = ({ to, suffix = '', prefix = '', decimals = 0, duration = 1800 }) => {
  const [ref, v] = useInView();
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!v) return;
    let start = null, raf;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [v, to, duration]);
  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>;
};

// Draw-in rule
const DrawRule = ({ color = 'var(--line-soft)', height = 1, delay = 0 }) => {
  const [ref, v] = useInView();
  return <div ref={ref} style={{
    height, background: color,
    transform: v ? 'scaleX(1)' : 'scaleX(0)',
    transformOrigin: 'left',
    transition: `transform 800ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  }} />;
};

// ──────────────────────────────────────────────────────────────
// Buttons
// ──────────────────────────────────────────────────────────────
const BtnPrimary = ({ children, href = MAIL, onClick, style = {}, size = 'md' }) => (
  <a href={href} onClick={onClick} style={{
    fontFamily: 'var(--font-ui)', fontSize: size === 'lg' ? 14 : 13.5,
    padding: size === 'lg' ? '16px 26px' : '12px 20px',
    background: 'var(--cta)', color: 'var(--ink)',
    textDecoration: 'none', borderRadius: 4,
    display: 'inline-flex', gap: 10, alignItems: 'center',
    transition: 'all 200ms cubic-bezier(0.4,0,0.2,1)', fontWeight: 500,
    letterSpacing: '-0.005em',
    ...style,
  }}
  onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 36px 0 rgba(255,177,0,0.32)'; const a = e.currentTarget.querySelector('.arr'); if (a) a.style.transform = 'translateX(4px)'; }}
  onMouseLeave={e => { e.currentTarget.style.background = 'var(--cta)'; e.currentTarget.style.boxShadow = 'none'; const a = e.currentTarget.querySelector('.arr'); if (a) a.style.transform = 'translateX(0)'; }}
  >
    <span>{children}</span>
    <span className="arr" style={{ transition: 'transform 200ms', display: 'inline-block' }}>→</span>
  </a>
);

const BtnGhost = ({ children, href = '#', dark = true, arrow = '→', onClick, style = {} }) => {
  const [hover, setHover] = React.useState(false);
  const border = dark ? 'rgba(255,255,255,0.24)' : 'rgba(10,10,10,0.22)';
  const txt = dark ? 'var(--on-dark)' : 'var(--text)';
  const fill = dark ? 'var(--on-dark)' : 'var(--text)';
  const txtH = dark ? 'var(--ink)' : 'var(--surface)';
  return (
    <a href={href} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-ui)', fontSize: 13.5, padding: '12px 20px',
        textDecoration: 'none', borderRadius: 4,
        color: hover ? txtH : txt, border: `1px solid ${border}`,
        display: 'inline-flex', gap: 10, alignItems: 'center', fontWeight: 500,
        position: 'relative', overflow: 'hidden', zIndex: 0,
        transition: 'color 200ms', ...style,
      }}>
      <span style={{
        position: 'absolute', inset: 0, background: fill, zIndex: -1,
        transform: hover ? 'translateX(0)' : 'translateX(-101%)',
        transition: 'transform 350ms cubic-bezier(0.4,0,0.2,1)',
      }} />
      <span>{children}</span>
      <span style={{ transition: 'transform 200ms', transform: hover ? 'translateX(4px)' : 'none' }}>{arrow}</span>
    </a>
  );
};

// ──────────────────────────────────────────────────────────────
// Chip / Eyebrow
// ──────────────────────────────────────────────────────────────
const Eyebrow = ({ children, dark = true, accentRule = false }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    {accentRule && <span style={{ width: 24, height: 1, background: 'var(--accent)' }} />}
    <span className="eyebrow" style={{ color: dark ? 'var(--on-dark-3)' : 'var(--mute-2)' }}>{children}</span>
  </div>
);

const Chip = ({ children, dark = true }) => (
  <span style={{
    fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase',
    padding: '5px 9px',
    border: `1px solid ${dark ? 'rgba(255,255,255,0.14)' : 'rgba(10,10,10,0.14)'}`,
    borderRadius: 2,
    color: dark ? 'var(--on-dark-2)' : 'var(--muted)',
  }}>{children}</span>
);

// Pulsing live dot
const LiveDot = ({ size = 7 }) => (
  <span style={{
    display: 'inline-block', width: size, height: size, borderRadius: '50%',
    background: 'var(--accent)', boxShadow: '0 0 10px rgba(253,218,22,0.7)',
    animation: 'pulse 1.8s ease-in-out infinite',
  }} />
);

// Section container
const Section = ({ id, bg = 'ink', children, style = {}, pad = 120 }) => {
  const map = {
    ink: { bg: 'var(--ink)', color: 'var(--on-dark)' },
    ink2: { bg: 'var(--ink-2)', color: 'var(--on-dark)' },
    surface: { bg: 'var(--surface)', color: 'var(--text)' },
    surface2: { bg: 'var(--surface-2)', color: 'var(--text)' },
  };
  const s = map[bg];
  return (
    <section id={id} style={{
      background: s.bg, color: s.color, padding: `${pad}px 40px`,
      borderBottom: bg.startsWith('ink') ? '1px solid var(--line-soft)' : '1px solid var(--line-lite)',
      position: 'relative', overflow: 'hidden',
      ...style,
    }}>
      <div style={{ maxWidth: 1360, margin: '0 auto', position: 'relative' }}>{children}</div>
    </section>
  );
};

// Breadcrumb
const Breadcrumb = ({ items, dark = true }) => (
  <div style={{
    fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em',
    textTransform: 'uppercase', color: dark ? 'var(--on-dark-3)' : 'var(--mute-2)',
    marginBottom: 28,
  }}>
    {items.map((it, i) => (
      <React.Fragment key={i}>
        <span style={{ color: i === items.length - 1 ? (dark ? 'var(--on-dark)' : 'var(--text)') : 'inherit' }}>{it}</span>
        {i < items.length - 1 && <span style={{ padding: '0 10px', opacity: 0.5 }}>/</span>}
      </React.Fragment>
    ))}
  </div>
);

// Glass card
const GlassCard = ({ children, dark = true, hover = true, style = {} }) => {
  const [h, setH] = React.useState(false);
  return (
    <div onMouseEnter={() => hover && setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background: dark ? 'rgba(20,19,19,0.55)' : 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(10,10,10,0.08)'}`,
        borderRadius: 4,
        boxShadow: h ? 'var(--sh-md)' : 'var(--sh-sm)',
        transform: h ? 'translateY(-2px)' : 'none',
        transition: 'box-shadow 250ms, transform 250ms',
        ...style,
      }}>{children}</div>
  );
};

// Coverage Globe — interactive depiction of exchange/venue coverage.
// A ring of 140 nodes orbits a slow yellow core; hovering a node highlights the connecting spoke.
const CoverageGlobe = () => {
  const [t, setT] = React.useState(0);
  const [hovered, setHovered] = React.useState(-1);
  React.useEffect(() => {
    let raf; const start = performance.now();
    const tick = (now) => { setT((now - start) / 1000); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const N = 140;
  const cx = 230, cy = 230, rOuter = 180, rInner = 62;
  // Highlighted venues (fixed indexes on the ring)
  const VENUES = [
    { i: 6, label: 'Binance' }, { i: 22, label: 'OKX' }, { i: 38, label: 'Coinbase' },
    { i: 54, label: 'Bybit' }, { i: 70, label: 'Kraken' }, { i: 86, label: 'KuCoin' },
    { i: 102, label: 'Bitget' }, { i: 118, label: 'Gate.io' },
  ];
  const venueByIdx = Object.fromEntries(VENUES.map(v => [v.i, v.label]));
  const rotation = t * 3; // degrees/sec
  const nodes = [];
  for (let i = 0; i < N; i++) {
    const ang = (i / N) * Math.PI * 2 + (rotation * Math.PI / 180);
    // add subtle radial breathing
    const rr = rOuter + Math.sin(t * 0.6 + i * 0.18) * 3;
    const x = cx + Math.cos(ang) * rr;
    const y = cy + Math.sin(ang) * rr;
    const isVenue = i in venueByIdx;
    nodes.push({ i, x, y, ang, isVenue });
  }
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', maxWidth: 500, marginLeft: 'auto' }}>
      <svg viewBox="0 0 460 460" style={{ width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <radialGradient id="core-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFB100" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#FDDA16" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FDDA16" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="edge-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(253,218,22,0)" />
            <stop offset="55%" stopColor="rgba(253,218,22,0.06)" />
            <stop offset="100%" stopColor="rgba(253,218,22,0)" />
          </radialGradient>
        </defs>

        {/* faint concentric rings */}
        {[rInner + 30, rInner + 70, rInner + 110, rOuter].map(r => (
          <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        ))}
        {/* core glow */}
        <circle cx={cx} cy={cy} r={rInner + 90} fill="url(#core-grad)" />
        {/* core */}
        <circle cx={cx} cy={cy} r={rInner} fill="#141413" stroke="rgba(253,218,22,0.35)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={rInner} fill="none" stroke="rgba(253,218,22,0.12)" strokeWidth="14" />

        {/* nodes + spokes on hover */}
        {nodes.map((n) => {
          const isActive = hovered === n.i;
          const size = n.isVenue ? 3.4 : 1.6;
          const op = n.isVenue ? 0.95 : 0.35 + 0.25 * Math.sin(t * 1.4 + n.i * 0.3);
          const color = n.isVenue || isActive ? '#FDDA16' : 'rgba(233,230,223,0.65)';
          return (
            <g key={n.i}>
              {(isActive || n.isVenue) && (
                <line x1={cx} y1={cy} x2={n.x} y2={n.y}
                  stroke={isActive ? 'rgba(253,218,22,0.55)' : 'rgba(253,218,22,0.15)'}
                  strokeWidth={isActive ? 1.2 : 0.6} />
              )}
              <circle cx={n.x} cy={n.y} r={isActive ? 5 : size}
                fill={color}
                opacity={isActive ? 1 : op}
                style={{ transition: 'r 200ms, opacity 200ms, fill 200ms', cursor: 'pointer' }}
                onMouseEnter={() => setHovered(n.i)}
                onMouseLeave={() => setHovered(-1)} />
            </g>
          );
        })}

        {/* center label */}
        <text x={cx} y={cy - 6} textAnchor="middle" fontFamily="var(--font-display)" fontSize="28" fill="var(--on-dark)" letterSpacing="-0.01em">140+</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.22em" fill="var(--on-dark-3)">VENUES</text>
        <text x={cx} y={cy + 30} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.22em" fill="var(--on-dark-3)">24 / 7</text>
      </svg>

      {/* Floating tooltip for hovered venue */}
      {hovered >= 0 && venueByIdx[hovered] && (
        <div style={{
          position: 'absolute',
          left: `${(nodes[hovered].x / 460) * 100}%`,
          top: `${(nodes[hovered].y / 460) * 100}%`,
          transform: 'translate(-50%, calc(-100% - 12px))',
          pointerEvents: 'none',
          fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--ink)', background: 'var(--accent)', padding: '6px 10px', borderRadius: 2,
          whiteSpace: 'nowrap', boxShadow: '0 6px 20px rgba(253,218,22,0.25)',
        }}>{venueByIdx[hovered]}</div>
      )}

      {/* Facts strip */}
      <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          ['Entity', 'Yellow Capital LP'],
          ['Domicile', 'Montana, USA'],
          ['Established', '2018'],
          ['Compliance', 'Chainalysis · pre-trade'],
        ].map(([k, v]) => (
          <div key={k} style={{ border: '1px solid var(--line-soft)', padding: '12px 14px', borderRadius: 2, background: 'rgba(20,19,19,0.4)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>{k}</div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--on-dark)', marginTop: 4 }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { MAIL, useInView, Reveal, RevealHeading, CountUp, DrawRule, BtnPrimary, BtnGhost, Eyebrow, Chip, LiveDot, Section, Breadcrumb, GlassCard, CoverageGlobe });
