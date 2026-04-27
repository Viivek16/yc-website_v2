// home.jsx — homepage content below hero
const StatRail = () => {
  const cells = [
    { n: 140, suf: '+', label: 'CEX Integrations' },
    { n: 100, suf: '+', label: 'Web3 Projects Supported', glow: true },
    { n: 15, suf: '+', label: 'Countries' },
    { txt: '24 / 7', label: 'Programmatic Execution' },
  ];
  return (
    <section style={{ background: 'var(--ink-2)', padding: '0 40px', color: 'var(--on-dark)' }}>
      <div style={{ maxWidth: 1360, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid rgba(255,255,255,0.14)', borderBottom: '1px solid rgba(255,255,255,0.14)' }}>
          {cells.map((c, i) => (
            <div key={i} style={{
              padding: '40px 32px', borderRight: i < cells.length - 1 ? '1px solid var(--line-soft)' : 0,
              background: 'rgba(20,19,19,0.3)', backdropFilter: 'blur(6px)',
              boxShadow: c.glow ? 'inset 0 0 0 1px rgba(253,218,22,0.12), 0 0 32px 0 rgba(253,218,22,0.06)' : 'none',
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(44px, 4vw, 56px)', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums', lineHeight: 1, color: 'var(--on-dark)' }}>
                {c.txt ? c.txt : <CountUp to={c.n} prefix={c.pre || ''} suffix={c.suf || ''} decimals={c.dec || 0} />}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--on-dark-3)', marginTop: 14 }}>{c.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StandardOfCare = () => {
  const pillars = [
    { n: 'I', title: 'Symmetric by design.', body: "Spreads are published and reviewed weekly. No asymmetric fill advantage retained by the desk. We don't profit from asymmetry against the projects we represent." },
    { n: 'II', title: 'Inventory as a constraint.', body: 'A 7× inventory buffer caps exposure per pair. If the cap is breached, the desk widens before it holds.' },
    { n: 'III', title: 'Auditable by default.', body: 'Weekly PnL, fill quality, and counterparty reports formatted to be verified line by line. No black boxes.' },
    { n: 'IV', title: 'Disciplined intake.', body: 'Every counterparty passes Chainalysis screening. We decline mandates that cannot meet our compliance standard.' },
  ];
  return (
    <Section bg="ink">
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 48, marginBottom: 72 }}>
        <div>
          <Eyebrow accentRule>01 · Standard of Care</Eyebrow>
          <h2 className="h2" style={{ margin: '18px 0 0' }}>The standard <em>a counterparty should expect.</em></h2>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid var(--line-soft)' }}>
        {pillars.map((p, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="pillar" style={{
              padding: '36px 28px', borderRight: i < pillars.length - 1 ? '1px solid var(--line-soft)' : 0,
              background: 'rgba(20,19,19,0.4)', borderBottom: '1px solid var(--line-soft)',
              transition: 'background 250ms, box-shadow 250ms', height: '100%',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(28,27,25,0.7)'; e.currentTarget.style.boxShadow = 'var(--sh-md)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(20,19,19,0.4)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontStyle: 'italic', fontSize: 56, color: 'var(--accent)', lineHeight: 1, filter: 'drop-shadow(0 0 18px rgba(253,218,22,0.3))' }}>{p.n}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 24, letterSpacing: '-0.01em', lineHeight: 1.15, margin: '20px 0 12px' }}>{p.title}</h3>
              <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 14.5, lineHeight: 1.6, color: 'var(--on-dark-2)' }}>{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

const HomeServices = ({ go }) => {
  const items = [
    { n: '01', name: 'Market Making', desc: '24/7 algorithmic liquidity provision across eleven major centralized venues. Symmetric-spread execution. Weekly transparency ledger.', path: '/services/market-making' },
    { n: '02', name: 'Treasury Management', desc: 'Strategic treasury building with zero market impact. 30% minimum USDT payback, guaranteed.', path: '/services/treasury-management' },
    { n: '03', name: 'Programmatic Sales', desc: 'Discreet, algorithmic liquidation of token allocations at favorable prices, without disrupting the market.', path: '/services/programmatic-sales' },
    { n: '04', name: 'Venture Investment', desc: 'Strategic capital and advisory for early-stage token projects, channeled through the Yellow Group ecosystem.', path: '/services/venture-investment' },
  ];
  return (
    <Section id="services" bg="ink">
      <div style={{ marginBottom: 72, maxWidth: 720 }}>
        <Eyebrow accentRule>02 · Services</Eyebrow>
        <h2 className="h2" style={{ margin: '18px 0 22px' }}>Four capabilities. <em>One desk.</em></h2>
        <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 17, lineHeight: 1.55, color: 'var(--on-dark-2)', margin: 0 }}>
          Each service is designed to operate independently, or compound together across a token's full lifecycle.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {items.map((it, i) => (
          <Reveal key={it.n} delay={i * 60}>
            <a href="#" onClick={(e) => { e.preventDefault(); go(it.path); }}
              style={{ background: 'rgba(20,19,19,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4, padding: '32px 32px 28px', textDecoration: 'none', color: 'var(--on-dark)', boxShadow: 'var(--sh-sm)', transition: 'all 220ms', display: 'block', position: 'relative', height: '100%' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--sh-md)'; e.currentTarget.style.transform = 'translateY(-2px)'; const r = e.currentTarget.querySelector('.card-rule'); if (r) r.style.width = '100%'; const a = e.currentTarget.querySelector('.arr'); if (a) a.style.transform = 'translateX(4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--sh-sm)'; e.currentTarget.style.transform = 'translateY(0)'; const r = e.currentTarget.querySelector('.card-rule'); if (r) r.style.width = '40px'; const a = e.currentTarget.querySelector('.arr'); if (a) a.style.transform = 'translateX(0)'; }}
            >
              <div className="card-rule" style={{ height: 1, background: 'var(--accent)', width: 40, marginBottom: 22, transition: 'width 320ms cubic-bezier(0.16,1,0.3,1)' }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>Service · {it.n}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 34, letterSpacing: '-0.018em', lineHeight: 1.08, margin: '12px 0 14px' }}>{it.name}</h3>
              <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 14.5, lineHeight: 1.6, color: 'var(--on-dark-2)', margin: '0 0 24px' }}>{it.desc}</p>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--on-dark)' }}>
                <span>Learn more</span>
                <span className="arr" style={{ transition: 'transform 200ms' }}>→</span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

// Live Order Book
const OrderBook = () => {
  const [rows, setRows] = React.useState(() => {
    const base = 64182.40;
    const mk = (i, side) => ({
      p: +(base + (side === 'ask' ? (i + 1) * 1.2 : -(i + 1) * 1.2)).toFixed(2),
      s: +(Math.random() * 3 + 0.1).toFixed(3),
      flash: null,
    });
    return {
      asks: Array.from({ length: 8 }, (_, i) => mk(7 - i, 'ask')),
      bids: Array.from({ length: 8 }, (_, i) => mk(i, 'bid')),
    };
  });
  React.useEffect(() => {
    const iv = setInterval(() => {
      setRows(r => {
        const flip = Math.random() > 0.5;
        const side = flip ? 'asks' : 'bids';
        const idx = Math.floor(Math.random() * r[side].length);
        const up = Math.random() > 0.5;
        const nextSide = r[side].map((row, i) => i === idx ? { ...row, s: Math.max(0.05, +(row.s + (up ? 0.12 : -0.09)).toFixed(3)), flash: up ? 'up' : 'dn' } : { ...row, flash: null });
        return { ...r, [side]: nextSide };
      });
    }, 700);
    return () => clearInterval(iv);
  }, []);

  const Row = ({ r, side }) => {
    const bg = r.flash === 'up' ? 'rgba(74,222,128,0.14)' : r.flash === 'dn' ? 'rgba(239,68,68,0.14)' : 'transparent';
    const color = side === 'ask' ? '#ef4444' : '#4ade80';
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '7px 14px', fontFamily: 'var(--font-mono)', fontSize: 11.5, fontVariantNumeric: 'tabular-nums', background: bg, transition: 'background 400ms', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <span style={{ color }}>{r.p.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        <span style={{ color: 'var(--on-dark)', textAlign: 'right' }}>{r.s.toFixed(3)}</span>
        <span style={{ color: 'var(--on-dark-3)', textAlign: 'right' }}>{(r.p * r.s).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
      </div>
    );
  };

  return (
    <div style={{ background: 'rgba(28,27,25,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, boxShadow: 'var(--sh-md)', overflow: 'hidden' }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--line-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(10,10,10,0.5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LiveDot size={6} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--on-dark)' }}>BTC/USDT</span>
          <span style={{ color: 'var(--on-dark-3)' }}>·</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--on-dark-2)' }}>Live</span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>Spread 0.04%</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '9px 14px', fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--on-dark-3)', borderBottom: '1px solid var(--line-soft)' }}>
        <span>Price</span>
        <span style={{ textAlign: 'right' }}>Size</span>
        <span style={{ textAlign: 'right' }}>Cumulative</span>
      </div>
      <div>{rows.asks.map((r, i) => <Row key={`a${i}`} r={r} side="ask" />)}</div>
      <div style={{ padding: '10px 14px', background: 'rgba(253,218,22,0.06)', fontFamily: 'var(--font-mono)', fontSize: 12, fontVariantNumeric: 'tabular-nums', color: 'var(--on-dark)', borderTop: '1px solid rgba(253,218,22,0.2)', borderBottom: '1px solid rgba(253,218,22,0.2)', display: 'flex', justifyContent: 'space-between' }}>
        <span>64,182.40</span>
        <span style={{ color: '#4ade80' }}>▲ 0.42%</span>
      </div>
      <div>{rows.bids.map((r, i) => <Row key={`b${i}`} r={r} side="bid" />)}</div>
    </div>
  );
};

