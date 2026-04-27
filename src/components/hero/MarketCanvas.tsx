'use client';

import { useRef, useEffect } from 'react';
import { LiveDot } from '@/components/shared';

const glassPill: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  background: 'rgba(20,19,19,0.72)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 4,
  padding: '6px 12px',
};

export function MarketCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const priceRef  = useRef(64182.40);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;

    let W: number, H: number, DPR: number;

    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      const r = c.getBoundingClientRect();
      W = r.width; H = r.height;
      c.width  = W * DPR;
      c.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const N = 80;
    const bars: { o: number; c: number; h: number; l: number; v: number; up: boolean }[] = [];
    let p = 100;
    for (let i = 0; i < N; i++) {
      const o = p;
      p += (Math.random() - 0.5) * 1.6;
      bars.push({ o, c: p, h: Math.max(o, p) + Math.random() * 0.9, l: Math.min(o, p) - Math.random() * 0.9, v: Math.random(), up: p >= o });
    }

    let spike: { idx: number; t: number; label: string } | null = null;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf: number, last = performance.now(), tickAcc = 0, spikeAcc = 0, priceAcc = 0;

    const draw = (t: number) => {
      const dt = t - last; last = t; tickAcc += dt; spikeAcc += dt; priceAcc += dt;

      if (tickAcc > 620 && !mq.matches) {
        tickAcc = 0;
        bars.shift();
        const prev = bars[bars.length - 1].c;
        const drift    = (Math.random() - 0.48) * 1.8;
        const spikeHit = Math.random() > 0.97 ? (Math.random() - 0.5) * 7 : 0;
        const nc = prev + drift + spikeHit;
        bars.push({ o: prev, c: nc, h: Math.max(prev, nc) + Math.random() * 0.9, l: Math.min(prev, nc) - Math.random() * 0.9, v: Math.random(), up: Math.random() > 0.28 });
      }

      if (priceAcc > 900) {
        priceAcc = 0;
        const d = (Math.random() - 0.5) * 42;
        priceRef.current = Math.max(1000, priceRef.current + d);
      }

      if (spikeAcc > 4200 && !mq.matches) {
        spikeAcc = 0;
        const idx = 40 + Math.floor(Math.random() * 30);
        spike = { idx, t: 0, label: `+${(3 + Math.random() * 2).toFixed(1)}σ · resistance` };
      }
      if (spike) { spike.t += dt; if (spike.t > 2900) spike = null; }

      ctx.clearRect(0, 0, W, H);

      let lo = Infinity, hi = -Infinity;
      bars.forEach(b => { if (b.l < lo) lo = b.l; if (b.h > hi) hi = b.h; });
      const pad = (hi - lo) * 0.18; lo -= pad; hi += pad;
      const yof = (pp: number) => H - 60 - ((pp - lo) / (hi - lo)) * (H - 140);

      // grid
      ctx.strokeStyle = 'rgba(255,255,255,0.035)'; ctx.lineWidth = 1;
      const cols = Math.floor(W / 40);
      for (let i = 0; i <= cols; i++) { const x = i * 40; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let i = 0; i <= 6; i++) { const y = (H / 6) * i; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      // MA line
      ctx.strokeStyle = 'rgba(253,218,22,0.34)'; ctx.lineWidth = 1.3;
      ctx.beginPath();
      const BW = W / N;
      for (let i = 5; i < bars.length; i++) {
        let sum = 0;
        for (let j = i - 5; j < i; j++) sum += bars[j].c;
        const ma = sum / 5;
        const x = i * BW + BW / 2; const y = yof(ma);
        if (i === 5) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Candles
      bars.forEach((b, i) => {
        const x = i * BW + BW / 2;
        const yO = yof(b.o), yC = yof(b.c), yH = yof(b.h), yL = yof(b.l);
        if (b.up) { ctx.strokeStyle = 'rgba(253,218,22,0.55)'; ctx.fillStyle = 'rgba(253,218,22,0.40)'; }
        else       { ctx.strokeStyle = 'rgba(110,106,97,0.65)'; ctx.fillStyle = 'rgba(110,106,97,0.55)'; }
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x, yH); ctx.lineTo(x, yL); ctx.stroke();
        const w = Math.max(3, BW * 0.55);
        ctx.fillRect(x - w / 2, Math.min(yO, yC), w, Math.max(1.5, Math.abs(yC - yO)));
      });

      // Spike overlay
      if (spike) {
        const b = bars[spike.idx];
        if (b) {
          const op = Math.min(1, spike.t < 400 ? spike.t / 400 : (2900 - spike.t) / 500);
          const x = spike.idx * BW + BW / 2;
          const yH = yof(b.h) - 40;
          ctx.strokeStyle = `rgba(253,218,22,${0.85 * op})`; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(x, yof(b.h)); ctx.lineTo(x, yH); ctx.stroke();
          ctx.setLineDash([3, 4]);
          ctx.beginPath(); ctx.moveTo(x, yH); ctx.lineTo(W - 120, yH); ctx.stroke();
          ctx.setLineDash([]);
          ctx.fillStyle = `rgba(253,218,22,${0.9 * op})`;
          ctx.font = "10px 'JetBrains Mono', monospace";
          ctx.fillText(spike.label, W - 170, yH - 6);
        }
      }

      // Last price dashed line
      const lastBar = bars[bars.length - 1];
      const ly = yof(lastBar.c);
      ctx.setLineDash([2, 4]);
      ctx.strokeStyle = 'rgba(253,218,22,0.45)';
      ctx.beginPath(); ctx.moveTo(0, ly); ctx.lineTo(W, ly); ctx.stroke();
      ctx.setLineDash([]);

      if (!mq.matches) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', background: '#0a0a0a', opacity: 0.55 }}
      />
      {/* Gradient overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.55) 45%, rgba(10,10,10,0.35) 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 100% 50%, transparent 20%, rgba(10,10,10,0.6) 90%)', pointerEvents: 'none' }} />
      {/* Live badge */}
      <div style={{ position: 'absolute', bottom: 24, right: 40, zIndex: 2 }}>
        <div style={glassPill}>
          <LiveDot size={6} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--on-dark-2)', marginLeft: 8 }}>Live · Desk feed · T+0</span>
        </div>
      </div>
    </>
  );
}
