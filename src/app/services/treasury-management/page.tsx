import { ServiceHero }  from '@/components/services/ServiceHero';
import { FeatureCards } from '@/components/services/FeatureCards';
import { ServiceFAQ }   from '@/components/services/ServiceFAQ';
import { Section, Eyebrow, GlassCard, CountUp } from '@/components/shared';
import { PreFooter }    from '@/components/PreFooter';
import { TreasuryChart } from '@/components/charts/TreasuryChart';

export default function TreasuryPage() {
  return (
    <>
      <ServiceHero
        n="02" section="Treasury Management"
        title="Strategic Treasury Building." em="Zero Market Impact."
        lede="Build a sustainable runway with our algorithmic model, liquidating tokens to accumulate a diversified treasury at favourable prices."
        rail={[{l:'Min USDT payback',v:'30%'},{l:'Reporting',v:'Weekly'},{l:'Liquidity',v:'On-demand'},{l:'Control',v:'You keep it'}]}
      />

      <Section id="content" bg="ink2">
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 48, alignItems: 'start' }}>
          <div>
            <Eyebrow accentRule>01 · Do you know?</Eyebrow>
            <h2 className="h2" style={{ margin: '18px 0 0' }}>The old model <em>is broken.</em></h2>
          </div>
          <GlassCard style={{ padding: 36 }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.4, color: 'var(--on-dark)', margin: 0, fontStyle: 'italic' }}>
              Lending tokens to a market maker only to receive the same tokens back does not build a sustainable runway. Worse, traditional loans incentivise market makers to crash your token&apos;s price to repay at a lower strike rate.
            </p>
          </GlassCard>
        </div>
      </Section>

      {/* 30% showcase */}
      <section style={{ background: 'var(--ink)', color: 'var(--on-dark)', padding: '100px 40px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line-soft)' }}>
        <div style={{ position: 'absolute', left: '50%', top: '50%', width: 560, height: 560, transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(253,218,22,0.16), transparent 62%)', filter: 'blur(40px)', pointerEvents: 'none', animation: 'pulseGlow 5s ease-in-out infinite' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          <Eyebrow accentRule>02 · The Yellow model</Eyebrow>
          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(28px, 3.5vw, 46px)', letterSpacing: '-0.02em', color: 'var(--on-dark-2)', display: 'block', textAlign: 'center', width: '100%' }}>
              We guarantee a minimum
            </span>
            <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(96px, 13vw, 190px)', letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--accent)', filter: 'drop-shadow(0 0 40px rgba(253,218,22,0.45))', animation: 'pulseGlow 3.5s ease-in-out infinite', textAlign: 'center', width: '100%', display: 'block' }}>
              <CountUp to={30} suffix="%" duration={1400} />
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(28px, 3.5vw, 46px)', letterSpacing: '-0.02em', color: 'var(--on-dark-2)', display: 'block', textAlign: 'center', width: '100%' }}>
              USDT payback on your treasury.
            </span>
          </div>
          <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 16, lineHeight: 1.6, color: 'var(--on-dark-2)', maxWidth: 560, margin: '36px auto 0', textAlign: 'center' }}>
            We aim to provide a minimum of 30% of your total treasury back in USDT, while the rest is in tokens, depending on market conditions. Maximum could be anything up to 100%.
          </p>
        </div>
      </section>

      <Section bg="ink2">
        <div style={{ marginBottom: 56 }}>
          <Eyebrow accentRule>03 · How it works & control</Eyebrow>
          <h2 className="h2" style={{ margin: '18px 0 0' }}>Precision mechanics, <em>total control.</em></h2>
        </div>
        <FeatureCards cols={3} items={[
          { title: 'Passive Execution.',       body: 'Small passive limit orders. No aggressive selling, no market dumping.' },
          { title: 'Aligned Incentives.',      body: 'Higher token values mean better outcomes for both parties.' },
          { title: 'The Buffer Strategy.',     body: 'Our algorithms adapt to live conditions. We sell more when prices surge, and deploy the buffer when prices dump.' },
          { title: 'On-Demand Liquidity.',     body: 'Ask for a payout anytime you want to meet project needs.' },
          { title: 'Verifiable Transparency.', body: 'Detailed oversight with weekly & monthly performance reporting.' },
          { title: 'You Stay in Control.',     body: 'Pause, adjust, or reallocate at any point. The program adapts to your timeline, not the other way round.' },
        ]} />

        {/* Interactive treasury strategy chart */}
        <TreasuryChart />
      </Section>

      <ServiceFAQ items={[
        { q: 'Can I ask for a payout anytime during the contract period?',     a: 'Yes, clients can request a payout twice during a standard 12-month contract period. Based on the USDT/Treasury accumulated until then, we ensure a total of 30% is provided overall.' },
        { q: 'Will this selling pressure hurt our price?',                     a: 'No. Sales are gradual, passive, and adaptive. Executions only occur when there is organic market demand.' },
        { q: 'What is Strike Price, and how is it calculated?',                a: 'Strike Price is calculated using the average daily open price of each day, referencing CoinMarketCap, CoinGecko, or the CEX of preference as data sources. For example, if the open prices over three days are 1.00, 1.05, and 1.10 USDT, the strike price at the end of Day 3 would be (1.00 + 1.05 + 1.10) / 3 = 1.05 USDT.' },
        { q: 'How do we know the strike price won\'t be manipulated?',         a: 'The strike price calculation is completely transparent and time-distributed. It relies on public average daily open prices from trusted sources like CoinMarketCap or CoinGecko, effectively minimizing any risk of single-day manipulation.' },
        { q: 'What happens in a bear market?',                                 a: 'The strategic buffer wallet and the strike price average help define a token price floor. Even in weak market conditions, the guaranteed 30% USDT floor provides vital financial stability.' },
      ]} />

      <PreFooter headline='Start a <em>treasury conversation.</em>' subhead="A short memo describing your token, circulating supply, and the runway you need. Reply within two business days." primary="Start the conversation" ghost="All services" ghostTo="/" />
    </>
  );
}
