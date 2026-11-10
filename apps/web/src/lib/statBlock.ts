import type { CreatureDetails } from '../api/types';
import type { Cell } from './statCells';

export const signed = (n: number) => (n >= 0 ? `+${n}` : String(n));

/** The numbers row of a stat block, as the bestiary prints it (Livro Básico p. 320-321). */
export function numberCells(d: CreatureDetails): Cell[] {
  const { DES, AST, VIG, VON } = d.attributes;
  return [
    { label: 'DES', value: `d${DES}` },
    { label: 'AST', value: `d${AST}` },
    { label: 'VIG', value: `d${VIG}` },
    { label: 'VON', value: `d${VON}` },
    { label: 'PV', value: d.hp },
    { label: 'Crise', value: d.crisis },
    { label: 'PM', value: d.mp },
    { label: 'Inic.', value: d.initiative },
    {
      label: 'Defesa',
      value: d.defense.fixed
        ? String(d.defense.value)
        : signed(d.defense.value),
    },
    { label: 'Def. Mágica', value: signed(d.magicDefense) },
  ];
}

/** Everything the stat block prints, for the "Siglas nesta página" legend to read. */
export function statBlockTexts(d: CreatureDetails): string[] {
  return [
    ...numberCells(d).map((cell) => cell.label),
    ...d.attacks.flatMap((a) => [
      `(${a.accuracy})`,
      `(RA + ${a.damage ?? 0})`,
      a.effect ?? '',
    ]),
    ...d.spells.flatMap((s) => [s.accuracy ? `(${s.accuracy})` : '', s.effect]),
    ...d.otherActions.map((a) => a.effect),
    ...d.specialRules.map((r) => r.effect),
  ];
}
