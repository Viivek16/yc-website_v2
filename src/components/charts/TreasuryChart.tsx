'use client';
import { useRef, useState, useCallback } from 'react';

// ── Layout ─────────────────────────────────────────────────────────
const VW = 1240, VH = 500;
const PAD = { t: 32, r: 96, b: 80, l: 84 }; // extra right pad for dual y-axis label
const PW = VW - PAD.l - PAD.r;
const PH = VH - PAD.t - PAD.b;
const N = 14; // ~14 monthly data points (no x-axis date labels, as in reference)

// ── Data — matches reference chart (Screenshot 2) ──────────────────
// Left Y-axis: rate values 0 → 0.125
const RATE_MAX = 0.125;

// Daily market rate (gray, noisy) — starts flat ~0.025, spikes to ~0.110, drops back
const RATE_MONTHLY = [
  0.026, 0.025, 0.026, 0.028, 0.038, 0.058,
  0.108, 0.082, 0.051, 0.034, 0.028, 0.026, 0.025, 0.028,
];

// Yellow AVG Rate (smooth) — rises to ~0.050, then eases back
const AVG_RATE = [
  0.025, 0.026, 0.027, 0.029, 0.032, 0.037,
  0.043, 0.047, 0.050, 0.050, 0.049, 0.047, 0.045, 0.043,
];

// USDT Accumulation (green, always rising) — right Y-axis $0 → $600,000
const USDT_MAX = 600_000;
const USDT_RAW = [
  0, 8_000, 24_000, 52_000, 92_000, 148_000,
  225_000, 305_000, 385_000, 448_000, 488_000, 518_000, 548_000, 578_000,
];
// Normalise to rate scale for rendering (both axes share same pixel height)
const USDT_NORM = USDT_RAW.map(u => (u / USDT_MAX) * RATE_MAX);

// ── Coordinate helpers ─────────────────────────────────────────────
const xs = (i: number) => PAD.l + (i / (N - 1)) * PW;
// ys accepts a NORMALISED value 0..RATE_MAX
const ys = (v: number) => PAD.t + (1 - v / RATE_MAX) * PH;

