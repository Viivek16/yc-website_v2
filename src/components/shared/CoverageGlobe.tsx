'use client';

import { useState, useEffect } from 'react';

const N = 140;
const cx = 230, cy = 230, rOuter = 180, rInner = 62;

const VENUES: { i: number; label: string }[] = [
  { i: 6,   label: 'Binance'  },
  { i: 22,  label: 'OKX'      },
  { i: 38,  label: 'Coinbase' },
  { i: 54,  label: 'Bybit'    },
  { i: 70,  label: 'Kraken'   },
  { i: 86,  label: 'KuCoin'   },
  { i: 102, label: 'Bitget'   },
  { i: 118, label: 'Gate.io'  },
];
const venueByIdx = Object.fromEntries(VENUES.map(v => [v.i, v.label]));

export function CoverageGlobe() {
  const [t, setT] = useState(0);
  const [hovered, setHovered] = useState(-1);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const rotation = t * 3;
  const nodes = Array.from({ length: N }, (_, i) => {
    const ang = (i / N) * Math.PI * 2 + (rotation * Math.PI / 180);
    const rr = rOuter + Math.sin(t * 0.6 + i * 0.18) * 3;
    const x = cx + Math.cos(ang) * rr;
    const y = cy + Math.sin(ang) * rr;
    const isVenue = i in venueByIdx;
    return { i, x, y, ang, isVenue };
  });

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', maxWidth: 500, marginLeft: 'auto' }}>
      <svg viewBox="0 0 460 460" style={{ width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <radialGradient id="core-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#FFB100" stopOpacity="0.9" />
            <stop offset="40%"  stopColor="#FDDA16" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FDDA16" stopOpacity="0" />
          </radialGradient>
        </defs>

        {[rInner + 30, rInner + 70, rInner + 110, rOuter].map(r => (
          <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        ))}

        <circle cx={cx} cy={cy} r={rInner + 90} fill="url(#core-grad)" />
        <circle cx={cx} cy={cy} r={rInner} fill="#141413" stroke="rgba(253,218,22,0.35)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={rInner} fill="none" stroke="rgba(253,218,22,0.12)" strokeWidth="14" />

        {nodes.map(n => {
          const isActive = hovered === n.i;
          const size = n.isVenue ? 3.4 : 1.6;
          const op = n.isVenue ? 0.95 : 0.35 + 0.25 * Math.sin(t * 1.4 + n.i * 0.3);
          const color = n.isVenue || isActive ? '#FDDA16' : 'rgba(233,230,223,0.65)';
          return (
            <g key={n.i}>
              {(isActive || n.isVenue) && (
                <line
                  x1={cx} y1={cy} x2={n.x} y2={n.y}
                  stroke={isActive ? 'rgba(253,218,22,0.55)' : 'rgba(253,218,22,0.15)'}
                  strokeWidth={isActive ? 1.2 : 0.6}
                />
              )}
              <circle
                cx={n.x} cy={n.y}
                r={isActive ? 5 : size}
                fill={color}
                opacity={isActive ? 1 : op}
                style={{ transition: 'r 200ms, opacity 200ms, fill 200ms', cursor: 'pointer' }}
                onMouseEnter={() => setHovered(n.i)}
                onMouseLeave={() => setHovered(-1)}
              />
            </g>
          );
        })}

        <text x={cx} y={cy - 6}  textAnchor="middle" fontFamily="var(--font-display)" fontSize="28" fill="var(--on-dark)" letterSpacing="-0.01em">140+</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.22em" fill="var(--on-dark-3)">VENUES</text>
        <text x={cx} y={cy + 30} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.22em" fill="var(--on-dark-3)">24 / 7</text>
      </svg>

      {hovered >= 0 && venueByIdx[hovered] && (
        <div
          style={{
            position: 'absolute',
            left: `${(nodes[hovered].x / 460) * 100}%`,
            top:  `${(nodes[hovered].y / 460) * 100}%`,
            transform: 'translate(-50%, calc(-100% - 12px))',
            pointerEvents: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: 10.5,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            background: 'var(--accent)',
            padding: '6px 10px',
            borderRadius: 2,
            whiteSpace: 'nowrap',
            boxShadow: '0 6px 20px rgba(253,218,22,0.25)',
          }}
        >
          {venueByIdx[hovered]}
        </div>
      )}

      <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          ['Entity',      'Yellow Capital LP'],
          ['Domicile',    'Montana, USA'],
          ['Established', '2018'],
          ['Compliance',  'Chainalysis · pre-trade'],
        ].map(([k, v]) => (
          <div key={k} style={{ border: '1px solid var(--line-soft)', padding: '12px 14px', borderRadius: 2, background: 'rgba(20,19,19,0.4)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>{k}</div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--on-dark)', marginTop: 4 }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
