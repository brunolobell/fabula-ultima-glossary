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
      hp: 'var(--hp)',
      mp: 'var(--mp)',
      'on-stat': 'var(--on-stat)',
      scrim: 'var(--scrim)',
    },
    fontFamily: {
      display: ['"Credit Valley"', 'Antonio', 'sans-serif'],
      heading: ['Antonio', 'sans-serif'],
      body: ['"PT Sans Narrow"', 'sans-serif'],
    },
    extend: {
      maxWidth: { reading: '44rem' },
      // Two small steps, in rem so the Reader's font setting applies:
      // `meta` for PT Sans Narrow (page references, captions, row facts),
      // `label` for the uppercase Antonio labels.
      fontSize: { meta: '1rem', label: '0.9375rem' },
    },
  },
  plugins: [],
};
