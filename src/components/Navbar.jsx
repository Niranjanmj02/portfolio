// src/components/Navbar.jsx
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { profile, sections } from '../data/content';
import { getLenis, scrollToId, scrollToTop } from '../lib/smoothScroll';
import { useActiveSection } from '../lib/hooks';
import { DUR, EASE_OUT, fadeUp, staggerParent } from '../lib/motion';

const ids = sections.map((s) => s.id);
const items = sections.filter((s) => s.id !== 'home');

export default function Navbar() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setCondensed(v > 40));

  useEffect(() => {
    const lenis = getLenis();
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) lenis?.stop();
    else lenis?.start();
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          condensed ? 'border-b border-hair bg-ink/80 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <nav className="u-container flex h-16 items-center justify-between md:h-[72px]">
          <button
            type="button"
            onClick={scrollToTop}
            data-cursor="link"
            className="group flex items-center gap-2.5 font-mono text-sm"
          >
            <span className="h-2 w-2 rounded-full bg-mint transition-transform duration-300 group-hover:scale-125" />
            <span className="text-chalk">niranjan</span>
            <span className="hidden text-fog sm:inline">/ ai engineer</span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                data-cursor="link"
                className="relative rounded-full px-3.5 py-2 font-mono text-[12.5px] transition-colors duration-150"
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-hair bg-white/[0.06]"
                    transition={{ duration: DUR.standard, ease: EASE_OUT }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    active === item.id ? 'text-mint' : 'text-fog hover:text-chalk'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={profile.resume}
              download
              data-cursor="link"
              className="hidden font-mono text-[12.5px] text-fog transition-colors hover:text-mint sm:inline"
            >
              résumé ↓
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              data-cursor="link"
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-hair lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 block h-px w-4 bg-chalk transition-transform duration-300 ${
                    open ? 'top-1.5 rotate-45' : 'top-0.5'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-4 bg-chalk transition-transform duration-300 ${
                    open ? 'top-1.5 -rotate-45' : 'top-2.5'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-[clamp(20px,5vw,80px)] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.standard, ease: EASE_OUT }}
          >
            <motion.ul initial="hidden" animate="visible" variants={staggerParent(items.length)}>
              {items.map((item) => (
                <motion.li key={item.id} variants={fadeUp} className="border-b border-hair">
                  <button
                    type="button"
                    onClick={() => go(item.id)}
                    className="flex w-full items-baseline gap-4 py-5 text-left"
                  >
                    <span className="font-mono text-xs text-mint">{item.n}</span>
                    <span className="text-2xl text-chalk">{item.label}</span>
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
