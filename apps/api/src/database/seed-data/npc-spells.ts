import { NpcSpell } from '../../entries/entry-types';
import { rule } from './helpers';
import { npcSpells } from './npc-spells-data';
import { SeedEntry } from './types';

/** `{type}` reads "(escolha: tipo de dano)"; `{damage}` the damage before the level's extra. */
const readable = (spell: NpcSpell) =>
  spell.effect.replace(/\{(\w+)\}/g, (_, id: string) => {
    if (id === 'damage')
      return spell.flat ? String(spell.damage) : `RA + ${spell.damage}`;
    const slot = spell.slots?.find((s) => s.id === id);
    return `(escolha: ${(slot?.label ?? id).toLowerCase()})`;
  });

const table = `| Feitiço | PM | Alvo | Duração | Efeito |
| --- | --- | --- | --- | --- |
${npcSpells
  .map(
    (s) =>
      `| **${s.name}**${s.offensive ? ' (ofensivo)' : ''} | ${s.mpCost} | ${s.target} | ${s.duration} | ${readable(s)} |`,
  )
  .join('\n')}`;

/** Livro Básico p. 310-311. */
export const npcSpellsRule: SeedEntry = {
  ...rule(
    'Feitiços de NPC',
    310,
    'A lista de 15 feitiços que um NPC pode aprender (Sopro, Roubo de Vida, Condição em Área, Lamber Feridas…), que o mestre renomeia e personaliza escolhendo tipos de dano e condições ao criar a ficha.',
    `Ao dar um destes feitiços a um NPC, renomeie-o e ajuste os efeitos às suas necessidades: a maioria é personalizável, e você escolhe entre condições ou tipos de dano **ao criar a ficha do NPC**.

> **Exemplo:** você pode dar Sopro Amaldiçoado a uma criatura, escolher dano de gelo e a condição lento e renomeá-lo "Lança Congelada".

Os poderes de função da [[montagem-rapida]] oferecem estes feitiços (e alguns feitiços de classe). Para montar uma criatura e escolher os feitiços, abra o [Laboratório Oroboros](/criaturas?montagem=rapida).

${table}

As quantidades de dano (RA + N) já valem para um NPC do nível 5; a partir do nível 20 elas ganham o dano extra da função (5, 10 ou 15).`,
    ['feitiço de npc', 'npc spells', 'criatura'],
  ),
  details: { forge: 'npc-spells', spells: npcSpells },
};
