import { Section, Eyebrow, BtnGhost } from '@/components/shared';
import { EcosystemConstellation } from './EcosystemConstellation';

export function HomeEcosystem() {
  return (
    <Section bg="ink">
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 64, alignItems: 'center' }}>
        <div>
          <Eyebrow accentRule>04 · Ecosystem</Eyebrow>
          <h2 className="h2" style={{ margin: '18px 0 22px' }}>
            Part of a <em>complete digital-asset ecosystem.</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 16.5, lineHeight: 1.6, color: 'var(--on-dark-2)', maxWidth: 480, marginBottom: 28 }}>
            Yellow Capital is one of five Yellow Group entities. Trading infrastructure, editorial reach, protocol layer, and token distribution — a single counterparty with every piece of the stack.
          </p>
          <BtnGhost href="/ecosystem">Explore Yellow Group</BtnGhost>
        </div>
        <EcosystemConstellation />
      </div>
    </Section>
  );
}
