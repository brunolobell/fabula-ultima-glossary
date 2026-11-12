import { SeedEntry } from '../../types';
import { criaturasLivroBasicoConstruct } from './construct';
import { criaturasLivroBasicoDemon } from './demon';
import { criaturasLivroBasicoElemental } from './elemental';
import { criaturasLivroBasicoBeast } from './beast';
import { criaturasLivroBasicoHumanoid } from './humanoid';
import { criaturasLivroBasicoMonster } from './monster';
import { criaturasLivroBasicoUndead } from './undead';
import { criaturasLivroBasicoPlant } from './plant';

/** The Bestiário of the Livro Básico (p. 319-353): 56 Creatures, one file per Species. */
export const criaturasLivroBasico: SeedEntry[] = [
  ...criaturasLivroBasicoConstruct,
  ...criaturasLivroBasicoDemon,
  ...criaturasLivroBasicoElemental,
  ...criaturasLivroBasicoBeast,
  ...criaturasLivroBasicoHumanoid,
  ...criaturasLivroBasicoMonster,
  ...criaturasLivroBasicoUndead,
  ...criaturasLivroBasicoPlant,
];
