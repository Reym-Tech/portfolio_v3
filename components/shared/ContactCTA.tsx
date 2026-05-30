'use client';

import { motion } from 'framer-motion';

import { fadeInUp, staggerContainer } from '@/lib/motion';

const EMAIL = 'johnremygonzales20@gmail.com';

// John Remy: every page closes with the same open door — one sincere invitation, the
// lone primary accent pointing toward a conversation (DESIGN.md §8).
export function ContactCTA() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="mx-auto w-full max-w-7xl px-6 py-32 md:px-8"
    >
      <motion.p
        variants={fadeInUp}
        className="font-mono text-sm tracking-[0.2em] text-ink/60"
      >
        CONTACT
      </motion.p>

      <motion.h2
        variants={fadeInUp}
        className="mt-6 max-w-2xl font-display text-3xl font-light leading-[1.15] tracking-tight text-ink"
      >
        Have something worth building well? Let&apos;s talk.
      </motion.h2>

      <motion.div
        variants={fadeInUp}
        className="mt-10 flex flex-wrap items-center gap-8"
      >
        <a
          href={`mailto:${EMAIL}`}
          className="group inline-flex items-center gap-3 font-body text-base text-primary transition-colors duration-300 hover:text-primary/80"
        >
          Start a conversation
          <span
            aria-hidden
            className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
          >
            →
          </span>
        </a>
        <a
          href={`mailto:${EMAIL}`}
          className="font-body text-base text-ink/70 transition-colors duration-300 hover:text-ink"
        >
          {EMAIL}
        </a>
      </motion.div>
    </motion.section>
  );
}
