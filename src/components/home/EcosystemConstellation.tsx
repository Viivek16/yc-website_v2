'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

// Four child entities of Yellow Group, at fixed angles (degrees, 0=right 90=down)
const NODES = [
  { id: 'network', label: 'Yellow Network', desc: 'Open-protocol P2P clearing layer.',  angle: -50, dist: 36, color: '#fdda16', phase: 0   },
  { id: 'capital', label: 'Yellow Capital', desc: 'Liquidity, treasury & venture.',     angle:  40, dist: 38, color: '#fdda16', phase: 1.6 },
  { id: 'media',   label: 'Yellow Media',   desc: 'Editorial reach & research.',        angle: 130, dist: 36, color: '#c8bc6a', phase: 3.2 },
  { id: 'pro',     label: 'Yellow Pro',     desc: 'Professional trading platform.',     angle:-130, dist: 37, color: '#c8bc6a', phase: 4.8 },
];

const GROUP = { id: 'group', label: 'Yellow Group', desc: 'Five entities. One vision.' };

export function EcosystemConstellation() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(wrapRef, { once: true, margin: '0px 0px -10% 0px' });

  const [t,     setT]     = useState(0);
  const [active, setActive] = useState('group');
  const [mouse,  setMouse]  = useState({ x: 0, y: 0 });

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => { setT((now - start) / 1000); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left  - r.width  / 2) / (r.width  / 2);
    const y = (e.clientY - r.top   - r.height / 2) / (r.height / 2);
    setMouse({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
  };

  // Fixed positions with gentle independent bob
  const positions = NODES.map(n => {
    const rad = (n.angle * Math.PI) / 180;
    const bob = Math.sin(t * 0.55 + n.phase) * 1.3;
    return { ...n, x: 50 + Math.cos(rad) * n.dist, y: 50 + Math.sin(rad) * n.dist + bob };
  });

  const all: Array<{ id: string; label: string; desc: string }> = [GROUP, ...positions];
  const sel = all.find(n => n.id === active) ?? GROUP;
  const px = mouse.x * 4, py = mouse.y * 4;

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={() => setMouse({ x: 0, y: 0 })}
      style={{ position: 'relative', aspectRatio: '1 / 1', width: '100%', maxWidth: 540, margin: '0 auto', cursor: 'crosshair' }}
    >
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', transform: `translate(${px * 0.3}px, ${py * 0.3}px)`, transition: 'transform 600ms cubic-bezier(0.16,1,0.3,1)' }}>
        <defs>
          <radialGradient id="eg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#fdda16" stopOpacity="0.30" />
            <stop offset="55%"  stopColor="#fdda16" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#fdda16" stopOpacity="0" />
          </radialGradient>
          <filter id="eg-blur" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        {/* Ambient center glow */}
        <circle cx="50" cy="50" r="22" fill="url(#eg-glow)" />

        {/* Animated beam lines — marching dashes signal data flowing outward */}
        {positions.map((p, i) => (
          <line key={'beam-' + p.id}
            x1="50" y1="50" x2={p.x} y2={p.y}
            stroke={active === p.id ? 'rgba(253,218,22,0.68)' : 'rgba(253,218,22,0.16)'}
            strokeWidth={active === p.id ? 0.38 : 0.13}
            strokeDasharray="1.8 1.5"
            strokeDashoffset={-t * 9 + i * 3.5}
            style={{ transition: 'stroke 240ms, stroke-width 240ms', opacity: inView ? 1 : 0 }}
          />
        ))}

        {/* Signal pulse dots travelling from center to each node */}
        {positions.map(p => {
          const prog = ((t * 0.38 + p.phase * 0.08) % 1);
          return (
            <circle key={'sig-' + p.id}
              cx={50 + (p.x - 50) * prog}
              cy={50 + (p.y - 50) * prog}
              r="0.55"
              fill="#fdda16"
              opacity={active === p.id ? 0.9 : 0.4}
            />
          );
        })}

        {/* Node dots */}
        {positions.map(p => (
          <g key={p.id}
            onMouseEnter={() => setActive(p.id)}
            onMouseLeave={() => setActive('group')}
            style={{ cursor: 'pointer' }}
          >
            {active === p.id && (
              <circle cx={p.x} cy={p.y} r="5.2" fill={p.color} opacity="0.16" filter="url(#eg-blur)" />
            )}
            <circle cx={p.x} cy={p.y} r={active === p.id ? 1.9 : 1.2} fill={p.color} style={{ transition: 'r 240ms' }} />
            {/* invisible hit target */}
            <circle cx={p.x} cy={p.y} r="4" fill="transparent" />
          </g>
        ))}
      </svg>

      {/* Center — Yellow Group (PARENT) */}
      <div
        onMouseEnter={() => setActive('group')}
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: `translate(calc(-50% + ${px * 0.5}px), calc(-50% + ${py * 0.5}px))`,
          padding: '16px 26px',
          background: 'rgba(253,218,22,0.09)',
          backdropFilter: 'blur(14px)',
          border: `1px solid ${active === 'group' ? 'rgba(253,218,22,0.82)' : 'rgba(253,218,22,0.4)'}`,
          borderRadius: 4,
          fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.12em',
          color: '#fff', textAlign: 'center', whiteSpace: 'nowrap',
          boxShadow: '0 0 52px rgba(253,218,22,0.28)',
          transition: 'border-color 240ms, transform 600ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div style={{ fontSize: 8.5, color: '#fdda16', letterSpacing: '0.24em', marginBottom: 5, opacity: 0.85 }}>PARENT GROUP</div>
        Yellow Group
      </div>

      {/* Child-entity labels */}
      {positions.map(p => (
        <div key={p.id}
          onMouseEnter={() => setActive(p.id)}
          onMouseLeave={() => setActive('group')}
          style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            transform: `translate(calc(-50% + ${px}px), calc(-50% + ${py}px))`,
            padding: active === p.id ? '8px 13px' : '6px 10px',
            background: active === p.id ? 'rgba(20,19,19,0.95)' : 'rgba(20,19,19,0.72)',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${active === p.id ? 'rgba(253,218,22,0.65)' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: 3,
            fontFamily: 'var(--font-mono)', fontSize: active === p.id ? 10.5 : 9.5, letterSpacing: '0.1em',
            color: active === p.id ? '#fff' : 'var(--on-dark-2)',
            whiteSpace: 'nowrap', cursor: 'pointer',
            boxShadow: active === p.id ? '0 0 28px rgba(253,218,22,0.28)' : 'none',
            transition: 'all 240ms',
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
