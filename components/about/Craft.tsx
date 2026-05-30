'use client';

import { motion } from 'framer-motion';

import { fadeInUp, staggerContainer } from '@/lib/motion';

// John Remy: "Craft", never "Skills" (DESIGN.md §8). Grouped by discipline, drawn from
// the tools actually used across the work — restraint over an exhaustive laundry list.
const CRAFT: { discipline: string; tools: string[] }[] = [
  { discipline: 'Languages', tools: ['TypeScript', 'JavaScript', 'Dart', 'Java'] },
  { discipline: 'Frontend', tools: ['Next.js', 'React', 'Flutter', 'Tailwind CSS', 'Framer Motion'] },
  { discipline: 'Backend & Data', tools: ['Supabase', 'Firebase', 'REST APIs', 'WebSocket'] },
  { discipline: 'Practice', tools: ['Clean Architecture', 'Responsive UI', 'API Integration'] },
];

export function Craft() {
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
        Craft
      </motion.h2>

      <dl className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
        {CRAFT.map((group) => (
          <motion.div
            key={group.discipline}
            variants={fadeInUp}
            className="border-t border-ink/10 pt-6"
          >
            <dt className="font-mono text-sm tracking-[0.15em] text-ink/60">
              {group.discipline.toUpperCase()}
            </dt>
            <dd className="mt-4 flex flex-wrap gap-2">
              {group.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-sm bg-surface-muted px-2.5 py-1 font-mono text-sm text-ink/60"
                >
                  {tool}
                </span>
              ))}
            </dd>
          </motion.div>
        ))}
      </dl>
    </motion.section>
  );
}
