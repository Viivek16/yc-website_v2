import { Hero }             from '@/components/hero/Hero';
import { StatRail }         from '@/components/home/StatRail';
import { StandardOfCare }   from '@/components/home/StandardOfCare';
import { HomeServices }     from '@/components/home/HomeServices';
import { InTheNews }        from '@/components/home/InTheNews';
import { Captain }          from '@/components/home/Captain';
import { GlobalPresence }   from '@/components/home/GlobalPresence';
import { PreFooter }        from '@/components/PreFooter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatRail />
      <HomeServices />
      <StandardOfCare />
      <InTheNews />
      <Captain />
      <GlobalPresence />
      <PreFooter
        headline='Read first,<br /><em>Engage second.</em>'
        subhead="A short note about who you are, what book you run, and what you need. We read every one."
        primary="Schedule consultation"
        ghost="About the firm"
        ghostTo="/about"
      />
    </>
  );
}
