import type { AssemblySlot } from '../../entries/entry-types';

/** Pickers the Quick Assembly data shares (a damage type, conditions, a plain list). */

const DAMAGE_PT: [string, string][] = [
  ['physical', 'físico'],
  ['air', 'ar'],
  ['bolt', 'raio'],
  ['dark', 'trevas'],
  ['earth', 'terra'],
  ['fire', 'fogo'],
  ['ice', 'gelo'],
  ['light', 'luz'],
  ['poison', 'veneno'],
];

/** "dano do tipo {id}": a damage type picked by the Reader. */
export const damage = (id: string, count = 1, min?: number): AssemblySlot => ({
  id,
  label: count === 1 ? 'Tipo de dano' : 'Tipos de dano',
  count,
  ...(min !== undefined && { min }),
  options: DAMAGE_PT.map(([value, label]) => ({ value, label })),
});

const STATUS_PT: [string, string][] = [
  ['dazed', 'atordoado'],
  ['enraged', 'enfurecido'],
  ['poisoned', 'envenenado'],
  ['shaken', 'abalado'],
  ['slow', 'lento'],
  ['weak', 'fraco'],
];

export const status = (
  id: string,
  count = 1,
  only?: string[],
  label = count === 1 ? 'Condição' : 'Condições',
): AssemblySlot => ({
  id,
  label,
  count,
  options: STATUS_PT.filter(([value]) => !only || only.includes(value)).map(
    ([value, text]) => ({ value, label: text }),
  ),
});

export const pick = (
  id: string,
  label: string,
  options: [string, string][],
  count = 1,
  min?: number,
): AssemblySlot => ({
  id,
  label,
  count,
  ...(min !== undefined && { min }),
  options: options.map(([value, text]) => ({ value, label: text })),
});
