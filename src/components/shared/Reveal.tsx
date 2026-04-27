'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  style?: React.CSSProperties;
  className?: string;
}

export function Reveal({ children, delay = 0, y = 14, style, className }: RevealProps) {
  const variants: Variants = {
    hidden:  { opacity: 0, y },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: delay / 1000,
      }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}
