'use client';

import { motion } from 'framer-motion';
import { dividerGrow } from '@/lib/motion';

// John Remy: a 1px line that draws itself from nothing as it enters view (DESIGN.md §5).
// It separates thoughts without raising its voice.
export function SectionDivider() {
  return (
    <motion.div
      variants={dividerGrow}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      className="mx-auto h-px w-full max-w-7xl origin-left bg-ink/10"
    />
  );
}
