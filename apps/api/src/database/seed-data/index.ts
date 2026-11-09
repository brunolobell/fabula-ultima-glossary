import { andarilho } from './classes/andarilho';
import { arcanista } from './classes/arcanista';
import { atirador } from './classes/atirador';
import { elementalista } from './classes/elementalista';
import { entropista } from './classes/entropista';
import { erudito } from './classes/erudito';
import { espiritualista } from './classes/espiritualista';
import { furioso } from './classes/furioso';
import { guardiao } from './classes/guardiao';
import { guerreiroSombrio } from './classes/guerreiro-sombrio';
import { inventor } from './classes/inventor';
import { ladino } from './classes/ladino';
import { mestreDeArmas } from './classes/mestre-de-armas';
import { orador } from './classes/orador';
import { quimerista } from './classes/quimerista';
import { armasBasicas } from './equipment/armas-basicas';
import { guides } from './guides';
import { rules } from './rules';
import { SeedEntry } from './types';

export const seedEntries: SeedEntry[] = [
  ...guides,
  ...rules,
  // The 15 classes, in the book's (alphabetical) order.
  ...andarilho,
  ...arcanista,
  ...atirador,
  ...elementalista,
  ...entropista,
  ...erudito,
  ...espiritualista,
  ...furioso,
  ...guardiao,
  ...guerreiroSombrio,
  ...inventor,
  ...ladino,
  ...mestreDeArmas,
  ...orador,
  ...quimerista,
  ...armasBasicas,
];
