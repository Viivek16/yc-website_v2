'use client';

import { useState, useEffect } from 'react';
import { Section, Eyebrow, Reveal } from '@/components/shared';

type TagType = 'Article' | 'Press Release' | 'Partnership' | 'Commentary' | 'Video' | 'Event';

interface NewsItem {
  pub: string;
  tag: TagType;
  headline: string;
  date: string;
  url: string;
  cta: 'Read' | 'Watch' | 'View';
}

const ITEMS: NewsItem[] = [
  {
    pub: 'The Block',
    tag: 'Article',
    headline: 'Yellow: A Clearing Network Unifying Fragmented Blockchains',
    date: 'Oct 2025',
    url: 'https://www.theblock.co/post/373848/yellow-a-clearing-network-unifying-fragmented-blockchains',
    cta: 'Read',
  },
  {
    pub: 'CoinDesk',
    tag: 'Event',
    headline: 'Yellow Network — Official Infrastructure Sponsor · Consensus Hong Kong',
    date: 'Apr 2026',
    url: 'https://consensus-hongkong.coindesk.com/agenda/sponsor/-yellow',
    cta: 'View',
  },
  {
    pub: 'GlobeNewswire',
    tag: 'Press Release',
    headline: 'Yellow and Unstoppable Domains Launch .yellow Web3 Domains',
    date: 'Jan 2026',
    url: 'https://www.globenewswire.com/news-release/2026/01/06/3213958/0/en/yellow-and-unstoppable-domains-launch-yellow-a-web3-domain-for-identity-connection-and-opportunity.html',
    cta: 'Read',
  },
  {
    pub: 'Chainwire',
    tag: 'Press Release',
    headline: 'Yellow Capital Launches TradePoint to Streamline Token Distribution for Web3 Projects',
    date: 'Feb 2026',
    url: 'https://chainwire.org/2026/02/26/yellow-capital-launches-tradepoint-to-streamline-token-distribution-for-web3-projects/',
    cta: 'Read',
  },
  {
    pub: 'Cointelegraph',
    tag: 'Partnership',
    headline: 'Yellow Builders Alliance Announces First Major Partnership with Cointelegraph Accelerator',
    date: 'Mar 2026',
    url: 'https://www.reddit.com/r/defi/comments/1rwg4gs/yellow_builders_alliance_announces_first_major/',
    cta: 'Read',
  },
  {
    pub: 'Korea IT Times',
    tag: 'Commentary',
    headline: 'DeFi Security at a Dead-End? — CEO Commentary',
    date: 'Apr 2026',
    url: 'https://www.koreaittimes.com/news/articleView.html?idxno=153419',
    cta: 'Read',
  },
  {
    pub: 'XFounders',
    tag: 'Video',
    headline: "What Crypto Founders Don't Know (But Should) — Diego Martin",
    date: 'Jan 2026',
    url: 'https://www.youtube.com/watch?v=JC1-nZvFqU0',
    cta: 'Watch',
  },
  {
    pub: 'LABITCONF',
    tag: 'Video',
    headline: 'How to Choose a Market Maker for Your Token Launch',
    date: 'Jan 2026',
    url: 'https://www.youtube.com/watch?v=HqM03mz7_OM',
    cta: 'Watch',
  },
];

const TICKER_PUBS = [...ITEMS.map(i => i.pub), ...ITEMS.map(i => i.pub)];

