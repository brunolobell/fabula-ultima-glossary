import type {
  CustomWeaponRuleDetails,
  EquipmentDetails,
  RareWeaponRuleDetails,
  WeaponCustomization,
} from '../api/types';

// The Weapon Forge's arithmetic. It only reads the numbers the two Rules carry
// as `details` (see docs/adr/0002-weapon-forge-rule-data.md); nothing is saved.

export type Attribute = 'DES' | 'VIG' | 'AST' | 'VON';
export type Range = 'melee' | 'ranged';

export const PHYSICAL = 'físico';
const HEAVY = 'Armas Pesadas';

export interface CostLine {
  label: string;
  amount: number;
}

/** What a finished weapon (or one form of it) looks like. */
export interface WeaponStats {
  category: string;
  range: Range;
  hands: 1 | 2;
  attributes: [Attribute, Attribute];
  accuracyBonus: number;
  /** The weapon deals (RA + damage). */
  damage: number;
  damageType: string;
  defense: number;
  magicDefense: number;
  martial: boolean;
  doubleAttack: boolean;
  feature: { name: string; summary: string } | null;
}

export interface Availability {
  selected: boolean;
  disabled: boolean;
  /** Why it cannot be chosen. */
  reason?: string;
}

export const formatZ = (n: number) => `${n.toLocaleString('pt-BR')}z`;

const parseAttributes = (accuracy: string): [Attribute, Attribute] => {
  const [a, b] = accuracy.split('+').map((part) => part.trim()) as Attribute[];
  return [a, b ?? a];
};

// ---------------------------------------------------------------- Custom Weapon

export interface CustomForm {
  category: string;
  range: Range;
  /** "DES + AST" style, one of the rule's two formulas. */
  accuracy: string;
  /** Ids of the chosen customizations. */
  customizations: string[];
  /** The damage type Elemental picks. */
  damageType: string | null;
}

export const emptyCustomForm = (
  rules: CustomWeaponRuleDetails,
): CustomForm => ({
  category: rules.categories[0],
  range: 'melee',
  accuracy: rules.base.accuracies[0],
  customizations: [],
  damageType: null,
});

/** Form I and, when Mutável is chosen, Form II. */
export type CustomForms = [CustomForm, CustomForm];

export const emptyForms = (rules: CustomWeaponRuleDetails): CustomForms => [
  emptyCustomForm(rules),
  emptyCustomForm(rules),
];

const customizationById = (rules: CustomWeaponRuleDetails) =>
  new Map(rules.customizations.map((c) => [c.id, c]));

/**
 * The customizations a form really has. The second form of a Mutável weapon
 * always carries Mutável (it is one of its slots and costs nothing).
 */
function chosen(
  rules: CustomWeaponRuleDetails,
  form: CustomForm,
  second: boolean,
): WeaponCustomization[] {
  const byId = customizationById(rules);
  const list = [...new Set(form.customizations)]
    .map((id) => byId.get(id))
    .filter((c): c is WeaponCustomization => c !== undefined)
    .filter((c) => !(second && c.secondForm));
  if (!second) return list;
  const mutable = rules.customizations.find((c) => c.secondForm);
  return mutable ? [mutable, ...list] : list;
}

const slotsUsed = (list: WeaponCustomization[]) =>
  list.reduce((sum, c) => sum + c.slots, 0);

/** Slots filled and available in a form (the second form's Mutável counts). */
export function customizationSlots(
  rules: CustomWeaponRuleDetails,
  form: CustomForm,
  second: boolean,
) {
  return {
    used: slotsUsed(chosen(rules, form, second)),
    total: rules.base.slots,
  };
}

export function customizationState(
  rules: CustomWeaponRuleDetails,
  form: CustomForm,
  second: boolean,
  id: string,
): Availability {
  const c = customizationById(rules).get(id);
  if (!c)
    return { selected: false, disabled: true, reason: 'Opção desconhecida.' };
  const list = chosen(rules, form, second);
  const selected = list.some((x) => x.id === id);
  if (second && c.secondForm) {
    return {
      selected: true,
      disabled: true,
      reason: 'A segunda forma sempre leva Mutável, sem custo.',
    };
  }
  if (selected) return { selected, disabled: false };

  const left = rules.base.slots - slotsUsed(list);
  if (c.slots > left) {
    return {
      selected,
      disabled: true,
      reason: `Sem espaço: ${c.name} ocupa ${c.slots} e ${
        left <= 0
          ? 'não resta nenhum'
          : left === 1
            ? 'resta 1'
            : `restam ${left}`
      }.`,
    };
  }
  if (c.blockedCategories?.includes(form.category)) {
    return {
      selected,
      disabled: true,
      reason: `${c.name} não vale para ${form.category.toLowerCase()}.`,
    };
  }
  const clash = list.find(
    (x) => c.blockedWith?.includes(x.id) || x.blockedWith?.includes(c.id),
  );
  if (clash) {
    return {
      selected,
      disabled: true,
      reason: `${c.name} não combina com ${clash.name}.`,
    };
  }
  return { selected, disabled: false };
}

