'use client';

import { motion } from 'framer-motion';

import { fadeInUp, staggerContainer } from '@/lib/motion';

// John Remy: the visitor meets the person before the résumé. The name and the standard
// arrive first; motion enters on load and never holds the identity hostage (DESIGN.md §8).
export function AboutIntro() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mx-auto w-full max-w-3xl px-6 pt-40 pb-20 md:px-8"
    >
      <motion.p
        variants={fadeInUp}
        className="font-mono text-sm tracking-[0.2em] text-ink/60"
      >
        ABOUT
      </motion.p>

      <motion.h1
        variants={fadeInUp}
        className="mt-6 font-display text-3xl font-light leading-[1.15] tracking-tight text-ink"
      >
        I build complete digital products, and care for every layer of them.
      </motion.h1>

      <motion.div
        variants={fadeInUp}
        className="mt-10 space-y-6 font-body text-lg leading-relaxed text-ink/70"
      >
        <p>
          I&apos;m John Remy C. Gonzales, a Full Stack Developer. From the surface a person
          touches to the structure that holds it up, I treat the whole of a product as a
          single piece of craft.
        </p>
        <p>
          My work spans mobile and web — Flutter apps, Next.js interfaces, and the
          Supabase and Firebase backends behind them. I care about clean architecture,
          honest interfaces, and the quiet decisions in between that no one notices when
          they&apos;re right.
        </p>
        <p>My standard is simple: nothing ships until it feels inevitable.</p>
      </motion.div>
    </motion.section>
  );
}
