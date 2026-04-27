// nav.jsx — Top navigation with Services dropdown + Ticker
const Nav = ({ scrolled, route, go }) => {
  const [open, setOpen] = React.useState(false);
  const [mobile, setMobile] = React.useState(false);
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); setMobile(false); } };
    const onClick = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('mousedown', onClick); };
  }, []);

  React.useEffect(() => { setOpen(false); setMobile(false); }, [route]);

  const services = [
    { n: '01', name: 'Market Making', desc: '24/7 algorithmic desk, eleven CEX venues.', path: '/services/market-making' },
    { n: '02', name: 'Treasury Management', desc: '30% minimum USDT payback guarantee.', path: '/services/treasury-management' },
    { n: '03', name: 'Programmatic Sales', desc: 'Discreet execution for token allocations.', path: '/services/programmatic-sales' },
    { n: '04', name: 'Venture Investment', desc: 'Strategic capital for token teams.', path: '/services/venture-investment' },
  ];

  const isActive = (p) => route === p;
  const isServiceActive = route.startsWith('/services');

  const navStyle = {
    position: 'sticky', top: 0, zIndex: 60,
    background: scrolled ? 'rgba(10,10,10,0.65)' : 'rgba(10,10,10,0.92)',
    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    transition: 'background 240ms cubic-bezier(0.4,0,0.2,1)',
  };

  const NavLink = ({ to, children, hasChildren, active }) => (
    <a href="#" onClick={(e) => { e.preventDefault(); if (!hasChildren && to) go(to); }}
      style={{
        fontFamily: 'var(--font-ui)', fontSize: 13.5, fontWeight: 400,
        color: active ? '#fff' : 'var(--on-dark-2)',
        textDecoration: 'none', position: 'relative', padding: '6px 0',
        display: 'inline-flex', alignItems: 'center', gap: 6,
        transition: 'color 200ms',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = '#fff'; const u = e.currentTarget.querySelector('.u'); if (u) u.style.transform = 'scaleX(1)'; }}
      onMouseLeave={e => { e.currentTarget.style.color = active ? '#fff' : 'var(--on-dark-2)'; const u = e.currentTarget.querySelector('.u'); if (u && !active) u.style.transform = 'scaleX(0)'; }}
    >
      {children}
      <span className="u" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
        background: 'var(--accent)',
        transform: active ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left',
        transition: 'transform 280ms cubic-bezier(0.16,1,0.3,1)',
      }} />
    </a>
  );

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>
        <a href="#" onClick={(e) => { e.preventDefault(); go('/'); }} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--on-dark)' }}>
          <img src={(window.__resources && window.__resources.logoDark) || "assets/logo-dark-bg.png"} alt="Yellow Capital" style={{ height: 26, display: 'block' }} />
        </a>
        <div className="nav-center" style={{ display: 'flex', gap: 28, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <NavLink to="/" active={isActive('/')}>Home</NavLink>
          <div ref={wrapRef} style={{ position: 'relative' }}>
            <a href="#" onClick={(e) => { e.preventDefault(); setOpen(v => !v); }}
              style={{
                fontFamily: 'var(--font-ui)', fontSize: 13.5, fontWeight: 400,
                color: isServiceActive ? '#fff' : 'var(--on-dark-2)',
                textDecoration: 'none', position: 'relative', padding: '6px 0',
                display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.color = isServiceActive ? '#fff' : 'var(--on-dark-2)'; }}
            >
              Services <span style={{ fontSize: 9, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 220ms cubic-bezier(0.16,1,0.3,1)' }}>▾</span>
              {isServiceActive && <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'var(--accent)' }} />}
            </a>
            {open && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 14px)', left: -24, width: 440,
                background: 'rgba(10,10,10,0.86)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, boxShadow: 'var(--sh-lg)',
                padding: 8, animation: 'dropIn 260ms cubic-bezier(0.16,1,0.3,1)',
              }}>
                {services.map((s) => (
                  <a key={s.n} href="#" onClick={(e) => { e.preventDefault(); go(s.path); }}
                    style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 4, padding: '14px 18px', borderRadius: 2, textDecoration: 'none', color: 'var(--on-dark)', transition: 'background 220ms', alignItems: 'center' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(28,27,25,0.85)'; const a = e.currentTarget.querySelector('.drop-arr'); if (a) a.style.transform = 'translateX(4px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; const a = e.currentTarget.querySelector('.drop-arr'); if (a) a.style.transform = 'translateX(0)'; }}
                  >
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>Service · {s.n}</div>
                      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 15, marginTop: 4 }}>{s.name}</div>
                      <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 12.5, color: 'var(--on-dark-2)', marginTop: 3 }}>{s.desc}</div>
                    </div>
                    <span className="drop-arr" style={{ alignSelf: 'center', color: 'var(--on-dark-3)', transition: 'transform 200ms' }}>→</span>
                  </a>
                ))}
              </div>
            )}
          </div>
          <NavLink to="/ecosystem" active={isActive('/ecosystem')}>Ecosystem</NavLink>
          <NavLink to="/about" active={isActive('/about')}>About Us</NavLink>
          <NavLink to="/contact" active={isActive('/contact')}>Contact</NavLink>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <BtnPrimary href={MAIL} style={{ padding: '10px 16px', fontSize: 13 }}>Schedule Consultation</BtnPrimary>
        </div>
      </div>
    </nav>
  );
};

const Ticker = () => null;

Object.assign(window, { Nav, Ticker });
