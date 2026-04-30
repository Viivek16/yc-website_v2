'use client';

import { useState, useEffect } from 'react';

interface NewsItem {
  pub: string;
  tag: string;
  headline: string;
  date: string;
  url: string;
  bg: string;
  accent: string;
  w: number;
}

const ITEMS: NewsItem[] = [
  {
    pub: 'The Block',
    tag: 'Article',
    headline: 'Yellow: A Clearing Network Unifying Fragmented Blockchains',
    date: 'Oct 2025',
    url: 'https://www.theblock.co/post/373848/yellow-a-clearing-network-unifying-fragmented-blockchains',
    bg: 'linear-gradient(145deg, #1e1b4b 0%, #312e81 60%, #4c1d95 100%)',
    accent: '#a78bfa',
    w: 400,
  },
  {
    pub: 'CoinDesk',
    tag: 'Event',
    headline: 'Yellow Network — Official Infrastructure Sponsor · Consensus Hong Kong',
    date: 'Apr 2026',
    url: 'https://consensus-hongkong.coindesk.com/agenda/sponsor/-yellow',
    bg: 'linear-gradient(145deg, #0c4a6e 0%, #0369a1 60%, #0284c7 100%)',
    accent: '#38bdf8',
    w: 320,
  },
  {
    pub: 'GlobeNewswire',
    tag: 'Press Release',
    headline: 'Yellow and Unstoppable Domains Launch .yellow Web3 Domains',
    date: 'Jan 2026',
    url: 'https://www.globenewswire.com/news-release/2026/01/06/3213958/0/en/yellow-and-unstoppable-domains-launch-yellow-a-web3-domain-for-identity-connection-and-opportunity.html',
    bg: 'linear-gradient(145deg, #1e3a5f 0%, #1e40af 60%, #1d4ed8 100%)',
    accent: '#60a5fa',
    w: 360,
  },
  {
    pub: 'Chainwire',
    tag: 'Press Release',
    headline: 'Yellow Capital Launches TradePoint to Streamline Token Distribution for Web3 Projects',
    date: 'Feb 2026',
    url: 'https://chainwire.org/2026/02/26/yellow-capital-launches-tradepoint-to-streamline-token-distribution-for-web3-projects/',
    bg: 'linear-gradient(145deg, #14532d 0%, #15803d 60%, #16a34a 100%)',
    accent: '#4ade80',
    w: 300,
  },
  {
    pub: 'Cointelegraph',
    tag: 'Partnership',
    headline: 'Yellow Builders Alliance Announces First Major Partnership with Cointelegraph Accelerator',
    date: 'Mar 2026',
    url: 'https://www.reddit.com/r/defi/comments/1rwg4gs/yellow_builders_alliance_announces_first_major/',
    bg: 'linear-gradient(145deg, #1e3a8a 0%, #2563eb 60%, #3b82f6 100%)',
    accent: '#93c5fd',
    w: 380,
  },
  {
    pub: 'Korea IT Times',
    tag: 'Commentary',
    headline: 'DeFi Security at a Dead-End? — CEO Commentary',
    date: 'Apr 2026',
    url: 'https://www.koreaittimes.com/news/articleView.html?idxno=153419',
    bg: 'linear-gradient(145deg, #7f1d1d 0%, #b91c1c 60%, #dc2626 100%)',
    accent: '#fca5a5',
    w: 300,
  },
  {
    pub: 'XFounders',
    tag: 'Video',
    headline: "What Crypto Founders Don't Know (But Should) — Diego Martin",
    date: 'Jan 2026',
    url: 'https://www.youtube.com/watch?v=JC1-nZvFqU0',
    bg: 'linear-gradient(145deg, #431407 0%, #c2410c 60%, #ea580c 100%)',
    accent: '#fb923c',
    w: 360,
  },
  {
    pub: 'LABITCONF',
    tag: 'Video',
    headline: 'How to Choose a Market Maker for Your Token Launch',
    date: 'Jan 2026',
    url: 'https://www.youtube.com/watch?v=HqM03mz7_OM',
    bg: 'linear-gradient(145deg, #78350f 0%, #b45309 60%, #d97706 100%)',
    accent: '#fbbf24',
    w: 320,
  },
];

const ALL_ITEMS: NewsItem[] = [...ITEMS, ...ITEMS];

const H = 480;
const GAP = 10;

