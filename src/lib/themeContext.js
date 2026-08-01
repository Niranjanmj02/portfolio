// src/lib/themeContext.js
import { createContext, useContext } from 'react';

export const THEME_KEY = 'nm-theme';

export const ThemeContext = createContext({
  theme: 'dark',
  setTheme: () => {},
  toggle: () => {},
});

export const useTheme = () => useContext(ThemeContext);
