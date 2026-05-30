'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';
import { LUXURY_EASE } from '@/lib/motion';

// John Remy: one place decides how motion behaves. `reducedMotion="user"` honors the
// visitor's system setting automatically — luxury includes never overriding their comfort.
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: LUXURY_EASE }}>
      {children}
    </MotionConfig>
  );
}
