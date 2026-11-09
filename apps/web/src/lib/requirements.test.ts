import { describe, expect, it } from 'vitest';
import type { EntrySummary, HeroicSkillRequirements } from '../api/types';
import { isOpenToAll, requirementText } from './requirements';

const named = (...names: string[]) =>
  new Map(
    names.map((name) => [
      name.toLowerCase().replace(/ /g, '-'),
      { name } as EntrySummary,
    ]),
  );

const index = named('Furioso', 'Mestre de Armas', 'Atirador', 'Elementalista', 'Entropista', 'Espiritualista', 'Tiro de Aviso');

const req = (over: Partial<HeroicSkillRequirements>): HeroicSkillRequirements => ({
  classes: [],
  required: 0,
  alsoRequires: [],
  note: null,
  ...over,
});

describe('requirementText', () => {
  it('says a Heroic Skill without Classes is open to everyone', () => {
    expect(isOpenToAll(req({}))).toBe(true);
    expect(requirementText(req({}), index)).toBe('Disponível a todos os personagens');
  });

  it('names a single Class', () => {
    expect(requirementText(req({ classes: ['furioso'], required: 1 }), index)).toBe(
      'Dominar Furioso',
    );
  });

  it('joins "any of" with commas and "ou"', () => {
    expect(
      requirementText(req({ classes: ['furioso', 'mestre-de-armas'], required: 1 }), index),
    ).toBe('Dominar Furioso ou Mestre de Armas');
    expect(
      requirementText(
        req({ classes: ['atirador', 'furioso', 'mestre-de-armas'], required: 1 }),
        index,
      ),
    ).toBe('Dominar Atirador, Furioso ou Mestre de Armas');
  });

  it('joins "all of" with "e"', () => {
    expect(
      requirementText(req({ classes: ['furioso', 'atirador'], required: 2 }), index),
    ).toBe('Dominar Furioso e Atirador');
  });

  it('says how many of the Classes are needed when it is some of them', () => {
    expect(
      requirementText(
        req({ classes: ['elementalista', 'entropista', 'espiritualista'], required: 2 }),
        index,
      ),
    ).toBe('Dominar 2 entre Elementalista, Entropista e Espiritualista');
  });

  it('adds the required Skills and the note', () => {
    expect(
      requirementText(
        req({
          classes: ['atirador'],
          required: 1,
          alsoRequires: ['tiro-de-aviso'],
          note: 'Exige estar no 30º nível ou acima.',
        }),
        index,
      ),
    ).toBe('Dominar Atirador · Também exige: Tiro de Aviso · Exige estar no 30º nível ou acima.');
  });
});
