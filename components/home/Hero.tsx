'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/motion';

const EMAIL = 'johnremygonzales20@gmail.com';

// John Remy: the first second belongs to the name and the role — non-negotiable #1.
// Motion enters quickly and never holds the identity hostage. The lone primary-blue
// element is the invitation to connect; nothing else competes for the eye (DESIGN.md §1).
export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center px-6 md:px-8">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-7xl"
      >
        <motion.p
          variants={fadeInUp}
          className="mb-6 font-mono text-sm tracking-[0.2em] text-ink/60"
        >
          PORTFOLIO
        </motion.p>

        <motion.h1
          variants={fadeInUp}
          className="font-display text-2xl font-light leading-[1.1] tracking-tight text-ink sm:text-3xl"
        >
          John Remy C. Gonzales
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mt-4 font-body text-xl text-ink/70"
        >
          Full Stack Developer
        </motion.p>

        <motion.p
          variants={fadeInUp}
          className="mt-10 max-w-xl font-body text-lg leading-relaxed text-ink/70"
        >
          I build complete digital products — the interface you see, the logic
          beneath it, and the quiet decisions in between.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="mt-12 flex flex-wrap items-center gap-8"
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
            href="/work"
            className="font-body text-base text-ink/70 transition-colors duration-300 hover:text-ink"
          >
            Selected Works
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
