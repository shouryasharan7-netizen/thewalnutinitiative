'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Signature element: a hand-drawn "walnut crack" line — the furrow of a
 * walnut shell doubles visually as a fold in the brain's cortex, which is
 * the whole conceptual hinge of "The Walnut Initiative". Used sparingly
 * as a section divider so it stays a signature, not decoration.
 */
export default function WalnutDivider({ flip = false }: { flip?: boolean }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={`mx-auto my-2 w-full max-w-xs ${flip ? 'scale-y-[-1]' : ''}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 400 40" className="w-full h-auto">
        <motion.path
          d="M2 20 C 60 4, 90 36, 140 20 S 220 4, 260 22 S 340 34, 398 18"
          fill="none"
          stroke="#8A6A45"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </div>
  );
}
