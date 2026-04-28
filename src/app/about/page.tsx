'use client';

import Image from 'next/image';
import { Section, Eyebrow, GlassCard, Reveal, Breadcrumb } from '@/components/shared';
import { CoverageGlobe } from '@/components/shared';
import { PreFooter } from '@/components/PreFooter';
import { useState } from 'react';

const timeline = [
  { y: '2018', tag: 'Founded', b: 'Desk stood up. Yellow Capital incorporated as a Montana general partnership.' },
  { y: '2019', tag: '24/7 desk', b: 'Follow-the-sun coverage.' },
  { y: '2023', tag: 'Yellow Group', b: 'Five companies, one governance. Capital, Yellow.pro, Yellow.com, Yellow.org, and Openware consolidated under Yellow Group.' },
  { y: '2024', tag: 'Chainalysis', b: 'KYT end-to-end. Every wallet that interacts with our surfaces is pre-screened.' },
  { y: '2026', tag: 'Now', b: '34 people, 9 cities. 120+ lifetime mandates, a dozen active MM engagements, SOC 2 in progress.' },
];

const principals = [
  { i: 'AS', n: 'Alexis Sirkia', r: 'Founder & Chairman', p: 'GSR · Yellow Group', img: '/assets/team/alexis.jpg' },
  { i: 'DM', n: 'Diego Martin', r: 'CEO', p: 'Renault Group', img: '/assets/team/diego.png' },
  { i: 'LR', n: 'Laurian Russo', r: 'Head of Technology & Trading', p: 'GSR · Laser Digital (Nomura)', img: '/assets/team/laurian.jpg' },
  { i: 'BM', n: 'Bakhtiyar Mammadov', r: 'CFO', p: 'PwC', img: '/assets/team/bakhtiyar.png' },
];

const team: [string, string, string, string, string | null][] = [
  ['Nem Popov', 'Head of BD', 'https://www.linkedin.com/in/nem-popov-a9005187/', 'NP', '/assets/team/nem.png'],
  ['Viivek Mehata', 'Portfolio Manager', 'https://www.linkedin.com/in/viivek-mehata16/', 'VM', '/assets/team/viivek.jpg'],
  ['Pedro Miranda', 'Head of Client Acquisition', 'https://www.linkedin.com/in/pedroandremirandagomes/', 'PM', '/assets/team/pedro.png'],
];

function TeamCard({ url, initials, img, role, name }: { url: string; initials: string; img: string | null; role: string; name: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal>
      <a href={url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
        <GlassCard
          style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', transition: 'transform 220ms, border-color 220ms', borderColor: hovered ? 'rgba(253,218,22,0.3)' : undefined, transform: hovered ? 'translateY(-2px)' : 'none' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div style={{ aspectRatio: '4 / 5', background: 'linear-gradient(145deg, #1c1b19, #141413)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderBottom: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            {img ? (
              <Image src={img} alt={name} fill style={{ objectFit: 'cover' }} />
            ) : (
              <>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, rgba(253,218,22,0.1), transparent 55%)' }} />
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 120, color: 'rgba(233,230,223,0.12)', letterSpacing: '-0.04em' }}>{initials}</div>
              </>
            )}
          </div>
          <div style={{ padding: '20px 22px 24px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>{role}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, margin: '6px 0 8px', letterSpacing: '-0.01em', color: 'var(--on-dark)' }}>{name}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>
              LinkedIn <span style={{ transition: 'transform 200ms', display: 'inline-block', marginLeft: 4, transform: hovered ? 'translateX(4px)' : 'none' }}>↗</span>
            </div>
          </div>
        </GlassCard>
      </a>
    </Reveal>
  );
}

export default function AboutPage() {
  return (
    <>
      <section style={{ background: 'var(--ink)', color: 'var(--on-dark)', padding: '72px 40px 96px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line-soft)' }}>
        <div style={{ position: 'absolute', top: -200, right: -160, width: 820, height: 820, background: 'radial-gradient(circle, rgba(253,218,22,0.06), transparent 62%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1360, margin: '0 auto', position: 'relative' }}>
          <Breadcrumb items={['Yellow Capital', 'About']} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(56px,7vw,104px)', letterSpacing: '-0.02em', lineHeight: 1.02, margin: '0 0 28px' }}>
            Let us <em style={{ color: 'var(--accent)' }}>take the wheel.</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', lineHeight: 1.35, color: 'var(--on-dark-2)', maxWidth: 820 }}>
            A regulated institutional-grade market-making firm supporting Tier-1 listing, treasury building, and exchange liquidity since 2017.
          </p>
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
          <h2 className="h2" style={{ margin: '18px 0 0' }}>The people <em>you&apos;ll speak to.</em></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {principals.map((p, i) => (
            <Reveal key={p.i} delay={i * 60}>
              <GlassCard style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ aspectRatio: '4 / 5', background: 'linear-gradient(145deg, #1c1b19, #141413)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderBottom: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                  {p.img ? (
                    <Image src={p.img} alt={p.n} fill style={{ objectFit: 'cover' }} />
                  ) : (
                    <>
                      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, rgba(253,218,22,0.1), transparent 55%)' }} />
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 120, color: 'rgba(233,230,223,0.12)', letterSpacing: '-0.04em' }}>{p.i}</div>
                    </>
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
          {team.map(([n, r, url, initials, img]) => (
            <TeamCard key={n} url={url} initials={initials} img={img} role={r} name={n} />
          ))}
        </div>
      </Section>

      <PreFooter headline="Speak with <em>a principal.</em>" subhead="Not a BD desk. Not a form response. A principal, within two business days." primary="Schedule consultation" ghost="Ecosystem" ghostTo="/ecosystem" />
    </>
  );
}
