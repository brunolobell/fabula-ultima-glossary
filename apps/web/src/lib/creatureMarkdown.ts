import type { CreatureDetails } from '../api/types';
import {
  DAMAGE_ORDER,
  RANK_LABEL,
  ROLE_LABEL,
  SPECIES_LABEL,
  affinityLabel,
  damageTypeText,
} from './creatures';
import { numberCells } from './statBlock';

const signed = (n: number) => (n >= 0 ? `+${n}` : String(n));

/** Plain check notation, `(DES + VIG) +3`, so it pastes anywhere. */
const check = (formula: string, bonus?: number) =>
  `(${formula})${bonus ? ` ${signed(bonus)}` : ''}`;

/**
 * The stat block as Markdown, in the order the bestiary prints it (name, level line,
 * Traços, numbers, Afinidades, then attacks, spells, other actions and special rules),
 * for a Game Master to paste into notes or a virtual tabletop. Nothing here is saved.
 */
export function creatureToMarkdown(
  name: string,
  d: CreatureDetails,
  ultimaPoints: number | null,
): string {
  const cell = (label: string) =>
    String(numberCells(d).find((c) => c.label === label)?.value);
  const lines: string[] = [`# ${name}`];

  lines.push(
    [
      `Nível ${d.level}`,
      SPECIES_LABEL[d.species],
      RANK_LABEL[d.rank],
      ...(d.role ? [`Função: ${ROLE_LABEL[d.role]}`] : []),
      ...(d.villain ? ['Vilão'] : []),
    ].join(' · '),
    '',
  );
  if (d.traits.length > 0) {
    lines.push(`**Traços típicos:** ${d.traits.join(', ')}.`, '');
  }
  lines.push(
    ['DES', 'AST', 'VIG', 'VON'].map((l) => `**${l}** ${cell(l)}`).join(' · '),
    `**PV** ${d.hp} (Crise ${d.crisis}) · **PM** ${d.mp} · **Inic.** ${d.initiative} · **Defesa** ${cell('Defesa')} · **Def. Mágica** ${cell('Def. Mágica')}`,
  );
  if (ultimaPoints !== null) {
    lines.push(`**Pontos de Ultima:** ${ultimaPoints}`);
  }
  const affinities = DAMAGE_ORDER.flatMap((damage) => {
    const affinity = d.affinities[damage];
    return affinity ? [affinityLabel(damage, affinity)] : [];
  });
  lines.push(`**Afinidades:** ${affinities.join(', ') || 'nenhuma'}`);

  const section = (title: string, items: string[]) => {
    if (items.length > 0) lines.push('', `## ${title}`, ...items);
  };
  section(
    'Ataques básicos',
    d.attacks.map((a) => {
      const damage =
        a.damage === null
          ? ''
          : ` · (RA + ${a.damage}) de dano${a.damageType ? ` ${damageTypeText(a.damageType)}` : ''}`;
      return `- **${a.name}** (${a.range === 'melee' ? 'corpo a corpo' : 'à distância'}): ${check(a.accuracy, a.accuracyBonus)}${damage}.${a.effect ? ` ${a.effect}` : ''}`;
    }),
  );
  section(
    'Feitiços',
    d.spells.map((s) => {
      const header = [
        ...(s.offensive ? ['ofensivo'] : []),
        `${s.mpCost} PM`,
        s.target,
        s.duration,
      ].join(' · ');
      const roll = s.accuracy ? `${check(s.accuracy, s.accuracyBonus)}. ` : '';
      return `- **${s.name}** (${header}): ${roll}${s.effect}`;
    }),
  );
  section(
    'Outras ações',
    d.otherActions.map((a) => `- **${a.name}**: ${a.effect}`),
  );
  section(
    'Regras especiais',
    d.specialRules.map((r) => `- **${r.name}**: ${r.effect}`),
  );
  return lines.join('\n');
}
