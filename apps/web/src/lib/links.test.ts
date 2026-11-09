import { describe, expect, it } from 'vitest';
import { extractLinkedSlugs, resolveEntryLinks } from './links';

const index = new Map([
  ['crise', { name: 'Crise', type: 'rule' as const }],
  ['raio', { name: 'Raio', type: 'spell' as const }],
]);

describe('resolveEntryLinks', () => {
  it('turns [[slug]] into a link labelled with the entry name', () => {
    expect(resolveEntryLinks('Veja [[crise]] e [[raio]].', index)).toBe(
      'Veja [Crise](/regras/crise) e [Raio](/feiticos/raio).',
    );
  });

  it('falls back to a search link for an unknown slug', () => {
    expect(resolveEntryLinks('[[pontos-de-vida]]', index)).toBe(
      '[pontos de vida](/buscar?q=pontos-de-vida)',
    );
  });
});

describe('extractLinkedSlugs', () => {
  it('returns unique slugs in order of appearance across texts', () => {
    expect(extractLinkedSlugs('[[a]] [[b]]', '[[a]] [[c]]')).toEqual(['a', 'b', 'c']);
  });
});
