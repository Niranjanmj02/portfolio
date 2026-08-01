// src/components/Hero.jsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile, stats } from '../data/content';
import { DUR, EASE_OUT, fadeUp, staggerParent } from '../lib/motion';
import { useCountUp } from '../lib/hooks';
import { scrollToId } from '../lib/smoothScroll';
import Magnetic from './Magnetic';

function Stat({ value, suffix, label }) {
  const [ref, display] = useCountUp(value);
  return (
    <div ref={ref}>
      <div className="font-mono text-2xl text-chalk md:text-3xl">
        {display}
        <span className="text-mint">{suffix}</span>
      </div>
      <div className="mt-1 text-[12.5px] leading-snug text-fog">{label}</div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Hero recedes as About slides over the top of it.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section id="home" ref={ref} className="relative h-[130vh]" data-cursor="scroll">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ scale, opacity, y }} className="u-container w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerParent(8, 0.35)}
            className="grid grid-cols-12 items-end gap-x-8 gap-y-12"
          >
            <div className="col-span-12 lg:col-span-8">
              <motion.div variants={fadeUp} className="eyebrow flex items-center gap-3">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
                </span>
                open to opportunities
                <span className="h-px w-6 bg-hair" />
                {profile.location}
              </motion.div>

              <motion.h1 variants={fadeUp} className="display mt-7 text-chalk">
                Niranjan
                <br />
                <span className="text-fog">M</span>
              </motion.h1>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm text-mint md:text-base"
              >
                {profile.role}
                <span className="h-px w-8 bg-hair" />
                <span className="text-fog">{profile.years}</span>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-xl text-[15px] leading-relaxed text-fog md:text-base"
              >
                {profile.intro}
              </motion.p>

              <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <button
                    type="button"
                    onClick={() => scrollToId('work')}
                    data-cursor="link"
                    className="btn btn-solid"
                  >
                    View work
                  </button>
                </Magnetic>
                <Magnetic>
                  <a href={profile.resume} download data-cursor="link" className="btn">
                    Résumé ↓
                  </a>
                </Magnetic>
                <Magnetic>
                  <button
                    type="button"
                    onClick={() => scrollToId('contact')}
                    data-cursor="link"
                    className="btn"
                  >
                    Get in touch
                  </button>
                </Magnetic>
              </motion.div>
            </div>

            <div className="col-span-12 lg:col-span-4">
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                {profile.disciplines.map((d) => (
                  <span key={d} className="chip">
                    {d}
                  </span>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-hair pt-8 sm:grid-cols-4 lg:grid-cols-2"
              >
                {stats.map((s) => (
                  <Stat key={s.label} {...s} />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            type="button"
            onClick={() => scrollToId('about')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: DUR.entrance, ease: EASE_OUT }}
            data-cursor="link"
            className="flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fog transition-colors hover:text-mint"
          >
            scroll
            <span className="relative block h-8 w-px overflow-hidden bg-hair">
              <span className="scroll-cue absolute inset-x-0 top-0 h-3 bg-mint" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
