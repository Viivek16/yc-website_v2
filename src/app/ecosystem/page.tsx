import { Section, Eyebrow, GlassCard, Reveal, Breadcrumb, LiveDot } from '@/components/shared';
import { PreFooter } from '@/components/PreFooter';

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

export default function EcosystemPage() {
  return (
    <>
      <section style={{ background: 'var(--ink)', color: 'var(--on-dark)', padding: '72px 40px 96px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line-soft)' }}>
        <div style={{ position: 'absolute', top: -200, right: -160, width: 820, height: 820, background: 'radial-gradient(circle, rgba(253,218,22,0.06), transparent 62%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1360, margin: '0 auto', position: 'relative' }}>
          <Breadcrumb items={['Yellow Capital', 'Ecosystem']} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(56px,7vw,104px)', letterSpacing: '-0.02em', lineHeight: 1.02, margin: '0 0 28px' }}>
            One group, <em style={{ color: 'var(--accent)', filter: 'drop-shadow(0 0 18px rgba(253,218,22,0.3))' }}>five disciplines.</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', lineHeight: 1.35, color: 'var(--on-dark-2)', maxWidth: 820 }}>
            Yellow Capital is one operating company inside Yellow Group. The whole stack — listing, liquidity, editorial, research, infrastructure — reports through a single governance layer.
          </p>
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
                {c.current && (
                  <div style={{ position: 'absolute', top: 14, right: 14, fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <LiveDot size={5} />Current
                  </div>
                )}
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
                    <span key={i} style={{ display: 'contents' }}>
                      <span style={{ padding: '8px 14px', fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.08em', color: 'var(--on-dark)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4, background: 'rgba(20,19,19,0.6)' }}>{s}</span>
                      {i < f.steps.length - 1 && <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 14 }}>→</span>}
                    </span>
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
                <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 14, lineHeight: 1.6, color: 'var(--on-dark-2)', margin: 0 }}>{p.b}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <PreFooter headline="Work with <em>the whole stack.</em>" subhead="One counterparty. Listing, liquidity, editorial, research, and infrastructure." primary="Schedule consultation" ghost="About the firm" ghostTo="/about" />
    </>
  );
}
