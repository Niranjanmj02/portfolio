// src/components/ThemeProvider.jsx
import { useCallback, useEffect, useMemo, useState } from 'react';
import { THEME_KEY, ThemeContext } from '../lib/themeContext';

/**
 * The initial theme is already on <html data-theme> — index.html sets it before
 * first paint so there's no flash. This just takes ownership of it.
 */
const readInitial = () => {
  if (typeof document === 'undefined') return 'dark';
  const current = document.documentElement.dataset.theme;
  return current === 'light' ? 'light' : 'dark';
};

export default function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readInitial);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Track the OS preference until the visitor makes an explicit choice.
  useEffect(() => {
    let chosen = null;
    try {
      chosen = localStorage.getItem(THEME_KEY);
    } catch {
      chosen = null;
    }
    if (chosen === 'light' || chosen === 'dark') return undefined;

    const mql = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = () => setThemeState(mql.matches ? 'light' : 'dark');
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const setTheme = useCallback((next) => {
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* private mode — the choice just won't persist */
    }
    setThemeState(next);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    }),
    [theme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
