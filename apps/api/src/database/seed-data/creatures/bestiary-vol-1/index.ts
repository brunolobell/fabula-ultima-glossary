import { SeedEntry } from '../../types';
import { criaturasVol1A } from './a';
import { criaturasVol1B } from './b';
import { criaturasVol1C } from './c';

/** The Bestiary Vol. I Compendium (printed p. 80-326), translated; unofficial (ADR 0004). */
export const criaturasBestiaryVol1: SeedEntry[] = [
  ...criaturasVol1A,
  ...criaturasVol1B,
];
