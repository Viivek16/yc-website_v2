// ecosystem.jsx
const EcosystemPage = ({ go }) => {
  const companies = [
    { n: '01', name: 'Yellow Capital', tag: 'Liquidity & Services', body: 'Market making desk, treasury management, programmatic sales, and venture investment.', meta: 'Founded 2018 · Montana GP · Flagship: 24/7 MM desk', current: true },
    { n: '02', name: 'Yellow.pro', tag: 'Listing venue', body: 'Primary listing venue for Yellow Group tokens and counterparties.', meta: 'Role: Exchange · Launches: 40+ trailing 12m · Coverage: Global' },
    { n: '03', name: 'Yellow.com', tag: 'Editorial media', body: 'Independent editorial desk covering crypto markets, institutional flow, and regulation. Firewalled from Capital.', meta: 'Role: Media · Reach: Institutional · Firewall: Yes' },
    { n: '04', name: 'Yellow.org', tag: 'Research & advocacy', body: 'Research and policy advocacy across the digital-asset policy surface.', meta: 'Role: Research · Chapters: 6 · Policy briefs: 24' },
    { n: '05', name: 'Openware', tag: 'Infrastructure', body: 'NeoDAX · OpenFinance. The software layer underneath everything the group ships.', meta: 'Since 2015 · Open-source roots · Exchange tech' },
  ];
  const flows = [
    { n: 'A', title: 'Launch', steps: ['Openware · build', 'Yellow.pro · list', 'Yellow Capital · MM', 'Yellow.com · editorial'] },
    { n: 'B', title: 'Operate', steps: ['Yellow Capital · desk', 'Yellow.org · frameworks', 'Yellow.com · reach'] },
    { n: 'C', title: 'Rescue', steps: ['Yellow Capital · takeover', 'Yellow.com · reset', 'Yellow.org · analysis'] },
    { n: 'D', title: 'Strategic', steps: ['Openware · co-build', 'Yellow Capital · ongoing', '$YELLOW · integration', 'Yellow.com · ecosystem'] },
  ];
  const principles = [
    { t: 'Firewalls, not silos.', b: 'Editorial (Yellow.com) and research (Yellow.org) operate independently of the commercial arms. No pay-for-coverage. No embargo trading. Written policy, enforced by a third-party compliance review.' },
    { t: 'Shared counterparty standards.', b: 'A counterparty declined by one group company is disclosed across the group. KYB, KYT, sanctions, and conduct — one standard, five applications. Nothing washes in through a side door.' },
    { t: 'Single P&Ls, single accountability.', b: 'Each company carries its own P&L and its own MD. The group does not subsidise loss-leading mandates across companies. Every engagement has to clear on its own merits.' },
  ];
  return (
    <React.Fragment>
      <section style={{ background: 'var(--ink)', color: 'var(--on-dark)', padding: '72px 40px 96px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line-soft)' }}>
        <div style={{ position: 'absolute', top: -200, right: -160, width: 820, height: 820, background: 'radial-gradient(circle, rgba(253,218,22,0.06), transparent 62%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1360, margin: '0 auto', position: 'relative' }}>
          <Breadcrumb items={['Yellow Capital', 'Ecosystem']} />
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(56px,7vw,104px)', letterSpacing: '-0.02em', lineHeight: 1.02, margin: '0 0 28px' }}>One group, <em style={{ color: 'var(--accent)', filter: 'drop-shadow(0 0 18px rgba(253,218,22,0.3))' }}>five disciplines.</em></h1>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', lineHeight: 1.35, color: 'var(--on-dark-2)', maxWidth: 820 }}>Yellow Capital is one operating company inside Yellow Group. The whole stack — listing, liquidity, editorial, research, infrastructure — reports through a single governance layer.</p>
          </div>
        </div>
      </section>

      <Section bg="ink">
        <div style={{ marginBottom: 48 }}>
          <Eyebrow accentRule>01 · The group</Eyebrow>
          <h2 className="h2" style={{ margin: '18px 0 0' }}>Five companies. <em>One governance layer.</em></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {companies.map((c, i) => (
            <Reveal key={c.n} delay={i * 60}>
              <GlassCard style={{ padding: 28, height: '100%', position: 'relative', borderColor: c.current ? 'rgba(253,218,22,0.3)' : undefined }}>
                {c.current && <div style={{ position: 'absolute', top: 14, right: 14, fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 6 }}><LiveDot size={5} />Current</div>}
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>Company · {c.n}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 28, margin: '10px 0 4px', letterSpacing: '-0.015em' }}>{c.name}</h3>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12.5, color: c.current ? 'var(--accent)' : 'var(--on-dark-2)', marginBottom: 14, fontStyle: 'italic' }}>{c.tag}</div>
                <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 14, lineHeight: 1.6, color: 'var(--on-dark-2)', margin: '0 0 18px' }}>{c.body}</p>
                <div style={{ paddingTop: 14, borderTop: '1px solid var(--line-soft)', fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.12em', color: 'var(--on-dark-3)' }}>{c.meta}</div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section bg="ink2">
        <div style={{ marginBottom: 56 }}>
          <Eyebrow accentRule>02 · Four paths</Eyebrow>
          <h2 className="h2" style={{ margin: '18px 0 0' }}>How the group <em>compounds.</em></h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {flows.map((f, fi) => (
            <Reveal key={f.n} delay={fi * 80}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 11fr', gap: 32, padding: '28px 0', borderTop: '1px solid var(--line-soft)', borderBottom: fi === flows.length - 1 ? '1px solid var(--line-soft)' : 0, alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>Flow · {f.n}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontStyle: 'italic', color: 'var(--on-dark)', marginTop: 4 }}>{f.title}</div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                  {f.steps.map((s, i) => (
                    <React.Fragment key={i}>
                      <span style={{ padding: '8px 14px', fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.08em', color: 'var(--on-dark)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4, background: 'rgba(20,19,19,0.6)' }}>{s}</span>
                      {i < f.steps.length - 1 && <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 14 }}>→</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section bg="ink">
        <div style={{ marginBottom: 48 }}>
          <Eyebrow accentRule>03 · Operating principles</Eyebrow>
          <h2 className="h2" style={{ margin: '18px 0 0' }}>How the group <em>is run.</em></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {principles.map((p, i) => (
            <Reveal key={i} delay={i * 60}>
              <GlassCard style={{ padding: 32, height: '100%' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'var(--accent)', lineHeight: 1, marginBottom: 18, filter: 'drop-shadow(0 0 14px rgba(253,218,22,0.2))' }}>{['I','II','III'][i]}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 24, lineHeight: 1.15, margin: '0 0 14px' }}>{p.t}</h3>
                <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 14, lineHeight: 1.6, color: 'var(--on-dark-2)' }}>{p.b}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>
      <PreFooter headline="Work with <em>the whole stack.</em>" subhead="One counterparty. Listing, liquidity, editorial, research, and infrastructure." primary="Schedule consultation" ghost="About the firm" ghostTo="/about" />
    </React.Fragment>
  );
};
window.EcosystemPage = EcosystemPage;

// about.jsx
const AboutPage = ({ go }) => {
  const timeline = [
    { y: '2018', tag: 'Founded', b: 'Desk stood up. Yellow Capital incorporated as a Montana general partnership.' },
    { y: '2019', tag: '24/7 desk', b: 'Follow-the-sun coverage. Team built out in Singapore and Berlin.' },
    { y: '2023', tag: 'Yellow Group', b: 'Five companies, one governance. Capital, Yellow.pro, Yellow.com, Yellow.org, and Openware consolidated under Yellow Group.' },
    { y: '2024', tag: 'Chainalysis', b: 'KYT end-to-end. Every wallet that interacts with our surfaces is pre-screened.' },
    { y: '2026', tag: 'Now', b: '34 people, 9 cities. 120+ lifetime mandates, a dozen active MM engagements, SOC 2 in progress.' },
  ];
  const principals = [
    { i: 'AS', n: 'Alexis Sirkia', r: 'Founder & Chairman', p: 'GSR · Yellow Group', img: 'assets/team/alexis.jpg' },
    { i: 'DM', n: 'Diego Martin', r: 'CEO', p: 'Renault Group', img: 'assets/team/diego.png' },
    { i: 'LR', n: 'Laurian Russo', r: 'Head of Technology & Trading', p: 'GSR · Laser Digital (Nomura)' },
    { i: 'BM', n: 'Bakhtiyar Mammadov', r: 'CFO', p: 'PwC', img: 'assets/team/bakhtiyar.png' },
  ];
  const team = [
    ['Nem Popov', 'Head of BD', 'https://www.linkedin.com/in/nem-popov-a9005187/', 'NP', 'assets/team/nem.png'],
    ['Viivek Mehata', 'Portfolio Manager', 'https://www.linkedin.com/in/viivek-mehata16/', 'VM', 'assets/team/viivek.jpg'],
    ['Pedro Miranda', 'Head of Client Acquisition', 'https://www.linkedin.com/in/pedroandremirandagomes/', 'PM', 'assets/team/pedro.png'],
  ];
  return (
    <React.Fragment>
      <section style={{ background: 'var(--ink)', color: 'var(--on-dark)', padding: '72px 40px 96px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line-soft)' }}>
        <div style={{ position: 'absolute', top: -200, right: -160, width: 820, height: 820, background: 'radial-gradient(circle, rgba(253,218,22,0.06), transparent 62%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1360, margin: '0 auto', position: 'relative' }}>
          <Breadcrumb items={['Yellow Capital', 'About']} />
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(56px,7vw,104px)', letterSpacing: '-0.02em', lineHeight: 1.02, margin: '0 0 28px' }}>Let us <em style={{ color: 'var(--accent)' }}>take the wheel.</em></h1>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', lineHeight: 1.35, color: 'var(--on-dark-2)', maxWidth: 820 }}>A regulated institutional-grade market-making firm supporting Tier-1 listing, treasury building, and exchange liquidity since 2017.</p>
          </div>
        </div>
      </section>

      <Section bg="ink">
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 64, alignItems: 'start' }}>
          <div>
            <Eyebrow accentRule>01 · The firm</Eyebrow>
            <h2 className="h2" style={{ margin: '18px 0 28px' }}>Engineering-precision <em>in digital assets.</em></h2>
            <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 17.5, lineHeight: 1.65, color: 'var(--on-dark-2)', maxWidth: 720 }}>
              Yellow Capital is a regulated institutional-grade market-making firm supporting Tier-1 listing, treasury building, and exchange liquidity since 2017. Our core team consists of industry-leading quantitative analysts, risk managers, and developers. Leveraging diverse backgrounds in high-frequency financial trading and blockchain architecture, we collaborate with top global talent to deliver premium liquidity solutions, algorithmic execution, and strategic guidance in the digital-asset market.
            </p>
          </div>
          <CoverageGlobe />
        </div>
      </Section>

      <Section bg="ink2">
        <div style={{ marginBottom: 56 }}>
          <Eyebrow accentRule>02 · History</Eyebrow>
          <h2 className="h2" style={{ margin: '18px 0 0' }}>Eight years of <em>desk memory.</em></h2>
        </div>
        <div style={{ borderTop: '1px solid var(--line-soft)' }}>
          {timeline.map((t, i) => (
            <Reveal key={t.y} delay={i * 60}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 5fr', gap: 32, padding: '28px 0', borderBottom: '1px solid var(--line-soft)', alignItems: 'start' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 42, color: 'var(--on-dark)' }}>{t.y}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)', paddingTop: 16 }}>· {t.tag}</div>
                <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 16, lineHeight: 1.6, color: 'var(--on-dark-2)', paddingTop: 12 }}>{t.b}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section bg="ink">
        <div style={{ marginBottom: 48 }}>
          <Eyebrow accentRule>03 · Leadership & team</Eyebrow>
          <h2 className="h2" style={{ margin: '18px 0 0' }}>The people <em>you'll speak to.</em></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {principals.map((p, i) => (
            <Reveal key={p.i} delay={i * 60}>
              <GlassCard style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ aspectRatio: '4 / 5', background: 'linear-gradient(145deg, #1c1b19, #141413)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderBottom: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                  {p.img ? (
                    <img src={p.img} alt={p.n} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <React.Fragment>
                      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, rgba(253,218,22,0.1), transparent 55%)' }} />
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 120, color: 'rgba(233,230,223,0.12)', letterSpacing: '-0.04em' }}>{p.i}</div>
                    </React.Fragment>
                  )}
                </div>
                <div style={{ padding: '20px 22px 24px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>{p.r}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, margin: '6px 0 8px', letterSpacing: '-0.01em' }}>{p.n}</div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 12.5, color: 'var(--on-dark-2)', fontStyle: 'italic' }}>Prior · {p.p}</div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
          {team.map(([n, r, url, initials, img], i) => (
            <Reveal key={n} delay={(principals.length + i) * 60}>
              <a href={url} target="_blank" style={{ textDecoration: 'none', display: 'block' }}>
                <GlassCard style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', transition: 'transform 220ms, border-color 220ms' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'rgba(253,218,22,0.3)'; const a = e.currentTarget.querySelector('.li-arr'); if (a) a.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = ''; const a = e.currentTarget.querySelector('.li-arr'); if (a) a.style.transform = 'translateX(0)'; }}>
                  <div style={{ aspectRatio: '4 / 5', background: 'linear-gradient(145deg, #1c1b19, #141413)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderBottom: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                    {img ? (
                      <img src={img} alt={n} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <React.Fragment>
                        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, rgba(253,218,22,0.1), transparent 55%)' }} />
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 120, color: 'rgba(233,230,223,0.12)', letterSpacing: '-0.04em' }}>{initials}</div>
                      </React.Fragment>
                    )}
                  </div>
                  <div style={{ padding: '20px 22px 24px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>{r}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, margin: '6px 0 8px', letterSpacing: '-0.01em', color: 'var(--on-dark)' }}>{n}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>LinkedIn <span className="li-arr" style={{ transition: 'transform 200ms', display: 'inline-block', marginLeft: 4 }}>↗</span></div>
                  </div>
                </GlassCard>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      <PreFooter headline="Speak with <em>a principal.</em>" subhead="Not a BD desk. Not a form response. A principal, within two business days." primary="Schedule consultation" ghost="Ecosystem" ghostTo="/ecosystem" />
    </React.Fragment>
  );
};
window.AboutPage = AboutPage;

// contact.jsx
const ContactPage = ({ go }) => {
  const [f, setF] = React.useState({ name: '', role: '', company: '', ctype: 'Token project', interests: [], stage: '', notes: '', success: '', start: 'Within 60 days', referred: '' });
  const toggleInterest = (k) => setF(s => ({ ...s, interests: s.interests.includes(k) ? s.interests.filter(x => x !== k) : [...s.interests, k] }));
  const onSubmit = (e) => {
    e.preventDefault();
    const body = Object.entries(f).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join('\n');
    const subject = `Intake: ${f.name || '—'} / ${f.company || '—'}`;
    window.location.href = `mailto:nem@yellow.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  const input = { fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 14, width: '100%', padding: '11px 14px', background: 'rgba(20,19,19,0.5)', color: 'var(--on-dark)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 2, outline: 'none', transition: 'border-color 180ms' };
  const label = { fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--on-dark-3)', display: 'block', marginBottom: 8 };
  const stepHead = { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 18px' };

  return (
    <React.Fragment>
      <section style={{ background: 'var(--ink)', color: 'var(--on-dark)', padding: '72px 40px 96px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line-soft)' }}>
        <div style={{ position: 'absolute', top: -200, right: -160, width: 820, height: 820, background: 'radial-gradient(circle, rgba(253,218,22,0.06), transparent 62%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1360, margin: '0 auto', position: 'relative' }}>
          <Breadcrumb items={['Yellow Capital', 'Contact']} />
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(56px,7vw,104px)', letterSpacing: '-0.02em', lineHeight: 1.02, margin: '0 0 28px' }}>Start <em style={{ color: 'var(--accent)' }}>a conversation.</em></h1>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', lineHeight: 1.35, color: 'var(--on-dark-2)', maxWidth: 820 }}>We respond to qualified inquiries within two business days. Use the intake below or reach a principal directly.</p>
          </div>
        </div>
      </section>

      <Section bg="ink" pad={120}>
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 56, alignItems: 'start' }}>
          <form onSubmit={onSubmit} style={{ background: 'rgba(20,19,19,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4, padding: 40, display: 'flex', flexDirection: 'column', gap: 36 }}>
            {/* Step 1 */}
            <div>
              <div style={stepHead}>Step 1 · About you</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                <div><label style={label}>Name</label><input style={input} value={f.name} onChange={e => setF({...f, name: e.target.value})} required /></div>
                <div><label style={label}>Role</label><input style={input} value={f.role} onChange={e => setF({...f, role: e.target.value})} /></div>
                <div><label style={label}>Company</label><input style={input} value={f.company} onChange={e => setF({...f, company: e.target.value})} required /></div>
                <div><label style={label}>Company type</label>
                  <select style={input} value={f.ctype} onChange={e => setF({...f, ctype: e.target.value})}>
                    {['Token project', 'Fund', 'Exchange', 'Family office', 'Other'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </div>
            {/* Step 2 */}
            <div>
              <div style={stepHead}>Step 2 · About the engagement</div>
              <label style={label}>Interest (multi-select)</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
                {['Market Making', 'Treasury Management', 'Programmatic Sales', 'Venture Investment', 'Other'].map(k => {
                  const on = f.interests.includes(k);
                  return <button type="button" key={k} onClick={() => toggleInterest(k)} style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase',
                    padding: '8px 12px', borderRadius: 2, cursor: 'pointer',
                    background: on ? 'rgba(253,218,22,0.14)' : 'transparent',
                    color: on ? 'var(--accent)' : 'var(--on-dark-2)',
                    border: `1px solid ${on ? 'rgba(253,218,22,0.5)' : 'rgba(255,255,255,0.12)'}`,
                    boxShadow: on ? '0 0 14px rgba(253,218,22,0.18)' : 'none', transition: 'all 200ms',
                  }}>{k}</button>;
                })}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 18 }}>
                <div><label style={label}>Stage</label><input style={input} value={f.stage} onChange={e => setF({...f, stage: e.target.value})} placeholder="pre-TGE · launching · live · post-listing" /></div>
                <div><label style={label}>Notes</label><textarea rows={4} style={{...input, resize: 'vertical'}} value={f.notes} onChange={e => setF({...f, notes: e.target.value})} placeholder="Be candid — this note goes to a principal, not a BD desk." /></div>
                <div><label style={label}>What a successful engagement looks like</label><textarea rows={3} style={{...input, resize: 'vertical'}} value={f.success} onChange={e => setF({...f, success: e.target.value})} /></div>
              </div>
            </div>
            {/* Step 3 */}
            <div>
              <div style={stepHead}>Step 3 · Logistics</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                <div><label style={label}>Target start</label>
                  <select style={input} value={f.start} onChange={e => setF({...f, start: e.target.value})}>
                    {['Within 30 days', 'Within 60 days', 'Within 90 days', 'Exploratory'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div><label style={label}>Referred by (optional)</label><input style={input} value={f.referred} onChange={e => setF({...f, referred: e.target.value})} /></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 18, borderTop: '1px solid var(--line-soft)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--on-dark-3)', display: 'inline-flex', alignItems: 'center', gap: 8 }}><LiveDot size={6} /> Response · 2 business days</span>
              <button type="submit" style={{ fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 500, padding: '14px 24px', background: 'var(--cta)', color: 'var(--ink)', border: 0, borderRadius: 4, cursor: 'pointer', display: 'inline-flex', gap: 10, alignItems: 'center' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 36px rgba(255,177,0,0.32)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--cta)'; e.currentTarget.style.boxShadow = 'none'; }}
              >Send intake <span>→</span></button>
            </div>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <GlassCard style={{ padding: 26 }}>
              <Eyebrow>02 · Direct lines</Eyebrow>
              <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[['Sales', 'nem@yellow.com'], ['Marketing & Partnerships', 'marketing@yellow.com'], ['Official', 'capital@yellow.com']].map(([l, e]) => (
                  <a key={l} href={`mailto:${e}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderTop: '1px solid var(--line-soft)', fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--on-dark)', textDecoration: 'none' }}
                    onMouseEnter={el => el.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={el => el.currentTarget.style.color = 'var(--on-dark)'}>
                    <div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>{l}</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, marginTop: 3 }}>{e}</div></div>
                    <span>→</span>
                  </a>
                ))}
              </div>
            </GlassCard>
            <GlassCard style={{ padding: 26 }}>
              <Eyebrow>03 · Desk hours</Eyebrow>
              <div style={{ marginTop: 14 }}>
                {[['Singapore', 'Open'], ['Berlin', 'Open'], ['New York', 'Open'], ['Incident hotline', '+1 (406) 555-0214']].map(([c, s], i, a) => (
                  <div key={c} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < a.length - 1 ? '1px solid var(--line-soft)' : 0, fontFamily: 'var(--font-ui)', fontSize: 13.5 }}>
                    <span style={{ color: 'var(--on-dark)' }}>{c}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: s === 'Open' ? 'var(--accent)' : 'var(--on-dark-2)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>{s === 'Open' && <LiveDot size={5} />}{s}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
            <GlassCard style={{ padding: 26 }}>
              <Eyebrow>04 · Offices</Eyebrow>
              <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[['Montana', 'HQ'], ['Singapore', 'APAC'], ['Berlin', 'EU'], ['New York', 'NA']].map(([c, r]) => (
                  <div key={c} style={{ padding: '14px 0', borderTop: '1px solid var(--line-soft)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>{r}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginTop: 4, color: 'var(--on-dark)' }}>{c}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>
    </React.Fragment>
  );
};
window.ContactPage = ContactPage;

// Simple fallbacks
const SimplePage = ({ n, title, em, lede, body }) => (
  <React.Fragment>
    <section style={{ background: 'var(--ink)', color: 'var(--on-dark)', padding: '96px 40px 80px', borderBottom: '1px solid var(--line-soft)' }}>
      <div style={{ maxWidth: 1360, margin: '0 auto' }}>
        <Breadcrumb items={['Yellow Capital', title]} />
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(48px,6vw,88px)', letterSpacing: '-0.02em', margin: '0 0 20px' }}>{title} <em style={{ color: 'var(--accent)' }}>{em}</em></h1>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontStyle: 'italic', color: 'var(--on-dark-2)', maxWidth: 780 }}>{lede}</p>
      </div>
    </section>
    <Section bg="ink"><div style={{ maxWidth: 760, fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: 'var(--on-dark-2)' }}>{body}</div></Section>
    <PreFooter headline="Talk to <em>a principal.</em>" subhead="We respond within two business days." primary="Schedule consultation" ghost="Back home" ghostTo="/" />
  </React.Fragment>
);

const InsightsPage = () => <SimplePage n="08" title="Notes from the desk." em="" lede="Roughly twice a month. Institutional readers only — we verify the domain before we add you." body={<p>Archive of desk notes, regulation reviews, market structure commentary, and letters. Subscribe via <a href="mailto:nem@yellow.com" style={{ color: 'var(--accent)' }}>nem@yellow.com</a>.</p>} />;
const CareersPage = () => <SimplePage n="09" title="Build the desk" em="we wish we'd had." lede="We hire slowly, compensate in cash and equity, and expect the people we hire to push our standards higher — not the other way round." body={<p>Open roles: Senior Quant Trader, Treasury Strategist, Head of Compliance, Associate (Counterparty), Editor at Yellow.com, Summer Analyst 2026. Apply via <a href="mailto:nem@yellow.com" style={{ color: 'var(--accent)' }}>nem@yellow.com</a> with a one-page memo.</p>} />;
const LegalPage = ({ title }) => <SimplePage title={title} em="" lede="This document sets out the current policy. Updated quarterly. Material changes notified in writing." body={<p>Placeholder legal body — full text maintained in operations. Email <a href="mailto:nem@yellow.com" style={{ color: 'var(--accent)' }}>nem@yellow.com</a> for the signed PDF.</p>} />;

Object.assign(window, { InsightsPage, CareersPage, LegalPage });
