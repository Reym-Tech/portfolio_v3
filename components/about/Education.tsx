'use client';

import { motion } from 'framer-motion';

import { fadeInUp, staggerContainer } from '@/lib/motion';

// John Remy: a student's training is part of the story — stated plainly, in the same
// restrained language as Craft (DESIGN.md §8), never padded into a résumé block.
const EDUCATION = {
  degree: 'Bachelor of Science in Information Technology',
  school: 'University of Mindanao – Digos College',
  status: '3rd Year · Expected 2028',
  coursework: [
    'Web Development',
    'Mobile Development',
    'Data Structures',
    'Software Engineering',
  ],
};

export function Education() {
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
        Education
      </motion.h2>

      <motion.div
        variants={fadeInUp}
        className="mt-16 border-t border-ink/10 pt-6"
      >
        <p className="font-mono text-sm tracking-[0.15em] text-ink/60">
          {EDUCATION.status.toUpperCase()}
        </p>

        <h3 className="mt-4 font-display text-xl font-medium tracking-tight text-ink">
          {EDUCATION.degree}
        </h3>
        <p className="mt-1 font-body text-lg text-ink/70">{EDUCATION.school}</p>

        <dl className="mt-10">
          <dt className="font-mono text-sm tracking-[0.15em] text-ink/60">
            COURSEWORK
          </dt>
          <dd className="mt-4 flex flex-wrap gap-2">
            {EDUCATION.coursework.map((course) => (
              <span
                key={course}
                className="rounded-sm bg-surface-muted px-2.5 py-1 font-mono text-sm text-ink/60"
              >
                {course}
              </span>
            ))}
          </dd>
        </dl>
      </motion.div>
    </motion.section>
  );
}
