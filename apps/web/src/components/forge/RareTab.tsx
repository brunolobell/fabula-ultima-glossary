import { useId } from 'react';
import type {
  EntrySummary,
  EquipmentDetails,
  RareWeaponRuleDetails,
} from '../../api/types';
import { decorateChecks } from '../../lib/check';
import { baseWeaponSpecs, featureSpecs } from '../../lib/forgeFilters';
import {
  applyRowSpecs,
  buildRowsFor,
  hasActiveFilters,
  type Selection,
} from '../../lib/listFilters';
import {
  alterationState,
  CUSTOM_FEATURE,
  damageTypeReason,
  formatZ,
  type Attribute,
  type CustomResult,
  type RareBase,
  type RareChoice,
} from '../../lib/weaponForge';
import { ListFilters } from '../ListFilters';
import { OptionRow } from './OptionRow';

const NO_INDEX = new Map();
const ATTRIBUTES: Attribute[] = ['DES', 'VIG', 'AST', 'VON'];

export type BaseKind = 'basic' | 'custom';
export type RareFilterKey = 'bases' | 'features';

const basicLine = (entry: EntrySummary) => {
  const d = entry.details as EquipmentDetails;
  const bonus = d.accuracyBonus ? ` +${d.accuracyBonus}` : '';
  return `${d.category}, ${d.hands === 1 ? 'uma mão' : 'duas mãos'}, ${
    d.range === 'melee' ? 'corpo a corpo' : 'à distância'
  }. Precisão (${d.accuracy})${bonus}, dano (RA + ${d.damage}).`;
};

interface Props {
  rules: RareWeaponRuleDetails;
  basics: EntrySummary[];
  /** The Custom tab's current build, offered as a base once complete. */
  custom: CustomResult;
  baseKind: BaseKind;
  onBaseKind: (kind: BaseKind) => void;
  baseSlug: string | null;
  onBaseSlug: (slug: string) => void;
  /** The chosen base, or null while none is complete. */
  base: RareBase | null;
  choice: RareChoice;
  /** Applies `patch` on top of the Reader's own choice, not the sanitized `choice`. */
  onChoice: (patch: Partial<RareChoice>) => void;
  filters: Record<RareFilterKey, Selection>;
  onToggleFilter: (key: RareFilterKey, param: string, value: string) => void;
  onClearFilters: (key: RareFilterKey) => void;
}

