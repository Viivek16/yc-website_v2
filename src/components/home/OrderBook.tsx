'use client';

import { useState, useEffect } from 'react';
import { LiveDot } from '@/components/shared';

type Side = 'ask' | 'bid';
interface Row { p: number; s: number; flash: 'up' | 'dn' | null }

const BASE = 64182.40;
const mk = (i: number, side: Side): Row => ({
  p: +(BASE + (side === 'ask' ? (i + 1) * 1.2 : -(i + 1) * 1.2)).toFixed(2),
  s: +(Math.random() * 3 + 0.1).toFixed(3),
  flash: null,
});

export function OrderBook() {
  const [rows, setRows] = useState<{ asks: Row[]; bids: Row[] }>(() => ({
    asks: Array.from({ length: 8 }, (_, i) => mk(7 - i, 'ask')),
    bids: Array.from({ length: 8 }, (_, i) => mk(i, 'bid')),
  }));

  useEffect(() => {
    const iv = setInterval(() => {
      setRows(r => {
        const flip = Math.random() > 0.5;
        const side = flip ? 'asks' : 'bids';
        const idx  = Math.floor(Math.random() * r[side].length);
        const up   = Math.random() > 0.5;
        const nextSide = r[side].map((row, i) =>
          i === idx
            ? { ...row, s: Math.max(0.05, +(row.s + (up ? 0.12 : -0.09)).toFixed(3)), flash: up ? 'up' : 'dn' as const }
            : { ...row, flash: null }
        );
        return { ...r, [side]: nextSide };
      });
    }, 700);
    return () => clearInterval(iv);
  }, []);

  const OrderRow = ({ r, side }: { r: Row; side: Side }) => {
    const bg    = r.flash === 'up' ? 'rgba(74,222,128,0.14)' : r.flash === 'dn' ? 'rgba(239,68,68,0.14)' : 'transparent';
    const color = side === 'ask' ? '#ef4444' : '#4ade80';
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '7px 14px', fontFamily: 'var(--font-mono)', fontSize: 11.5, fontVariantNumeric: 'tabular-nums', background: bg, transition: 'background 400ms', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <span style={{ color }}>{r.p.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        <span style={{ color: 'var(--on-dark)', textAlign: 'right' }}>{r.s.toFixed(3)}</span>
        <span style={{ color: 'var(--on-dark-3)', textAlign: 'right' }}>{(r.p * r.s).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
      </div>
    );
  };

  return (
    <div style={{ background: 'rgba(28,27,25,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, boxShadow: 'var(--sh-md)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--line-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(10,10,10,0.5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LiveDot size={6} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--on-dark)' }}>BTC/USDT</span>
          <span style={{ color: 'var(--on-dark-3)' }}>·</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--on-dark-2)' }}>Live</span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>Spread 0.04%</span>
      </div>
      {/* Column headers */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '9px 14px', fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--on-dark-3)', borderBottom: '1px solid var(--line-soft)' }}>
        <span>Price</span>
        <span style={{ textAlign: 'right' }}>Size</span>
        <span style={{ textAlign: 'right' }}>Cumulative</span>
      </div>
      <div>{rows.asks.map((r, i) => <OrderRow key={`a${i}`} r={r} side="ask" />)}</div>
      {/* Mid price */}
      <div style={{ padding: '10px 14px', background: 'rgba(253,218,22,0.06)', fontFamily: 'var(--font-mono)', fontSize: 12, fontVariantNumeric: 'tabular-nums', color: 'var(--on-dark)', borderTop: '1px solid rgba(253,218,22,0.2)', borderBottom: '1px solid rgba(253,218,22,0.2)', display: 'flex', justifyContent: 'space-between' }}>
        <span>64,182.40</span>
        <span style={{ color: '#4ade80' }}>▲ 0.42%</span>
      </div>
      <div>{rows.bids.map((r, i) => <OrderRow key={`b${i}`} r={r} side="bid" />)}</div>
    </div>
  );
}
