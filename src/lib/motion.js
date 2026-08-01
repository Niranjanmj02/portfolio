// src/lib/motion.js
// The one place motion is defined. Every component imports from here so easing
// and timing stay identical across the site.

export const EASE_OUT = [0.16, 1, 0.3, 1]; // entrances
export const EASE_IN_OUT = [0.65, 0, 0.35, 1]; // transforms

export const DUR = {
  micro: 0.15,
  standard: 0.4,
  entrance: 0.7,
  hero: 1.1,
};

export const STAGGER = 0.06;
export const STAGGER_CAP = 8; // never stagger more than 8 siblings

export const VIEWPORT = { once: true, amount: 0.15 };

export const SPRING = {
  cursorRing: { stiffness: 300, damping: 28, mass: 0.6 },
  progress: { stiffness: 400, damping: 90, restDelta: 0.001 },
  magnet: { stiffness: 220, damping: 22, mass: 0.4 },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: DUR.entrance, ease: EASE_OUT },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DUR.entrance, ease: EASE_OUT } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DUR.entrance, ease: EASE_OUT },
  },
};

/** Parent variant that staggers its children, capped so long lists don't crawl. */
export const staggerParent = (count = STAGGER_CAP, delay = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: count > STAGGER_CAP ? (STAGGER * STAGGER_CAP) / count : STAGGER,
      delayChildren: delay,
    },
  },
});
