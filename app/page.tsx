import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { SectionDivider } from '@/components/shared/SectionDivider';

export const metadata: Metadata = {
  description:
    'The portfolio of John Remy C. Gonzales, Full Stack Developer. Complete digital products, built with deliberate craft.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <FeaturedWork />
    </>
  );
}
