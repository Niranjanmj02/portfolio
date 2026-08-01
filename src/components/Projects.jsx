// src/components/Projects.jsx
import { motion } from 'framer-motion';
import { projects } from '../data/content';
import SectionHeading from './SectionHeading';
import { fadeUp, staggerParent, VIEWPORT } from '../lib/motion';
import { firePulse, setActiveCluster } from '../lib/sceneStore';

// Asymmetric spans so the grid doesn't read as a table of identical boxes.
const SPANS = [
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-7',
  'lg:col-span-6',
  'lg:col-span-6',
];

function ProjectCard({ project, index }) {
  return (
    <motion.article
      variants={fadeUp}
      data-cursor={project.link ? 'view' : undefined}
      onMouseEnter={() => {
        firePulse();
        setActiveCluster(index % 3);
      }}
      onMouseLeave={() => setActiveCluster(-1)}
      className={`group relative col-span-12 flex flex-col justify-between overflow-hidden rounded-2xl border border-hair bg-panel/60 p-7 backdrop-blur-sm transition-colors duration-300 hover:border-brand/40 md:col-span-6 md:p-8 ${
        SPANS[index] || 'lg:col-span-6'
      } ${project.flagship ? 'min-h-[320px]' : 'min-h-[280px]'}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(120% 90% at 100% 0%, rgba(var(--brand-rgb),0.12) 0%, rgba(var(--brand-rgb),0) 60%)',
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[11px] text-fog">
            {String(index + 1).padStart(2, '0')}
          </span>
          {project.flagship && <span className="chip chip-accent">flagship</span>}
        </div>

        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-chalk transition-colors duration-300 group-hover:text-brand md:text-[28px]">
          {project.title}
        </h3>
        <div className="mt-1.5 font-mono text-[12px] text-fog">{project.kind}</div>

        <p className="mt-4 max-w-lg text-[14.5px] leading-relaxed text-fog">
          {project.description}
        </p>
      </div>

      <div className="relative mt-8">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-hair pt-5 font-mono text-[11.5px]">
          <span className="text-fog">{project.context}</span>
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="text-brand transition-transform duration-300 group-hover:translate-x-0.5"
            >
              {project.linkLabel} ↗
            </a>
          ) : (
            <span className="text-fog/70">not public</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="work" className="u-section u-container relative z-10">
      <SectionHeading
        n="03"
        label="work"
        title={
          <>
            Systems in
            <br />
            production.
          </>
        }
        lede="Internal platform work at Examic, plus published research."
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={staggerParent(projects.length)}
          className="grid grid-cols-12 gap-5"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </motion.div>
      </SectionHeading>
    </section>
  );
}
