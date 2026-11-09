const COMBINING_MARKS = /[̀-ͯ]/g;

/** Lowercases and strips accents, so "Perícia" and "pericia" compare equal. */
export function normalizeText(value: string): string {
  return value.normalize('NFD').replace(COMBINING_MARKS, '').toLowerCase();
}

/** URL-friendly identifier derived from an entry's name. */
export function slugify(value: string): string {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
