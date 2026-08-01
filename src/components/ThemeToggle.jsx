// src/components/ThemeToggle.jsx
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../lib/themeContext';
import { DUR, EASE_OUT } from '../lib/motion';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor="link"
      role="switch"
      aria-checked={isLight}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
      title={`Switch to ${isLight ? 'dark' : 'light'} theme`}
      className={`relative flex h-9 w-[62px] items-center rounded-full border border-hair bg-[var(--tint)] px-1 ${className}`}
    >
      <motion.span
        animate={{ x: isLight ? 26 : 0 }}
        transition={{ duration: DUR.standard, ease: EASE_OUT }}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-[var(--brand-ink)]"
      >
        {isLight ? <Sun size={14} strokeWidth={2.2} /> : <Moon size={14} strokeWidth={2.2} />}
      </motion.span>
    </button>
  );
}
