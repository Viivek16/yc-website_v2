'use client';
import { useRef, useState, useCallback } from 'react';

// ── Layout ─────────────────────────────────────────────────────────
const VW = 1240, VH = 520;
const PAD = { t: 32, r: 48, b: 68, l: 84 };
const PW = VW - PAD.l - PAD.r;
const PH = VH - PAD.t - PAD.b;
const N = 16; // monthly: Apr 2022 (0) → Jul 2023 (15)

// ── Data ──────────────────────────────────────────────────────────
// Matches the reference chart (Screenshot 1) — illustrative, not client data
const MONTHLY = [0.78,0.65,0.42,0.32,0.30,0.33,0.50,0.52,0.45,0.38,0.40,0.42,0.45,0.50,0.64,0.78];
const MA180   = [0.88,0.83,0.76,0.67,0.60,0.55,0.51,0.48,0.46,0.45,0.44,0.44,0.44,0.45,0.47,0.49];
const MA15    = [0.75,0.69,0.59,0.48,0.39,0.35,0.33,0.34,0.36,0.37,0.38,0.40,0.41,0.43,0.44,0.46];

const MONTH_LABELS = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul'];
const MONTH_YEARS  = ['22','22','22','22','22','22','22','22','22','23','23','23','23','23','23','23'];
const X_TICKS: [number, string][] = [
  [0,'Apr 1, 2022'],[3,'Jul 1, 2022'],[6,'Oct 1, 2022'],[9,'Jan 1, 2023'],[12,'Apr 1, 2023'],[15,'Jul 1, 2023'],
];

// ── Helpers ────────────────────────────────────────────────────────
const xs = (i: number) => PAD.l + (i / (N - 1)) * PW;
const ys = (v: number) => PAD.t + (1 - v) * PH;

