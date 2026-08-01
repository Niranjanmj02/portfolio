// src/components/SmoothScroll.jsx
import { useEffect } from 'react';
import Lenis from 'lenis';
import { registerLenis } from '../lib/smoothScroll';
import { useFinePointer, usePrefersReducedMotion } from '../lib/hooks';

/**
 * Lenis runs on pointer-fine devices only. Touch momentum is already better
 * than anything we'd emulate, and reduced-motion means native scrolling.
 */
export default function SmoothScroll() {
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();

  useEffect(() => {
    if (reduced || !fine) {
      registerLenis(null);
      return undefined;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
    });

    registerLenis(lenis);

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      registerLenis(null);
    };
  }, [reduced, fine]);

  return null;
}
