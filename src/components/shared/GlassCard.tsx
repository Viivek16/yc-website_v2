'use client';

import { motion } from 'framer-motion';
import { ReactNode, CSSProperties } from 'react';
import React from 'react';

interface GlassCardProps {
  children: ReactNode;
  dark?: boolean;
  hover?: boolean;
  style?: CSSProperties;
  className?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

export function GlassCard({ children, dark = true, hover = true, style = {}, className, onMouseEnter, onMouseLeave }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, boxShadow: 'var(--sh-md)' } : undefined}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        background: dark ? 'rgba(20,19,19,0.55)' : 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(10,10,10,0.08)'}`,
        borderRadius: 4,
        boxShadow: 'var(--sh-sm)',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
