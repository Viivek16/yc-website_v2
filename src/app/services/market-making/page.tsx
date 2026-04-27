import { ServiceHero }   from '@/components/services/ServiceHero';
import { FeatureCards }  from '@/components/services/FeatureCards';
import { LedgerExhibit } from '@/components/services/LedgerExhibit';
import { ServiceFAQ }    from '@/components/services/ServiceFAQ';
import { Section, Eyebrow } from '@/components/shared';
import { PreFooter }     from '@/components/PreFooter';

export default function MarketMakingPage() {
  return (
    <>
      <ServiceHero
        n="01" section="Market Making"
        title="Institutional Market Making." em="Aligned Liquidity."
        lede="We replace hidden price pressure and sudden volatility with a multi-layered liquidity framework engineered for sustainable growth."
        rail={[{l:'Venues',v:'11'},{l:'Pairs',v:'142'},{l:'Uptime',v:'99.97%'},{l:'Transparency',v:'Weekly'}]}
      />

      <Section id="content" bg="ink">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          <div style={{ padding: '48px 48px 48px 0', borderRight: '1px solid var(--line-soft)' }}>
            <Eyebrow accentRule>01 · The problem</Eyebrow>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 34, lineHeight: 1.1, margin: '18px 0 18px' }}>The wrong market maker <em>derails projects.</em></h3>
            <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 16, lineHeight: 1.65, color: 'var(--on-dark-2)' }}>Panic selling, thin order books, and hidden price pressure are the quiet killers of otherwise healthy tokens. Most of the damage is done before the project realises what is happening on the book.</p>
          </div>
          <div style={{ padding: '48px 0 48px 48px' }}>
            <Eyebrow accentRule>01 · The Yellow solution</Eyebrow>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 34, lineHeight: 1.1, margin: '18px 0 18px' }}>We solve illiquid markets.</h3>
            <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 16, lineHeight: 1.65, color: 'var(--on-dark-2)', marginBottom: 18 }}>Our data-driven strategies are designed to create:</p>
            {['Deeper order books', 'Significantly tighter spreads', 'Sustainable volume and long-term trust'].map((l, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 0', borderTop: i === 0 ? '1px solid var(--line-soft)' : 0, borderBottom: '1px solid var(--line-soft)', fontFamily: 'var(--font-ui)', fontSize: 15, color: 'var(--on-dark)' }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>0{i+1}</span>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section bg="ink2">
        <div style={{ marginBottom: 56 }}>
          <Eyebrow accentRule>02 · Execution</Eyebrow>
          <h2 className="h2" style={{ margin: '18px 0 22px', maxWidth: 900 }}>Instead of a single, rigid strategy, we deploy <em>a full institutional framework</em> across top CEXs.</h2>
        </div>
        <FeatureCards cols={2} items={[
          { title: 'Dynamic Adjustment.', body: 'Our algorithms dynamically adapt to live conditions using volatility-aware spread logic and inventory-based risk management.' },
          { title: 'Balanced Depth.',     body: 'We strictly maintain balanced buy- and sell-side depth to incentivise organic trading activity and drastically reduce slippage.' },
        ]} />
      </Section>

      <Section bg="ink">
        <div style={{ marginBottom: 40 }}>
          <Eyebrow accentRule>03 · Weekly ledger</Eyebrow>
          <h2 className="h2" style={{ margin: '18px 0 0' }}>Transparency, <em>line by line.</em></h2>
        </div>
        <LedgerExhibit />
      </Section>

      <Section bg="ink2">
        <div style={{ marginBottom: 56 }}>
          <Eyebrow accentRule>04 · Engagement</Eyebrow>
          <h2 className="h2" style={{ margin: '18px 0 0' }}>Your liquidity goals <em>dictate our structure.</em></h2>
        </div>
        <FeatureCards cols={2} items={[
          { title: 'Define the Objective.',  body: 'Whether you need organic volume growth, market stability, post-listing performance, or treasury optimisation.' },
          { title: 'Transparent Models.',    body: 'We operate on transparent, flexible structures, offering Retainer, Liquidity Provision & Loan, or customised Hybrid models.' },
        ]} />
      </Section>

      <ServiceFAQ items={[
        { q: 'Do you provide support for new CEX listings?',                    a: 'Yes. Beyond market making, we do help connect projects with over 140+ CEXs in our network based on their focus and listing strategy.' },
        { q: 'How do you prevent sudden volatility and order book thinning?',   a: 'Our algorithms are specifically engineered to maintain a strictly balanced buy-and-sell-side depth at all times. By continuously adapting to market momentum, we act as a stabilizing force that builds deeper, healthier order books, ultimately maintaining trust with both traders and exchanges.' },
        { q: 'What is "hidden price pressure," and how does Yellow Capital avoid it?', a: 'Most MM firms operate with misaligned incentives, which can lead to panic selling or dumping tokens to cover their own risks. Yellow Capital eliminates this conflict by utilizing data-driven, multi-layered strategies designed strictly to balance market depth and drive sustainable, long-term growth.' },
        { q: "What exactly is Yellow Capital's 'Multi-Layered Liquidity Framework'?", a: 'Instead of relying on a single, rigid strategy, we deploy advanced algorithms that dynamically adjust to live market conditions. This framework utilizes volatility-aware spread logic and inventory-based risk management to tighten spreads, drastically reduce slippage, and incentivize organic trading activity.' },
      ]} />

      <PreFooter
        headline='Ready to see a<br /><em>weekly ledger?</em>'
        subhead="Request a sample from the most recent publication — redacted where required, complete everywhere else."
        primary="Request a sample"
        ghost="All services"
        ghostTo="/"
      />
    </>
  );
}
