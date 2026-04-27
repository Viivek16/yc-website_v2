// footer.jsx
const Footer = ({ go }) => {
  const cols = [
    { h: 'Services', items: [
      ['Market Making', '/services/market-making'],
      ['Treasury Management', '/services/treasury-management'],
      ['Programmatic Sales', '/services/programmatic-sales'],
      ['Venture Investment', '/services/venture-investment'],
    ]},
    { h: 'Company', items: [
      ['About Us', '/about'],
      ['Ecosystem', '/ecosystem'],
      ['Insights', '/insights'],
      ['Careers', '/careers'],
      ['Contact', '/contact'],
    ]},
    { h: 'Yellow Group', items: [
      ['Yellow.com', 'https://yellow.com'],
      ['Yellow.org', 'https://yellow.org'],
      ['Yellow.pro', 'https://yellow.pro'],
      ['Openware', 'https://openware.com'],
    ]},
    { h: 'Legal', items: [
      ['Terms', '/terms'],
      ['Privacy', '/privacy'],
      ['Disclosures', '/disclosures'],
      ['Transparency', '/disclosures'],
    ]},
  ];
  const goIntra = (href, e) => {
    if (href.startsWith('/')) { e.preventDefault(); go(href); }
  };
  const [ref, v] = useInView();

  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--on-dark)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '100px 40px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1.2fr 1.2fr 1.2fr', gap: 36, paddingBottom: 56, borderBottom: '1px solid var(--line-soft)' }}>
          <div>
            <img src={(window.__resources && window.__resources.logoDark) || "assets/logo-dark-bg.png"} alt="Yellow Capital" style={{ height: 28, marginBottom: 18 }} />
            <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 13.5, lineHeight: 1.55, color: 'var(--on-dark-2)', maxWidth: 300, margin: '0 0 18px' }}>
              A Yellow Group company. Institutional-grade liquidity, treasury, and venture across digital assets since 2018.
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <Chip>Montana GP</Chip>
              <Chip>Chainalysis</Chip>
              <Chip>Est. 2018</Chip>
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.h}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--on-dark-3)', marginBottom: 18 }}>{col.h}</div>
              {col.items.map(([label, href]) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                  onClick={(e) => goIntra(href, e)}
                  style={{
                    display: 'block', fontFamily: 'var(--font-ui)', fontSize: 13.5,
                    color: 'var(--on-dark)', textDecoration: 'none', padding: '6px 0',
                    transition: 'color 200ms', fontWeight: 300,
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--on-dark)'}
                >{label} {href.startsWith('http') && <span style={{ color: 'var(--on-dark-3)', marginLeft: 4 }}>↗</span>}</a>
              ))}
            </div>
          ))}
        </div>
        <div ref={ref} style={{ position: 'relative', padding: '60px 0 20px', height: 'clamp(180px, 18vw, 300px)' }}>
          <div style={{
            position: 'absolute', left: '50%', top: '50%', width: 700, height: 340,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(253,218,22,0.08), transparent 62%)',
            filter: 'blur(60px)', pointerEvents: 'none',
          }} />
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 400,
            fontSize: 'clamp(120px, 18vw, 280px)',
            letterSpacing: '-0.04em', lineHeight: 0.9, textAlign: 'center',
            color: 'var(--on-dark-3)', position: 'relative',
            transform: v ? 'translateY(-8px)' : 'translateY(24px)',
            opacity: v ? 1 : 0.6,
            transition: 'all 1200ms cubic-bezier(0.16,1,0.3,1)',
          }}>YELLOW</div>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          padding: '20px 0 32px', borderTop: '1px solid var(--line-soft)',
          fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'var(--on-dark-3)', gap: 16, flexWrap: 'wrap',
        }}>
          <span>© 2026 Yellow Capital · All rights reserved</span>
          <span>Not investment advice · No performance guaranteed · See disclosures</span>
        </div>
      </div>
    </footer>
  );
};

// Generic pre-footer CTA
const PreFooter = ({ eyebrow = '', headline, subhead, subhead2, primary = 'Schedule consultation', ghost, ghostTo = '/about' }) => {
  return (
    <section style={{ background: 'var(--ink)', color: 'var(--on-dark)', padding: '140px 40px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line-soft)' }}>
      <div style={{ position: 'absolute', left: '50%', top: '50%', width: 780, height: 520, transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(253,218,22,0.10), transparent 62%)', filter: 'blur(50px)', pointerEvents: 'none', animation: 'pulseGlow 6s ease-in-out infinite' }} />
      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(52px,7vw,96px)', letterSpacing: '-0.02em', lineHeight: 1.03, margin: eyebrow ? '20px 0 28px' : '0 0 28px' }}
          dangerouslySetInnerHTML={{ __html: headline }} />
        {subhead && <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 17, lineHeight: 1.55, color: 'var(--on-dark-2)', maxWidth: 580, margin: '0 auto 36px' }}>{subhead}</p>}
        <div style={{ display: 'inline-flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <BtnPrimary size="lg">{primary}</BtnPrimary>
          {ghost && <BtnGhost arrow="←" href="#" onClick={(e) => { e.preventDefault(); window.__go && window.__go(ghostTo); }}>{ghost}</BtnGhost>}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Footer, PreFooter });
