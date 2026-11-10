import type { SpellGrant } from '../../api/types';
import {
  spellKey,
  type Choices,
  type SpellCatalog,
} from '../../lib/creatureAssembly';
import { SlotField } from './Fields';

/**
 * "Learns two spells, or one spell and +10 PM": the option, then the spells of the
 * list as toggle chips (as many as the option allows), then the choices of each.
 */
export function SpellPicker({
  grant,
  catalog,
  value,
  spellChoices,
  onChange,
  onSpellChoices,
}: {
  grant: SpellGrant;
  catalog: SpellCatalog;
  /** `option` and `spells` (spell keys). */
  value: Choices;
  spellChoices: Record<string, Choices>;
  onChange: (value: Choices) => void;
  onSpellChoices: (key: string, choices: Choices) => void;
}) {
  const chosen =
    grant.options.length === 1
      ? grant.options[0]
      : grant.options.find((o) => o.id === value.option?.[0]);
  const room = chosen?.count ?? Math.max(...grant.options.map((o) => o.count));
  const picked = value.spells ?? [];

  return (
    <div className="mb-2 mt-2">
      {grant.options.length > 1 && (
        <div role="radiogroup" aria-label="Opção de feitiços">
          {grant.options.map((option) => (
            <label
              key={option.id}
              className="flex min-h-[44px] items-center gap-2"
            >
              <input
                type="radio"
                checked={value.option?.[0] === option.id}
                onChange={() =>
                  onChange({
                    option: [option.id],
                    spells: picked.slice(0, option.count),
                  })
                }
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      )}
      <div className="mt-1 flex flex-wrap gap-2">
        {grant.from.map((ref) => {
          const key = spellKey(ref);
          const on = picked.includes(key);
          return (
            <button
              key={key}
              type="button"
              className="chip"
              aria-pressed={on}
              onClick={() => {
                if (on) {
                  onChange({
                    ...value,
                    spells: picked.filter((k) => k !== key),
                  });
                } else if (picked.length < room) {
                  onChange({ ...value, spells: [...picked, key] });
                }
              }}
            >
              {ref.name}
              {ref.minLevel ? ` (nível ${ref.minLevel}+)` : ''}
            </button>
          );
        })}
      </div>
      {picked.map((key) => {
        const slots = catalog[key]?.slots ?? [];
        if (slots.length === 0) return null;
        return (
          <div key={key} className="mt-2 grid gap-3 sm:grid-cols-2">
            {slots.map((slot) => (
              <SlotField
                key={slot.id}
                slot={slot}
                value={spellChoices[key]?.[slot.id] ?? []}
                onChange={(choice) =>
                  onSpellChoices(key, {
                    ...(spellChoices[key] ?? {}),
                    [slot.id]: choice,
                  })
                }
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
