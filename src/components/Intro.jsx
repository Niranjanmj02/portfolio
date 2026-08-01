// src/components/Intro.jsx
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_OUT } from '../lib/motion';
import { usePrefersReducedMotion } from '../lib/hooks';
import { profile } from '../data/content';

const KEY = 'nm-intro-seen';
const DURATION = 900;

/**
 * Overlay only — the page is already rendered underneath, so there's no layout
 * shift and no blocking spinner. Skippable, and shown once per session.
 */
export default function Intro() {
  const reduced = usePrefersReducedMotion();
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(KEY) !== '1';
  });

  useEffect(() => {
    if (!show) return undefined;

    const finish = () => {
      sessionStorage.setItem(KEY, '1');
      setShow(false);
    };

    if (reduced) {
      finish();
      return undefined;
    }

    const timer = setTimeout(finish, DURATION);
    window.addEventListener('pointerdown', finish);
    window.addEventListener('keydown', finish);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('pointerdown', finish);
      window.removeEventListener('keydown', finish);
    };
  }, [show, reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-between bg-ink px-[clamp(20px,5vw,80px)] pb-[clamp(28px,6vh,64px)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <motion.span
            className="font-mono text-xs uppercase tracking-[0.2em] text-fog"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            {profile.name}
          </motion.span>

          <motion.span
            className="font-mono text-xs uppercase tracking-[0.2em] text-fog"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: EASE_OUT }}
          >
            {profile.role}
          </motion.span>

          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-mint"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: DURATION / 1000, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
