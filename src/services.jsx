// services.jsx — four service pages
const ServiceHero = ({ n, section, title, em, lede, rail, primary = 'Get in Touch', ghost = 'Know More', ghostHref = '#content', go }) => (
  <section style={{ background: 'var(--ink)', color: 'var(--on-dark)', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line-soft)', padding: '72px 40px 80px' }}>
    <div style={{ position: 'absolute', top: -180, right: -140, width: 760, height: 760, background: 'radial-gradient(circle, rgba(253,218,22,0.06), transparent 62%)', pointerEvents: 'none' }} />
    <div style={{ maxWidth: 1360, margin: '0 auto', position: 'relative' }}>
      <Breadcrumb items={['Yellow Capital', `Services · ${n}`, section]} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 11fr', gap: 28, alignItems: 'start' }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400,
          fontSize: 'clamp(80px, 9vw, 140px)', letterSpacing: '-0.03em', lineHeight: 1,
          color: 'var(--on-dark-3)', filter: 'drop-shadow(0 0 40px rgba(253,218,22,0.18))',
        }}>{n}</div>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(52px, 6.4vw, 96px)', letterSpacing: '-0.02em', lineHeight: 1.02, margin: '0 0 24px' }}>
            {title} <em style={{ fontStyle: 'italic', color: 'var(--accent)', filter: 'drop-shadow(0 0 20px rgba(253,218,22,0.3))' }}>{em}</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.35, color: 'var(--on-dark-2)', maxWidth: 760, margin: 0, fontStyle: 'italic', fontWeight: 400 }}>{lede}</p>
          <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap' }}>
            <BtnPrimary size="lg">{primary}</BtnPrimary>
            <BtnGhost arrow="↓" href={ghostHref}>{ghost}</BtnGhost>
          </div>
        </div>
      </div>
      {rail && (
        <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: `repeat(${rail.length}, 1fr)`, borderTop: '1px solid rgba(255,255,255,0.14)', borderBottom: '1px solid rgba(255,255,255,0.14)' }}>
          {rail.map((c, i) => (
            <div key={i} style={{
              padding: '26px 24px', borderRight: i < rail.length - 1 ? '1px solid var(--line-soft)' : 0,
              background: 'rgba(20,19,19,0.3)', backdropFilter: 'blur(6px)',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>{c.l}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 36, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums', marginTop: 8, lineHeight: 1 }}>{c.v}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
);

const FeatureCards = ({ cols = 3, items, bg = 'ink' }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 14 }}>
    {items.map((it, i) => (
      <Reveal key={i} delay={i * 60}>
        <GlassCard style={{ padding: 32, height: '100%' }}>
          {it.n && <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'var(--accent)', lineHeight: 1, marginBottom: 16, filter: 'drop-shadow(0 0 14px rgba(253,218,22,0.25))' }}>{it.n}</div>}
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 24, letterSpacing: '-0.01em', lineHeight: 1.15, margin: '0 0 12px' }}>{it.title}</h3>
          <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 14.5, lineHeight: 1.6, color: 'var(--on-dark-2)' }}>{it.body}</p>
        </GlassCard>
      </Reveal>
    ))}
  </div>
);

