import { SimplePage } from '@/components/SimplePage';

export default function CareersPage() {
  return (
    <SimplePage
      title="Build the desk"
      em="we wish we'd had."
      lede="We hire slowly, compensate in cash and equity, and expect the people we hire to push our standards higher — not the other way round."
      body={
        <p>
          Open roles: Senior Quant Trader, Treasury Strategist, Head of Compliance, Associate (Counterparty), Editor at Yellow.com, Summer Analyst 2026. Apply via{' '}
          <a href="mailto:nem@yellow.com" style={{ color: 'var(--accent)' }}>nem@yellow.com</a> with a one-page memo.
        </p>
      }
    />
  );
}
