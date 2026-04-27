// hero.jsx — Gotbit-style rotating hero with living market canvas
const HERO_SLIDES = [
  {
    n: '01', section: 'Liquidity',
    headline: { lines: ['Institutional', 'Market Making'], em: 'Aligned Liquidity.' },
    sub: 'Compliance-first algorithmic market making across eleven major venues. We replace hidden price pressure and sudden volatility with a multi-layered liquidity framework engineered for sustainable growth.',
    ctas: [{ label: 'Schedule a Consultation', primary: true }, { label: 'Our Services', ghost: true, href: '#services' }],
  },
  {
    n: '02', section: 'Treasury',
    headline: { lines: ['Strategy', 'Treasury Building'], em: 'Zero Market Impact.' },
    sub: 'Build a sustainable runway with our algorithmic model, liquidating tokens to accumulate a diversified treasury at favorable prices. 30% minimum USDT payback, guaranteed.',
    ctas: [{ label: 'Get in Touch', primary: true }, { label: 'Know More', ghost: true, href: '#services' }],
  },
  {
    n: '03', section: 'Ecosystem',
    headline: { lines: ['One Group,'], em: 'Five Disciplines.' },
    sub: 'Yellow Capital is one operating company inside Yellow Group. The whole stack — listing, liquidity, editorial, research, infrastructure — reports through a single governance layer.',
    ctas: [{ label: 'Get in Touch', primary: true }, { label: 'Explore Ecosystem', ghost: true, href: '#ecosystem', route: '/ecosystem' }],
  },
];

