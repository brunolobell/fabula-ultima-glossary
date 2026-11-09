import { elementalista } from './classes/elementalista';
import { guardiao } from './classes/guardiao';
import { armasBasicas } from './equipment/armas-basicas';
import { guides } from './guides';
import { rules } from './rules';
import { SeedEntry } from './types';

export const seedEntries: SeedEntry[] = [
  ...guides,
  ...rules,
  ...guardiao,
  ...elementalista,
  ...armasBasicas,
];