const OrderBookExhibit = () => (
  <Section bg="ink2">
    <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 64, alignItems: 'center' }}>
      <div>
        <Eyebrow accentRule>03 · On the desk</Eyebrow>
        <h2 className="h2" style={{ margin: '18px 0 22px' }}>Depth, <em>visible.</em></h2>
        <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 16.5, lineHeight: 1.6, color: 'var(--on-dark-2)', maxWidth: 460 }}>
          Every quote we post is a line someone at the desk can defend. This is a live view of our order book for our most active pair.
        </p>
        <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, maxWidth: 460 }}>
          {[['Median spread', '4.2 bps'], ['Quotes / 24h', '1.42M'], ['Active pairs', '142'], ['Uptime', '99.97%']].map(([l, v]) => (
            <div key={l} style={{ padding: '14px 16px', border: '1px solid var(--line-soft)', borderRadius: 4, background: 'rgba(10,10,10,0.4)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>{l}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 28, fontVariantNumeric: 'tabular-nums', marginTop: 4 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
      <Reveal><OrderBook /></Reveal>
    </div>
  </Section>
);

// Interactive orbital ecosystem — Yellow Capital at center, siblings orbit in real time
const EcosystemConstellation = () => {
  const [ref, v] = useInView();
  const wrapRef = React.useRef(null);
  const [t, setT] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [active, setActive] = React.useState('cap');
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });

  // Animation tick
  React.useEffect(() => {
    if (paused) return;
    let raf, start = performance.now();
    const tick = (now) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  const onMove = (e) => {
    const r = wrapRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    setMouse({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
  };

  const orbits = [
    { id: 'pro', label: 'Yellow.pro',  desc: 'Trading infrastructure & APIs.', r: 28, speed: 0.18, phase: 0,    color: '#fdda16' },
    { id: 'com', label: 'Yellow.com',  desc: 'Editorial reach & research.',    r: 36, speed: 0.13, phase: 1.6,  color: '#ffb100' },
    { id: 'org', label: 'Yellow.org',  desc: 'Open-protocol clearing layer.',  r: 44, speed: 0.09, phase: 3.4,  color: '#fdda16' },
    { id: 'ow',  label: 'Openware',    desc: 'Exchange engine since 2013.',    r: 38, speed: 0.11, phase: 5.0,  color: '#e9e6df' },
  ];

  const positions = orbits.map(o => {
    const a = o.phase + t * o.speed;
    return { ...o, x: 50 + Math.cos(a) * o.r, y: 50 + Math.sin(a) * o.r * 0.7, a };
  });

  const cap = { id: 'cap', label: 'Yellow Capital', desc: 'Liquidity, treasury, venture.', x: 50, y: 50 };
  const all = [cap, ...positions];
  const sel = all.find(n => n.id === active) || cap;

  // Parallax shift (4% travel)
  const px = mouse.x * 4, py = mouse.y * 4;

  return (
    <div ref={(el) => { ref.current = el; wrapRef.current = el; }}
      onMouseMove={onMove}
      onMouseEnter={() => setPaused(false)}
      onMouseLeave={() => { setMouse({ x: 0, y: 0 }); }}
      style={{ position: 'relative', aspectRatio: '1 / 1', width: '100%', maxWidth: 540, margin: '0 auto', cursor: 'crosshair' }}>
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', transform: `translate(${px * 0.3}px, ${py * 0.3}px)`, transition: 'transform 600ms cubic-bezier(0.16,1,0.3,1)' }}>
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fdda16" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#fdda16" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#fdda16" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.8" />
          </filter>
        </defs>
        {/* Orbit rings */}
        {orbits.map((o, i) => (
          <ellipse key={o.id} cx="50" cy="50" rx={o.r} ry={o.r * 0.7}
            fill="none"
            stroke={active === o.id ? 'rgba(253,218,22,0.45)' : 'rgba(255,255,255,0.08)'}
            strokeWidth={active === o.id ? 0.18 : 0.1}
            strokeDasharray="0.8 1.2"
            style={{ transition: 'stroke 320ms, stroke-width 320ms', opacity: v ? 1 : 0, transitionDelay: `${200 + i * 100}ms` }}
          />
        ))}
        {/* Core glow */}
        <circle cx="50" cy="50" r="22" fill="url(#coreGlow)" />
        {/* Connection beams from active to others */}
        {positions.map((p) => (
          <line key={'beam-' + p.id} x1="50" y1="50" x2={p.x} y2={p.y}
            stroke="rgba(253,218,22,0.18)" strokeWidth={active === p.id ? 0.3 : 0.08}
            strokeDasharray={active === p.id ? '0' : '0.4 0.6'}
            style={{ transition: 'stroke-width 240ms, stroke-dasharray 240ms', opacity: v ? 1 : 0 }}
          />
        ))}
        {/* Orbit dots (planets) */}
        {positions.map((p) => (
          <g key={p.id}
            onMouseEnter={() => { setActive(p.id); setPaused(true); }}
            onMouseLeave={() => setPaused(false)}
            style={{ cursor: 'pointer' }}>
            {active === p.id && (
              <circle cx={p.x} cy={p.y} r="4.2" fill={p.color} opacity="0.18" filter="url(#softGlow)" />
            )}
            <circle cx={p.x} cy={p.y} r={active === p.id ? 1.6 : 1.1}
              fill={p.color}
              style={{ transition: 'r 240ms' }}
            />
            <circle cx={p.x} cy={p.y} r="3" fill="transparent" />
          </g>
        ))}
        {/* Tick marks on orbit rings every 30deg for the active one */}
        {active !== 'cap' && (() => {
          const o = orbits.find(x => x.id === active);
          return [...Array(12)].map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const x1 = 50 + Math.cos(a) * o.r;
            const y1 = 50 + Math.sin(a) * o.r * 0.7;
            const x2 = 50 + Math.cos(a) * (o.r + 1.2);
            const y2 = 50 + Math.sin(a) * (o.r + 1.2) * 0.7;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(253,218,22,0.35)" strokeWidth="0.08" />;
          });
        })()}
      </svg>

      {/* Center node */}
      <div
        onMouseEnter={() => setActive('cap')}
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: `translate(calc(-50% + ${px * 0.5}px), calc(-50% + ${py * 0.5}px))`,
          padding: '16px 22px',
          background: 'rgba(253,218,22,0.08)',
          backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          border: `1px solid ${active === 'cap' ? 'rgba(253,218,22,0.7)' : 'rgba(253,218,22,0.4)'}`,
          borderRadius: 4,
          fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.12em',
          color: '#fff', textAlign: 'center', whiteSpace: 'nowrap', cursor: 'default',
          boxShadow: '0 0 40px rgba(253,218,22,0.25)',
          transition: 'border-color 240ms, transform 600ms cubic-bezier(0.16,1,0.3,1)',
        }}>
        <div style={{ fontSize: 8.5, color: 'var(--on-dark-3)', letterSpacing: '0.22em', marginBottom: 4 }}>CORE</div>
        Yellow Capital
      </div>

      {/* Orbiting labels */}
      {positions.map((p) => (
        <div key={p.id}
          onMouseEnter={() => { setActive(p.id); setPaused(true); }}
          onMouseLeave={() => setPaused(false)}
          style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            transform: `translate(calc(-50% + ${px}px), calc(-50% + ${py}px))`,
            padding: active === p.id ? '8px 12px' : '6px 10px',
            background: active === p.id ? 'rgba(20,19,19,0.95)' : 'rgba(20,19,19,0.7)',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${active === p.id ? 'rgba(253,218,22,0.6)' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: 3,
            fontFamily: 'var(--font-mono)', fontSize: active === p.id ? 10 : 9.5, letterSpacing: '0.12em',
            color: active === p.id ? '#fff' : 'var(--on-dark-2)',
            whiteSpace: 'nowrap', cursor: 'pointer',
            boxShadow: active === p.id ? '0 0 24px rgba(253,218,22,0.3)' : 'none',
            transition: 'background 240ms, border-color 240ms, color 240ms, padding 240ms, font-size 240ms',
            opacity: v ? 1 : 0,
            transitionDelay: v ? '0ms' : `${600 + 0}ms`,
            zIndex: active === p.id ? 4 : 3,
          }}>{p.label}</div>
      ))}

      {/* Bottom HUD: active node detail */}
      <div style={{
        position: 'absolute', left: 8, right: 8, bottom: -2,
        background: 'rgba(10,10,10,0.78)', backdropFilter: 'blur(14px)',
        border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4,
        padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
        opacity: v ? 1 : 0, transition: 'opacity 600ms 800ms',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 6, height: 6, borderRadius: 6, background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.22em', color: 'var(--on-dark-3)', textTransform: 'uppercase' }}>Selected</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#fff', letterSpacing: '0.06em' }}>{sel.label}</span>
        </div>
        <span style={{ fontFamily: 'var(--font-ui)', fontStyle: 'italic', fontSize: 12.5, color: 'var(--on-dark-2)' }}>{sel.desc}</span>
      </div>
    </div>
  );
};

const HomeEcosystem = ({ go }) => (
  <Section bg="ink">
    <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 64, alignItems: 'center' }}>
      <div>
        <Eyebrow accentRule>04 · Ecosystem</Eyebrow>
        <h2 className="h2" style={{ margin: '18px 0 22px' }}>Part of a <em>complete digital-asset ecosystem.</em></h2>
        <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 16.5, lineHeight: 1.6, color: 'var(--on-dark-2)', maxWidth: 480, marginBottom: 28 }}>
          Yellow Capital is one of five Yellow Group entities. Trading infrastructure, editorial reach, protocol layer, and token distribution — a single counterparty with every piece of the stack.
        </p>
        <BtnGhost href="#" onClick={(e) => { e.preventDefault(); go('/ecosystem'); }}>Explore Yellow Group</BtnGhost>
      </div>
      <EcosystemConstellation />
    </div>
  </Section>
);