// ─── Market Making ─────────────────────────────────────────────
const LedgerExhibit = () => {
  const rows = [
    ['BTC/USDT', 'Binance',   4.2, 0.3,  284_000_000, [2,5,3,7,6,8,5,9,7,10]],
    ['ETH/USDT', 'OKX',       5.1, -0.4, 182_400_000, [6,4,5,7,5,4,6,8,7,6]],
    ['SOL/USDT', 'Bybit',     6.8, 1.2,  94_200_000,  [3,4,6,7,9,8,10,9,11,12]],
    ['ARB/USDT', 'Binance',   7.4, -0.1, 38_100_000,  [5,6,5,7,6,5,4,5,6,7]],
    ['OP/USDT',  'KuCoin',    8.2, 0.8,  28_900_000,  [4,5,6,7,8,7,9,10,9,11]],
    ['DOGE/USDT','Binance',   3.9, 0.5,  142_700_000, [7,6,8,7,9,8,10,11,10,12]],
    ['MATIC/USDT','Bitget',   6.4, -0.2, 41_200_000,  [6,7,5,6,5,4,6,5,7,6]],
    ['LINK/USDT','Binance',   5.6, 0.7,  67_800_000,  [4,5,7,6,8,9,7,10,11,10]],
  ];
  const Spark = ({ d }) => {
    const max = Math.max(...d), min = Math.min(...d);
    const pts = d.map((v, i) => `${(i / (d.length - 1)) * 60},${18 - ((v - min) / (max - min)) * 16 - 1}`).join(' ');
    return <svg viewBox="0 0 60 18" width="60" height="18"><polyline points={pts} fill="none" stroke="#fdda16" strokeWidth="1" /></svg>;
  };
  return (
    <div style={{ background: 'rgba(20,19,19,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, boxShadow: 'var(--sh-md)', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(10,10,10,0.5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LiveDot size={6} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--on-dark)' }}>Live · Q1 2026 · Week 8</span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>Published Mon 09:00 UTC</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1.4fr 1fr', padding: '12px 20px', fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--on-dark-3)', borderBottom: '1px solid var(--line-soft)' }}>
        <span>Pair</span><span>Venue</span><span>Spread (bps)</span><span>Inventory</span><span>Volume 7d</span><span style={{ textAlign: 'right' }}>Trend</span>
      </div>
      {rows.map((r, i) => (
        <div key={i} className="ledger-row" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1.4fr 1fr', padding: '14px 20px', fontFamily: 'var(--font-mono)', fontSize: 12, fontVariantNumeric: 'tabular-nums', borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 220ms', alignItems: 'center' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(28,27,25,0.6)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          <span style={{ color: 'var(--on-dark)' }}>{r[0]}</span>
          <span style={{ color: 'var(--on-dark-2)' }}>{r[1]}</span>
          <span style={{ color: 'var(--on-dark)' }}>{r[2].toFixed(1)}</span>
          <span style={{ color: r[3] >= 0 ? '#4ade80' : '#ef4444' }}>{r[3] > 0 ? '+' : ''}{r[3].toFixed(1)}%</span>
          <span style={{ color: 'var(--on-dark)' }}>${(r[4] / 1e6).toFixed(1)}M</span>
          <span style={{ textAlign: 'right' }}><Spark d={r[5]} /></span>
        </div>
      ))}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '18px 20px', background: 'rgba(10,10,10,0.5)', borderTop: '1px solid var(--line-soft)' }}>
        {[['Active pairs', '142'], ['Median spread', '4.2 bps'], ['Weekly volume', '$1.04B'], ['Inventory util.', '58%']].map(([l, v]) => (
          <div key={l}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--on-dark-3)' }}>{l}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontVariantNumeric: 'tabular-nums', marginTop: 4, color: 'var(--on-dark)' }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Shared FAQ component ────────────────────────────────────
const ServiceFAQ = ({ items }) => {
  const [open, setOpen] = React.useState(null);
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
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 24 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(17px,2vw,22px)', fontWeight: 400, letterSpacing: '-0.01em', color: 'var(--on-dark)', lineHeight: 1.25 }}>{item.q}</span>
                  <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: 2, border: '1px solid rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isOpen ? 'var(--accent)' : 'var(--on-dark-3)', fontSize: 18, fontFamily: 'var(--font-ui)', transition: 'color 220ms, border-color 220ms', borderColor: isOpen ? 'rgba(253,218,22,0.4)' : 'rgba(255,255,255,0.14)' }}>
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
};

const MarketMakingPage = ({ go }) => (
  <React.Fragment>
    <ServiceHero n="01" section="Market Making"
      title="Institutional Market Making." em="Aligned Liquidity."
      lede="We replace hidden price pressure and sudden volatility with a multi-layered liquidity framework engineered for sustainable growth."
      rail={[{l:'Venues',v:'11'},{l:'Pairs',v:'142'},{l:'Uptime',v:'99.97%'},{l:'Transparency',v:'Weekly'}]}
    />
    <Section id="content" bg="ink">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        <div style={{ padding: '48px 48px 48px 0', borderRight: '1px solid var(--line-soft)' }}>
          <Eyebrow accentRule>01 · The problem</Eyebrow>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 34, lineHeight: 1.1, margin: '18px 0 18px' }}>The wrong market maker <em>derails projects.</em></h3>
          <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 16, lineHeight: 1.65, color: 'var(--on-dark-2)' }}>Panic selling, thin order books, and hidden price pressure are the quiet killers of otherwise healthy tokens. Most of the damage is done before the project realises what is happening on the book.</p>
        </div>
        <div style={{ padding: '48px 0 48px 48px' }}>
          <Eyebrow accentRule>01 · The Yellow solution</Eyebrow>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 34, lineHeight: 1.1, margin: '18px 0 18px' }}>We solve illiquid markets.</h3>
          <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 16, lineHeight: 1.65, color: 'var(--on-dark-2)', marginBottom: 18 }}>Our data-driven strategies are designed to create:</p>
          {['Deeper order books', 'Significantly tighter spreads', 'Sustainable volume and long-term trust'].map((l, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 0', borderTop: i === 0 ? '1px solid var(--line-soft)' : 0, borderBottom: '1px solid var(--line-soft)', fontFamily: 'var(--font-ui)', fontSize: 15, color: 'var(--on-dark)' }}>
              <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>0{i+1}</span>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
    <Section bg="ink2">
      <div style={{ marginBottom: 56 }}>
        <Eyebrow accentRule>02 · Execution</Eyebrow>
        <h2 className="h2" style={{ margin: '18px 0 22px', maxWidth: 900 }}>Instead of a single, rigid strategy, we deploy <em>a full institutional framework</em> across top CEXs.</h2>
      </div>
      <FeatureCards cols={2} items={[
        { title: 'Dynamic Adjustment.', body: 'Our algorithms dynamically adapt to live conditions using volatility-aware spread logic and inventory-based risk management.' },
        { title: 'Balanced Depth.', body: 'We strictly maintain balanced buy- and sell-side depth to incentivise organic trading activity and drastically reduce slippage.' },
      ]} />
    </Section>
    <Section bg="ink">
      <div style={{ marginBottom: 40 }}>
        <Eyebrow accentRule>03 · Weekly ledger</Eyebrow>
        <h2 className="h2" style={{ margin: '18px 0 0' }}>Transparency, <em>line by line.</em></h2>
      </div>
      <LedgerExhibit />
    </Section>
    <Section bg="ink2">
      <div style={{ marginBottom: 56 }}>
        <Eyebrow accentRule>04 · Engagement</Eyebrow>
        <h2 className="h2" style={{ margin: '18px 0 0' }}>Your liquidity goals <em>dictate our structure.</em></h2>
      </div>
      <FeatureCards cols={2} items={[
        { title: 'Define the Objective.', body: 'Whether you need organic volume growth, market stability, post-listing performance, or treasury optimisation.' },
        { title: 'Transparent Models.', body: 'We operate on transparent, flexible structures, offering Retainer, Liquidity Provision & Loan, or customised Hybrid models.' },
      ]} />
    </Section>
    <ServiceFAQ items={[
      { q: 'Do you provide support for new CEX listings?', a: 'Yes. Beyond market making, we do help connect projects with over 140+ CEXs in our network based on their focus and listing strategy.' },
      { q: 'How do you prevent sudden volatility and order book thinning?', a: 'Our algorithms are specifically engineered to maintain a strictly balanced buy-and-sell-side depth at all times. By continuously adapting to market momentum, we act as a stabilizing force that builds deeper, healthier order books, ultimately maintaining trust with both traders and exchanges.' },
      { q: 'What is "hidden price pressure," and how does Yellow Capital avoid it?', a: 'Most MM firms operate with misaligned incentives, which can lead to panic selling or dumping tokens to cover their own risks. Yellow Capital eliminates this conflict by utilizing data-driven, multi-layered strategies designed strictly to balance market depth and drive sustainable, long-term growth.' },
      { q: "What exactly is Yellow Capital's 'Multi-Layered Liquidity Framework'?", a: 'Instead of relying on a single, rigid strategy, we deploy advanced algorithms that dynamically adjust to live market conditions. This framework utilizes volatility-aware spread logic and inventory-based risk management to tighten spreads, drastically reduce slippage, and incentivize organic trading activity.' },
    ]} />
    <PreFooter
      headline="Ready to see a <em>weekly ledger?</em>"
      subhead="Request a sample from the most recent publication — redacted where required, complete everywhere else."
      primary="Request a sample"
      ghost="All services"
      ghostTo="/"
    />
  </React.Fragment>
);

// ─── Treasury Management ─────────────────────────────────────
const TreasuryPage = ({ go }) => (
  <React.Fragment>
    <ServiceHero n="02" section="Treasury Management"
      title="Strategic Treasury Building." em="Zero Market Impact."
      lede="Build a sustainable runway with our algorithmic model, liquidating tokens to accumulate a diversified treasury at favourable prices."
      rail={[{l:'Min USDT payback',v:'30%'},{l:'Reporting',v:'Weekly'},{l:'Liquidity',v:'On-demand'},{l:'Control',v:'You keep it'}]}
    />
    <Section id="content" bg="ink2">
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 48, alignItems: 'start' }}>
        <div>
          <Eyebrow accentRule>01 · Do you know?</Eyebrow>
          <h2 className="h2" style={{ margin: '18px 0 0' }}>The old model <em>is broken.</em></h2>
        </div>
        <GlassCard style={{ padding: 36 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.4, color: 'var(--on-dark)', margin: 0, fontStyle: 'italic' }}>
            Lending tokens to a market maker only to receive the same tokens back does not build a sustainable runway. Worse, traditional loans incentivise market makers to crash your token's price to repay at a lower strike rate.
          </p>
        </GlassCard>
      </div>
    </Section>

    {/* 30% showcase */}
    <section style={{ background: 'var(--ink)', color: 'var(--on-dark)', padding: '140px 40px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line-soft)' }}>
      <div style={{ position: 'absolute', left: '50%', top: '50%', width: 900, height: 900, transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(253,218,22,0.26), transparent 60%)', filter: 'blur(40px)', pointerEvents: 'none', animation: 'pulseGlow 5s ease-in-out infinite' }} />
      <div style={{ maxWidth: 1360, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
        <Eyebrow accentRule>02 · The Yellow model</Eyebrow>
        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(42px, 5vw, 72px)', letterSpacing: '-0.02em', color: 'var(--on-dark-2)' }}>We guarantee a</span>
          <div style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400,
            fontSize: 'clamp(180px, 24vw, 340px)', letterSpacing: '-0.04em', lineHeight: 0.95,
            color: 'var(--accent)',
            filter: 'drop-shadow(0 0 60px rgba(253,218,22,0.45))',
            animation: 'pulseGlow 3.5s ease-in-out infinite',
          }}>
            <CountUp to={30} suffix="%" duration={1400} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(42px, 5vw, 72px)', letterSpacing: '-0.02em', color: 'var(--on-dark-2)' }}>minimum USDT payback.</span>
        </div>
        <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 17, lineHeight: 1.6, color: 'var(--on-dark-2)', maxWidth: 680, margin: '48px auto 0' }}>
          Yes, you read it right. We aim to provide a minimum of 30% of your total treasury back in USDT, while the rest is in tokens, depending on market conditions. Maximum could be anything up to 100%.
        </p>
      </div>
    </section>

    <Section bg="ink2">
      <div style={{ marginBottom: 56 }}>
        <Eyebrow accentRule>03 · How it works</Eyebrow>
        <h2 className="h2" style={{ margin: '18px 0 0' }}>Precision <em>mechanics.</em></h2>
      </div>
      <FeatureCards cols={3} items={[
        { title: 'Passive Execution.', body: 'Small passive limit orders. No aggressive selling, no market dumping.' },
        { title: 'Aligned Incentives.', body: 'Higher token values mean better outcomes for both parties.' },
        { title: 'The Buffer Strategy.', body: 'Our algorithms adapt to live conditions. We sell more when prices surge, and deploy the buffer when prices dump.' },
      ]} />
    </Section>

    <Section bg="ink">
      <div style={{ marginBottom: 56 }}>
        <Eyebrow accentRule>04 · You stay in control</Eyebrow>
        <h2 className="h2" style={{ margin: '18px 0 0' }}>Total flexibility <em>& control.</em></h2>
      </div>
      <FeatureCards cols={2} items={[
        { title: 'On-Demand Liquidity.', body: 'Ask for a payout anytime you want to meet project needs.' },
        { title: 'Verifiable Transparency.', body: 'Detailed oversight with weekly & monthly performance reporting.' },
      ]} />
    </Section>
    <ServiceFAQ items={[
      { q: 'Can I ask for a payout anytime during the contract period?', a: 'Yes, clients can request a payout twice during a standard 12-month contract period. Based on the USDT/Treasury accumulated until then, we ensure a total of 30% is provided overall.' },
      { q: 'Will this selling pressure hurt our price?', a: 'No. Sales are gradual, passive, and adaptive. Executions only occur when there is organic market demand.' },
      { q: 'What is Strike Price, and how is it calculated?', a: 'Strike Price is calculated using the average daily open price of each day, referencing CoinMarketCap, CoinGecko, or the CEX of preference as data sources. For example, if the open prices over three days are 1.00, 1.05, and 1.10 USDT, the strike price at the end of Day 3 would be (1.00 + 1.05 + 1.10) / 3 = 1.05 USDT.' },
      { q: 'How do we know the strike price won\'t be manipulated?', a: 'The strike price calculation is completely transparent and time-distributed. It relies on public average daily open prices from trusted sources like CoinMarketCap or CoinGecko, effectively minimizing any risk of single-day manipulation.' },
      { q: 'What happens in a bear market?', a: 'The strategic buffer wallet and the strike price average help define a token price floor. Even in weak market conditions, the guaranteed 30% USDT floor provides vital financial stability.' },
    ]} />
    <PreFooter headline="Start a <em>treasury conversation.</em>" subhead="A short memo describing your token, circulating supply, and the runway you need. Reply within two business days." primary="Start the conversation" ghost="All services" ghostTo="/" />
  </React.Fragment>
);

