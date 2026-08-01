// src/components/Reveal.jsx
import { motion } from 'framer-motion';
import { fadeUp, staggerParent, VIEWPORT } from '../lib/motion';

/** Staggering parent. Children should be <Item>. Fires once, never on scroll-up. */
export function Reveal({ children, className = '', count = 8, delay = 0, id }) {
  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={staggerParent(count, delay)}
    >
      {children}
    </motion.div>
  );
}

/** A single staggered child. */
export function Item({ children, className = '', as = 'div', ...rest }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag className={className} variants={fadeUp} {...rest}>
      {children}
    </Tag>
  );
}

/** Standalone element that reveals on its own, outside a stagger group. */
export function RevealItem({ children, className = '', as = 'div', delay = 0 }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}
