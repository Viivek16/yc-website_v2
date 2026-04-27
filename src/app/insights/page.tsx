import { SimplePage } from '@/components/SimplePage';

export default function InsightsPage() {
  return (
    <SimplePage
      title="Notes from the desk."
      lede="Roughly twice a month. Institutional readers only — we verify the domain before we add you."
      body={
        <p>
          Archive of desk notes, regulation reviews, market structure commentary, and letters. Subscribe via{' '}
          <a href="mailto:nem@yellow.com" style={{ color: 'var(--accent)' }}>nem@yellow.com</a>.
        </p>
      }
    />
  );
}
