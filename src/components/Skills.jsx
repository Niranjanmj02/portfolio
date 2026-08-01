// src/components/Skills.jsx
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { skillGroups } from '../data/content';
import SectionHeading from './SectionHeading';
import { DUR, EASE_OUT, fadeUp, staggerParent, VIEWPORT } from '../lib/motion';

// No invented percentages — weight is a typographic signal, not a score.
const WEIGHT = {
  1: 'text-[13px] text-fog',
  2: 'text-[16px] text-chalk',
  3: 'text-[20px] md:text-[24px] text-chalk font-medium',
};

export default function Skills() {
  const [filter, setFilter] = useState('all');

  const visible = useMemo(() => {
    const groups = filter === 'all' ? skillGroups : skillGroups.filter((g) => g.id === filter);
    return groups.flatMap((group) =>
      group.items.map((item) => ({ ...item, group: group.id, label: group.label }))
    );
  }, [filter]);

  return (
    <section id="skills" className="u-section u-container relative z-10">
      <SectionHeading
        n="04"
        label="skills"
        title={
          <>
            The actual
            <br />
            toolkit.
          </>
        }
        lede="Grouped the way the work is grouped."
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={staggerParent(skillGroups.length + 1)}
          className="flex flex-wrap gap-2"
        >
          <motion.button
            variants={fadeUp}
            type="button"
            data-cursor="link"
            onClick={() => setFilter('all')}
            className={`chip ${filter === 'all' ? 'chip-accent' : ''}`}
          >
            all
          </motion.button>
          {skillGroups.map((group) => (
            <motion.button
              key={group.id}
              variants={fadeUp}
              type="button"
              data-cursor="link"
              onClick={() => setFilter(group.id)}
              className={`chip ${filter === group.id ? 'chip-accent' : ''}`}
            >
              {group.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div layout className="mt-12 flex flex-wrap items-baseline gap-x-7 gap-y-5">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item) => (
              <motion.span
                key={`${item.group}-${item.n}`}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: DUR.standard, ease: EASE_OUT }}
                className={`${WEIGHT[item.w || 1]} tracking-tight transition-colors duration-200 hover:text-brand`}
              >
                {item.n}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>

        {filter === 'all' && (
          <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-hair sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.id} className="bg-panel/60 p-6">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand">
                  {group.label}
                </div>
                <div className="mt-3 font-mono text-[11.5px] text-fog">
                  {group.items.length} technologies
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionHeading>
    </section>
  );
}
