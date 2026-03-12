'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: ReactNode;
  /** Animation direction: 'up' | 'left' | 'right' | 'none' */
  direction?: 'up' | 'left' | 'right' | 'none';
}

const variants = {
  up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  none: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
};

export default function SectionWrapper({
  id,
  className = '',
  children,
  direction = 'up',
}: SectionWrapperProps) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const prefersReducedMotion = useReducedMotion();

  /* Respect prefers-reduced-motion: fade only, no translation */
  const effectiveDirection = prefersReducedMotion ? 'none' : direction;

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`section-padding ${className}`}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[effectiveDirection]}
      transition={{ duration: prefersReducedMotion ? 0.3 : 0.7, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}
