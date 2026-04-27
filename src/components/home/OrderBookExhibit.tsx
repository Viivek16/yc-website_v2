import { Section, Eyebrow, Reveal } from '@/components/shared';
import { OrderBook } from './OrderBook';

const STATS = [
  ['Median Spread', '1.5%'],
  ['Quotes / 24h',  '1.42M'],
  ['Active pairs',  '142'],
  ['Uptime',        '99.97%'],
] as const;

export function OrderBookExhibit() {
  return (
    <Section bg="ink2">
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 64, alignItems: 'center' }}>
        <div>
          <Eyebrow accentRule>03 · On the desk</Eyebrow>
          <h2 className="h2" style={{ margin: '18px 0 22px' }}>Depth, <em>visible.</em></h2>
          <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 16.5, lineHeight: 1.6, color: 'var(--on-dark-2)', maxWidth: 460 }}>
            Every quote we post is a line someone at the desk can defend. This is a live view of our order book for our most active pair.
          </p>
          <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, maxWidth: 460 }}>
            {STATS.map(([l, v]) => (
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
}
