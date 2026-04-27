import { Section, Breadcrumb } from '@/components/shared';
import { PreFooter } from '@/components/PreFooter';
import { ReactNode } from 'react';

interface SimplePageProps {
  title: string;
  em?: string;
  lede: string;
  body: ReactNode;
}

export function SimplePage({ title, em, lede, body }: SimplePageProps) {
  return (
    <>
      <section style={{ background: 'var(--ink)', color: 'var(--on-dark)', padding: '96px 40px 80px', borderBottom: '1px solid var(--line-soft)' }}>
        <div style={{ maxWidth: 1360, margin: '0 auto' }}>
          <Breadcrumb items={['Yellow Capital', title]} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(48px,6vw,88px)', letterSpacing: '-0.02em', margin: '0 0 20px' }}>
            {title}{em && <> <em style={{ color: 'var(--accent)' }}>{em}</em></>}
          </h1>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontStyle: 'italic', color: 'var(--on-dark-2)', maxWidth: 780 }}>{lede}</p>
        </div>
      </section>
      <Section bg="ink">
        <div style={{ maxWidth: 760, fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: 'var(--on-dark-2)' }}>{body}</div>
      </Section>
      <PreFooter headline="Talk to <em>a principal.</em>" subhead="We respond within two business days." primary="Schedule consultation" ghost="Back home" ghostTo="/" />
    </>
  );
}
