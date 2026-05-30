import type { Variants } from 'framer-motion';

// John Remy: every transition uses the luxury bezier from DESIGN.md §5 —
// the soft-close of a high-end cabinet. Never substitute another easing.
export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: LUXURY_EASE },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

// Images settle into place rather than snapping (DESIGN.md §5 scroll behaviors).
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: LUXURY_EASE },
  },
};

// A 1px divider that draws itself from 0 to full width on scroll.
export const dividerGrow: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: LUXURY_EASE },
  },
};
