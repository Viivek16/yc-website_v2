'use client';

import { useState } from 'react';
import { Section } from '@/components/shared';

interface FAQItem { q: string; a: string }

export function ServiceFAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Section bg="ink2">
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <h2 className="h2" style={{ margin: 0 }}>Frequently asked <em>questions.</em></h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ borderTop: '1px solid var(--line-soft)', borderBottom: i === items.length - 1 ? '1px solid var(--line-soft)' : 0 }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 24 }}
                >
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(17px,2vw,22px)', fontWeight: 400, letterSpacing: '-0.01em', color: 'var(--on-dark)', lineHeight: 1.25 }}>{item.q}</span>
                  <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: 2, border: `1px solid ${isOpen ? 'rgba(253,218,22,0.4)' : 'rgba(255,255,255,0.14)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: isOpen ? 'var(--accent)' : 'var(--on-dark-3)', fontSize: 18, transition: 'color 220ms, border-color 220ms' }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div style={{ overflow: 'hidden', maxHeight: isOpen ? 400 : 0, opacity: isOpen ? 1 : 0, transition: 'max-height 380ms cubic-bezier(0.16,1,0.3,1), opacity 280ms', paddingBottom: isOpen ? 28 : 0 }}>
                  <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: 'var(--on-dark-2)', margin: 0, maxWidth: 760 }}>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
