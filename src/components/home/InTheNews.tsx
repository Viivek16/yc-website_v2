'use client';

import { useState, useEffect } from 'react';

// ── Data ───────────────────────────────────────────────────────────
interface NewsItem {
  pub: string;
  /** Lines to display as the publication "logo mark" */
  pubLines: string[];
  tag: string;
  isVideo: boolean;
  headline: string;
  date: string;
  url: string;
  /** Brand color shown on hover against the yellow card background */
  logoColor: string;
}

const ITEMS: NewsItem[] = [
  {
    pub: 'The Block',
    pubLines: ['The Block'],
    tag: 'Article',
    isVideo: false,
    headline: 'Yellow: A Clearing Network Unifying Fragmented Blockchains',
    date: 'Oct 2025',
    url: 'https://www.theblock.co/post/373848/yellow-a-clearing-network-unifying-fragmented-blockchains',
    logoColor: '#0f0f0f',
  },
  {
    pub: 'CoinDesk',
    pubLines: ['CoinDesk'],
    tag: 'Event',
    isVideo: false,
    headline: 'Yellow Network — Official Infrastructure Sponsor · Consensus Hong Kong',
    date: 'Apr 2026',
    url: 'https://consensus-hongkong.coindesk.com/agenda/sponsor/-yellow',
    logoColor: '#CC4400',
  },
  {
    pub: 'GlobeNewswire',
    pubLines: ['Globe', 'Newswire'],
    tag: 'Press Release',
    isVideo: false,
    headline: 'Yellow and Unstoppable Domains Launch .yellow Web3 Domains',
    date: 'Jan 2026',
    url: 'https://www.globenewswire.com/news-release/2026/01/06/3213958/0/en/yellow-and-unstoppable-domains-launch-yellow-a-web3-domain-for-identity-connection-and-opportunity.html',
    logoColor: '#1565C0',
  },
  {
    pub: 'Chainwire',
    pubLines: ['Chainwire'],
    tag: 'Press Release',
    isVideo: false,
    headline: 'Yellow Capital Launches TradePoint to Streamline Token Distribution for Web3 Projects',
    date: 'Feb 2026',
    url: 'https://chainwire.org/2026/02/26/yellow-capital-launches-tradepoint-to-streamline-token-distribution-for-web3-projects/',
    logoColor: '#1B5E20',
  },
  {
    pub: 'Cointelegraph',
    pubLines: ['Coin', 'telegraph'],
    tag: 'Partnership',
    isVideo: false,
    headline: 'Yellow Builders Alliance Announces First Major Partnership with Cointelegraph Accelerator',
    date: 'Mar 2026',
    url: 'https://www.reddit.com/r/defi/comments/1rwg4gs/yellow_builders_alliance_announces_first_major/',
    logoColor: '#1565C0',
  },
  {
    pub: 'Korea IT Times',
    pubLines: ['Korea', 'IT Times'],
    tag: 'Commentary',
    isVideo: false,
    headline: 'DeFi Security at a Dead-End? — CEO Commentary',
    date: 'Apr 2026',
    url: 'https://www.koreaittimes.com/news/articleView.html?idxno=153419',
    logoColor: '#B71C1C',
  },
  {
    pub: 'XFounders',
    pubLines: ['XFounders'],
    tag: 'Video',
    isVideo: true,
    headline: "What Crypto Founders Don't Know (But Should) — Diego Martin",
    date: 'Jan 2026',
    url: 'https://www.youtube.com/watch?v=JC1-nZvFqU0',
    logoColor: '#4527A0',
  },
  {
    pub: 'LABITCONF',
    pubLines: ['LABIT', 'CONF'],
    tag: 'Video',
    isVideo: true,
    headline: 'How to Choose a Market Maker for Your Token Launch',
    date: 'Jan 2026',
    url: 'https://www.youtube.com/watch?v=HqM03mz7_OM',
    logoColor: '#BF360C',
  },
];

const ALL_ITEMS: NewsItem[] = [...ITEMS, ...ITEMS];

// ── Layout constants ───────────────────────────────────────────────
const CARD_W = 340;
const H = 480;
const GAP = 10;
/** Fraction of card height used for the logo area */
const LOGO_RATIO = 0.55;

