'use client';

import { useState } from 'react';
import { Section, Eyebrow, GlassCard, Breadcrumb, LiveDot } from '@/components/shared';

type FormState = {
  name: string;
  role: string;
  company: string;
  ctype: string;
  interests: string[];
  stage: string;
  notes: string;
  success: string;
  start: string;
  referred: string;
};

const INTEREST_OPTIONS = ['Market Making', 'Treasury Management', 'Programmatic Sales', 'Venture Investment', 'Other'];
const CTYPE_OPTIONS = ['Token project', 'Fund', 'Exchange', 'Family office', 'Other'];
const START_OPTIONS = ['Within 30 days', 'Within 60 days', 'Within 90 days', 'Exploratory'];

const inputStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontWeight: 300,
  fontSize: 14,
  width: '100%',
  padding: '11px 14px',
  background: 'rgba(20,19,19,0.5)',
  color: 'var(--on-dark)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 2,
  outline: 'none',
  transition: 'border-color 180ms',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'var(--on-dark-3)',
  display: 'block',
  marginBottom: 8,
};

const stepHeadStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'var(--accent)',
  margin: '0 0 18px',
};

export default function ContactPage() {
  const [f, setF] = useState<FormState>({
    name: '', role: '', company: '', ctype: 'Token project', interests: [],
    stage: '', notes: '', success: '', start: 'Within 60 days', referred: '',
  });
  const [submitHover, setSubmitHover] = useState(false);

  const toggleInterest = (k: string) =>
    setF(s => ({ ...s, interests: s.interests.includes(k) ? s.interests.filter(x => x !== k) : [...s.interests, k] }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = Object.entries(f).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join('\n');
    const subject = `Intake: ${f.name || '—'} / ${f.company || '—'}`;
    window.location.href = `mailto:nem@yellow.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <section style={{ background: 'var(--ink)', color: 'var(--on-dark)', padding: '72px 40px 96px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line-soft)' }}>
        <div style={{ position: 'absolute', top: -200, right: -160, width: 820, height: 820, background: 'radial-gradient(circle, rgba(253,218,22,0.06), transparent 62%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1360, margin: '0 auto', position: 'relative' }}>
          <Breadcrumb items={['Yellow Capital', 'Contact']} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(56px,7vw,104px)', letterSpacing: '-0.02em', lineHeight: 1.02, margin: '0 0 28px' }}>
            Start <em style={{ color: 'var(--accent)' }}>a conversation.</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', lineHeight: 1.35, color: 'var(--on-dark-2)', maxWidth: 820 }}>
            We respond to qualified inquiries within two business days. Use the intake below or reach a principal directly.
          </p>
        </div>
      </section>

      <Section bg="ink">
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 56, alignItems: 'start' }}>
          <form onSubmit={onSubmit} style={{ background: 'rgba(20,19,19,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4, padding: 40, display: 'flex', flexDirection: 'column', gap: 36 }}>
            {/* Step 1 */}
            <div>
              <p style={stepHeadStyle}>Step 1 · About you</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                <div>
                  <label style={labelStyle}>Name</label>
                  <input style={inputStyle} value={f.name} onChange={e => setF({ ...f, name: e.target.value })} required />
                </div>
                <div>
                  <label style={labelStyle}>Role</label>
                  <input style={inputStyle} value={f.role} onChange={e => setF({ ...f, role: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Company</label>
                  <input style={inputStyle} value={f.company} onChange={e => setF({ ...f, company: e.target.value })} required />
                </div>
                <div>
                  <label style={labelStyle}>Company type</label>
                  <select style={inputStyle} value={f.ctype} onChange={e => setF({ ...f, ctype: e.target.value })}>
                    {CTYPE_OPTIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <p style={stepHeadStyle}>Step 2 · About the engagement</p>
              <label style={labelStyle}>Interest (multi-select)</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
                {INTEREST_OPTIONS.map(k => {
                  const on = f.interests.includes(k);
                  return (
                    <button
                      type="button"
                      key={k}
                      onClick={() => toggleInterest(k)}
                      style={{
                        fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase',
                        padding: '8px 12px', borderRadius: 2, cursor: 'pointer',
                        background: on ? 'rgba(253,218,22,0.14)' : 'transparent',
                        color: on ? 'var(--accent)' : 'var(--on-dark-2)',
                        border: `1px solid ${on ? 'rgba(253,218,22,0.5)' : 'rgba(255,255,255,0.12)'}`,
                        boxShadow: on ? '0 0 14px rgba(253,218,22,0.18)' : 'none',
                        transition: 'all 200ms',
                      }}
                    >{k}</button>
                  );
                })}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 18 }}>
                <div>
                  <label style={labelStyle}>Stage</label>
                  <input style={inputStyle} value={f.stage} onChange={e => setF({ ...f, stage: e.target.value })} placeholder="pre-TGE · launching · live · post-listing" />
                </div>
                <div>
                  <label style={labelStyle}>Notes</label>
                  <textarea rows={4} style={{ ...inputStyle, resize: 'vertical' }} value={f.notes} onChange={e => setF({ ...f, notes: e.target.value })} placeholder="Be candid — this note goes to a principal, not a BD desk." />
                </div>
                <div>
                  <label style={labelStyle}>What a successful engagement looks like</label>
                  <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={f.success} onChange={e => setF({ ...f, success: e.target.value })} />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <p style={stepHeadStyle}>Step 3 · Logistics</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                <div>
                  <label style={labelStyle}>Target start</label>
                  <select style={inputStyle} value={f.start} onChange={e => setF({ ...f, start: e.target.value })}>
                    {START_OPTIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Referred by (optional)</label>
                  <input style={inputStyle} value={f.referred} onChange={e => setF({ ...f, referred: e.target.value })} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 18, borderTop: '1px solid var(--line-soft)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--on-dark-3)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <LiveDot size={6} /> Response · 2 business days
              </span>
              <button
                type="submit"
                onMouseEnter={() => setSubmitHover(true)}
                onMouseLeave={() => setSubmitHover(false)}
                style={{
                  fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 500, padding: '14px 24px',
                  background: submitHover ? 'var(--accent)' : 'var(--cta)',
                  boxShadow: submitHover ? '0 0 36px rgba(255,177,0,0.32)' : 'none',
                  color: 'var(--ink)', border: 0, borderRadius: 4, cursor: 'pointer',
                  display: 'inline-flex', gap: 10, alignItems: 'center', transition: 'background 200ms, box-shadow 200ms',
                }}
              >Send intake <span>→</span></button>
            </div>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <GlassCard style={{ padding: 26 }}>
              <Eyebrow>02 · Direct lines</Eyebrow>
              <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {([['Sales', 'nem@yellow.com'], ['Marketing & Partnerships', 'marketing@yellow.com'], ['Official', 'capital@yellow.com']] as [string, string][]).map(([l, e]) => (
                  <DirectLine key={l} label={l} email={e} />
                ))}
              </div>
            </GlassCard>

            <GlassCard style={{ padding: 26 }}>
              <Eyebrow>03 · Offices</Eyebrow>
              <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {([['Dubai', 'HQ'], ['Chiang Mai', 'APAC'], ['Andorra', 'EU'], ['Buenos Aires', 'US']] as [string, string][]).map(([c, r]) => (
                  <div key={c} style={{ padding: '14px 0', borderTop: '1px solid var(--line-soft)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>{r}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginTop: 4, color: 'var(--on-dark)' }}>{c}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>
    </>
  );
}

function DirectLine({ label, email }: { label: string; email: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={`mailto:${email}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderTop: '1px solid var(--line-soft)', fontFamily: 'var(--font-ui)', fontSize: 14, color: hovered ? 'var(--accent)' : 'var(--on-dark)', textDecoration: 'none', transition: 'color 180ms' }}
    >
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>{label}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, marginTop: 3 }}>{email}</div>
      </div>
      <span>→</span>
    </a>
  );
}