function bezier(data: number[]): string {
  return data.reduce((d, v, i) => {
    const x = xs(i), y = ys(v);
    if (i === 0) return `M ${x.toFixed(1)},${y.toFixed(1)}`;
    const cpx = ((xs(i - 1) + x) / 2).toFixed(1);
    return `${d} C ${cpx},${ys(data[i-1]).toFixed(1)} ${cpx},${y.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;
  }, '');
}
function bezierArea(data: number[]): string {
  return `${bezier(data)} L ${xs(N-1).toFixed(1)},${ys(0).toFixed(1)} L ${xs(0).toFixed(1)},${ys(0).toFixed(1)} Z`;
}

// Deterministic noisy path for daily price (matching reference chart noise level)
function buildNoisyPath(): string {
  const steps = 9;
  let d = '';
  for (let i = 0; i < N - 1; i++) {
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const lerped = MONTHLY[i] + (MONTHLY[i + 1] - MONTHLY[i]) * t;
      // Higher volatility during crash (indices 1-5)
      const vol = (i >= 1 && i <= 5) ? 0.045 : 0.018;
      const noise =
        Math.sin(i * 17.3 + s * 5.7) * vol * 0.65 +
        Math.cos(i * 11.1 + s * 3.2) * vol * 0.50 +
        Math.sin(i * 29.7 + s * 7.8) * vol * 0.28;
      const v = Math.max(0.03, Math.min(0.97, lerped + noise));
      const x = xs(i + t).toFixed(1), y = ys(v).toFixed(1);
      d += d === '' ? `M ${x},${y}` : ` L ${x},${y}`;
    }
  }
  d += ` L ${xs(N - 1).toFixed(1)},${ys(MONTHLY[N - 1]).toFixed(1)}`;
  return d;
}
const DAILY_PATH = buildNoisyPath();

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

  // Annotation helpers
  const stoppedLeft  = xs(0.3);
  const stoppedRight = xs(5.5);         // Green resumption line at Oct 1 2022
  const stoppedBot   = ys(0.08);
  const stoppedTop   = ys(0.79);

  return (
    <div style={{ position: 'relative', marginTop: 56 }}>
      {/* Chart subtitle */}
      <div style={{ paddingLeft: `${((PAD.l / VW) * 100).toFixed(1)}%`, marginBottom: 20 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--on-dark-2)' }}>
          <span style={{ color: '#FDDA16', fontStyle: 'italic' }}>Daily sales amount</span>
          {' '}increases as rate over 180 day reference increases
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
          <linearGradient id="ps2-gy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDDA16" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#FDDA16" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="ps2-go" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0.01" />
          </linearGradient>
          <filter id="ps2-fy" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="ps2-fo" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* ── Gray "Sales Stopped" shaded area ───────────────── */}
        <rect x={xs(0)} y={PAD.t} width={stoppedRight - xs(0)} height={PH}
          fill="rgba(100,100,100,0.13)" />

        {/* ── Y grid + labels ──────────────────────────────────── */}
        {[0, 0.25, 0.50, 0.75, 1.00].map(v => (
          <g key={v}>
            <line x1={PAD.l} y1={ys(v)} x2={PAD.l + PW} y2={ys(v)}
              stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <text x={PAD.l - 10} y={ys(v) + 4} textAnchor="end"
              fill="rgba(255,255,255,0.30)" fontSize="12" fontFamily="monospace">
              ${v.toFixed(4)}
            </text>
          </g>
        ))}

        {/* ── X-axis labels ────────────────────────────────────── */}
        {X_TICKS.map(([i, label]) => (
          <text key={label} x={xs(i)} y={VH - 8} textAnchor="middle"
            fill="rgba(255,255,255,0.30)" fontSize="12" fontFamily="monospace">
            {label}
          </text>
        ))}

        {/* ── "Sales Stopped" L-shaped annotation ─────────────── */}
        {/* Left vertical red dashed line */}
        <line x1={stoppedLeft} y1={stoppedTop} x2={stoppedLeft} y2={stoppedBot}
          stroke="rgba(239,68,68,0.75)" strokeWidth="1.2" strokeDasharray="5,3" />
        {/* Bottom horizontal red dashed line */}
        <line x1={stoppedLeft} y1={stoppedBot} x2={stoppedRight} y2={stoppedBot}
          stroke="rgba(239,68,68,0.75)" strokeWidth="1.2" strokeDasharray="5,3" />
        {/* Label at end of horizontal line */}
        <text x={stoppedRight + 10} y={stoppedBot + 4} textAnchor="start"
          fill="rgba(239,68,68,0.85)" fontSize="11" fontFamily="monospace" letterSpacing="0.06em">
          — Sales Stopped
        </text>

        {/* Green resumption vertical line */}
        <line x1={stoppedRight} y1={stoppedTop} x2={stoppedRight} y2={stoppedBot}
          stroke="rgba(34,197,94,0.90)" strokeWidth="1.8" />

        {/* ── "Sell More" (Oct-Nov 2022) green box ─────────────── */}
        {(() => {
          const bx = xs(5.5), bw = xs(7.8) - xs(5.5);
          const by = ys(0.62), bh = ys(0.32) - ys(0.62);
          return (
            <g>
              <rect x={bx} y={by} width={bw} height={bh}
                fill="rgba(34,197,94,0.04)" stroke="rgba(34,197,94,0.70)"
                strokeWidth="1" strokeDasharray="6,3.5" rx={2} />
              <text x={bx + bw / 2} y={by - 7} textAnchor="middle"
                fill="rgba(34,197,94,0.85)" fontSize="11" fontFamily="monospace" letterSpacing="0.06em">
                Sell More
              </text>
            </g>
          );
        })()}

        {/* ── "Sell Less" (Nov-Jan) red box ────────────────────── */}
        {(() => {
          const bx = xs(7.0), bw = xs(9.8) - xs(7.0);
          const by = ys(0.52), bh = ys(0.26) - ys(0.52);
          return (
            <g>
              <rect x={bx} y={by} width={bw} height={bh}
                fill="rgba(239,68,68,0.04)" stroke="rgba(239,68,68,0.70)"
                strokeWidth="1" strokeDasharray="6,3.5" rx={2} />
              <text x={bx + bw / 2} y={by + bh + 14} textAnchor="middle"
                fill="rgba(239,68,68,0.85)" fontSize="11" fontFamily="monospace" letterSpacing="0.06em">
                — Sell Less —
              </text>
            </g>
          );
        })()}

        {/* ── "Sell More" (Apr 2023) green box ─────────────────── */}
        {(() => {
          const bx = xs(11.2), bw = xs(13.3) - xs(11.2);
          const by = ys(0.60), bh = ys(0.32) - ys(0.60);
          return (
            <g>
              <rect x={bx} y={by} width={bw} height={bh}
                fill="rgba(34,197,94,0.04)" stroke="rgba(34,197,94,0.70)"
                strokeWidth="1" strokeDasharray="6,3.5" rx={2} />
              <text x={bx + bw / 2} y={by - 7} textAnchor="middle"
                fill="rgba(34,197,94,0.85)" fontSize="11" fontFamily="monospace" letterSpacing="0.06em">
                Sell More
              </text>
            </g>
          );
        })()}

        {/* ── "Sell Even More" (Jun-Jul 2023) green box ────────── */}
        {(() => {
          const bx = xs(13.2), bw = xs(15) - xs(13.2);
          const by = ys(0.90), bh = ys(0.52) - ys(0.90);
          return (
            <g>
              <rect x={bx} y={by} width={bw} height={bh}
                fill="rgba(34,197,94,0.04)" stroke="rgba(34,197,94,0.70)"
                strokeWidth="1" strokeDasharray="6,3.5" rx={2} />
              <text x={bx + bw / 2} y={by - 7} textAnchor="middle"
                fill="rgba(34,197,94,0.85)" fontSize="11" fontFamily="monospace" letterSpacing="0.06em">
                Sell Even More
              </text>
            </g>
          );
        })()}

        {/* ── "Daily sales amount" white bracket ───────────────── */}
        {(() => {
          const bL = xs(9.6), bR = xs(15);
          const bBot = ys(0.10);
          const topL = ys(MONTHLY[10]), topR = ys(MONTHLY[15]);
          return (
            <g>
              {/* Horizontal connector */}
              <line x1={bL} y1={bBot} x2={bR} y2={bBot}
                stroke="rgba(255,255,255,0.40)" strokeWidth="1" strokeDasharray="5,3" />
              {/* Left vertical + up arrow */}
              <line x1={bL} y1={bBot} x2={bL} y2={topL}
                stroke="rgba(255,255,255,0.40)" strokeWidth="1.5" strokeDasharray="5,3" />
              <polyline points={`${bL-5},${topL+9} ${bL},${topL} ${bL+5},${topL+9}`}
                stroke="rgba(255,255,255,0.55)" fill="none" strokeWidth="1.5" />
              {/* Right vertical + up arrow */}
              <line x1={bR} y1={bBot} x2={bR} y2={topR}
                stroke="rgba(255,255,255,0.40)" strokeWidth="1.5" strokeDasharray="5,3" />
              <polyline points={`${bR-5},${topR+9} ${bR},${topR} ${bR+5},${topR+9}`}
                stroke="rgba(255,255,255,0.55)" fill="none" strokeWidth="1.5" />
              {/* Label */}
              <text x={(bL + bR) / 2} y={bBot + 15} textAnchor="middle"
                fill="rgba(255,255,255,0.45)" fontSize="11" fontFamily="monospace" letterSpacing="0.06em">
                Daily sales amount
              </text>
            </g>
          );
        })()}

        {/* ── Area fills ───────────────────────────────────────── */}
        <path d={bezierArea(MA180)} fill="url(#ps2-gy)" />
        <path d={bezierArea(MA15)}  fill="url(#ps2-go)" />

        {/* ── Lines ────────────────────────────────────────────── */}
        {/* Daily Price — gray, noisy */}
        <path d={DAILY_PATH} fill="none" stroke="rgba(180,175,165,0.55)" strokeWidth="1.5" />
        {/* 180-15% trailing avg — orange */}
        <path d={bezier(MA15)}  fill="none" stroke="#F97316" strokeWidth="2.5" filter="url(#ps2-fo)" />
        {/* 180-day trailing avg — yellow */}
        <path d={bezier(MA180)} fill="none" stroke="#FDDA16" strokeWidth="2.5" filter="url(#ps2-fy)" />

        {/* ── Hover ─────────────────────────────────────────────── */}
        {hx !== null && hover !== null && (() => {
          const tx = hx + 14 > VW - 185 ? hx - 183 : hx + 14;
          const rows = [
            { text: `${MONTH_LABELS[hover]} '${MONTH_YEARS[hover]}`, color: 'rgba(255,255,255,0.38)' },
            { text: `Price · $${MONTHLY[hover].toFixed(4)}`,     color: 'rgba(185,180,170,0.85)' },
            { text: `180d avg · $${MA180[hover].toFixed(4)}`,    color: '#FDDA16' },
            { text: `180-15% · $${MA15[hover].toFixed(4)}`,      color: '#F97316' },
          ];
          return (
            <>
              <line x1={hx} y1={PAD.t} x2={hx} y2={PAD.t + PH}
                stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="4,4" />
              <circle cx={hx} cy={ys(MONTHLY[hover])} r={4}   fill="rgba(185,180,170,0.9)" stroke="#fff" strokeWidth="1.5" />
              <circle cx={hx} cy={ys(MA15[hover])}    r={5.5} fill="#F97316" stroke="#fff" strokeWidth="1.5" />
              <circle cx={hx} cy={ys(MA180[hover])}   r={5.5} fill="#FDDA16" stroke="#fff" strokeWidth="1.5" />
              <g transform={`translate(${tx},${PAD.t + 10})`}>
                <rect x={0} y={0} width={178} height={82} rx={4}
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

      {/* ── Legend ───────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', gap: 32, marginTop: 20, justifyContent: 'center',
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)',
      }}>
        {[
          { c: 'rgba(185,180,170,0.60)', label: 'Daily Price' },
          { c: '#FDDA16', label: '180 day tr avg' },
          { c: '#F97316', label: '180-15% day tr avg' },
        ].map(({ c, label }) => (
          <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: c }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