// ── Card ───────────────────────────────────────────────────────────
function NewsCard({
  pub,
  pubLines,
  tag,
  isVideo,
  headline,
  date,
  url,
  logoColor,
}: NewsItem) {
  const [hov, setHov] = useState(false);
  const multiLine = pubLines.length > 1;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={`${pub} — ${headline}`}
      style={{
        width: CARD_W,
        height: H,
        flexShrink: 0,
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'block',
      }}
    >
      {/* ── Background: dark (default) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #1c1c1a 0%, #0a0a09 100%)',
          opacity: hov ? 0 : 1,
          transition: 'opacity 500ms cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      {/* ── Background: yellow (hover) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#fdda16',
          opacity: hov ? 1 : 0,
          transition: 'opacity 500ms cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      {/* ── Subtle grid overlay ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
          opacity: hov ? 0 : 1,
          transition: 'opacity 500ms',
        }}
      />

      {/* ── Logo area (top 55 %) ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: `${LOGO_RATIO * 100}%`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 20px',
          gap: 2,
          // Only the logo gets the grayscale ↔ color treatment
          filter: hov ? 'grayscale(0)' : 'grayscale(1)',
          transition: 'filter 600ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {pubLines.map((line, i) => (
          <div
            key={i}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: multiLine ? 42 : 46,
              letterSpacing: '-0.025em',
              lineHeight: 1,
              color: logoColor,
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {line}
          </div>
        ))}
      </div>

      {/* ── Divider between logo and content ── */}
      <div
        style={{
          position: 'absolute',
          top: `${LOGO_RATIO * 100}%`,
          left: 22,
          right: 22,
          height: 1,
          background: hov
            ? 'rgba(0,0,0,0.14)'
            : 'rgba(255,255,255,0.07)',
          transition: 'background 400ms',
        }}
      />

      {/* ── Content area (bottom 45 %) ── */}
      <div
        style={{
          position: 'absolute',
          top: `${LOGO_RATIO * 100}%`,
          bottom: 0,
          left: 0,
          right: 0,
          padding: '18px 22px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Tag badge */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: hov ? '#0a0a0a' : '#fdda16',
              background: hov
                ? 'rgba(0,0,0,0.1)'
                : 'rgba(253,218,22,0.1)',
              border: hov
                ? '1px solid rgba(0,0,0,0.22)'
                : '1px solid rgba(253,218,22,0.3)',
              borderRadius: 2,
              padding: '3px 8px',
              display: 'inline-block',
              marginBottom: 10,
              transition: 'color 350ms, background 350ms, border 350ms',
            }}
          >
            {isVideo && <span style={{ marginRight: 4 }}>▶</span>}
            {tag}
          </div>

          {/* Headline */}
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 300,
              fontSize: 12.5,
              lineHeight: 1.6,
              color: hov ? 'rgba(0,0,0,0.72)' : 'rgba(255,255,255,0.68)',
              margin: 0,
              transition: 'color 400ms',
            }}
          >
            {headline}
          </p>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 10,
            borderTop: hov
              ? '1px solid rgba(0,0,0,0.14)'
              : '1px solid rgba(255,255,255,0.07)',
            transition: 'border-color 400ms',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: hov ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.32)',
              transition: 'color 400ms',
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
              color: hov ? '#0a0a0a' : '#fdda16',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              transition: 'color 400ms',
            }}
          >
            {isVideo ? 'Watch' : 'Read'}
            <span
              style={{
                display: 'inline-block',
                transition: 'transform 240ms cubic-bezier(0.16,1,0.3,1)',
                transform: hov
                  ? isVideo
                    ? 'scale(1.3)'
                    : 'translateX(4px)'
                  : 'none',
              }}
            >
              {isVideo ? '▶' : '↗'}
            </span>
          </span>
        </div>
      </div>

      {/* ── Top-border sweep (dark, only visible on yellow bg) ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: '#0a0a0a',
          transform: hov ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
        }}
      />
    </a>
  );
}

// ── Section ────────────────────────────────────────────────────────
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
          top: '55%',
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

      {/* Auto-scrolling strip */}
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
            background:
              'linear-gradient(to right, #141413 0%, transparent 100%)',
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
            background:
              'linear-gradient(to left, #141413 0%, transparent 100%)',
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
