import type { EquipmentDetails, RareArmorRuleDetails } from '../api/types';
import { CUSTOM_FEATURE, type CostLine } from './weaponForge';

// The Armor Forge's arithmetic. It only reads the numbers the Rule "Criar
// armaduras e escudos raros" carries as `details` (see
// docs/adr/0002-weapon-forge-rule-data.md); nothing is saved.

export type ArmorKind = 'armor' | 'shield';

/** A basic armor or shield, the Forge's starting point. */
export interface ArmorBase {
  name: string;
  kind: ArmorKind;
  martial: boolean;
  cost: number;
  /** Defesa as printed ("12", "Dado de DES +1", "+2"). */
  defense: string;
  /** Defesa Mágica as printed; null when the item gives none. */
  magicDefense: string | null;
  /** Armor only. */
  initiative: number | null;
}

export const baseFromEquipment = (
  name: string,
  d: EquipmentDetails,
): ArmorBase => ({
  name,
  kind: d.kind === 'shield' ? 'shield' : 'armor',
  martial: d.martial,
  cost: d.cost ?? 0,
  defense: d.defense ?? '',
  magicDefense: d.magicDefense ?? null,
  initiative: d.kind === 'shield' ? null : (d.initiative ?? 0),
});

export interface ArmorChoice {
  /** A feature id, `CUSTOM_FEATURE` for a typed effect, or null. */
  featureId: string | null;
  customEffect: { text: string; cost: number };
}

export const emptyArmorChoice = (): ArmorChoice => ({
  featureId: null,
  customEffect: { text: '', cost: 0 },
});

/** What a finished Rare Armor or Rare Shield looks like. */
export interface ArmorStats extends ArmorBase {
  feature: { name: string; summary: string } | null;
  /** True when the feature's Iniciativa bonus is already in `initiative`. */
  initiativeCounted: boolean;
}

export interface ArmorResult {
  stats: ArmorStats;
  cost: CostLine[];
  total: number;
  /** What is still missing or wrong. */
  problems: string[];
}

export function computeRareArmor(
  rules: RareArmorRuleDetails,
  base: ArmorBase,
  choice: ArmorChoice,
): ArmorResult {
  const cost: CostLine[] = [{ label: base.name, amount: base.cost }];
  const problems: string[] = [];
  let feature: ArmorStats['feature'] = null;
  let bonus = 0;

  if (choice.featureId === CUSTOM_FEATURE) {
    const { text, cost: price } = choice.customEffect;
    if (!text.trim()) problems.push('Descreva o efeito personalizado.');
    if (!Number.isInteger(price) || price < 0) {
      problems.push(
        'O custo do efeito personalizado deve ser um inteiro, 0 ou mais.',
      );
    } else if (price > 0) {
      cost.push({ label: 'Efeito personalizado', amount: price });
    }
    feature = { name: 'Efeito personalizado', summary: text.trim() };
  } else if (choice.featureId) {
    const f = rules.features.find((x) => x.id === choice.featureId);
    if (f) {
      cost.push({ label: f.name, amount: f.cost });
      feature = { name: f.name, summary: f.summary };
      bonus = f.initiative ?? 0;
    }
  }
  if (!feature) problems.push('Escolha uma característica.');

  const counted = base.kind === 'armor' && bonus !== 0;
  return {
    stats: {
      ...base,
      initiative:
        base.initiative === null
          ? null
          : base.initiative + (counted ? bonus : 0),
      feature,
      initiativeCounted: counted,
    },
    cost,
    total: cost.reduce((sum, line) => sum + line.amount, 0),
    problems,
  };
}

const signed = (n: number) => (n > 0 ? `+${n}` : String(n));

/** "Defesa 12, Def. Mágica Dado de AST, Iniciativa -4" (no Iniciativa for a shield). */
export function defenseText(base: ArmorBase): string {
  const magic = `Def. Mágica ${base.magicDefense ?? 'sem bônus'}`;
  const initiative =
    base.initiative === null
      ? ''
      : `, Iniciativa ${base.initiative === 0 ? 'sem modificador' : signed(base.initiative)}`;
  return `Defesa ${base.defense}, ${magic}${initiative}`;
}

/** "Armadura rara marcial. Defesa 12, Def. Mágica Dado de AST, Iniciativa -4." */
export function armorStatLine(stats: ArmorStats): string {
  const label = stats.kind === 'armor' ? 'Armadura rara' : 'Escudo raro';
  return `${label}${stats.martial ? ' marcial' : ''}. ${defenseText(stats)}.`;
}

/** The feature under the stat line. */
export function armorEffectLines(stats: ArmorStats): string[] {
  if (!stats.feature) return [];
  const counted = stats.initiativeCounted ? ' (já contabilizado)' : '';
  return [
    `Característica ${stats.feature.name}: ${stats.feature.summary}${counted}`,
  ];
}
