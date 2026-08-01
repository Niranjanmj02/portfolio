// src/lib/smoothScroll.js
// Lenis owns scrolling when it's active; everything else must go through here
// so anchors don't fight the smooth-scroll loop.

let lenis = null;

export const registerLenis = (instance) => {
  lenis = instance;
};

export const getLenis = () => lenis;

const NAV_OFFSET = -72;

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, { offset: NAV_OFFSET });
    return;
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET;
  window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0);
    return;
  }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
}
