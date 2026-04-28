'use client';
import { useRef, useState, useCallback } from 'react';

// ── Layout constants ───────────────────────────────────────────────
const VW = 1240, VH = 510;
const PAD = { t: 48, r: 52, b: 66, l: 84 };
const PW = VW - PAD.l - PAD.r;
const PH = VH - PAD.t - PAD.b;
const N = 16; // monthly: Apr 2022 (0) → Jul 2023 (15)

// ── Data (illustrative market cycle — no real client data) ─────────
// Market price (cyan) — volatile with crash + recovery pattern
const MKTPRICE  = [0.78, 0.62, 0.42, 0.32, 0.30, 0.33, 0.44, 0.48, 0.45, 0.34, 0.35, 0.36, 0.40, 0.47, 0.63, 0.77];
// 180-day trailing avg (yellow) — smooth decline then stabilise
const AVG180    = [0.87, 0.82, 0.75, 0.66, 0.59, 0.54, 0.50, 0.47, 0.45, 0.44, 0.43, 0.43, 0.43, 0.44, 0.46, 0.48];
// 180-15% trailing avg (orange) — floor reference
const AVG180_15 = [0.74, 0.68, 0.59, 0.48, 0.39, 0.35, 0.33, 0.34, 0.35, 0.36, 0.37, 0.38, 0.39, 0.41, 0.42, 0.44];

const MONTH_LABELS = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul'];
const MONTH_YEARS  = ['22','22','22','22','22','22','22','22','22','23','23','23','23','23','23','23'];
const X_TICKS: [number, string][] = [
  [0,'Apr 1, 2022'],[3,'Jul 1, 2022'],[6,'Oct 1, 2022'],[9,'Jan 1, 2023'],[12,'Apr 1, 2023'],[15,'Jul 1, 2023'],
];

// ── Coordinate helpers ─────────────────────────────────────────────
const xs = (i: number) => PAD.l + (i / (N - 1)) * PW;
const ys = (v: number) => PAD.t + (1 - v) * PH;

