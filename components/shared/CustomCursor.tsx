'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { LUXURY_EASE } from '@/lib/motion';

const RING_SIZE = 20;
const RING_SIZE_HOVER = 48;

// John Remy: the cursor carries the signature blue into every viewport (DESIGN.md §5).
// It is an enhancement layered over native input — mounted only for fine pointers,
// so touch and reduced-motion visitors keep the system cursor untouched.
export function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) return;

    setIsEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');

    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setIsVisible(true);

      const target = event.target as Element | null;
      setIsHovering(Boolean(target?.closest('a, button, [data-cursor="link"]')));
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [x, y]);

  if (!isEnabled) return null;

  const size = isHovering ? RING_SIZE_HOVER : RING_SIZE;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-primary"
      style={{ x: springX, y: springY }}
      animate={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: LUXURY_EASE }}
    />
  );
}