/** Drops whatever no longer fits (after the category or the Mutável choice changed). */
export function sanitizeForm(
  rules: CustomWeaponRuleDetails,
  form: CustomForm,
  second: boolean,
): CustomForm {
  const byId = customizationById(rules);
  const kept: string[] = [];
  for (const id of form.customizations) {
    const c = byId.get(id);
    if (!c || kept.includes(id) || (second && c.secondForm)) continue;
    const state = customizationState(
      rules,
      { ...form, customizations: kept },
      second,
      id,
    );
    if (!state.disabled) kept.push(id);
  }
  const elemental = kept.some((id) => byId.get(id)?.chooseDamageType);
  return {
    ...form,
    customizations: kept,
    damageType:
      elemental &&
      form.damageType &&
      rules.damageTypes.includes(form.damageType)
        ? form.damageType
        : null,
  };
}

export function toggleCustomization(
  rules: CustomWeaponRuleDetails,
  form: CustomForm,
  second: boolean,
  id: string,
): CustomForm {
  const state = customizationState(rules, form, second, id);
  if (state.disabled) return form;
  const next = state.selected
    ? form.customizations.filter((x) => x !== id)
    : [...form.customizations, id];
  return sanitizeForm(rules, { ...form, customizations: next }, second);
}

function formStats(
  rules: CustomWeaponRuleDetails,
  form: CustomForm,
  second: boolean,
): WeaponStats {
  const list = chosen(rules, form, second);
  const sum = (pick: (c: WeaponCustomization) => number | undefined) =>
    list.reduce((total, c) => total + (pick(c) ?? 0), 0);
  const damage = list.reduce(
    (total, c) =>
      total +
      (form.category === HEAVY && c.heavyDamage !== undefined
        ? c.heavyDamage
        : (c.damage ?? 0)),
    rules.base.damage,
  );
  const elemental = list.some((c) => c.chooseDamageType);
  return {
    category: form.category,
    range: form.range,
    hands: 2,
    attributes: parseAttributes(form.accuracy),
    accuracyBonus: sum((c) => c.accuracy),
    damage,
    damageType: elemental && form.damageType ? form.damageType : PHYSICAL,
    defense: sum((c) => c.defense),
    magicDefense: sum((c) => c.magicDefense),
    martial: list.some((c) => c.martial),
    doubleAttack: list.some((c) => c.doubleAttack),
    feature: null,
  };
}

export interface CustomResult {
  forms: WeaponStats[];
  cost: CostLine[];
  total: number;
  /** Every slot is filled and every choice made. */
  complete: boolean;
  problems: string[];
  notes: string[];
}

export function computeCustom(
  rules: CustomWeaponRuleDetails,
  forms: [CustomForm, CustomForm],
): CustomResult {
  const hasSecond = chosen(rules, forms[0], false).some((c) => c.secondForm);
  const active = hasSecond ? forms : [forms[0]];
  const cost: CostLine[] = [
    { label: 'Arma personalizada', amount: rules.base.cost },
  ];
  const problems: string[] = [];
  const notes: string[] = [];

  active.forEach((form, index) => {
    const second = index === 1;
    const list = chosen(rules, form, second);
    const where = hasSecond ? `Forma ${second ? 'II' : 'I'}: ` : '';
    const used = slotsUsed(list);
    if (used < rules.base.slots) {
      const missing = rules.base.slots - used;
      problems.push(
        `${where}faltam ${missing} ${missing === 1 ? 'personalização' : 'personalizações'}.`,
      );
    }
    if (list.some((c) => c.chooseDamageType) && !form.damageType) {
      problems.push(`${where}escolha o tipo de dano de Elemental.`);
    }
    for (const c of list) {
      if (second && c.secondForm) continue;
      if (c.cost > 0) cost.push({ label: c.name, amount: c.cost });
      if (c.note && !c.secondForm && !notes.includes(c.note))
        notes.push(c.note);
    }
  });

  const stats = active.map((form, index) =>
    formStats(rules, form, index === 1),
  );
  if (hasSecond) {
    const mutable = rules.customizations.find((c) => c.secondForm);
    const [a, b] = stats;
    if (mutable?.note && (a.category !== b.category || a.range !== b.range)) {
      notes.push(mutable.note);
    }
  }

  return {
    forms: stats,
    cost,
    total: cost.reduce((sum, line) => sum + line.amount, 0),
    complete: problems.length === 0,
    problems,
    notes,
  };
}

