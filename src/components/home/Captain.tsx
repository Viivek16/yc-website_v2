import Image from 'next/image';
import { Section, Eyebrow, Chip, Reveal } from '@/components/shared';

export function Captain() {
  return (
    <Section bg="ink">
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 72, alignItems: 'center' }}>
        <Reveal>
          <div style={{ aspectRatio: '3 / 4', borderRadius: 4, background: 'linear-gradient(145deg, #1c1b19 0%, #141413 100%)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: 'var(--sh-md)', position: 'relative', overflow: 'hidden' }}>
            <Image
              src="/assets/team/alexis.jpg"
              alt="Alexis Sirkia"
              fill
              style={{ objectFit: 'cover', filter: 'grayscale(0.15) contrast(1.05)' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(10,10,10,0.85) 100%)' }} />
            <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>Founder & Chairman</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginTop: 4 }}>Alexis Sirkia</div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--on-dark-3)' }}>2017 —</div>
            </div>
          </div>
        </Reveal>

        <div>
          <Eyebrow accentRule>Founder</Eyebrow>
          <h2 className="h2" style={{ margin: '18px 0 28px', fontStyle: 'italic' }}>Let us take the wheel.</h2>
          <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 17.5, lineHeight: 1.65, color: 'var(--on-dark-2)', maxWidth: 620 }}>
            Alexis Sirkia (the Captain) is a renowned leader and the visionary Chairman of Yellow Group. Before pioneering digital-asset infrastructure, Alexis served as a rocket scientist at the GTD European Space Center. He co-founded GSR in 2013 and went on to start Yellow Capital in 2017, bringing engineering-precision knowledge and a vision to provide cutting-edge liquidity solutions for the digital-asset landscape.
          </p>
          <div style={{ display: 'flex', gap: 6, marginTop: 32, flexWrap: 'wrap' }}>
            <Chip>GSR · Co-founder</Chip>
            <Chip>Rocket Scientist · GTD</Chip>
            <Chip>Chairman · Yellow Group</Chip>
          </div>
        </div>
      </div>
    </Section>
  );
}
