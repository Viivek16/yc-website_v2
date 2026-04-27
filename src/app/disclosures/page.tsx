import { SimplePage } from '@/components/SimplePage';

export default function DisclosuresPage() {
  return (
    <SimplePage
      title="Disclosures"
      lede="This document sets out the current policy. Updated quarterly. Material changes notified in writing."
      body={
        <p>
          Placeholder legal body — full text maintained in operations. Email{' '}
          <a href="mailto:nem@yellow.com" style={{ color: 'var(--accent)' }}>nem@yellow.com</a> for the signed PDF.
        </p>
      }
    />
  );
}