// ----------------------------------------------------------------- Rare Weapon

/** What the Rare tab starts from: a basic weapon or a finished Custom Weapon. */
export interface RareBase {
  label: string;
  cost: number;
  forms: WeaponStats[];
  /** A Custom Weapon (never one-handed). */
  custom: boolean;
}

export function baseFromBasic(name: string, d: EquipmentDetails): RareBase {
  return {
    label: name,
    cost: d.cost ?? 0,
    custom: false,
    forms: [
      {
        category: d.category ?? '',
        range: d.range ?? 'melee',
        hands: d.hands ?? 1,
        attributes: parseAttributes(d.accuracy ?? 'DES + DES'),
        accuracyBonus: d.accuracyBonus ?? 0,
        damage: d.damage ?? 0,
        damageType: d.damageType ?? PHYSICAL,
        defense: 0,
        magicDefense: 0,
        martial: d.martial,
        doubleAttack: false,
        feature: null,
      },
    ],
  };
}

export function baseFromCustom(
  label: string,
  result: CustomResult,
): RareBase | null {
  if (!result.complete) return null;
  return { label, cost: result.total, forms: result.forms, custom: true };
}

export interface RareChoice {
  /** null keeps the base's damage type. */
  damageType: string | null;
  /** Ids of the chosen step-3 alterations. */
  alterations: string[];
  /** The Precisão attributes for the `attributes` alteration. */
  attributes: [Attribute, Attribute] | null;
  /** A feature id, `custom` for a typed effect, or null. */
  featureId: string | null;
  customEffect: { text: string; cost: number };
  /** Lifts the printed limit of one alteration (the Atlas evolutions need it). */
  allowSeveral: boolean;
}

export const CUSTOM_FEATURE = 'custom';

export const emptyRareChoice = (): RareChoice => ({
  damageType: null,
  alterations: [],
  attributes: null,
  featureId: null,
  customEffect: { text: '', cost: 0 },
  allowSeveral: false,
});

/** Why the damage type cannot change, or null. */
export function damageTypeReason(base: RareBase): string | null {
  const form = base.forms.find((f) => f.damageType !== PHYSICAL);
  return form
    ? `A arma já causa dano de ${form.damageType}; o tipo não muda.`
    : null;
}

function structuralReason(
  rules: RareWeaponRuleDetails,
  base: RareBase,
  choice: RareChoice,
  id: string,
): string | null {
  const { forms } = base;
  const hands = ['one-handed', 'two-handed'];
  if (
    hands.includes(id) &&
    choice.alterations.some((x) => x !== id && hands.includes(x))
  ) {
    return 'Já há uma alteração de empunhadura.';
  }
  switch (id) {
    case 'one-handed':
      if (base.custom) {
        return 'Uma arma personalizada nunca é empunhada com uma mão (Atlas, p. 108).';
      }
      return forms.some((f) => f.hands !== 2)
        ? 'Só vale para uma arma de duas mãos.'
        : null;
    case 'two-handed':
      if (forms.some((f) => f.hands !== 1))
        return 'Só vale para uma arma de uma mão.';
      return forms.some((f) =>
        rules.oneHandedOnlyCategories.includes(f.category),
      )
        ? 'Adagas, armas de arremesso e armas de luta não passam a duas mãos.'
        : null;
    case 'accuracy':
      return forms.some((f) => f.accuracyBonus >= 1)
        ? 'A arma já dá +1 ou mais de Precisão.'
        : null;
    default:
      return null;
  }
}

const ONE_ONLY =
  'A regra permite uma só alteração (Livro Básico, p. 268). Marque "mais de uma" para seguir as evoluções do Atlas.';

export function alterationState(
  rules: RareWeaponRuleDetails,
  base: RareBase,
  choice: RareChoice,
  id: string,
): Availability {
  const selected = choice.alterations.includes(id);
  if (selected) return { selected, disabled: false };
  const reason =
    structuralReason(rules, base, choice, id) ??
    (!choice.allowSeveral && choice.alterations.length >= rules.maxAlterations
      ? ONE_ONLY
      : null);
  return reason
    ? { selected, disabled: true, reason }
    : { selected, disabled: false };
}

