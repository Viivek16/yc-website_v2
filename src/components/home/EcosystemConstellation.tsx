'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const ORBITS = [
  { id: 'pro', label: 'Yellow.pro',  desc: 'Trading infrastructure & APIs.', r: 28, speed: 0.18, phase: 0,   color: '#fdda16' },
  { id: 'com', label: 'Yellow.com',  desc: 'Editorial reach & research.',    r: 36, speed: 0.13, phase: 1.6, color: '#ffb100' },
  { id: 'org', label: 'Yellow.org',  desc: 'Open-protocol clearing layer.',  r: 44, speed: 0.09, phase: 3.4, color: '#fdda16' },
  { id: 'ow',  label: 'Openware',    desc: 'Exchange engine since 2013.',    r: 38, speed: 0.11, phase: 5.0, color: '#e9e6df' },
];

const CAP = { id: 'cap', label: 'Yellow Capital', desc: 'Liquidity, treasury, venture.', x: 50, y: 50 };

export function EcosystemConstellation() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(wrapRef, { once: true, margin: '0px 0px -10% 0px' });

  const [t,       setT]       = useState(0);
  const [paused,  setPaused]  = useState(false);
  const [active,  setActive]  = useState('cap');
  const [mouse,   setMouse]   = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (paused) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => { setT((now - start) / 1000); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left  - r.width  / 2) / (r.width  / 2);
    const y = (e.clientY - r.top   - r.height / 2) / (r.height / 2);
    setMouse({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
  };

  const positions = ORBITS.map(o => {
    const a = o.phase + t * o.speed;
    return { ...o, x: 50 + Math.cos(a) * o.r, y: 50 + Math.sin(a) * o.r * 0.7, a };
  });

  const all = [CAP, ...positions];
  const sel = all.find(n => n.id === active) || CAP;
  const px = mouse.x * 4, py = mouse.y * 4;

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseEnter={() => setPaused(false)}
      onMouseLeave={() => { setMouse({ x: 0, y: 0 }); }}
      style={{ position: 'relative', aspectRatio: '1 / 1', width: '100%', maxWidth: 540, margin: '0 auto', cursor: 'crosshair' }}
    >
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', transform: `translate(${px * 0.3}px, ${py * 0.3}px)`, transition: 'transform 600ms cubic-bezier(0.16,1,0.3,1)' }}>
        <defs>
          <radialGradient id="cg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#fdda16" stopOpacity="0.35" />
            <stop offset="60%"  stopColor="#fdda16" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#fdda16" stopOpacity="0" />
          </radialGradient>
          <filter id="cg-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.8" />
          </filter>
        </defs>

        {/* Orbit rings */}
        {ORBITS.map((o, i) => (
          <ellipse key={o.id} cx="50" cy="50" rx={o.r} ry={o.r * 0.7}
            fill="none"
            stroke={active === o.id ? 'rgba(253,218,22,0.45)' : 'rgba(255,255,255,0.08)'}
            strokeWidth={active === o.id ? 0.18 : 0.1}
            strokeDasharray="0.8 1.2"
            style={{ transition: 'stroke 320ms, stroke-width 320ms', opacity: inView ? 1 : 0, transitionDelay: `${200 + i * 100}ms` }}
          />
        ))}

        <circle cx="50" cy="50" r="22" fill="url(#cg-glow)" />

        {/* Beams */}
        {positions.map(p => (
          <line key={'b-' + p.id} x1="50" y1="50" x2={p.x} y2={p.y}
            stroke="rgba(253,218,22,0.18)"
            strokeWidth={active === p.id ? 0.3 : 0.08}
            strokeDasharray={active === p.id ? '0' : '0.4 0.6'}
            style={{ transition: 'stroke-width 240ms', opacity: inView ? 1 : 0 }}
          />
        ))}

        {/* Planet dots */}
        {positions.map(p => (
          <g key={p.id} onMouseEnter={() => { setActive(p.id); setPaused(true); }} onMouseLeave={() => setPaused(false)} style={{ cursor: 'pointer' }}>
            {active === p.id && <circle cx={p.x} cy={p.y} r="4.2" fill={p.color} opacity="0.18" filter="url(#cg-blur)" />}
            <circle cx={p.x} cy={p.y} r={active === p.id ? 1.6 : 1.1} fill={p.color} style={{ transition: 'r 240ms' }} />
            <circle cx={p.x} cy={p.y} r="3" fill="transparent" />
          </g>
        ))}
      </svg>

      {/* Center node */}
      <div
        onMouseEnter={() => setActive('cap')}
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: `translate(calc(-50% + ${px * 0.5}px), calc(-50% + ${py * 0.5}px))`,
          padding: '16px 22px',
          background: 'rgba(253,218,22,0.08)',
          backdropFilter: 'blur(14px)',
          border: `1px solid ${active === 'cap' ? 'rgba(253,218,22,0.7)' : 'rgba(253,218,22,0.4)'}`,
          borderRadius: 4,
          fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.12em',
          color: '#fff', textAlign: 'center', whiteSpace: 'nowrap',
          boxShadow: '0 0 40px rgba(253,218,22,0.25)',
          transition: 'border-color 240ms, transform 600ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div style={{ fontSize: 8.5, color: 'var(--on-dark-3)', letterSpacing: '0.22em', marginBottom: 4 }}>CORE</div>
        Yellow Capital
      </div>

      {/* Orbital labels */}
      {positions.map(p => (
        <div key={p.id}
          onMouseEnter={() => { setActive(p.id); setPaused(true); }}
          onMouseLeave={() => setPaused(false)}
          style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            transform: `translate(calc(-50% + ${px}px), calc(-50% + ${py}px))`,
            padding: active === p.id ? '8px 12px' : '6px 10px',
            background: active === p.id ? 'rgba(20,19,19,0.95)' : 'rgba(20,19,19,0.7)',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${active === p.id ? 'rgba(253,218,22,0.6)' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: 3,
            fontFamily: 'var(--font-mono)', fontSize: active === p.id ? 10 : 9.5, letterSpacing: '0.12em',
            color: active === p.id ? '#fff' : 'var(--on-dark-2)',
            whiteSpace: 'nowrap', cursor: 'pointer',
            boxShadow: active === p.id ? '0 0 24px rgba(253,218,22,0.3)' : 'none',
            transition: 'background 240ms, border-color 240ms, color 240ms, padding 240ms',
            opacity: inView ? 1 : 0,
            zIndex: active === p.id ? 4 : 3,
          }}
        >
          {p.label}
        </div>
      ))}

      {/* HUD */}
      <div style={{
        position: 'absolute', left: 8, right: 8, bottom: -2,
        background: 'rgba(10,10,10,0.78)', backdropFilter: 'blur(14px)',
        border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4,
        padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
        opacity: inView ? 1 : 0, transition: 'opacity 600ms 800ms',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 6, height: 6, borderRadius: 6, background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.22em', color: 'var(--on-dark-3)', textTransform: 'uppercase' }}>Selected</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#fff', letterSpacing: '0.06em' }}>{sel.label}</span>
        </div>
        <span style={{ fontFamily: 'var(--font-ui)', fontStyle: 'italic', fontSize: 12.5, color: 'var(--on-dark-2)' }}>{sel.desc}</span>
      </div>
    </div>
  );
}
