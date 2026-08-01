// src/components/Magnetic.jsx
import { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { SPRING } from '../lib/motion';
import { useFinePointer, usePrefersReducedMotion } from '../lib/hooks';

/**
 * Pulls its child up to `strength` px toward the cursor. Inert on touch and
 * under reduced motion, where it renders as a plain wrapper.
 */
export default function Magnetic({ children, strength = 8, className = '', as = 'div' }) {
  const ref = useRef(null);
  const x = useSpring(0, SPRING.magnet);
  const y = useSpring(0, SPRING.magnet);

  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const active = fine && !reduced;

  const handleMove = (event) => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const max = strength;
    x.set(Math.max(-max, Math.min(max, dx * 0.35)));
    y.set(Math.max(-max, Math.min(max, dy * 0.35)));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = motion[as] || motion.div;

  return (
    <Tag
      ref={ref}
      className={className}
      style={active ? { x, y } : undefined}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </Tag>
  );
}
