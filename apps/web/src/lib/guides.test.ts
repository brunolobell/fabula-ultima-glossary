import { describe, expect, it } from 'vitest';
import type { EntrySummary } from '../api/types';
import { guideBlurb, sortedGuides } from './guides';

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

describe('guideBlurb', () => {
  it('cuts at the first colon, parenthesis or full stop', () => {
    expect(
      guideBlurb(
        'Os sete passos do livro para a mesa criar o seu mundo: forma, mapa, reinos. Antes deles, a conversa.',
      ),
    ).toBe('Os sete passos do livro para a mesa criar o seu mundo');
    expect(
      guideBlurb(
        'Com o mundo pronto, a mesa escolhe um dos cinco tipos de grupo (Exploradores, Guardiões) para definir os temas.',
      ),
    ).toBe('Com o mundo pronto, a mesa escolhe um dos cinco tipos de grupo');
    expect(
      guideBlurb('Os oito passos do livro para criar um personagem. A ordem é só um roteiro.'),
    ).toBe('Os oito passos do livro para criar um personagem');
  });

  it('keeps a summary that has no cut, or whose first clause is too short', () => {
    expect(guideBlurb('Um roteiro curto sem pontuação')).toBe('Um roteiro curto sem pontuação');
    expect(guideBlurb('Regras: tudo o que importa para jogar')).toBe(
      'Regras: tudo o que importa para jogar',
    );
  });
});
