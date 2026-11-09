/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    // Every color is a CSS variable (see src/index.css), so light and dark
    // themes switch without `dark:` variants. Opacity modifiers don't apply.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      bg: 'var(--bg)',
      surface: 'var(--surface)',
      ink: 'var(--ink)',
      muted: 'var(--ink-muted)',
      line: 'var(--line)',
      primary: 'var(--primary)',
      'primary-deep': 'var(--primary-deep)',
      heading: 'var(--heading)',
      'on-primary': 'var(--on-primary)',
      'on-bar': 'var(--on-bar)',
      'tint-key': 'var(--tint-key)',
      'tint-example': 'var(--tint-example)',
      'accent-ink': 'var(--accent-ink)',
      scrim: 'var(--scrim)',
    },
    fontFamily: {
      display: ['"Credit Valley"', 'Antonio', 'sans-serif'],
      heading: ['Antonio', 'sans-serif'],
      body: ['"PT Sans Narrow"', 'sans-serif'],
    },
    extend: {
      maxWidth: { reading: '44rem' },
    },
  },
  plugins: [],
};
