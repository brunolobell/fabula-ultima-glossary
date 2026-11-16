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
import { carteador } from './classes/bonus-ace-of-cards/carteador';
import { necromante } from './classes/bonus-necromancer/necromante';
import { astrologo } from './classes/codex-extra/astrologo';
import { bandoleiro } from './classes/codex-extra/bandoleiro';
import { cavaleiroMagico } from './classes/codex-extra/cavaleiro-magico';
import { forjadorDeAlmas } from './classes/codex-extra/forjador-de-almas';
import { laminaCarmesim } from './classes/codex-extra/lamina-carmesim';
import { malandro } from './classes/codex-extra/malandro';
import { esper } from './classes/techno-fantasy/esper';
import { mutante } from './classes/techno-fantasy/mutante';
import { piloto } from './classes/techno-fantasy/piloto';
import { criaturasBestiaryVol1 } from './creatures/bestiary-vol-1';
import { criaturasLivroBasico } from './creatures/livro-basico';
import { armasBasicas } from './equipment/armas-basicas';
import { armadurasEscudosBasicos } from './equipment/armaduras-escudos-basicos';
import { itensRarosHighFantasy } from './equipment/high-fantasy/itens-raros';
import { itensRarosNaturalFantasy } from './equipment/natural-fantasy/itens-raros';
import { itensRarosTechnoFantasy } from './equipment/techno-fantasy/itens-raros';
import { gameSetupRules } from './game-setup';
import {
  servicesAndTransport,
  servicesAndTransportTechnoFantasy,
} from './services-transport';
import { guides } from './guides';
import { poderesHeroicosAceOfCards } from './heroic-skills/bonus-ace-of-cards';
import { poderesHeroicosNecromancer } from './heroic-skills/bonus-necromancer';
import { poderesHeroicosCodexExtra } from './heroic-skills/codex-extra';
import { poderesHeroicosHighFantasy } from './heroic-skills/high-fantasy';
import { poderesHeroicosLivroBasico } from './heroic-skills/livro-basico';
import { poderesHeroicosNaturalFantasy } from './heroic-skills/natural-fantasy';
import { poderesHeroicosTechnoFantasy } from './heroic-skills/techno-fantasy';
import { atlasMagicRule } from './atlas-magic';
import { inBook } from './helpers';
import { npcSpellsRule } from './npc-spells';
import { peculiarities, peculiaritiesRule } from './peculiarities';
import { quickAssemblySeed } from './quick-assembly';
import { rules } from './rules';
import { weaponForgeRules } from './weapon-forge';
import { armorForgeRules } from './armor-forge';
import { bestiaryOptionRules } from './bestiary-options';
import { SeedEntry } from './types';

export const seedEntries: SeedEntry[] = [
  ...guides,
  ...rules,
  ...gameSetupRules,
  ...inBook('high-fantasy', [peculiaritiesRule, atlasMagicRule]),
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
  ...armadurasEscudosBasicos,
  ...criaturasLivroBasico,
  ...criaturasBestiaryVol1,
  npcSpellsRule,
  ...quickAssemblySeed,
  ...bestiaryOptionRules,
  ...weaponForgeRules,
  ...armorForgeRules,
  ...servicesAndTransport,
  ...poderesHeroicosLivroBasico,
  // Peculiaridades dos três Atlas (cada livro com seu `source`)
  ...peculiarities,
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
  ...inBook('techno-fantasy', servicesAndTransportTechnoFantasy),
  // Codex Extra
  ...inBook('codex-extra', [
    ...astrologo,
    ...bandoleiro,
    ...cavaleiroMagico,
    ...forjadorDeAlmas,
    ...laminaCarmesim,
    ...malandro,
  ]),
  ...inBook('codex-extra', poderesHeroicosCodexExtra),
  // Bonus
  ...inBook('bonus-ace-of-cards', [...carteador]),
  ...inBook('bonus-ace-of-cards', poderesHeroicosAceOfCards),
  ...inBook('bonus-necromancer', [...necromante]),
  ...inBook('bonus-necromancer', poderesHeroicosNecromancer),
];