/** Drops the alterations that no longer fit the base. */
export function sanitizeChoice(
  rules: RareWeaponRuleDetails,
  base: RareBase,
  choice: RareChoice,
): RareChoice {
  const kept: string[] = [];
  for (const id of choice.alterations) {
    const reason = structuralReason(
      rules,
      base,
      { ...choice, alterations: kept },
      id,
    );
    if (!reason) kept.push(id);
  }
  const limited = choice.allowSeveral
    ? kept
    : kept.slice(0, rules.maxAlterations);
  return {
    ...choice,
    alterations: limited,
    damageType: damageTypeReason(base) ? null : choice.damageType,
  };
}

export interface RareResult {
  forms: WeaponStats[];
  cost: CostLine[];
  total: number;
  problems: string[];
}

export function computeRare(
  rules: RareWeaponRuleDetails,
  base: RareBase,
  choice: RareChoice,
): RareResult {
  const problems: string[] = [];
  const cost: CostLine[] = [{ label: base.label, amount: base.cost }];
  const alterations = choice.alterations
    .map((id) => rules.alterations.find((a) => a.id === id))
    .filter((a): a is NonNullable<typeof a> => a !== undefined);

  if (!choice.allowSeveral && alterations.length > rules.maxAlterations) {
    problems.push('A regra permite uma só alteração (Livro Básico, p. 268).');
  }
  for (const a of alterations) {
    const reason = structuralReason(rules, base, choice, a.id);
    if (reason) problems.push(`${a.name}: ${reason}`);
  }

  if (choice.damageType) {
    const reason = damageTypeReason(base);
    if (reason) problems.push(reason);
    else
      cost.push({
        label: `Dano de ${choice.damageType}`,
        amount: rules.damageTypeCost,
      });
  }

  const attributes = alterations.some((a) => a.id === 'attributes')
    ? choice.attributes
    : null;
  if (alterations.some((a) => a.id === 'attributes') && !attributes) {
    problems.push('Escolha os Atributos da Precisão.');
  }

  for (const a of alterations) {
    if (a.id === 'attributes') {
      const single = attributes !== null && attributes[0] === attributes[1];
      if (single)
        cost.push({ label: `${a.name} (um só Atributo)`, amount: a.cost });
    } else if (a.cost > 0) {
      cost.push({ label: a.name, amount: a.cost });
    }
  }

  let feature: WeaponStats['feature'] = null;
  let featureDefense = 0;
  let featureMagicDefense = 0;
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
      featureDefense = f.defense ?? 0;
      featureMagicDefense = f.magicDefense ?? 0;
    }
  }

  const forms = base.forms.map((form): WeaponStats => {
    const next: WeaponStats = {
      ...form,
      attributes: [...form.attributes],
      feature,
    };
    for (const a of alterations) {
      next.damage += a.damage ?? 0;
      next.accuracyBonus += a.accuracy ?? 0;
      if (a.id === 'one-handed') next.hands = 1;
      if (a.id === 'two-handed') next.hands = 2;
    }
    if (attributes) next.attributes = [...attributes];
    if (choice.damageType && !damageTypeReason(base))
      next.damageType = choice.damageType;
    next.defense += featureDefense;
    next.magicDefense += featureMagicDefense;
    next.martial = form.martial || next.damage >= rules.martialDamage;
    return next;
  });

  return {
    forms,
    cost,
    total: cost.reduce((sum, line) => sum + line.amount, 0),
    problems,
  };
}

// ------------------------------------------------------------------ Formatting

/** "Arma rara marcial (Espadas), uma mão, corpo a corpo. Precisão (DES + VIG) +1, dano (RA + 9) ar." */
export function statLine(stats: WeaponStats, kind: 'custom' | 'rare'): string {
  const label = kind === 'rare' ? 'Arma rara' : 'Arma personalizada';
  const bonus = stats.accuracyBonus > 0 ? ` +${stats.accuracyBonus}` : '';
  return `${label}${stats.martial ? ' marcial' : ''} (${stats.category}), ${
    stats.hands === 1 ? 'uma mão' : 'duas mãos'
  }, ${stats.range === 'melee' ? 'corpo a corpo' : 'à distância'}. Precisão (${
    stats.attributes[0]
  } + ${stats.attributes[1]})${bonus}, dano (RA + ${stats.damage}) ${stats.damageType}.`;
}

/** The extra effects under the stat line: defenses, double attack, feature. */
export function effectLines(stats: WeaponStats): string[] {
  const lines: string[] = [];
  if (stats.defense) lines.push(`Defesa +${stats.defense}.`);
  if (stats.magicDefense) lines.push(`Defesa Mágica +${stats.magicDefense}.`);
  if (stats.doubleAttack) lines.push('Na ação Ataque, faz dois ataques.');
  if (stats.feature) {
    lines.push(
      `Característica ${stats.feature.name}: ${stats.feature.summary}`,
    );
  }
  return lines;
}
