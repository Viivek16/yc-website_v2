'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BtnPrimary, MAIL } from '@/components/shared';

const SERVICES = [
  { n: '01', name: 'Market Making',      desc: '24/7 algorithmic desk, eleven CEX venues.',      path: '/services/market-making' },
  { n: '02', name: 'Treasury Management',desc: '30% minimum USDT payback guarantee.',              path: '/services/treasury-management' },
  { n: '03', name: 'Programmatic Sales', desc: 'Discreet execution for token allocations.',       path: '/services/programmatic-sales' },
  { n: '04', name: 'Venture Investment', desc: 'Strategic capital for token teams.',              path: '/services/venture-investment' },
];

function NavLink({ to, children, active }: { to: string; children: React.ReactNode; active: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-ui)',
        fontSize: 13.5,
        fontWeight: 400,
        color: active || hovered ? '#fff' : 'var(--on-dark-2)',
        textDecoration: 'none',
        position: 'relative',
        padding: '6px 0',
        display: 'inline-flex',
        alignItems: 'center',
        transition: 'color 200ms',
      }}
    >
      {children}
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: 'var(--accent)',
          transform: active || hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 280ms cubic-bezier(0.16,1,0.3,1)',
        }}
      />
    </Link>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const isServiceActive = pathname.startsWith('/services');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('mousedown', onClick); };
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 60,
        background: scrolled ? 'rgba(10,10,10,0.65)' : 'rgba(10,10,10,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        transition: 'background 240ms cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <div
        style={{
          maxWidth: 1360,
          margin: '0 auto',
          padding: '16px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Image src="/assets/logo-dark-bg.png" alt="Yellow Capital" width={160} height={34} style={{ height: 34, width: 'auto', display: 'block' }} priority />
        </Link>

        {/* Center nav */}
        <div style={{ display: 'flex', gap: 28, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <NavLink to="/" active={pathname === '/'}>Home</NavLink>

          {/* Services dropdown */}
          <div ref={wrapRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setOpen(v => !v)}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 13.5,
                fontWeight: 400,
                color: isServiceActive ? '#fff' : 'var(--on-dark-2)',
                background: 'none',
                border: 0,
                padding: '6px 0',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
                position: 'relative',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = isServiceActive ? '#fff' : 'var(--on-dark-2)'; }}
            >
              Services
              <span style={{ fontSize: 9, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 220ms cubic-bezier(0.16,1,0.3,1)', display: 'inline-block' }}>▾</span>
              {isServiceActive && (
                <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'var(--accent)' }} />
              )}
            </button>

            {open && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 14px)',
                  left: -24,
                  width: 440,
                  background: 'rgba(10,10,10,0.86)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  boxShadow: 'var(--sh-lg)',
                  padding: 8,
                  animation: 'dropIn 260ms cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                {SERVICES.map(s => (
                  <Link
                    key={s.n}
                    href={s.path}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      gap: 4,
                      padding: '14px 18px',
                      borderRadius: 2,
                      textDecoration: 'none',
                      color: 'var(--on-dark)',
                      transition: 'background 220ms',
                      alignItems: 'center',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(28,27,25,0.85)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
                  >
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>Service · {s.n}</div>
                      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 15, marginTop: 4 }}>{s.name}</div>
                      <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 12.5, color: 'var(--on-dark-2)', marginTop: 3 }}>{s.desc}</div>
                    </div>
                    <span style={{ alignSelf: 'center', color: 'var(--on-dark-3)' }}>→</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/ecosystem" active={pathname === '/ecosystem'}>Ecosystem</NavLink>
          <NavLink to="/about"     active={pathname === '/about'}>About Us</NavLink>
          <NavLink to="/contact"   active={pathname === '/contact'}>Contact</NavLink>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <BtnPrimary href={MAIL} style={{ padding: '10px 16px', fontSize: 13 }}>
            Schedule Consultation
          </BtnPrimary>
        </div>
      </div>
    </nav>
  );
}