// ─── Programmatic Sales ─────────────────────────────────────
const ProgrammaticPage = ({ go }) => (
  <React.Fragment>
    <ServiceHero n="03" section="Programmatic Sales"
      title="Quiet liquidation." em="Without the market noticing."
      lede="Discreet, algorithmic liquidation of token allocations at favourable prices — engineered to minimise market impact and preserve price stability."
      rail={[{l:'Schedules',v:'VWAP · TWAP · Custom'},{l:'Venues',v:'11'},{l:'Control',v:'Pause · Resume · Reroute'},{l:'Reporting',v:'Live'}]}
    />
    <Section id="content" bg="ink2">
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 48, alignItems: 'start' }}>
        <div>
          <Eyebrow accentRule>01 · The problem</Eyebrow>
          <h2 className="h2" style={{ margin: '18px 0 0' }}>Selling into <em>your own market.</em></h2>
        </div>
        <GlassCard style={{ padding: 36 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.4, fontStyle: 'italic', color: 'var(--on-dark)', margin: 0 }}>
            Selling a large token allocation without discipline is how treasuries destroy the very markets they depend on. Orders hit the book, the price slips, and the remaining inventory is worth less than when you started.
          </p>
        </GlassCard>
      </div>
    </Section>
    <Section bg="ink">
      <div style={{ marginBottom: 56 }}>
        <Eyebrow accentRule>02 · The method</Eyebrow>
        <h2 className="h2" style={{ margin: '18px 0 0' }}>Engineered <em>patience.</em></h2>
      </div>
      <FeatureCards cols={3} items={[
        { title: 'Volatility-aware scheduling.', body: 'We sell more into strength and pull back into weakness. The schedule responds to live market conditions, never the other way round.' },
        { title: 'Deep-liquidity venue routing.', body: 'Orders are routed to the venues that can absorb them cleanly. Thin books are avoided, not exploited.' },
        { title: 'Concealed footprint.', body: 'Every slice of the sale is sized to disappear into organic flow. The market sees activity, not a seller.' },
      ]} />
    </Section>
    <Section bg="ink2">
      <div style={{ marginBottom: 56 }}>
        <Eyebrow accentRule>03 · You see everything</Eyebrow>
        <h2 className="h2" style={{ margin: '18px 0 0' }}>Transparency <em>& control.</em></h2>
      </div>
      <FeatureCards cols={2} items={[
        { title: 'Live dashboard.', body: 'Follow the program in real time. Quantities sold, average fill, slippage vs. benchmark.' },
        { title: 'Pause, resume, or reallocate.', body: 'The program is yours. Change the target size, the timeframe, or the venue mix at any point.' },
      ]} />
    </Section>
    <PreFooter headline="Plan a <em>programmatic sale.</em>" subhead="Share the allocation size, the target timeframe, and the constraints. We'll return a draft schedule within 48 hours." primary="Plan a sale" ghost="All services" ghostTo="/" />
  </React.Fragment>
);

