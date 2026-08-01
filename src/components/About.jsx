// src/components/About.jsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { about, profile } from '../data/content';
import SectionHeading from './SectionHeading';
import { Item, Reveal } from './Reveal';

/** One word of the scroll-linked paragraph reveal. */
function Word({ children, start, end, progress }) {
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.26em] inline-block">
      {children}
    </motion.span>
  );
}

export default function About() {
  const paragraphRef = useRef(null);
  const photoRef = useRef(null);

  const { scrollYProgress: textProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.85', 'end 0.55'],
  });

  const { scrollYProgress: photoProgress } = useScroll({
    target: photoRef,
    offset: ['start end', 'end start'],
  });
  const photoScale = useTransform(photoProgress, [0, 1], [1.12, 1]);
  const photoY = useTransform(photoProgress, [0, 1], ['-4%', '4%']);

  const words = about.body.split(' ');

  return (
    <section
      id="about"
      className="relative z-10 -mt-[30vh] pt-[30vh]"
    >
      {/* Curtain that wipes the hero away as this section slides over it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[42vh] bg-gradient-to-b from-ink via-ink/90 to-transparent"
      />

      <div className="u-section u-container relative">
        <SectionHeading
          n="01"
          label="about"
          title={
            <>
              Production AI,
              <br />
              not demos.
            </>
          }
          lede={`${profile.location} · ${profile.years} shipping`}
        >
          <div ref={paragraphRef} className="max-w-3xl text-[19px] leading-[1.65] md:text-[22px]">
            {words.map((word, i) => (
              <Word
                key={`${word}-${i}`}
                progress={textProgress}
                start={i / words.length}
                end={Math.min(1, (i + 1.6) / words.length)}
              >
                {word}
              </Word>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-12 gap-8">
            <div className="col-span-12 sm:col-span-5">
              <div
                ref={photoRef}
                className="group relative overflow-hidden rounded-2xl border border-hair"
              >
                <motion.img
                  src="/assets/me.jpg"
                  alt="Niranjan M"
                  loading="lazy"
                  style={{ scale: photoScale, y: photoY }}
                  className="aspect-[4/5] w-full object-cover grayscale transition-[filter] duration-700 ease-out group-hover:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-0 bg-mint/10 mix-blend-color opacity-100 transition-opacity duration-700 group-hover:opacity-0" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4 font-mono text-[11px] text-chalk">
                  <span>{profile.name}</span>
                  <span className="text-mint">{profile.location}</span>
                </div>
              </div>
            </div>

            <Reveal className="col-span-12 space-y-px sm:col-span-7" count={about.pillars.length}>
              {about.pillars.map((pillar) => (
                <Item
                  key={pillar.k}
                  className="border-t border-hair py-5 first:border-t-0 sm:py-6"
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-mint">
                    {pillar.k}
                  </div>
                  <div className="mt-2 text-[15px] leading-relaxed text-fog">{pillar.v}</div>
                </Item>
              ))}
              <Item className="pt-6">
                <a
                  href={profile.resume}
                  download
                  data-cursor="link"
                  className="btn"
                >
                  Download résumé ↓
                </a>
              </Item>
            </Reveal>
          </div>
        </SectionHeading>
      </div>
    </section>
  );
}