// ── Path builders ──────────────────────────────────────────────────
function bezier(data: number[]): string {
  return data.reduce((d, v, i) => {
    const x = xs(i), y = ys(v);
    if (i === 0) return `M ${x.toFixed(1)},${y.toFixed(1)}`;
    const cpx = ((xs(i - 1) + x) / 2).toFixed(1);
    return `${d} C ${cpx},${ys(data[i - 1]).toFixed(1)} ${cpx},${y.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;
  }, '');
}
function bezierArea(data: number[]): string {
  return `${bezier(data)} L ${xs(N-1).toFixed(1)},${ys(0).toFixed(1)} L ${xs(0).toFixed(1)},${ys(0).toFixed(1)} Z`;
}

// Deterministic noisy price line
function buildNoisyPath(): string {
  const steps = 8;
  let d = '';
  for (let i = 0; i < N - 1; i++) {
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const lerped = MKTPRICE[i] + (MKTPRICE[i + 1] - MKTPRICE[i]) * t;
      const vol = (i >= 1 && i <= 5) ? 0.042 : 0.016;
      const noise =
        Math.sin(i * 17.3 + s * 5.7) * vol * 0.65 +
        Math.cos(i * 11.1 + s * 3.2) * vol * 0.50 +
        Math.sin(i * 29.7 + s * 7.8) * vol * 0.30;
      const xi = i + t;
      const v = Math.max(0.03, Math.min(0.96, lerped + noise));
      const x = xs(xi).toFixed(1), y = ys(v).toFixed(1);
      d += (d === '' ? `M ${x},${y}` : ` L ${x},${y}`);
    }
  }
  d += ` L ${xs(N - 1).toFixed(1)},${ys(MKTPRICE[N - 1]).toFixed(1)}`;
  return d;
}
const NOISY_PATH = buildNoisyPath();

// ── Component ──────────────────────────────────────────────────────
export function ProgrammaticSalesChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  const onMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current!.getBoundingClientRect();
    const svgX = (e.clientX - rect.left) * (VW / rect.width);
    const raw = (svgX - PAD.l) / PW * (N - 1);
    if (raw < -0.5 || raw > N - 0.5) { setHover(null); return; }
    setHover(Math.max(0, Math.min(N - 1, Math.round(raw))));
  }, []);

  const hx = hover !== null ? xs(hover) : null;

  // Annotation boxes (programmatic sales narrative)
  const anns = [
    { x1: 0.2,  x2: 5.4,  y1: 0.53, y2: 0.10, stroke: 'rgba(239,68,68,0.65)',  fill: 'rgba(239,68,68,0.05)',  label: '— Execution Paused —', lpos: 'bot' as const },
    { x1: 5.5,  x2: 7.9,  y1: 0.60, y2: 0.30, stroke: 'rgba(34,197,94,0.75)',  fill: 'rgba(34,197,94,0.06)',  label: 'Increase Pace',        lpos: 'top' as const },
    { x1: 7.1,  x2: 9.6,  y1: 0.53, y2: 0.24, stroke: 'rgba(239,68,68,0.65)',  fill: 'rgba(239,68,68,0.05)',  label: '— Reduce Pace —',      lpos: 'bot' as const },
    { x1: 11.3, x2: 13.4, y1: 0.58, y2: 0.28, stroke: 'rgba(34,197,94,0.75)',  fill: 'rgba(34,197,94,0.06)',  label: 'Optimal Window',       lpos: 'top' as const },
    { x1: 13.3, x2: 15.0, y1: 0.90, y2: 0.50, stroke: 'rgba(34,197,94,0.75)',  fill: 'rgba(34,197,94,0.06)',  label: 'Peak Velocity',        lpos: 'top' as const },
  ];

  // "Execution volume" bracket
  const bL = xs(11.2), bR = xs(15), bBot = ys(0.07);
  const bTopL = ys(MKTPRICE[11]), bTopR = ys(MKTPRICE[15]);

  return (
    <div style={{ position: 'relative', marginTop: 56 }}>
      {/* Chart header */}
      <div style={{ paddingLeft: `${((PAD.l / VW) * 100).toFixed(1)}%`, marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 12 }}>
          Daily sales amount increases as rate over 180 day reference increases
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--on-dark-2)' }}>
          <span style={{ color: '#22D3EE', fontStyle: 'italic' }}>Execution volume</span>
          {' '}scales with market strength — zero market impact
        </div>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${VW} ${VH}`}
        style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible', cursor: 'crosshair' }}
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <pattern id="ps-stripe" width="48" height="48" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <line x1="0" y1="0" x2="0" y2="48" stroke="rgba(255,255,255,0.025)" strokeWidth="12" />
          </pattern>
          {/* Cyan area for market price */}
          <linearGradient id="ps-gc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="ps-gy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDDA16" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#FDDA16" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="ps-go" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.17" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0.01" />
          </linearGradient>
          {/* Glow filters */}
          <filter id="ps-fc" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="ps-fy" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="ps-fo" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Stripe background */}
        <rect x={PAD.l} y={PAD.t} width={PW} height={PH} fill="url(#ps-stripe)" />

        {/* Shaded "Execution Paused" overlay */}
        <rect x={xs(0)} y={PAD.t} width={xs(5.5) - xs(0)} height={PH} fill="rgba(50,45,60,0.22)" />

        {/* Y grid + labels */}
        {[0, 0.25, 0.50, 0.75, 1.00].map(v => (
          <g key={v}>
            <line x1={PAD.l} y1={ys(v)} x2={PAD.l + PW} y2={ys(v)}
              stroke={v === 0 ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.05)'} strokeWidth="1" />
            <text x={PAD.l - 10} y={ys(v) + 4} textAnchor="end"
              fill="rgba(255,255,255,0.30)" fontSize="11" fontFamily="monospace">
              ${v.toFixed(4)}
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {X_TICKS.map(([i, label]) => (
          <text key={label} x={xs(i)} y={VH - 10} textAnchor="middle"
            fill="rgba(255,255,255,0.30)" fontSize="11" fontFamily="monospace">
            {label}
          </text>
        ))}

        {/* Annotation boxes */}
        {anns.map((a, idx) => {
          const ax = xs(a.x1), aw = xs(a.x2) - xs(a.x1);
          const ay = ys(a.y1), ah = ys(a.y2) - ys(a.y1);
          const lx = ax + aw / 2;
          const ly = a.lpos === 'top' ? ay - 7 : ay + ah + 14;
          return (
            <g key={idx}>
              <rect x={ax} y={ay} width={aw} height={ah}
                fill={a.fill} stroke={a.stroke} strokeWidth="1" strokeDasharray="6,3.5" rx={2} />
              <text x={lx} y={ly} textAnchor="middle"
                fill={a.stroke} fontSize="10.5" fontFamily="monospace" letterSpacing="0.07em">
                {a.label}
              </text>
            </g>
          );
        })}

        {/* Teal resumption line at execution-paused boundary */}
        <line x1={xs(5.4)} y1={ys(0.53)} x2={xs(5.4)} y2={ys(0.10)}
          stroke="rgba(34,197,94,0.80)" strokeWidth="1.5" />

        {/* "Execution volume" bracket */}
        <line x1={bL} y1={bBot} x2={bR} y2={bBot}
          stroke="rgba(255,255,255,0.38)" strokeWidth="1" strokeDasharray="5,3" />
        <line x1={bL} y1={bBot} x2={bL} y2={bTopL}
          stroke="rgba(255,255,255,0.38)" strokeWidth="1.5" strokeDasharray="5,3" />
        <polyline points={`${bL - 5},${bTopL + 9} ${bL},${bTopL} ${bL + 5},${bTopL + 9}`}
          stroke="rgba(255,255,255,0.50)" fill="none" strokeWidth="1.5" />
        <line x1={bR} y1={bBot} x2={bR} y2={bTopR}
          stroke="rgba(255,255,255,0.38)" strokeWidth="1.5" strokeDasharray="5,3" />
        <polyline points={`${bR - 5},${bTopR + 9} ${bR},${bTopR} ${bR + 5},${bTopR + 9}`}
          stroke="rgba(255,255,255,0.50)" fill="none" strokeWidth="1.5" />
        <text x={(bL + bR) / 2} y={bBot + 15} textAnchor="middle"
          fill="rgba(255,255,255,0.45)" fontSize="10.5" fontFamily="monospace" letterSpacing="0.06em">
          Execution volume
        </text>

        {/* Area fills */}
        <path d={bezierArea(AVG180)}    fill="url(#ps-gy)" />
        <path d={bezierArea(AVG180_15)} fill="url(#ps-go)" />

        {/* Lines — price in cyan, averages in yellow/orange */}
        <path d={NOISY_PATH}         fill="none" stroke="#22D3EE" strokeWidth="2" filter="url(#ps-fc)" opacity="0.75" />
        <path d={bezier(AVG180_15)}  fill="none" stroke="#F97316" strokeWidth="2.5" filter="url(#ps-fo)" />
        <path d={bezier(AVG180)}     fill="none" stroke="#FDDA16" strokeWidth="2.5" filter="url(#ps-fy)" />

        {/* Hover */}
        {hx !== null && hover !== null && (() => {
          const tx = hx + 14 > VW - 185 ? hx - 183 : hx + 14;
          const rows = [
            { text: `${MONTH_LABELS[hover]} '${MONTH_YEARS[hover]}`, color: 'rgba(255,255,255,0.38)' },
            { text: `Mkt price · $${MKTPRICE[hover].toFixed(4)}`, color: '#22D3EE' },
            { text: `180d avg  · $${AVG180[hover].toFixed(4)}`,    color: '#FDDA16' },
            { text: `180-15%   · $${AVG180_15[hover].toFixed(4)}`, color: '#F97316' },
          ];
          return (
            <>
              <line x1={hx} y1={PAD.t} x2={hx} y2={PAD.t + PH}
                stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="4,4" />
              <circle cx={hx} cy={ys(MKTPRICE[hover])}  r={5}   fill="#22D3EE" stroke="#fff" strokeWidth="1.5" />
              <circle cx={hx} cy={ys(AVG180_15[hover])} r={5.5} fill="#F97316" stroke="#fff" strokeWidth="1.5" />
              <circle cx={hx} cy={ys(AVG180[hover])}    r={5.5} fill="#FDDA16" stroke="#fff" strokeWidth="1.5" />
              <g transform={`translate(${tx},${PAD.t + 10})`}>
                <rect x={0} y={0} width={184} height={82} rx={4}
                  fill="rgba(5,5,5,0.92)" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
                {rows.map((r, ri) => (
                  <text key={ri} x={10} y={16 + ri * 18} fill={r.color} fontSize="11" fontFamily="monospace">
                    {r.text}
                  </text>
                ))}
              </g>
            </>
          );
        })()}
      </svg>

      {/* Legend */}
      <div style={{
        display: 'flex', gap: 28, marginTop: 18,
        paddingLeft: `${((PAD.l / VW) * 100).toFixed(1)}%`,
        fontFamily: 'var(--font-mono)', fontSize: 10.5,
        letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.38)',
      }}>
        {[
          { c: '#22D3EE', label: 'Market Price' },
          { c: '#FDDA16', label: '180 day tr avg' },
          { c: '#F97316', label: '180-15% day tr avg' },
        ].map(({ c, label }) => (
          <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 20, height: 2.5, background: c, display: 'inline-block', borderRadius: 2 }} />
            {label}
          </span>
        ))}
      </div>

      {/* Seamless edge fades */}
      <div style={{ position: 'absolute', inset: '0 auto 0 0', width: '3.5%', background: 'linear-gradient(to right, var(--ink), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: '0 0 0 auto', width: '3.5%', background: 'linear-gradient(to left, var(--ink), transparent)', pointerEvents: 'none' }} />
    </div>
  );
}
