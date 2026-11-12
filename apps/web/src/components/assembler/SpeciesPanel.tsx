import type { DamageType, SpeciesRule } from '../../api/types';
import type {
  AssemblyInput,
  Choices,
  SpellCatalog,
} from '../../lib/creatureAssembly';
import { DAMAGE_LABEL, capitalize, speciesAlways } from '../../lib/creatures';
import { CheckField, SelectField, SlotField } from './Fields';
import { SpellPicker } from './SpellPicker';

const typeOptions = (types: DamageType[]) =>
  types.map((type) => ({ value: type, label: capitalize(DAMAGE_LABEL[type]) }));

/**
 * The Species rule of Quick Assembly: what the Species always has, the Vulnerability it
 * asks for, the optional extra one, and the options to pick (some more than once).
 */
export function SpeciesPanel({
  rule,
  input,
  set,
  catalog,
  onSpellChoices,
}: {
  rule: SpeciesRule;
  input: AssemblyInput;
  set: (patch: Partial<AssemblyInput>) => void;
  catalog: SpellCatalog;
  onSpellChoices: (key: string, choices: Choices) => void;
}) {
  const always = speciesAlways(rule);
  const wanted =
    rule.picks + (input.speciesExtra && rule.extra ? rule.extra.picks : 0);
  const count = (id: string) =>
    input.speciesPicks.filter((picked) => picked === id).length;
  const setCount = (id: string, times: number) =>
    set({
      speciesPicks: [
        ...input.speciesPicks.filter((picked) => picked !== id),
        ...Array<string>(times).fill(id),
      ],
    });
  const setChoices = (id: string, choices: Choices) =>
    set({ speciesChoices: { ...input.speciesChoices, [id]: choices } });

  return (
    <fieldset className="mt-3 rounded border border-line p-3">
      <legend className="px-1 font-heading uppercase tracking-wider">
        Opções da Espécie ({input.speciesPicks.length} de {wanted})
      </legend>
      {always && <p>Sempre tem: {always}.</p>}
      {rule.note && <p className="text-muted">{rule.note}</p>}

      {rule.vulnerability && (
        <div className="mt-2 sm:w-1/2">
          <SelectField
            label="Vulnerabilidade da Espécie"
            value={input.speciesVulnerability ?? ''}
            onChange={(value) =>
              set({
                speciesVulnerability: (value || null) as DamageType | null,
              })
            }
            options={[
              { value: '', label: 'Escolha…' },
              ...typeOptions(rule.vulnerability),
            ]}
          />
        </div>
      )}

      {rule.extra && (
        <div className="mt-2">
          <CheckField
            label="Vulnerabilidade adicional (dá mais uma opção)"
            checked={input.speciesExtra !== null}
            onChange={(on) =>
              set({
                speciesExtra: on
                  ? (rule.extra?.vulnerability[0] ?? null)
                  : null,
              })
            }
          />
          {input.speciesExtra && (
            <div className="sm:w-1/2">
              <SelectField
                label="Tipo da Vulnerabilidade adicional"
                value={input.speciesExtra}
                onChange={(value) => set({ speciesExtra: value as DamageType })}
                options={typeOptions(rule.extra.vulnerability)}
              />
            </div>
          )}
        </div>
      )}

      <ul className="mt-2">
        {rule.options.map((option) => {
          const times = count(option.id);
          const max = option.max ?? 1;
          return (
            <li key={option.id}>
              {max > 1 ? (
                <div className="sm:w-2/3">
                  <SelectField
                    label={`${option.label}: quantidade`}
                    value={String(times)}
                    onChange={(value) => setCount(option.id, Number(value))}
                    options={Array.from({ length: max + 1 }, (_, n) => ({
                      value: String(n),
                      label: String(n),
                    }))}
                  />
                </div>
              ) : (
                <CheckField
                  label={option.label}
                  checked={times > 0}
                  onChange={(on) => setCount(option.id, on ? 1 : 0)}
                />
              )}
              {times > 0 && option.spells && (
                <div className="ml-7">
                  <SpellPicker
                    grant={option.spells}
                    catalog={catalog}
                    value={input.speciesChoices[option.id] ?? {}}
                    spellChoices={input.spellChoices}
                    onChange={(choices) => setChoices(option.id, choices)}
                    onSpellChoices={onSpellChoices}
                  />
                </div>
              )}
              {times > 0 && option.slots && (
                <div className="mb-2 ml-7 grid gap-3 sm:grid-cols-2">
                  {option.slots.map((slot) => (
                    <SlotField
                      key={slot.id}
                      slot={slot}
                      value={input.speciesChoices[option.id]?.[slot.id] ?? []}
                      onChange={(picked) =>
                        setChoices(option.id, {
                          ...(input.speciesChoices[option.id] ?? {}),
                          [slot.id]: picked,
                        })
                      }
                    />
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
