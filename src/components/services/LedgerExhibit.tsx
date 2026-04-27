import { LiveDot } from '@/components/shared';

const ROWS = [
  ['BTC/USDT',  'Binance', 4.2,  0.3,  284_000_000, [2,5,3,7,6,8,5,9,7,10]],
  ['ETH/USDT',  'OKX',    5.1, -0.4,  182_400_000, [6,4,5,7,5,4,6,8,7,6]],
  ['SOL/USDT',  'Bybit',  6.8,  1.2,   94_200_000, [3,4,6,7,9,8,10,9,11,12]],
  ['ARB/USDT',  'Binance',7.4, -0.1,   38_100_000, [5,6,5,7,6,5,4,5,6,7]],
  ['OP/USDT',   'KuCoin', 8.2,  0.8,   28_900_000, [4,5,6,7,8,7,9,10,9,11]],
  ['DOGE/USDT', 'Binance',3.9,  0.5,  142_700_000, [7,6,8,7,9,8,10,11,10,12]],
  ['MATIC/USDT','Bitget', 6.4, -0.2,   41_200_000, [6,7,5,6,5,4,6,5,7,6]],
  ['LINK/USDT', 'Binance',5.6,  0.7,   67_800_000, [4,5,7,6,8,9,7,10,11,10]],
] as const;

function Spark({ d }: { d: readonly number[] }) {
  const arr = [...d];
  const max = Math.max(...arr), min = Math.min(...arr);
  const pts = arr.map((v, i) => `${(i / (arr.length - 1)) * 60},${18 - ((v - min) / (max - min)) * 16 - 1}`).join(' ');
  return <svg viewBox="0 0 60 18" width="60" height="18"><polyline points={pts} fill="none" stroke="#fdda16" strokeWidth="1" /></svg>;
}

export function LedgerExhibit() {
  return (
    <div style={{ background: 'rgba(20,19,19,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, boxShadow: 'var(--sh-md)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(10,10,10,0.5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LiveDot size={6} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--on-dark)' }}>Live · Q1 2026 · Week 8</span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>Published Mon 09:00 UTC</span>
      </div>
      {/* Column headers */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1.4fr 1fr', padding: '12px 20px', fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--on-dark-3)', borderBottom: '1px solid var(--line-soft)' }}>
        <span>Pair</span><span>Venue</span><span>Spread (bps)</span><span>Inventory</span><span>Volume 7d</span><span style={{ textAlign: 'right' }}>Trend</span>
      </div>
      {/* Rows */}
      {ROWS.map((r, i) => (
        <div key={i} className="ledger-row" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1.4fr 1fr', padding: '14px 20px', fontFamily: 'var(--font-mono)', fontSize: 12, fontVariantNumeric: 'tabular-nums', borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 220ms', alignItems: 'center' }}>
          <span style={{ color: 'var(--on-dark)' }}>{r[0]}</span>
          <span style={{ color: 'var(--on-dark-2)' }}>{r[1]}</span>
          <span style={{ color: 'var(--on-dark)' }}>{(r[2] as number).toFixed(1)}</span>
          <span style={{ color: (r[3] as number) >= 0 ? '#4ade80' : '#ef4444' }}>{(r[3] as number) > 0 ? '+' : ''}{(r[3] as number).toFixed(1)}%</span>
          <span style={{ color: 'var(--on-dark)' }}>${((r[4] as number) / 1e6).toFixed(1)}M</span>
          <span style={{ textAlign: 'right' }}><Spark d={r[5] as readonly number[]} /></span>
        </div>
      ))}
      {/* Footer totals */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '18px 20px', background: 'rgba(10,10,10,0.5)', borderTop: '1px solid var(--line-soft)' }}>
        {[['Active pairs', '142'], ['Median spread', '4.2 bps'], ['Weekly volume', '$1.04B'], ['Inventory util.', '58%']].map(([l, v]) => (
          <div key={l}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>{l}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontVariantNumeric: 'tabular-nums', marginTop: 4, color: 'var(--on-dark)' }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