const HomePillars = () => {
  const pillars = [
    { n: 'I', t: 'Legitimacy.', b: 'Montana-registered GP. Chainalysis on every counterparty. Symmetric-spread execution only. Weekly PnL that can be audited line by line.' },
    { n: 'II', t: 'Ecosystem.', b: "Trading infrastructure, editorial media, protocol layer, and token distribution — one relationship that compounds across the token lifecycle." },
    { n: 'III', t: 'Algorithmic precision.', b: 'A proprietary engine with seven-tier spread configuration, WebSocket feeds, and a 7× inventory buffer.' },
  ];
  return (
    <Section bg="ink2">
      <div style={{ marginBottom: 56 }}>
        <Eyebrow accentRule>05 · Pillars</Eyebrow>
        <h2 className="h2" style={{ margin: '18px 0 0' }}>Why counterparties <em>stay.</em></h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {pillars.map((p, i) => (
          <Reveal key={i} delay={i * 70}>
            <GlassCard style={{ padding: 32, height: '100%' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 52, color: 'var(--accent)', lineHeight: 1, filter: 'drop-shadow(0 0 18px rgba(253,218,22,0.25))' }}>{p.n}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 26, letterSpacing: '-0.01em', margin: '20px 0 12px' }}>{p.t}</h3>
              <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 14.5, lineHeight: 1.6, color: 'var(--on-dark-2)' }}>{p.b}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

const Captain = () => (
  <Section bg="ink">
    <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 72, alignItems: 'center' }}>
      <Reveal>
        <div style={{
          aspectRatio: '3 / 4', borderRadius: 4,
          background: 'linear-gradient(145deg, #1c1b19 0%, #141413 100%)',
          border: '1px solid rgba(255,255,255,0.08)', boxShadow: 'var(--sh-md)',
          position: 'relative', overflow: 'hidden',
        }}>
          <img src="assets/team/alexis.jpg" alt="Alexis Sirkia"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.15) contrast(1.05)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(10,10,10,0.85) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>Founder & Chairman</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginTop: 4 }}>Alexis Sirkia</div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--on-dark-3)' }}>2017 —</div>
          </div>
        </div>
      </Reveal>
      <div>
        <Eyebrow accentRule>Founder</Eyebrow>
        <h2 className="h2" style={{ margin: '18px 0 28px', fontStyle: 'italic' }}>Let us take the wheel.</h2>
        <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 17.5, lineHeight: 1.65, color: 'var(--on-dark-2)', maxWidth: 620 }}>
          Alexis Sirkia (the Captain) is a renowned leader and the visionary Chairman of Yellow Group. Before pioneering digital-asset infrastructure, Alexis served as a rocket scientist at the GTD European Space Center. He co-founded GSR in 2013 and went on to start Yellow Capital in 2017, bringing engineering-precision knowledge and a vision to provide cutting-edge liquidity solutions for the digital-asset landscape.
        </p>
        <div style={{ display: 'flex', gap: 6, marginTop: 32, flexWrap: 'wrap' }}>
          <Chip>GSR · Co-founder</Chip>
          <Chip>Rocket Scientist · GTD</Chip>
          <Chip>Chairman · Yellow Group</Chip>
        </div>
      </div>
    </div>
  </Section>
);

const HomePage = ({ go }) => (
  <React.Fragment>
    <Hero go={go} />
    <StatRail />
    <StandardOfCare />
    <HomeServices go={go} />
    <OrderBookExhibit />
    <HomeEcosystem go={go} />
    <HomePillars />
    <Captain />
    <PreFooter
      headline="Read first,<br /><em>Engage second.</em>"
      subhead="A short note about who you are, what book you run, and what you need. We read every one."
      primary="Schedule consultation"
      ghost="About the firm"
      ghostTo="/about"
    />
  </React.Fragment>
);

Object.assign(window, { HomePage, StatRail, StandardOfCare, HomeServices, OrderBookExhibit, HomeEcosystem, HomePillars, Captain, OrderBook });
