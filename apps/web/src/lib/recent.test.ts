import { afterEach, describe, expect, it, vi } from 'vitest';
import { MAX_RECENTS, readRecents, rememberEntry } from './recent';

afterEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

const entry = (n: number) => ({ slug: `e${n}`, name: `E ${n}`, type: 'rule' as const });

describe('recent entries', () => {
  it('keeps the newest first and moves a repeat to the top', () => {
    rememberEntry(entry(1));
    rememberEntry(entry(2));
    rememberEntry(entry(1));
    expect(readRecents().map((r) => r.slug)).toEqual(['e1', 'e2']);
  });

  it('keeps at most five', () => {
    for (let n = 1; n <= MAX_RECENTS + 3; n++) rememberEntry(entry(n));
    expect(readRecents()).toHaveLength(MAX_RECENTS);
    expect(readRecents()[0].slug).toBe(`e${MAX_RECENTS + 3}`);
  });

  it('ignores corrupt storage', () => {
    localStorage.setItem('codice-recentes', '{not json');
    expect(readRecents()).toEqual([]);
    localStorage.setItem('codice-recentes', JSON.stringify([{ slug: 1 }, 'x', null]));
    expect(readRecents()).toEqual([]);
  });

  it('survives storage that throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(() => rememberEntry(entry(1))).not.toThrow();
    expect(readRecents()).toEqual([]);
  });
});
