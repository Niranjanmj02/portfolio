// src/components/ScrollProgress.jsx
import { useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { sceneStore } from '../lib/sceneStore';
import { SPRING } from '../lib/motion';
import { sections } from '../data/content';

const IDS = sections.map((s) => s.id);

/**
 * The 2px rail at the top of the viewport — and the single place scroll is
 * measured. Publishes two things to sceneStore: raw 0..1 progress, and a
 * section-relative `stage` the 3D scene choreographs against.
 */
export default function ScrollProgress() {
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, SPRING.progress);
  const tops = useRef([]);

  const measure = useCallback(() => {
    tops.current = IDS.map((id) => {
      const el = document.getElementById(id);
      return el ? el.getBoundingClientRect().top + window.scrollY : 0;
    });
  }, []);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    sceneStore.progress = value;
  });

  useMotionValueEvent(scrollY, 'change', (y) => {
    const bounds = tops.current;
    if (!bounds.length) return;

    // Anchor on the middle of the viewport — that's what the reader is on.
    const focus = y + window.innerHeight * 0.5;
    const docEnd = document.body.scrollHeight;
    let stage = 0;

    for (let i = 0; i < bounds.length; i++) {
      const start = bounds[i];
      const end = i + 1 < bounds.length ? bounds[i + 1] : docEnd;
      if (focus < start) break;
      if (focus < end) {
        stage = i + (focus - start) / Math.max(1, end - start);
        break;
      }
      stage = i + 1;
    }

    sceneStore.stage = stage;
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-brand"
      style={{ scaleX }}
    />
  );
}