function bezier(data: number[]): string {
  return data.reduce((d, v, i) => {
    const x = xs(i), y = ys(v);
    if (i === 0) return `M ${x.toFixed(1)},${y.toFixed(1)}`;
    const cpx = ((xs(i - 1) + x) / 2).toFixed(1);
    return `${d} C ${cpx},${ys(data[i-1]).toFixed(1)} ${cpx},${y.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;
  }, '');
}

// Noisy daily-market-rate polyline (deterministic)
function buildNoisyPath(): string {
  const steps = 9;
  let d = '';
  for (let i = 0; i < N - 1; i++) {
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const lerped = RATE_MONTHLY[i] + (RATE_MONTHLY[i + 1] - RATE_MONTHLY[i]) * t;
      // More volatile around the spike (indices 4-8)
      const vol = (i >= 3 && i <= 8) ? 0.010 : 0.002;
      const noise =
        Math.sin(i * 17.3 + s * 5.7) * vol * 0.65 +
        Math.cos(i * 11.1 + s * 3.2) * vol * 0.50 +
        Math.sin(i * 29.7 + s * 7.8) * vol * 0.28;
      const v = Math.max(0.003, Math.min(RATE_MAX - 0.003, lerped + noise));
      const x = xs(i + t).toFixed(1), y = ys(v).toFixed(1);
      d += d === '' ? `M ${x},${y}` : ` L ${x},${y}`;
    }
  }
  d += ` L ${xs(N - 1).toFixed(1)},${ys(RATE_MONTHLY[N - 1]).toFixed(1)}`;
  return d;
}
const RATE_PATH = buildNoisyPath();

// Left Y-axis ticks: 0.000, 0.025, 0.050, 0.075, 0.100, 0.125
const LEFT_TICKS = [0, 0.025, 0.050, 0.075, 0.100, 0.125];
// Right Y-axis ticks: $0, $200k, $400k, $600k  (normalised for rendering)
const RIGHT_TICKS: [number, string][] = [
  [0,          '$0'],
  [100_000,    '$200,000'],
  [300_000,    '$400,000'],   // approximate mid-position looks closer to screenshot
  [600_000,    '$600,000'],
];

// ── Component ──────────────────────────────────────────────────────
export function TreasuryChart() {
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

  return (
    <div style={{ position: 'relative', marginTop: 56 }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VW} ${VH}`}
        style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible', cursor: 'crosshair' }}
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="tc2-gg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="tc2-gy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDDA16" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#FDDA16" stopOpacity="0.01" />
          </linearGradient>
          <filter id="tc2-fg" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="tc2-fy" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* ── Left Y grid + labels ──────────────────────────── */}
        {LEFT_TICKS.map(v => (
          <g key={v}>
            <line x1={PAD.l} y1={ys(v)} x2={PAD.l + PW} y2={ys(v)}
              stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <text x={PAD.l - 10} y={ys(v) + 4} textAnchor="end"
              fill="rgba(255,255,255,0.30)" fontSize="12" fontFamily="monospace">
              {v.toFixed(3)}
            </text>
          </g>
        ))}

        {/* ── Right Y labels ────────────────────────────────── */}
        {RIGHT_TICKS.map(([u, label]) => {
          const normV = (u / USDT_MAX) * RATE_MAX;
          return (
            <text key={label} x={PAD.l + PW + 12} y={ys(normV) + 4} textAnchor="start"
              fill="rgba(255,255,255,0.28)" fontSize="11" fontFamily="monospace">
              {label}
            </text>
          );
        })}

        {/* ── Area fills ───────────────────────────────────── */}
        {/* Green USDT area */}
        <path
          d={`${bezier(USDT_NORM)} L ${xs(N-1).toFixed(1)},${ys(0).toFixed(1)} L ${xs(0).toFixed(1)},${ys(0).toFixed(1)} Z`}
          fill="url(#tc2-gg)"
        />
        {/* Yellow avg area */}
        <path
          d={`${bezier(AVG_RATE)} L ${xs(N-1).toFixed(1)},${ys(0).toFixed(1)} L ${xs(0).toFixed(1)},${ys(0).toFixed(1)} Z`}
          fill="url(#tc2-gy)"
        />

        {/* ── Lines ────────────────────────────────────────── */}
        {/* Daily market rate — gray, noisy */}
        <path d={RATE_PATH} fill="none" stroke="rgba(185,182,172,0.55)" strokeWidth="1.5" />
        {/* Yellow AVG Rate — smooth */}
        <path d={bezier(AVG_RATE)}  fill="none" stroke="#FDDA16" strokeWidth="2.5" filter="url(#tc2-fy)" />
        {/* USDT Accumulation — green, smooth */}
        <path d={bezier(USDT_NORM)} fill="none" stroke="#22C55E" strokeWidth="2.5" filter="url(#tc2-fg)" />

        {/* ── Annotation: "Upside captured" ────────────────── */}
        {(() => {
          // Peak of the spike is around index 6
          const px = xs(6), py = ys(RATE_MONTHLY[6]);
          const tx = px - 130, ty = py - 55;
          return (
            <g>
              <line x1={tx + 80} y1={ty + 14} x2={px - 10} y2={py - 6}
                stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
              <text x={tx} y={ty} fill="rgba(255,255,255,0.80)" fontSize="16"
                fontFamily="var(--font-display, serif)" fontStyle="italic">
                Upside
              </text>
              <text x={tx} y={ty + 20} fill="rgba(255,255,255,0.80)" fontSize="16"
                fontFamily="var(--font-display, serif)" fontStyle="italic">
                captured
              </text>
            </g>
          );
        })()}

        {/* ── Annotation: "Buffer deployed" ────────────────── */}
        {(() => {
          // Drop after spike — around index 8
          const px = xs(8), py = ys(RATE_MONTHLY[8]);
          const tx = px + 18, ty = py + 28;
          return (
            <g>
              <line x1={px + 8} y1={py + 6} x2={tx + 12} y2={ty - 4}
                stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
              <text x={tx} y={ty + 8} fill="rgba(255,255,255,0.80)" fontSize="16"
                fontFamily="var(--font-display, serif)" fontStyle="italic">
                Buffer
              </text>
              <text x={tx} y={ty + 26} fill="rgba(255,255,255,0.80)" fontSize="16"
                fontFamily="var(--font-display, serif)" fontStyle="italic">
                deployed
              </text>
            </g>
          );
        })()}

        {/* ── Annotation: "Steady USDT growth" (green) ─────── */}
        {(() => {
          // Upper right — green USDT line at index 12
          const px = xs(12), py = ys(USDT_NORM[12]);
          const tx = px - 50, ty = py - 70;
          return (
            <g>
              <text x={tx} y={ty} fill="#FDDA16" fontSize="17"
                fontFamily="var(--font-display, serif)" fontWeight="400">
                Steady
              </text>
              <text x={tx} y={ty + 22} fill="rgba(255,255,255,0.85)" fontSize="17"
                fontFamily="var(--font-display, serif)">
                USDT growth
              </text>
            </g>
          );
        })()}

        {/* ── Annotation: "Optimal average rate" ───────────── */}
        {(() => {
          // Points to yellow line — right side, around index 12
          const px = xs(12), py = ys(AVG_RATE[12]);
          const tx = px + 18, ty = py - 10;
          return (
            <g>
              <text x={tx} y={ty} fill="#FDDA16" fontSize="16"
                fontFamily="var(--font-display, serif)" fontStyle="italic">
                Optimal
              </text>
              <text x={tx} y={ty + 20} fill="rgba(255,255,255,0.80)" fontSize="16"
                fontFamily="var(--font-display, serif)" fontStyle="italic">
                average rate
              </text>
            </g>
          );
        })()}

        {/* ── Hover ────────────────────────────────────────── */}
        {hx !== null && hover !== null && (() => {
          const tx = hx + 14 > VW - PAD.r - 10 ? hx - 195 : hx + 14;
          const usdtVal = USDT_RAW[hover];
          const rows = [
            { text: `Month ${hover + 1}`,                                         color: 'rgba(255,255,255,0.38)' },
            { text: `Mkt rate · ${RATE_MONTHLY[hover].toFixed(3)}`,               color: 'rgba(185,182,172,0.85)' },
            { text: `AVG rate · ${AVG_RATE[hover].toFixed(3)}`,                   color: '#FDDA16' },
            { text: `USDT acc · $${usdtVal.toLocaleString('en-US')}`,             color: '#22C55E' },
          ];
          return (
            <>
              <line x1={hx} y1={PAD.t} x2={hx} y2={PAD.t + PH}
                stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="4,4" />
              <circle cx={hx} cy={ys(RATE_MONTHLY[hover])} r={4}       fill="rgba(185,182,172,0.9)" stroke="#fff" strokeWidth="1.5" />
              <circle cx={hx} cy={ys(AVG_RATE[hover])}     r={5.5}     fill="#FDDA16" stroke="#fff" strokeWidth="1.5" />
              <circle cx={hx} cy={ys(USDT_NORM[hover])}    r={5.5}     fill="#22C55E" stroke="#fff" strokeWidth="1.5" />
              <g transform={`translate(${tx},${PAD.t + 10})`}>
                <rect x={0} y={0} width={190} height={84} rx={4}
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

      {/* ── Legend ────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', gap: 32, marginTop: 20, justifyContent: 'center',
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)',
      }}>
        {[
          { c: 'rgba(185,182,172,0.65)', label: 'Daily market rate' },
          { c: '#FDDA16', label: 'Yellow AVG Rate' },
          { c: '#22C55E', label: 'USDT Accumulation' },
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