function NewsCard({ pub, tag, headline, date, url, bg, accent, w }: NewsItem) {
  const [hov, setHov] = useState(false);
  const isVideo = tag === 'Video';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: w,
        height: H,
        flexShrink: 0,
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'block',
        filter: hov
          ? 'grayscale(0) brightness(1) contrast(1.05)'
          : 'grayscale(1) brightness(0.42)',
        transform: hov ? 'scale(1.03)' : 'scale(1)',
        transition:
          'filter 600ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Gradient background */}
      <div style={{ position: 'absolute', inset: 0, background: bg }} />

      {/* Subtle grid lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(${accent}20 1px, transparent 1px), linear-gradient(90deg, ${accent}20 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Diagonal stripe texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 20px,
            ${accent}06 20px,
            ${accent}06 21px
          )`,
        }}
      />

      {/* Large watermark pub name */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(-18deg)',
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          fontSize: w > 340 ? 64 : 52,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          color: `${accent}1a`,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {pub}
      </div>

      {/* Radial accent glow center */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: w * 1.2,
          height: H * 0.7,
          background: `radial-gradient(ellipse, ${accent}28 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Bottom gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.88) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '24px 22px',
        }}
      >
        {/* Tag badge */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: accent,
            background: `${accent}18`,
            border: `1px solid ${accent}40`,
            borderRadius: 2,
            padding: '3px 8px',
            display: 'inline-block',
            marginBottom: 14,
          }}
        >
          {isVideo && <span style={{ marginRight: 4 }}>▶</span>}
          {tag}
        </div>

        {/* Publication name */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            fontWeight: 400,
            color: '#fff',
            lineHeight: 1.1,
            marginBottom: 10,
            letterSpacing: '-0.015em',
          }}
        >
          {pub}
        </div>

        {/* Animated rule */}
        <div
          style={{
            height: 1,
            background: accent,
            marginBottom: 12,
            width: 28,
          }}
        />

        {/* Headline */}
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 300,
            fontSize: 12.5,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.72)',
            margin: '0 0 18px',
          }}
        >
          {headline}
        </p>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 12,
            borderTop: `1px solid ${accent}30`,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.38)',
            }}
          >
            {date}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: accent,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            {isVideo ? 'Watch' : 'Read'}{' '}
            <span>{isVideo ? '▶' : '↗'}</span>
          </span>
        </div>
      </div>

      {/* Yellow top-border sweep */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: '#fdda16',
          transform: hov ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      {/* Yellow glowing dot */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: '#fdda16',
          boxShadow: hov ? '0 0 16px 4px rgba(253,218,22,0.55)' : 'none',
          opacity: hov ? 1 : 0,
          transition: 'all 400ms cubic-bezier(0.16,1,0.3,1)',
        }}
      />
    </a>
  );
}

export function InTheNews() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (document.getElementById('itn-kf2')) return;
    const s = document.createElement('style');
    s.id = 'itn-kf2';
    s.textContent =
      '@keyframes itnScroll2 { from { transform: translateX(0); } to { transform: translateX(-50%); } }';
    document.head.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  return (
    <section
      style={{
        background: '#141413',
        color: 'var(--on-dark)',
        paddingTop: 120,
        overflow: 'hidden',
        borderBottom: '1px solid var(--line-soft)',
        position: 'relative',
      }}
    >
      {/* Ambient yellow glow */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '60%',
          width: 1200,
          height: 400,
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(ellipse, rgba(253,218,22,0.04), transparent 65%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Section header */}
      <div
        style={{
          maxWidth: 1360,
          margin: '0 auto',
          padding: '0 40px 56px',
          position: 'relative',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--on-dark-3)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span
            style={{
              width: 24,
              height: 1,
              background: 'var(--accent)',
              display: 'inline-block',
            }}
          />
          03 · In the News
        </div>

        {/* H2 */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(40px, 5vw, 68px)',
            letterSpacing: '-0.02em',
            lineHeight: 1.04,
            margin: '18px 0 20px',
            color: 'var(--on-dark)',
          }}
        >
          In the News
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 300,
            fontSize: 16,
            lineHeight: 1.65,
            color: 'var(--on-dark-2)',
            maxWidth: 580,
            margin: 0,
          }}
        >
          As Seen — Yellow Capital and Yellow Group featured across leading
          publications, media outlets, and global conferences.
        </p>
      </div>

      {/* Auto-scrolling news strip */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          paddingBottom: 48,
        }}
      >
        {/* Left fade */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 120,
            zIndex: 4,
            background: 'linear-gradient(to right, #141413 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
        {/* Right fade */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 120,
            zIndex: 4,
            background: 'linear-gradient(to left, #141413 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Scrolling track */}
        <div
          style={{
            display: 'flex',
            gap: GAP,
            alignItems: 'flex-start',
            width: 'max-content',
            height: H,
            paddingLeft: 40,
            paddingRight: 40,
            animation: 'itnScroll2 60s linear infinite',
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {ALL_ITEMS.map((item, i) => (
            <NewsCard key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