/** The "Arma rara" tab: the four steps of Livro Básico p. 268. */
export function RareTab({
  rules,
  basics,
  custom,
  baseKind,
  onBaseKind,
  baseSlug,
  onBaseSlug,
  base,
  choice,
  onChoice,
  filters,
  onToggleFilter,
  onClearFilters,
}: Props) {
  const id = useId();
  const set = onChoice;

  const baseRows = buildRowsFor(
    baseWeaponSpecs,
    basics,
    NO_INDEX,
    filters.bases,
  );
  const shownBases = applyRowSpecs(baseWeaponSpecs, basics, filters.bases);
  const featureRows = buildRowsFor(
    featureSpecs,
    rules.features,
    NO_INDEX,
    filters.features,
  );
  const shownFeatures = applyRowSpecs(
    featureSpecs,
    rules.features,
    filters.features,
  );

  const typeReason = base ? damageTypeReason(base) : null;
  const attributes = choice.attributes ??
    base?.forms[0].attributes ?? ['DES', 'DES'];
  const featureGroup = (group: 'defensive' | 'offensive') =>
    shownFeatures.filter((f) => f.group === group);

  return (
    <div>
      <p>
        Parta de uma arma básica ou da sua arma personalizada e siga os quatro
        passos do Livro Básico (p. 268). A regra permite{' '}
        <strong>
          {rules.maxAlterations === 1
            ? 'uma alteração'
            : `até ${rules.maxAlterations} alterações`}
        </strong>{' '}
        no passo 3 e
        <strong> uma característica</strong> no passo 4.
      </p>

      <h3 className="h-tertiary">1. Arma de base</h3>
      <fieldset className="mt-2">
        <legend className="sr-only">Tipo de base</legend>
        <div className="flex flex-wrap gap-x-5">
          <label className="flex min-h-[44px] items-center gap-2">
            <input
              type="radio"
              name={`${id}-base`}
              style={{ accentColor: 'var(--primary)' }}
              checked={baseKind === 'basic'}
              onChange={() => onBaseKind('basic')}
            />
            Arma básica
          </label>
          <label className="flex min-h-[44px] items-center gap-2">
            <input
              type="radio"
              name={`${id}-base`}
              style={{ accentColor: 'var(--primary)' }}
              checked={baseKind === 'custom'}
              onChange={() => onBaseKind('custom')}
            />
            Arma personalizada
          </label>
        </div>
      </fieldset>
      {baseKind === 'custom' ? (
        custom.complete ? (
          <p className="mt-2">
            Usando a arma montada na outra aba ({formatZ(custom.total)}
            {custom.forms.length > 1 ? ', com as duas formas' : ''}).
          </p>
        ) : (
          <p className="mt-2 text-accent-ink">
            Complete a arma personalizada na outra aba:{' '}
            {custom.problems.join(' ')}
          </p>
        )
      ) : (
        <>
          <ListFilters
            rows={baseRows}
            selection={filters.bases}
            onToggle={(param, value) => onToggleFilter('bases', param, value)}
            onClear={
              hasActiveFilters(filters.bases)
                ? () => onClearFilters('bases')
                : undefined
            }
          />
          {shownBases.length === 0 ? (
            <p className="mt-3 text-muted">Nenhuma arma com esses filtros.</p>
          ) : (
            <ul className="mt-2">
              {shownBases.map((entry) => (
                <OptionRow
                  key={entry.slug}
                  type="radio"
                  name={`${id}-weapon`}
                  checked={baseSlug === entry.slug}
                  onChange={() => onBaseSlug(entry.slug)}
                  label={entry.name}
                  tag={formatZ((entry.details as EquipmentDetails).cost ?? 0)}
                  summary={decorateChecks(basicLine(entry))}
                />
              ))}
            </ul>
          )}
        </>
      )}

      {base && (
        <>
          <h3 className="h-tertiary">2. Tipo de dano</h3>
          <label className="mt-2 flex flex-col gap-1 sm:max-w-xs">
            <span>
              Tipo de dano (fora o físico, +{formatZ(rules.damageTypeCost)})
            </span>
            <select
              className="field"
              value={choice.damageType ?? ''}
              disabled={typeReason !== null}
              aria-describedby={typeReason ? `${id}-type-reason` : undefined}
              onChange={(event) =>
                set({ damageType: event.target.value || null })
              }
            >
              <option value="">Como está</option>
              {rules.damageTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          {typeReason && (
            <p id={`${id}-type-reason`} className="text-[15px] text-accent-ink">
              {typeReason}
            </p>
          )}

          <h3 className="h-tertiary">3. Alteração</h3>
          <label className="mt-2 flex min-h-[44px] items-center gap-2">
            <input
              type="checkbox"
              style={{ accentColor: 'var(--primary)' }}
              checked={choice.allowSeveral}
              onChange={() => set({ allowSeveral: !choice.allowSeveral })}
            />
            Permitir mais de uma alteração (como nas evoluções do Atlas)
          </label>
          <ul className="mt-1">
            {rules.alterations.map((alteration) => {
              const state = alterationState(rules, base, choice, alteration.id);
              return (
                <OptionRow
                  key={alteration.id}
                  type="checkbox"
                  checked={state.selected}
                  disabled={state.disabled}
                  reason={state.disabled ? state.reason : undefined}
                  onChange={() =>
                    set({
                      alterations: state.selected
                        ? choice.alterations.filter((x) => x !== alteration.id)
                        : [...choice.alterations, alteration.id],
                    })
                  }
                  label={alteration.name}
                  tag={
                    alteration.id === 'attributes'
                      ? `um só Atributo: +${formatZ(alteration.cost)}`
                      : alteration.cost > 0
                        ? `+${formatZ(alteration.cost)}`
                        : undefined
                  }
                  summary={alteration.summary}
                >
                  {alteration.id === 'attributes' && (
                    <div className="flex flex-wrap items-end gap-3">
                      {[0, 1].map((slot) => (
                        <label key={slot} className="flex flex-col gap-1">
                          <span>Atributo {slot + 1}</span>
                          <select
                            className="field"
                            value={attributes[slot]}
                            onChange={(event) => {
                              const next: [Attribute, Attribute] = [
                                attributes[0],
                                attributes[1],
                              ];
                              next[slot] = event.target.value as Attribute;
                              set({ attributes: next });
                            }}
                          >
                            {ATTRIBUTES.map((attribute) => (
                              <option key={attribute} value={attribute}>
                                {attribute}
                              </option>
                            ))}
                          </select>
                        </label>
                      ))}
                    </div>
                  )}
                </OptionRow>
              );
            })}
          </ul>

          <h3 className="h-tertiary">4. Característica</h3>
          <ListFilters
            rows={featureRows}
            selection={filters.features}
            onToggle={(param, value) =>
              onToggleFilter('features', param, value)
            }
            onClear={
              hasActiveFilters(filters.features)
                ? () => onClearFilters('features')
                : undefined
            }
          />
          <ul className="mt-2">
            <OptionRow
              type="radio"
              name={`${id}-feature`}
              checked={choice.featureId === null}
              onChange={() => set({ featureId: null })}
              label="Nenhuma"
            />
            {(['defensive', 'offensive'] as const).map((group) =>
              featureGroup(group).map((feature) => (
                <OptionRow
                  key={feature.id}
                  type="radio"
                  name={`${id}-feature`}
                  checked={choice.featureId === feature.id}
                  onChange={() => set({ featureId: feature.id })}
                  label={feature.name}
                  tag={`+${formatZ(feature.cost)}`}
                  summary={`${group === 'defensive' ? 'Defensiva' : 'Ofensiva'}. ${feature.summary}`}
                />
              )),
            )}
            <OptionRow
              type="radio"
              name={`${id}-feature`}
              checked={choice.featureId === CUSTOM_FEATURE}
              onChange={() => set({ featureId: CUSTOM_FEATURE })}
              label="Efeito personalizado"
              summary="Um efeito que você descreve, com o preço que o mestre decidir."
            >
              <div className="grid gap-3 sm:grid-cols-[1fr_10rem]">
                <label className="flex flex-col gap-1">
                  <span>Efeito</span>
                  <textarea
                    className="field"
                    rows={2}
                    value={choice.customEffect.text}
                    onChange={(event) =>
                      set({
                        customEffect: {
                          ...choice.customEffect,
                          text: event.target.value,
                        },
                      })
                    }
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span>Custo (z)</span>
                  <input
                    className="field"
                    type="number"
                    min={0}
                    step={50}
                    value={choice.customEffect.cost}
                    onChange={(event) =>
                      set({
                        customEffect: {
                          ...choice.customEffect,
                          cost: Number(event.target.value),
                        },
                      })
                    }
                  />
                </label>
              </div>
            </OptionRow>
          </ul>
          {shownFeatures.length === 0 && (
            <p className="mt-2 text-muted">
              Nenhuma característica com esses filtros.
            </p>
          )}
        </>
      )}

      <ul className="bullets mt-6 text-[15px]">
        {rules.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </div>
  );
}
