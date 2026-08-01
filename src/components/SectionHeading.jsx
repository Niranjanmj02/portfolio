// src/components/SectionHeading.jsx
import { motion } from 'framer-motion';
import { fadeUp, VIEWPORT } from '../lib/motion';

/**
 * Two-column section shell. The index (`01 / ABOUT`) sticks in the left gutter
 * for the whole section, which is what gives the scroll its sense of place.
 */
export default function SectionHeading({ n, label, title, lede, children }) {
  return (
    <div className="grid grid-cols-12 gap-x-8 gap-y-10">
      <div className="col-span-12 lg:col-span-3">
        <div className="lg:sticky lg:top-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={fadeUp}
          >
            <div className="eyebrow flex items-center gap-3">
              <span className="text-brand">{n}</span>
              <span className="h-px w-8 bg-hair" />
              <span>{label}</span>
            </div>
            <h2 className="headline mt-5 text-chalk">{title}</h2>
            {lede && <p className="mt-4 max-w-xs text-sm leading-relaxed text-fog">{lede}</p>}
          </motion.div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-9">{children}</div>
    </div>
  );
}