const MarketCanvas = ({ slideIdx }) => {
  const canvasRef = React.useRef(null);
  const priceRef = React.useRef(64182.40);
  const [price, setPrice] = React.useState(64182.40);
  const [chg, setChg] = React.useState(1.24);

  React.useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d');
    let W, H, DPR;
    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      const r = c.getBoundingClientRect();
      W = r.width; H = r.height;
      c.width = W * DPR; c.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize(); window.addEventListener('resize', resize);

    const N = 80;
    const bars = [];
    let p = 100;
    for (let i = 0; i < N; i++) {
      const o = p; p += (Math.random() - 0.5) * 1.6;
      bars.push({ o, c: p, h: Math.max(o, p) + Math.random() * 0.9, l: Math.min(o, p) - Math.random() * 0.9, v: Math.random(), up: p >= o });
    }
    let spike = null;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf, last = performance.now(), tickAcc = 0, spikeAcc = 0, priceAcc = 0;

    const draw = (t) => {
      const dt = t - last; last = t; tickAcc += dt; spikeAcc += dt; priceAcc += dt;

      if (tickAcc > 620 && !mq.matches) {
        tickAcc = 0;
        bars.shift();
        const prev = bars[bars.length - 1].c;
        const drift = (Math.random() - 0.48) * 1.8;
        const spikeHit = Math.random() > 0.97 ? (Math.random() - 0.5) * 7 : 0;
        const nc = prev + drift + spikeHit;
        bars.push({
          o: prev, c: nc,
          h: Math.max(prev, nc) + Math.random() * 0.9,
          l: Math.min(prev, nc) - Math.random() * 0.9,
          v: Math.random(), up: Math.random() > 0.28,
        });
      }

      if (priceAcc > 900) {
        priceAcc = 0;
        const d = (Math.random() - 0.5) * 42;
        priceRef.current = Math.max(1000, priceRef.current + d);
        setPrice(priceRef.current);
        setChg(c => +(c + (Math.random() - 0.5) * 0.08).toFixed(2));
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
      const yof = (pp) => H - 60 - ((pp - lo) / (hi - lo)) * (H - 140);

      // grid
      ctx.strokeStyle = 'rgba(255,255,255,0.035)'; ctx.lineWidth = 1;
      const cols = Math.floor(W / 40);
      for (let i = 0; i <= cols; i++) { const x = i * 40; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      const rows = 6;
      for (let i = 0; i <= rows; i++) { const y = (H / rows) * i; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      // MA
      ctx.strokeStyle = 'rgba(253,218,22,0.34)'; ctx.lineWidth = 1.3;
      ctx.beginPath();
      const BW = W / N;
      for (let i = 5; i < bars.length; i++) {
        let sum = 0; for (let j = i - 5; j < i; j++) sum += bars[j].c;
        const ma = sum / 5;
        const x = i * BW + BW / 2; const y = yof(ma);
        if (i === 5) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // candles — per spec: 75% up-ticks are accent-yellow at 40% opacity; 25% muted-gray
      bars.forEach((b, i) => {
        const x = i * BW + BW / 2;
        const yO = yof(b.o), yC = yof(b.c), yH = yof(b.h), yL = yof(b.l);
        if (b.up) {
          ctx.strokeStyle = 'rgba(253,218,22,0.55)';
          ctx.fillStyle = 'rgba(253,218,22,0.40)';
        } else {
          ctx.strokeStyle = 'rgba(110,106,97,0.65)';
          ctx.fillStyle = 'rgba(110,106,97,0.55)';
        }
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x, yH); ctx.lineTo(x, yL); ctx.stroke();
        const w = Math.max(3, BW * 0.55);
        ctx.fillRect(x - w / 2, Math.min(yO, yC), w, Math.max(1.5, Math.abs(yC - yO)));
      });

      // spike overlay
      if (spike) {
        const b = bars[spike.idx];
        if (b) {
          const op = Math.min(1, spike.t < 400 ? spike.t / 400 : (2900 - spike.t) / 500);
          const x = spike.idx * BW + BW / 2;
          const yH = yof(b.h) - 40;
          ctx.strokeStyle = `rgba(253,218,22,${0.85 * op})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(x, yof(b.h)); ctx.lineTo(x, yH); ctx.stroke();
          ctx.setLineDash([3, 4]);
          ctx.beginPath(); ctx.moveTo(x, yH); ctx.lineTo(W - 120, yH); ctx.stroke();
          ctx.setLineDash([]);
          ctx.fillStyle = `rgba(253,218,22,${0.9 * op})`;
          ctx.font = "10px 'JetBrains Mono', monospace";
          ctx.fillText(spike.label, W - 170, yH - 6);
        }
      }

      // last price dashed
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

  const isUp = chg >= 0;

  return (
    <React.Fragment>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', background: '#0a0a0a', opacity: 0.55 }} />
      {/* Dim + vignette to keep copy readable over the backdrop */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.55) 45%, rgba(10,10,10,0.35) 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 100% 50%, transparent 20%, rgba(10,10,10,0.6) 90%)', pointerEvents: 'none' }} />
      {/* Corner readouts on the canvas backdrop */}
      <div style={{ position: 'absolute', bottom: 24, right: 40, zIndex: 2 }}>
        <div style={glassPill}>
          <LiveDot size={6} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--on-dark-2)', marginLeft: 8 }}>Live · Desk feed · T+0</span>
        </div>
      </div>
    </React.Fragment>
  );
};

const glassPill = {
  display: 'inline-flex', alignItems: 'center',
  background: 'rgba(20,19,19,0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '6px 12px',
};

const Hero = ({ go }) => {
  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    if (paused) return;
    let start = performance.now();
    let raf;
    const tick = (t) => {
      const elapsed = t - start;
      const p = Math.min(1, elapsed / 6000);
      setProgress(p);
      if (p >= 1) {
        setIdx(i => (i + 1) % HERO_SLIDES.length);
        start = t;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, idx]);

  const jump = (i) => { setIdx(i); setProgress(0); };

  const slide = HERO_SLIDES[idx];

  return (
    <section onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      style={{ background: 'var(--ink)', color: 'var(--on-dark)', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line-soft)', minHeight: 'calc(100vh - 61px)' }}>
      <MarketCanvas slideIdx={idx} />
      <div style={{ position: 'absolute', top: -260, right: -200, width: 900, height: 900, background: 'radial-gradient(circle, rgba(253,218,22,0.05), transparent 60%)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '72px 40px 96px', position: 'relative', zIndex: 3, minHeight: 'calc(100vh - 61px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 56, alignItems: 'center' }}>
          <div key={idx} style={{ animation: 'slideIn 900ms cubic-bezier(0.16,1,0.3,1)', maxWidth: 960 }}>
            <Eyebrow accentRule>{slide.n} · {slide.section}</Eyebrow>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(56px, 7vw, 108px)', letterSpacing: '-0.02em', lineHeight: 1.02, margin: '20px 0 24px' }}>
              {slide.headline.lines.map((l, i) => (
                <React.Fragment key={i}>{l}<br /></React.Fragment>
              ))}
              <em style={{ fontStyle: 'italic' }}>{slide.headline.em}</em>
            </h1>
            <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 18, lineHeight: 1.55, color: 'var(--on-dark-2)', maxWidth: 640, fontStyle: 'normal' }}>
              <em style={{ fontStyle: 'italic', color: 'var(--on-dark-2)' }}>{slide.sub}</em>
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' }}>
              {slide.ctas.map((c, i) => c.primary ? (
                <BtnPrimary key={i} size="lg">{c.label}</BtnPrimary>
              ) : (
                <BtnGhost key={i} arrow={c.href?.startsWith('#') ? '↓' : '→'} href={c.href || '#'} onClick={(e) => { if (c.route) { e.preventDefault(); go(c.route); } }}>{c.label}</BtnGhost>
              ))}
            </div>
            {/* Progress indicators */}
            <div style={{ display: 'flex', gap: 12, marginTop: 48 }}>
              {HERO_SLIDES.map((s, i) => {
                const active = i === idx;
                return (
                  <button key={i} onClick={() => jump(i)} aria-label={`Slide ${i+1}`}
                    style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 8, minWidth: 60 }}>
                    <div style={{ height: 2, width: 60, background: active ? 'transparent' : 'var(--on-dark-3)', position: 'relative', overflow: 'hidden' }}>
                      <div style={{
                        position: 'absolute', left: 0, top: 0, height: '100%',
                        width: active ? `${progress * 100}%` : '0%',
                        background: 'var(--accent)',
                        boxShadow: active ? '0 0 8px rgba(253,218,22,0.5)' : 'none',
                      }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: active ? 'var(--on-dark)' : 'var(--on-dark-3)' }}>0{i+1}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Hero, MarketCanvas });
