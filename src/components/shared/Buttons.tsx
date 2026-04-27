'use client';

import { useState, ReactNode, CSSProperties, MouseEvent } from 'react';
import Link from 'next/link';

const MAIL = 'mailto:nem@yellow.com';

interface BtnPrimaryProps {
  children: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  style?: CSSProperties;
  size?: 'md' | 'lg';
}

export function BtnPrimary({ children, href = MAIL, onClick, style = {}, size = 'md' }: BtnPrimaryProps) {
  const [hovered, setHovered] = useState(false);

  const isExternal = href.startsWith('http') || href.startsWith('mailto');

  const baseStyle: CSSProperties = {
    fontFamily: 'var(--font-ui)',
    fontSize: size === 'lg' ? 14 : 13.5,
    padding: size === 'lg' ? '16px 26px' : '12px 20px',
    background: hovered ? 'var(--accent)' : 'var(--cta)',
    color: 'var(--ink)',
    textDecoration: 'none',
    borderRadius: 4,
    display: 'inline-flex',
    gap: 10,
    alignItems: 'center',
    fontWeight: 500,
    letterSpacing: '-0.005em',
    transition: 'background 200ms cubic-bezier(0.4,0,0.2,1), box-shadow 200ms',
    boxShadow: hovered ? '0 0 36px 0 rgba(255,177,0,0.32)' : 'none',
    cursor: 'pointer',
    ...style,
  };

  const arrowStyle: CSSProperties = {
    transition: 'transform 200ms',
    display: 'inline-block',
    transform: hovered ? 'translateX(4px)' : 'translateX(0)',
  };

  if (isExternal) {
    return (
      <a
        href={href}
        onClick={onClick}
        style={baseStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span>{children}</span>
        <span style={arrowStyle}>→</span>
      </a>
    );
  }

  return (
    <Link
      href={href}
      style={baseStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span>{children}</span>
      <span style={arrowStyle}>→</span>
    </Link>
  );
}

interface BtnGhostProps {
  children: ReactNode;
  href?: string;
  dark?: boolean;
  arrow?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  style?: CSSProperties;
}

export function BtnGhost({ children, href = '#', dark = true, arrow = '→', onClick, style = {} }: BtnGhostProps) {
  const [hovered, setHovered] = useState(false);

  const border = dark ? 'rgba(255,255,255,0.24)' : 'rgba(10,10,10,0.22)';
  const txt = dark ? 'var(--on-dark)' : 'var(--text)';
  const fill = dark ? 'var(--on-dark)' : 'var(--text)';
  const txtH = dark ? 'var(--ink)' : 'var(--surface)';

  const isExternal = href.startsWith('http') || href.startsWith('mailto');

  const baseStyle: CSSProperties = {
    fontFamily: 'var(--font-ui)',
    fontSize: 13.5,
    padding: '12px 20px',
    textDecoration: 'none',
    borderRadius: 4,
    color: hovered ? txtH : txt,
    border: `1px solid ${border}`,
    display: 'inline-flex',
    gap: 10,
    alignItems: 'center',
    fontWeight: 500,
    position: 'relative',
    overflow: 'hidden',
    zIndex: 0,
    transition: 'color 200ms',
    cursor: 'pointer',
    ...style,
  };

  const fillStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: fill,
    zIndex: -1,
    transform: hovered ? 'translateX(0)' : 'translateX(-101%)',
    transition: 'transform 350ms cubic-bezier(0.4,0,0.2,1)',
  };

  const content = (
    <>
      <span style={fillStyle} />
      <span>{children}</span>
      <span style={{ transition: 'transform 200ms', transform: hovered ? 'translateX(4px)' : 'none' }}>
        {arrow}
      </span>
    </>
  );

  if (isExternal || onClick) {
    return (
      <a
        href={href}
        onClick={onClick}
        style={baseStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      style={baseStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {content}
    </Link>
  );
}

export { MAIL };
