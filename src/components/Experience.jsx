// src/components/Experience.jsx
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { experience } from '../data/content';
import { EASE_OUT, fadeUp, staggerParent, VIEWPORT } from '../lib/motion';
import { useIsDesktop, usePrefersReducedMotion } from '../lib/hooks';
import { setActiveCluster } from '../lib/sceneStore';

function Card({ job, index, compact = false }) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={compact ? VIEWPORT : { once: true, amount: 0.35 }}
      variants={staggerParent(job.bullets.length + 3)}
      className={`panel flex shrink-0 flex-col p-7 md:p-9 ${
        compact ? 'w-full' : 'w-[min(88vw,1080px)]'
      }`}
    >
      <motion.div variants={fadeUp} className="flex items-start justify-between gap-6">
        <div>
          <div className="eyebrow flex items-center gap-2.5">
            <span className="text-brand">{String(index + 1).padStart(2, '0')}</span>
            <span className="h-px w-5 bg-hair" />
            {job.period}
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-chalk md:text-3xl">
            {job.role}
          </h3>
          <div className="mt-1.5 font-mono text-sm text-brand">{job.legal}</div>
        </div>

        {job.current && (
          <span className="chip chip-accent flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            current
          </span>
        )}
      </motion.div>

      {/* Two columns in the pinned view so eight bullets still fit one screen. */}
      <ul
        className={`mt-7 grid gap-x-10 gap-y-3.5 border-t border-hair pt-7 ${
          compact ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'
        }`}
      >
        {job.bullets.map((bullet) => (
          <motion.li
            key={bullet}
            variants={fadeUp}
            className="flex gap-3.5 text-[14px] leading-relaxed text-fog"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand/70" />
            <span>{bullet}</span>
          </motion.li>
        ))}
      </ul>

      <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-2 border-t border-hair pt-6">
        {job.stack.map((tech) => (
          <span key={tech} className="chip">
            {tech}
          </span>
        ))}
      </motion.div>
    </motion.article>
  );
}

export default function Experience() {
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();
  const horizontal = isDesktop && !reduced;

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0.06, 0.94], [0, -distance]);

  useEffect(() => {
    if (!horizontal) {
      setDistance(0);
      return undefined;
    }

    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 96));
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener('resize', measure);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [horizontal]);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (!horizontal) return;
    const index = Math.min(
      experience.length - 1,
      Math.max(0, Math.floor(p * experience.length))
    );
    setActive(index);
    setActiveCluster(index);
  });

  // Hand the 3D scene back to its default state when this section is off-screen.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setActiveCluster(-1);
      },
      { threshold: 0 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      setActiveCluster(-1);
    };
  }, []);

  const header = (
    <div className="flex items-end justify-between gap-8">
      <div>
        <div className="eyebrow flex items-center gap-3">
          <span className="text-brand">02</span>
          <span className="h-px w-8 bg-hair" />
          experience
        </div>
        <h2 className="headline mt-5 text-chalk">Three years, three teams.</h2>
      </div>

      {horizontal && (
        <div className="hidden items-center gap-3 lg:flex">
          {experience.map((job, i) => (
            <div key={job.company} className="flex items-center gap-3">
              <span
                className={`font-mono text-[11px] transition-colors duration-300 ${
                  active === i ? 'text-brand' : 'text-fog'
                }`}
              >
                {job.company}
              </span>
              {i < experience.length - 1 && <span className="h-px w-6 bg-hair" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (!horizontal) {
    return (
      <section id="experience" className="u-section u-container relative z-10">
        {header}
        <div className="mt-14 space-y-6">
          {experience.map((job, i) => (
            <Card key={job.company} job={job} index={i} compact />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative z-10 h-[340vh]"
      data-cursor="drag"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20">
        <div className="u-container">{header}</div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="mt-10 flex gap-6 pl-[max(20px,calc((100vw-1440px)/2+80px))] pr-24"
        >
          {experience.map((job, i) => (
            <Card key={job.company} job={job} index={i} />
          ))}
        </motion.div>

        <div className="u-container mt-8">
          <div className="h-px w-full bg-hair">
            <motion.div
              className="h-px origin-left bg-brand"
              style={{ scaleX: scrollYProgress }}
              transition={{ ease: EASE_OUT }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
