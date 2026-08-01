// src/components/ScrollProgress.jsx
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { sceneStore } from '../lib/sceneStore';
import { SPRING } from '../lib/motion';

/**
 * The 2px rail at the top of the viewport — and the single place document
 * scroll progress is measured. The 3D scene reads it from sceneStore.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, SPRING.progress);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    sceneStore.progress = value;
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-mint"
      style={{ scaleX }}
    />
  );
}
