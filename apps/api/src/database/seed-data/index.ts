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
import { comandante } from './classes/high-fantasy/comandante';
import { dancarino } from './classes/high-fantasy/dancarino';
import { simbolista } from './classes/high-fantasy/simbolista';
import { virtuoso } from './classes/high-fantasy/virtuoso';
import { floralista } from './classes/natural-fantasy/floralista';
import { gourmet } from './classes/natural-fantasy/gourmet';
import { invocador } from './classes/natural-fantasy/invocador';
import { mercador } from './classes/natural-fantasy/mercador';
import { esper } from './classes/techno-fantasy/esper';
import { mutante } from './classes/techno-fantasy/mutante';
import { piloto } from './classes/techno-fantasy/piloto';
import { armasBasicas } from './equipment/armas-basicas';
import { itensRarosHighFantasy } from './equipment/high-fantasy/itens-raros';
import { itensRarosNaturalFantasy } from './equipment/natural-fantasy/itens-raros';
import { itensRarosTechnoFantasy } from './equipment/techno-fantasy/itens-raros';
import { guides } from './guides';
import { poderesHeroicosHighFantasy } from './heroic-skills/high-fantasy';
import { poderesHeroicosLivroBasico } from './heroic-skills/livro-basico';
import { poderesHeroicosNaturalFantasy } from './heroic-skills/natural-fantasy';
import { poderesHeroicosTechnoFantasy } from './heroic-skills/techno-fantasy';
import { inBook } from './helpers';
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
  ...poderesHeroicosLivroBasico,
  // Atlas High Fantasy
  ...inBook('high-fantasy', [
    ...comandante,
    ...dancarino,
    ...simbolista,
    ...virtuoso,
  ]),
  ...inBook('high-fantasy', poderesHeroicosHighFantasy),
  ...itensRarosHighFantasy,
  // Atlas Natural Fantasy
  ...inBook('natural-fantasy', [
    ...floralista,
    ...gourmet,
    ...invocador,
    ...mercador,
  ]),
  ...inBook('natural-fantasy', poderesHeroicosNaturalFantasy),
  ...itensRarosNaturalFantasy,
  // Atlas Techno Fantasy
  ...inBook('techno-fantasy', [...esper, ...mutante, ...piloto]),
  ...inBook('techno-fantasy', poderesHeroicosTechnoFantasy),
  ...itensRarosTechnoFantasy,
];
