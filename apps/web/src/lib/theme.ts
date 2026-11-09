export type Theme = 'light' | 'dark';

// Keep this key in sync with the inline script in index.html.
const STORAGE_KEY = 'codice-tema';

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

/** Applies the theme and remembers the choice; storage may be unavailable. */
export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Private mode or blocked storage: the choice just won't persist.
  }
}
