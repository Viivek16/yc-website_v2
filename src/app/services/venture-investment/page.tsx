import { ServiceHero }  from '@/components/services/ServiceHero';
import { FeatureCards } from '@/components/services/FeatureCards';
import { ServiceFAQ }   from '@/components/services/ServiceFAQ';
import { Section, Eyebrow, GlassCard, Reveal } from '@/components/shared';
import { PreFooter }    from '@/components/PreFooter';

export default function VenturePage() {
  return (
    <>
      <ServiceHero
        n="04" section="Venture Investment"
        title="Strategic capital," em="fluent in the full stack."
        lede="Investment and strategic consultancy for early-stage token projects, channeled through the Yellow Group ecosystem."
        primary="Send a memo"
        rail={[{l:'Stage',v:'Seed → Series A'},{l:'Ticket',v:'$100k – $250k'},{l:'Cadence',v:'8–12 / yr'},{l:'Decision',v:'≤ 14 days'}]}
      />

      <Section id="content" bg="ink">
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 64, marginBottom: 56 }}>
          <div>
            <Eyebrow accentRule>01 · Thesis</Eyebrow>
            <h2 className="h2" style={{ margin: '18px 0 0' }}>What we <em>look for.</em></h2>
          </div>
          <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 17, lineHeight: 1.65, color: 'var(--on-dark-2)' }}>
            We back teams building the infrastructure, protocols, and primitives that the next decade of digital assets will depend on. Our edge is operational — we deploy capital alongside the trading, listing, editorial, and research capabilities of the Yellow Group.
          </p>
        </div>
        <FeatureCards cols={3} items={[
          { title: 'Infrastructure.', body: 'Exchange tech, settlement rails, custody, compliance tooling.' },
          { title: 'Protocols.',      body: 'DeFi primitives, liquidity layers, cross-chain routing.' },
          { title: 'Distribution.',   body: 'Consumer-facing products that make digital assets usable.' },
        ]} />
      </Section>

      <Section bg="ink2">
        <div style={{ marginBottom: 56 }}>
          <Eyebrow accentRule>02 · Operational edge</Eyebrow>
          <h2 className="h2" style={{ margin: '18px 0 28px' }}>More than <em>capital.</em></h2>
          <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 18, lineHeight: 1.65, color: 'var(--on-dark-2)', maxWidth: 780, margin: '0 0 56px' }}>
            We leverage deep industry relationships to actively scale our portfolio. When you partner with us, you gain immediate, hands-on ecosystem access to:
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {[['120+','Centralized Exchanges (CEXs)'],['100+','Top-Tier VC Firms'],['20+','Leading Launchpads'],['30+','Media & PR Partners']].map(([n, label], i) => (
            <Reveal key={i} delay={i * 60}>
              <GlassCard style={{ padding: '32px 28px', height: '100%' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(48px,5vw,72px)', letterSpacing: '-0.03em', color: 'var(--accent)', lineHeight: 1, marginBottom: 14, filter: 'drop-shadow(0 0 18px rgba(253,218,22,0.3))' }}>{n}</div>
                <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 15, lineHeight: 1.5, color: 'var(--on-dark-2)', margin: 0 }}>{label}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section bg="ink2">
        <div style={{ marginBottom: 48 }}>
          <Eyebrow accentRule>04 · Intake</Eyebrow>
          <h2 className="h2" style={{ margin: '18px 0 0' }}>The <em>process.</em></h2>
        </div>
        <FeatureCards cols={3} items={[
          { n: 'I',   title: 'Memo first.',             body: "Send a short memo — what you're building, who's building it, what stage you're at." },
          { n: 'II',  title: 'Two conversations.',       body: 'One with a principal, one with the desk. We test the fit both ways.' },
          { n: 'III', title: 'Decision within 14 days.', body: 'Yes, no, or not yet — all three come with written reasoning.' },
        ]} />
      </Section>

      <ServiceFAQ items={[
        { q: 'Which projects are eligible for investments from Yellow Capital?', a: "We usually invest in projects that have Tier-1 CEXs confirmed for listings or have strong backers. We ideally come into pre-listing stages, offering to cover the project's CEX listing fee as part of the funding." },
        { q: 'Is the investment subject to MM and other services as well?',      a: 'Yes, we tend to invest in the projects once they agree to sign us for MM or any of our services. This ensures a long-term collaboration with the project and expedites listing and beyond.' },
        { q: 'What is the investment mandate for the fund?',                     a: 'Investments are sector agnostic, but we focus on investing in token projects that are building in any of the exciting emerging Web3 verticals, including DeFi, AI, Infrastructure, DeepTech, RWA, etc.' },
      ]} />

      <PreFooter headline='Send a <em>memo.</em>' subhead="Two pages is plenty. What you're building, who's building it, why now." primary="Send a memo" ghost="All services" ghostTo="/" />
    </>
  );
}
