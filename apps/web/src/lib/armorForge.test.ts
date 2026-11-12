import { describe, expect, it } from 'vitest';
import { armadurasEscudosBasicos } from '../../../api/src/database/seed-data/equipment/armaduras-escudos-basicos';
import { rareArmorRules } from '../../../api/src/database/seed-data/armor-forge-data';
import type { EquipmentDetails } from '../api/types';
import {
  armorEffectLines,
  armorStatLine,
  baseFromEquipment,
  computeRareArmor,
  emptyArmorChoice,
} from './armorForge';
import { CUSTOM_FEATURE } from './weaponForge';

const base = (name: string) => {
  const entry = armadurasEscudosBasicos.find((e) => e.name === name);
  if (!entry) throw new Error(`no basic item ${name}`);
  return baseFromEquipment(name, entry.details as EquipmentDetails);
};
const build = (name: string, featureId: string | null) =>
  computeRareArmor(rareArmorRules, base(name), {
    ...emptyArmorChoice(),
    featureId,
  });

// Examples from Livro Básico p. 281-283.
describe('Armor Forge arithmetic', () => {
  it('builds the Túnica Sombria: 650z and Iniciativa +4', () => {
    const result = build('Túnica de combate', 'mais-iniciativa');
    expect(result.total).toBe(650);
    expect(result.problems).toEqual([]);
    expect(result.stats.initiative).toBe(4);
    expect(armorStatLine(result.stats)).toBe(
      'Armadura rara. Defesa Dado de DES +1, Def. Mágica Dado de AST +1, Iniciativa +4.',
    );
    expect(armorEffectLines(result.stats)[0]).toContain('(já contabilizado)');
  });

  it('adds the bonus to a negative Iniciativa and keeps martial', () => {
    const result = build('Placa de aço', 'mais-iniciativa');
    expect(result.stats.initiative).toBe(0);
    expect(result.stats.martial).toBe(true);
    expect(armorStatLine(result.stats)).toContain('Armadura rara marcial.');
    expect(armorStatLine(result.stats)).toContain('Iniciativa sem modificador');
  });

  it('builds Égide, Ignis: 800z, a shield with +2 Defesa', () => {
    const result = build('Escudo de bronze', 'resistencia');
    expect(result.total).toBe(800);
    expect(result.stats.initiative).toBeNull();
    expect(armorStatLine(result.stats)).toBe(
      'Escudo raro. Defesa +2, Def. Mágica sem bônus.',
    );
  });

  it('builds the Escudo da Primavera: 1.150z, marcial, +2/+2', () => {
    const result = build('Escudo rúnico', 'mais-vitalidade');
    expect(result.total).toBe(1150);
    expect(armorStatLine(result.stats)).toBe(
      'Escudo raro marcial. Defesa +2, Def. Mágica +2.',
    );
  });

  it('puts Mais Iniciativa on a shield as an effect only', () => {
    const result = build('Escudo de bronze', 'mais-iniciativa');
    expect(result.stats.initiative).toBeNull();
    expect(result.stats.initiativeCounted).toBe(false);
    expect(armorEffectLines(result.stats)[0]).not.toContain('contabilizado');
  });

  it('breaks the cost into the base and the feature', () => {
    expect(build('Túnica de combate', 'mais-iniciativa').cost).toEqual([
      { label: 'Túnica de combate', amount: 150 },
      { label: 'Mais Iniciativa', amount: 500 },
    ]);
  });

  it('requires a feature but still shows the base price', () => {
    const result = build('Brigantina', null);
    expect(result.problems).toEqual(['Escolha uma característica.']);
    expect(result.total).toBe(150);
    expect(armorEffectLines(result.stats)).toEqual([]);
  });

  it('prices a custom effect and checks it', () => {
    const custom = (text: string, cost: number) =>
      computeRareArmor(rareArmorRules, base('Brigantina'), {
        featureId: CUSTOM_FEATURE,
        customEffect: { text, cost },
      });
    const ok = custom('Brilha no escuro.', 300);
    expect(ok.total).toBe(450);
    expect(ok.problems).toEqual([]);
    expect(custom('', 300).problems).toContain(
      'Descreva o efeito personalizado.',
    );
    expect(custom('x', -5).problems[0]).toMatch(/inteiro/);
  });
});
