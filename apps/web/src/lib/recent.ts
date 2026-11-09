import type { EntryType } from '../api/types';
import { TYPE_INFO } from './entryTypes';

// Keep this a per-device convenience: storage can be missing, full or blocked.
const STORAGE_KEY = 'codice-recentes';
export const MAX_RECENTS = 5;

export interface Recent {
  slug: string;
  name: string;
  type: EntryType;
}

const isRecent = (value: unknown): value is Recent => {
  if (typeof value !== 'object' || value === null) return false;
  const { slug, name, type } = value as Record<string, unknown>;
  return (
    typeof slug === 'string' &&
    typeof name === 'string' &&
    typeof type === 'string' &&
    type in TYPE_INFO
  );
};

/** The last entries the Reader opened, newest first. Never throws. */
export function readRecents(): Recent[] {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(data) ? data.filter(isRecent).slice(0, MAX_RECENTS) : [];
  } catch {
    return [];
  }
}

export function rememberEntry(entry: Recent): void {
  try {
    const next = [
      { slug: entry.slug, name: entry.name, type: entry.type },
      ...readRecents().filter((r) => r.slug !== entry.slug),
    ].slice(0, MAX_RECENTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private mode or blocked storage: the list just won't be kept.
  }
}
