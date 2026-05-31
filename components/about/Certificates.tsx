'use client';

import { motion } from 'framer-motion';

import { CertificateCard } from '@/components/certificates/CertificateCard';
import { fadeInUp, staggerContainer } from '@/lib/motion';

interface Certificate {
  image: string;
  title: string;
  issuer: string;
  date: string;
}

// John Remy: swap in real certificate scans as they're earned (DESIGN.md §8). The grid
// holds any count; placeholder art lives in /public/images/certificates.
const CERTIFICATES: Certificate[] = [
  {
    image: '/images/certificates/placeholder-01.jpg',
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: '2024',
  },
  {
    image: '/images/certificates/placeholder-02.jpg',
    title: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    date: '2024',
  },
  {
    image: '/images/certificates/placeholder-03.jpg',
    title: 'Foundations of UX Design',
    issuer: 'Google · Coursera',
    date: '2023',
  },
];

export function Certificates() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto w-full max-w-7xl px-6 py-32 md:px-8"
    >
      <motion.h2
        variants={fadeInUp}
        className="font-display text-2xl font-medium tracking-tight text-ink"
      >
        Certificates
      </motion.h2>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        {CERTIFICATES.map((certificate) => (
          <motion.div
            key={`${certificate.issuer}-${certificate.title}`}
            variants={fadeInUp}
          >
            <CertificateCard {...certificate} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
