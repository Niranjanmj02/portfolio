// src/components/Cursor.jsx
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { SPRING, DUR, EASE_OUT } from '../lib/motion';
import { useFinePointer, usePrefersReducedMotion } from '../lib/hooks';
import { setPointer } from '../lib/sceneStore';

const LABELS = { view: 'VIEW', scroll: 'SCROLL', drag: '↔' };

const RING = {
  default: { width: 36, height: 36, opacity: 1, borderWidth: 1, background: 'rgba(0,255,136,0)' },
  link: { width: 90, height: 90, opacity: 1, borderWidth: 1, background: 'rgba(0,255,136,0.06)' },
  view: { width: 84, height: 84, opacity: 1, borderWidth: 0, background: 'rgba(0,255,136,0.92)' },
  scroll: { width: 68, height: 68, opacity: 1, borderWidth: 1, background: 'rgba(0,255,136,0.04)' },
  drag: { width: 64, height: 64, opacity: 1, borderWidth: 1, background: 'rgba(0,255,136,0.06)' },
  text: { width: 36, height: 36, opacity: 0, borderWidth: 1, background: 'rgba(0,255,136,0)' },
};

/**
 * Two-part cursor: a 1:1 dot and a spring-trailed ring. Desktop + fine pointer
 * only. Also feeds normalised pointer position to the WebGL scene.
 */
export default function Cursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const active = fine && !reduced;

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, SPRING.cursorRing);
  const ringY = useSpring(y, SPRING.cursorRing);

  const [variant, setVariant] = useState('default');
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) {
      document.documentElement.classList.remove('custom-cursor');
      return undefined;
    }

    document.documentElement.classList.add('custom-cursor');

    const onMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      setPointer(
        (event.clientX / window.innerWidth) * 2 - 1,
        (event.clientY / window.innerHeight) * 2 - 1
      );
    };

    // Delegated so dynamically rendered nodes work without re-binding.
    const onOver = (event) => {
      const target = event.target.closest?.('[data-cursor]');
      setVariant(target ? target.dataset.cursor : 'default');
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, true);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      document.documentElement.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver, true);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [active, x, y]);

  if (!active) return null;

  const ring = RING[variant] || RING.default;
  const label = LABELS[variant];
  const hideDot = variant === 'link' || variant === 'view' || variant === 'text';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70]"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 150ms linear' }}
    >
      <motion.div className="absolute left-0 top-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-mint"
          animate={{ ...ring, scale: pressed ? 0.8 : 1 }}
          transition={{ duration: DUR.standard, ease: EASE_OUT }}
        >
          {label && (
            <span
              className="font-mono text-[10px] font-semibold tracking-[0.18em]"
              style={{ color: variant === 'view' ? 'var(--ink)' : 'var(--mint)' }}
            >
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>

      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-mint"
          animate={{
            width: hideDot ? 0 : 8,
            height: hideDot ? 0 : 8,
            opacity: hideDot ? 0 : 1,
          }}
          transition={{ duration: DUR.micro, ease: 'linear' }}
        />
      </motion.div>
    </div>
  );
}
