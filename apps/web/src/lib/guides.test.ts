import { describe, expect, it } from 'vitest';
import type { EntrySummary } from '../api/types';
import { sortedGuides } from './guides';

const guide = (slug: string, order: number) =>
  ({ slug, type: 'guide', details: { order, steps: [] } }) as unknown as EntrySummary;
const rule = (slug: string) =>
  ({ slug, type: 'rule', details: {} }) as unknown as EntrySummary;

describe('sortedGuides', () => {
  it('keeps only guides, in the order of the book rather than alphabetical', () => {
    const entries = [
      guide('como-jogar', 4),
      rule('tracos'),
      guide('criar-um-personagem', 3),
      guide('criar-um-mundo', 1),
      guide('criar-um-grupo', 2),
    ];
    expect(sortedGuides(entries).map((g) => g.slug)).toEqual([
      'criar-um-mundo',
      'criar-um-grupo',
      'criar-um-personagem',
      'como-jogar',
    ]);
  });
});
