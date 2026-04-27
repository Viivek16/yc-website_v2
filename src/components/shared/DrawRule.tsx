'use client';

import { motion } from 'framer-motion';

interface DrawRuleProps {
  color?: string;
  height?: number;
  delay?: number;
}

export function DrawRule({ color = 'var(--line-soft)', height = 1, delay = 0 }: DrawRuleProps) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 }}
      style={{ height, background: color, transformOrigin: 'left' }}
    />
  );
}
