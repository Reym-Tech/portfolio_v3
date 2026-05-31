import type { Metadata } from 'next';

import { AboutIntro } from '@/components/about/AboutIntro';
import { Certificates } from '@/components/about/Certificates';
import { Craft } from '@/components/about/Craft';
import { Education } from '@/components/about/Education';
import { ContactCTA } from '@/components/shared/ContactCTA';
import { SectionDivider } from '@/components/shared/SectionDivider';

export const metadata: Metadata = {
  title: 'About',
  description: 'About John Remy C. Gonzales — Full Stack Developer.',
};

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <SectionDivider />
      <Craft />
      <SectionDivider />
      <Education />
      <SectionDivider />
      <Certificates />
      <SectionDivider />
      <ContactCTA />
    </>
  );
}
