import { ServiceHero }  from '@/components/services/ServiceHero';
import { FeatureCards } from '@/components/services/FeatureCards';
import { Section, Eyebrow, GlassCard } from '@/components/shared';
import { PreFooter }    from '@/components/PreFooter';

export default function ProgrammaticPage() {
  return (
    <>
      <ServiceHero
        n="03" section="Programmatic Sales"
        title="Quiet liquidation." em="Without the market noticing."
        lede="Discreet, algorithmic liquidation of token allocations at favourable prices — engineered to minimise market impact and preserve price stability."
        rail={[{l:'Schedules',v:'VWAP · TWAP · Custom'},{l:'Venues',v:'11'},{l:'Control',v:'Pause · Resume · Reroute'},{l:'Reporting',v:'Live'}]}
      />

      <Section id="content" bg="ink2">
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 48, alignItems: 'start' }}>
          <div>
            <Eyebrow accentRule>01 · The problem</Eyebrow>
            <h2 className="h2" style={{ margin: '18px 0 0' }}>Selling into <em>your own market.</em></h2>
          </div>
          <GlassCard style={{ padding: 36 }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.4, fontStyle: 'italic', color: 'var(--on-dark)', margin: 0 }}>
              Selling a large token allocation without discipline is how treasuries destroy the very markets they depend on. Orders hit the book, the price slips, and the remaining inventory is worth less than when you started.
            </p>
          </GlassCard>
        </div>
      </Section>

      <Section bg="ink">
        <div style={{ marginBottom: 56 }}>
          <Eyebrow accentRule>02 · The method</Eyebrow>
          <h2 className="h2" style={{ margin: '18px 0 0' }}>Engineered <em>patience.</em></h2>
        </div>
        <FeatureCards cols={3} items={[
          { title: 'Volatility-aware scheduling.',  body: 'We sell more into strength and pull back into weakness. The schedule responds to live market conditions, never the other way round.' },
          { title: 'Deep-liquidity venue routing.', body: 'Orders are routed to the venues that can absorb them cleanly. Thin books are avoided, not exploited.' },
          { title: 'Concealed footprint.',          body: 'Every slice of the sale is sized to disappear into organic flow. The market sees activity, not a seller.' },
        ]} />
      </Section>

      <Section bg="ink2">
        <div style={{ marginBottom: 56 }}>
          <Eyebrow accentRule>03 · You see everything</Eyebrow>
          <h2 className="h2" style={{ margin: '18px 0 0' }}>Transparency <em>& control.</em></h2>
        </div>
        <FeatureCards cols={2} items={[
          { title: 'Live dashboard.',              body: 'Follow the program in real time. Quantities sold, average fill, slippage vs. benchmark.' },
          { title: 'Pause, resume, or reallocate.', body: 'The program is yours. Change the target size, the timeframe, or the venue mix at any point.' },
        ]} />
      </Section>

      <PreFooter headline='Plan a <em>programmatic sale.</em>' subhead="Share the allocation size, the target timeframe, and the constraints. We'll return a draft schedule within 48 hours." primary="Plan a sale" ghost="All services" ghostTo="/" />
    </>
  );
}