// ─── Venture Investment ─────────────────────────────────────
const VenturePage = ({ go }) => (
  <React.Fragment>
    <ServiceHero n="04" section="Venture Investment"
      title="Strategic capital," em="fluent in the full stack."
      lede="Investment and strategic consultancy for early-stage token projects, channeled through the Yellow Group ecosystem."
      primary="Send a memo"
      rail={[{l:'Stage',v:'Seed → Series A'},{l:'Ticket',v:'$100k – $250k'},{l:'Cadence',v:'8–12 / yr'},{l:'Decision',v:'≤ 14 days'}]}
    />
    <Section id="content" bg="ink">
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 64, marginBottom: 56 }}>
        <div>
          <Eyebrow accentRule>01 · Thesis</Eyebrow>
          <h2 className="h2" style={{ margin: '18px 0 0' }}>What we <em>look for.</em></h2>
        </div>
        <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 17, lineHeight: 1.65, color: 'var(--on-dark-2)' }}>
          We back teams building the infrastructure, protocols, and primitives that the next decade of digital assets will depend on. Our edge is operational — we deploy capital alongside the trading, listing, editorial, and research capabilities of the Yellow Group.
        </p>
      </div>
      <FeatureCards cols={3} items={[
        { title: 'Infrastructure.', body: 'Exchange tech, settlement rails, custody, compliance tooling.' },
        { title: 'Protocols.', body: 'DeFi primitives, liquidity layers, cross-chain routing.' },
        { title: 'Distribution.', body: 'Consumer-facing products that make digital assets usable.' },
      ]} />
    </Section>
    <Section bg="ink2">
      <div style={{ marginBottom: 56 }}>
        <Eyebrow accentRule>02 · Operational edge</Eyebrow>
        <h2 className="h2" style={{ margin: '18px 0 28px' }}>More than <em>capital.</em></h2>
        <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 18, lineHeight: 1.65, color: 'var(--on-dark-2)', maxWidth: 780, margin: '0 0 56px' }}>
          We leverage deep industry relationships to actively scale our portfolio. When you partner with us, you gain immediate, hands-on ecosystem access to:
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {[
          ['120+', 'Centralized Exchanges (CEXs)'],
          ['100+', 'Top-Tier VC Firms'],
          ['20+', 'Leading Launchpads'],
          ['30+', 'Media & PR Partners'],
        ].map(([n, label], i) => (
          <Reveal key={i} delay={i * 60}>
            <GlassCard style={{ padding: '32px 28px', height: '100%' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(48px, 5vw, 72px)', letterSpacing: '-0.03em', color: 'var(--accent)', lineHeight: 1, marginBottom: 14, filter: 'drop-shadow(0 0 18px rgba(253,218,22,0.3))' }}>{n}</div>
              <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 300, fontSize: 15, lineHeight: 1.5, color: 'var(--on-dark-2)', margin: 0 }}>{label}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
    <Section bg="ink2">
      <div style={{ marginBottom: 48 }}>
        <Eyebrow accentRule>04 · Intake</Eyebrow>
        <h2 className="h2" style={{ margin: '18px 0 0' }}>The <em>process.</em></h2>
      </div>
      <FeatureCards cols={3} items={[
        { n: 'I', title: 'Memo first.', body: "Send a short memo — what you're building, who's building it, what stage you're at." },
        { n: 'II', title: 'Two conversations.', body: 'One with a principal, one with the desk. We test the fit both ways.' },
        { n: 'III', title: 'Decision within 14 days.', body: 'Yes, no, or not yet — all three come with written reasoning.' },
      ]} />
    </Section>
    <ServiceFAQ items={[
      { q: 'Which projects are eligible for investments from Yellow Capital?', a: 'We usually invest in projects that have Tier-1 CEXs confirmed for listings or have strong backers. We ideally come into pre-listing stages, offering to cover the project\'s CEX listing fee as part of the funding.' },
      { q: 'Is the investment subject to MM and other services as well?', a: 'Yes, we tend to invest in the projects once they agree to sign us for MM or any of our services. This ensures a long-term collaboration with the project and expedites listing and beyond.' },
      { q: 'What is the investment mandate for the fund?', a: 'Investments are sector agnostic, but we focus on investing in token projects that are building in any of the exciting emerging Web3 verticals, including DeFi, AI, Infrastructure, DeepTech, RWA, etc.' },
    ]} />
    <PreFooter headline="Send a <em>memo.</em>" subhead="Two pages is plenty. What you're building, who's building it, why now." primary="Send a memo" ghost="All services" ghostTo="/" />
  </React.Fragment>
);

Object.assign(window, { MarketMakingPage, TreasuryPage, ProgrammaticPage, VenturePage });