function NewsCard({ pub, tag, headline, date, url, cta, index }: NewsItem & { index: number }) {
  const [hovered, setHovered] = useState(false);
  const isVideo = tag === 'Video';

  return (
    <Reveal delay={index * 55}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          textDecoration: 'none',
          color: 'var(--on-dark)',
          background: hovered ? 'rgba(28,27,25,0.95)' : 'rgba(10,10,10,0.5)',
          backdropFilter: 'blur(12px)',
          borderRadius: 4,
          border: '1px solid rgba(255,255,255,0.08)',
          borderTop: `2px solid ${hovered ? 'var(--accent)' : 'rgba(255,255,255,0.05)'}`,
          padding: '26px 26px 22px',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hovered
            ? '0 24px 56px -12px rgba(0,0,0,0.55), 0 0 0 1px rgba(253,218,22,0.07), inset 0 1px 0 rgba(255,255,255,0.04)'
            : '0 2px 8px -2px rgba(0,0,0,0.25)',
          transition: 'all 280ms cubic-bezier(0.16,1,0.3,1)',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Radial glow behind top border */}
        <div style={{
          position: 'absolute',
          top: -1, left: '5%', right: '5%',
          height: 60,
          background: 'radial-gradient(ellipse at top, rgba(253,218,22,0.22), transparent 65%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 320ms',
          pointerEvents: 'none',
          filter: 'blur(4px)',
        }} />

        {/* Tag badge */}
        <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            background: 'rgba(253,218,22,0.07)',
            border: '1px solid rgba(253,218,22,0.15)',
            borderRadius: 2,
            padding: '3px 8px',
            lineHeight: 1.6,
          }}>
            {isVideo && <span style={{ marginRight: 4 }}>▶</span>}{tag}
          </span>
        </div>

        {/* Publication name */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 24,
          fontWeight: 400,
          letterSpacing: '-0.015em',
          lineHeight: 1.1,
          color: hovered ? '#fff' : 'var(--on-dark)',
          marginBottom: 14,
          transition: 'color 220ms',
        }}>
          {pub}
        </div>

        {/* Animated rule */}
        <div style={{
          height: 1,
          background: hovered ? 'var(--accent)' : 'var(--line-soft)',
          marginBottom: 14,
          width: hovered ? '100%' : 28,
          transition: 'width 340ms cubic-bezier(0.16,1,0.3,1), background 220ms',
        }} />

        {/* Headline */}
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontWeight: 300,
          fontSize: 13.5,
          lineHeight: 1.65,
          color: hovered ? 'var(--on-dark)' : 'var(--on-dark-2)',
          margin: '0 0 20px',
          flex: 1,
          transition: 'color 220ms',
        }}>
          {headline}
        </p>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 14,
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--on-dark-3)',
          }}>
            {date}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: hovered ? 'var(--accent)' : 'var(--on-dark-3)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'color 220ms',
          }}>
            {cta}
            <span style={{
              display: 'inline-block',
              transition: 'transform 240ms cubic-bezier(0.16,1,0.3,1)',
              transform: hovered ? (isVideo ? 'scale(1.3)' : 'translateX(5px)') : 'none',
            }}>
              {isVideo ? '▶' : '↗'}
            </span>
          </span>
        </div>
      </a>
    </Reveal>
  );
}

export function InTheNews() {
  useEffect(() => {
    if (document.getElementById('itn-kf')) return;
    const s = document.createElement('style');
    s.id = 'itn-kf';
    s.textContent = '@keyframes itnScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }';
    document.head.appendChild(s);
    return () => { s.remove(); };
  }, []);

  return (
    <Section bg="ink2">
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: -120, right: -80,
        width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(253,218,22,0.05), transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Section header */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'end', marginBottom: 56 }}>
        <div>
          <Eyebrow accentRule>03 · In the News</Eyebrow>
          <h2 className="h2" style={{ margin: '18px 0 20px' }}>
            The market <em>is watching.</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 16.5, lineHeight: 1.6, color: 'var(--on-dark-2)', maxWidth: 540, margin: 0 }}>
            Yellow Capital and Yellow Group featured across leading publications, media outlets, and global conferences.
          </p>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--on-dark)' }}>
            {ITEMS.length}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--on-dark-3)', marginTop: 6 }}>
            Features
          </div>
        </div>
      </div>

      {/* Scrolling ticker */}
      <div style={{ overflow: 'hidden', marginBottom: 56, position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 100, zIndex: 2, background: 'linear-gradient(to right, var(--ink-2), transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 100, zIndex: 2, background: 'linear-gradient(to left, var(--ink-2), transparent)', pointerEvents: 'none' }} />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          width: 'max-content',
          animation: 'itnScroll 22s linear infinite',
          borderTop: '1px solid var(--line-soft)',
          borderBottom: '1px solid var(--line-soft)',
          padding: '14px 0',
        }}>
          {TICKER_PUBS.map((name, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(20px, 2.4vw, 32px)',
                fontWeight: 400,
                letterSpacing: '-0.018em',
                color: i % 2 === 0 ? 'var(--on-dark-3)' : 'rgba(233,230,223,0.18)',
                fontStyle: i % 3 === 0 ? 'italic' : 'normal',
                padding: '0 28px',
                whiteSpace: 'nowrap',
              }}>
                {name}
              </span>
              <span style={{ color: 'var(--accent)', fontSize: 8, lineHeight: 1, flexShrink: 0, opacity: 0.6 }}>◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {ITEMS.map((item, i) => (
          <NewsCard key={i} {...item} index={i} />
        ))}
      </div>
    </Section>
  );
}
