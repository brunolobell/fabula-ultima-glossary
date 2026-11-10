import { useId } from 'react';
import type { CustomWeaponRuleDetails } from '../../api/types';
import { customizationSpecs } from '../../lib/forgeFilters';
import { decorateChecks } from '../../lib/check';
import {
  applyRowSpecs,
  buildRowsFor,
  hasActiveFilters,
  type Selection,
} from '../../lib/listFilters';
import {
  customizationSlots,
  customizationState,
  formatZ,
  sanitizeForm,
  toggleCustomization,
  type CustomForm,
  type CustomForms,
} from '../../lib/weaponForge';
import { ListFilters } from '../ListFilters';
import { OptionRow } from './OptionRow';

interface EditorProps {
  rules: CustomWeaponRuleDetails;
  form: CustomForm;
  second: boolean;
  heading?: string;
  onChange: (form: CustomForm) => void;
  filters: Selection;
  onToggleFilter: (param: string, value: string) => void;
  onClearFilters: () => void;
}

const NO_INDEX = new Map();

function FormEditor({
  rules,
  form,
  second,
  heading,
  onChange,
  filters,
  onToggleFilter,
  onClearFilters,
}: EditorProps) {
  const id = useId();
  const set = (patch: Partial<CustomForm>) =>
    onChange(sanitizeForm(rules, { ...form, ...patch }, second));

  const isAvailable = (customizationId: string) => {
    const state = customizationState(rules, form, second, customizationId);
    return !state.disabled || state.selected;
  };
  const specs = customizationSpecs((c) => isAvailable(c.id));
  const rows = buildRowsFor(specs, rules.customizations, NO_INDEX, filters);
  const shown = applyRowSpecs(specs, rules.customizations, filters);
  const filtering = hasActiveFilters(filters);
  const { used, total } = customizationSlots(rules, form, second);

  return (
    <section aria-label={heading ?? 'Arma personalizada'} className="mt-4">
      {heading && <h3 className="h-tertiary">{heading}</h3>}
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="font-heading uppercase tracking-wider">
            Categoria
          </span>
          <select
            className="field"
            value={form.category}
            onChange={(event) => set({ category: event.target.value })}
          >
            {rules.categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <fieldset>
          <legend className="font-heading uppercase tracking-wider">
            Alcance
          </legend>
          <div className="flex flex-wrap gap-x-5">
            {(
              [
                ['melee', 'Corpo a corpo'],
                ['ranged', 'À distância'],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className="flex min-h-[44px] items-center gap-2"
              >
                <input
                  type="radio"
                  name={`${id}-range`}
                  style={{ accentColor: 'var(--primary)' }}
                  checked={form.range === value}
                  onChange={() => set({ range: value })}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="sm:col-span-2">
          <legend className="font-heading uppercase tracking-wider">
            Precisão
          </legend>
          <div className="flex flex-wrap gap-x-5">
            {rules.base.accuracies.map((accuracy) => (
              <label
                key={accuracy}
                className="flex min-h-[44px] items-center gap-2"
              >
                <input
                  type="radio"
                  name={`${id}-accuracy`}
                  style={{ accentColor: 'var(--primary)' }}
                  checked={form.accuracy === accuracy}
                  onChange={() => set({ accuracy })}
                />
                {decorateChecks(`(${accuracy})`)}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <h4 className="h-minor">
        Personalizações{' '}
        <span
          className="text-muted"
          aria-label={`${used} de ${total} espaços usados`}
        >
          {used}/{total}
        </span>
      </h4>
      <ListFilters
        rows={rows}
        selection={filters}
        onToggle={onToggleFilter}
        onClear={filtering ? onClearFilters : undefined}
      />
      {shown.length === 0 ? (
        <p className="mt-3 text-muted">
          Nenhuma personalização com esses filtros.
        </p>
      ) : (
        <ul className="mt-2">
          {shown.map((c) => {
            const state = customizationState(rules, form, second, c.id);
            return (
              <OptionRow
                key={c.id}
                type="checkbox"
                checked={state.selected}
                disabled={state.disabled}
                reason={
                  state.disabled && !state.selected ? state.reason : undefined
                }
                onChange={() =>
                  onChange(toggleCustomization(rules, form, second, c.id))
                }
                label={
                  <>
                    {c.name}
                    {c.martial && (
                      <span className="ml-1 text-muted">(marcial)</span>
                    )}
                  </>
                }
                tag={[
                  c.slots > 1 ? `${c.slots} espaços` : '',
                  c.cost > 0 ? `+${formatZ(c.cost)}` : '',
                ]
                  .filter(Boolean)
                  .join(' · ')}
                summary={c.summary}
              >
                {c.chooseDamageType && (
                  <label className="flex flex-col gap-1 sm:max-w-xs">
                    <span>Tipo de dano</span>
                    <select
                      className="field"
                      value={form.damageType ?? ''}
                      onChange={(event) =>
                        set({ damageType: event.target.value || null })
                      }
                    >
                      <option value="">Escolha…</option>
                      {rules.damageTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
              </OptionRow>
            );
          })}
        </ul>
      )}
    </section>
  );
}

interface Props {
  rules: CustomWeaponRuleDetails;
  forms: CustomForms;
  onChange: (forms: CustomForms) => void;
  filters: Selection;
  onToggleFilter: (param: string, value: string) => void;
  onClearFilters: () => void;
}

/** The "Arma personalizada" tab: one form, or two when Mutável is chosen. */
export function CustomTab({
  rules,
  forms,
  onChange,
  filters,
  onToggleFilter,
  onClearFilters,
}: Props) {
  const secondFormOption = rules.customizations.find((c) => c.secondForm);
  const hasSecond = secondFormOption
    ? customizationState(rules, forms[0], false, secondFormOption.id).selected
    : false;
  const { base } = rules;
  const shared = { rules, filters, onToggleFilter, onClearFilters };
  return (
    <div>
      <p>
        Categoria à escolha, {formatZ(base.cost)}, duas mãos, dano{' '}
        {decorateChecks(`(RA + ${base.damage})`)} físico e{' '}
        <strong>{base.slots} personalizações</strong>, cada uma uma só vez.
        Escolher uma marcial torna a arma marcial.
      </p>
      <FormEditor
        {...shared}
        form={forms[0]}
        second={false}
        heading={hasSecond ? 'Forma I' : undefined}
        onChange={(form) => onChange([form, forms[1]])}
      />
      {hasSecond && (
        <FormEditor
          {...shared}
          form={forms[1]}
          second
          heading="Forma II"
          onChange={(form) => onChange([forms[0], form])}
        />
      )}
      <ul className="bullets mt-6 text-[15px]">
        {rules.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </div>
  );
}
