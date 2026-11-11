import { useId } from 'react';
import type { AssemblySlot, DamageType } from '../../api/types';
import { DAMAGE_LABEL, DAMAGE_ORDER, capitalize } from '../../lib/creatures';

const LABEL = 'font-heading uppercase tracking-wider';

/** A labelled `<select>`. */
export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className={LABEL}>{label}</span>
      <select
        className="field"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className={LABEL}>{label}</span>
      <input
        className="field"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export function CheckField({
  label,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className="flex min-h-[44px] items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}

/** The nine damage types as toggle chips, for Vulnerabilities, Resistances and Immunities. */
export function DamageChips({
  legend,
  value,
  onChange,
}: {
  legend: string;
  value: DamageType[];
  onChange: (value: DamageType[]) => void;
}) {
  return (
    <fieldset className="mt-3">
      <legend className={LABEL}>{legend}</legend>
      <div className="mt-1 flex flex-wrap gap-2">
        {DAMAGE_ORDER.map((type) => (
          <button
            key={type}
            type="button"
            className="chip"
            aria-pressed={value.includes(type)}
            onClick={() =>
              onChange(
                value.includes(type)
                  ? value.filter((t) => t !== type)
                  : [...value, type],
              )
            }
          >
            {capitalize(DAMAGE_LABEL[type])}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/**
 * One choice of the book ("choose one: dazed, shaken…"): a select when one option
 * is wanted, toggle chips when several are.
 */
export function SlotField({
  slot,
  value,
  onChange,
}: {
  slot: AssemblySlot;
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const id = useId();
  if (slot.count === 1) {
    return (
      <label className="flex flex-col gap-1">
        <span className={LABEL}>{slot.label}</span>
        <select
          id={id}
          className="field"
          value={value[0] ?? ''}
          onChange={(event) =>
            onChange(event.target.value ? [event.target.value] : [])
          }
        >
          <option value="">Escolha…</option>
          {slot.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }
  return (
    <fieldset>
      <legend className={LABEL}>
        {slot.label} ({value.length} de {slot.count})
      </legend>
      <div className="mt-1 flex flex-wrap gap-2">
        {slot.options.map((option) => {
          const on = value.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              className="chip"
              aria-pressed={on}
              onClick={() => {
                if (on) onChange(value.filter((v) => v !== option.value));
                else if (value.length < slot.count)
                  onChange([...value, option.value]);
              }}
            >
              {capitalize(option.label)}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
