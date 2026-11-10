import { useMemo, useState } from 'react';
import type {
  AssemblySlot,
  DamageType,
  QuickAssemblyRoleDetails,
  QuickAssemblyRuleDetails,
  Rank,
  Role,
  RoleAttackTemplate,
  Species,
  VillainTier,
} from '../../api/types';
import {
  assembleCreature,
  defaultInput,
  type AssemblyInput,
  type AttackChoice,
} from '../../lib/creatureAssembly';
import { creatureToMarkdown } from '../../lib/creatureMarkdown';
import {
  capitalize,
  DAMAGE_LABEL,
  DAMAGE_ORDER,
  RANK_LABEL,
  RANK_ORDER,
  ROLE_LABEL,
  ROLE_ORDER,
  SPECIES_LABEL,
  VILLAIN_TIER_LABEL,
} from '../../lib/creatures';
import { Modal } from '../Modal';
import { StatBlock } from '../StatBlock';
import {
  CheckField,
  DamageChips,
  SelectField,
  SlotField,
  TextField,
} from './Fields';

interface Props {
  rules: QuickAssemblyRuleDetails;
  roles: Record<Role, QuickAssemblyRoleDetails>;
  open: boolean;
  onClose: () => void;
}

const options = <T extends string>(
  values: readonly T[],
  label: Record<T, string>,
) => values.map((value) => ({ value, label: label[value] }));

/** The slots of a basic attack: its own and those of the option picked. */
const attackSlots = (template: RoleAttackTemplate, picked?: AttackChoice) => [
  ...(template.slots ?? []),
  ...(template.options?.find((o) => o.id === picked?.option)?.slots ?? []),
];

function AttackEditor({
  template,
  value,
  onChange,
}: {
  template: RoleAttackTemplate;
  value: AttackChoice;
  onChange: (value: AttackChoice) => void;
}) {
  const slots = attackSlots(template, value);
  return (
    <fieldset className="mt-4 rounded border border-line p-3">
      <legend className="px-1 font-heading uppercase tracking-wider">
        {template.name}
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField
          label="Nome do ataque"
          value={value.name ?? ''}
          placeholder={template.name}
          onChange={(name) => onChange({ ...value, name })}
        />
        {template.ranges.length > 1 && (
          <SelectField
            label="Alcance"
            value={value.range}
            onChange={(range) =>
              onChange({ ...value, range: range as AttackChoice['range'] })
            }
            options={template.ranges.map((range) => ({
              value: range,
              label: range === 'melee' ? 'Corpo a corpo' : 'À distância',
            }))}
          />
        )}
        {template.accuracies.length > 1 && (
          <SelectField
            label="Precisão"
            value={value.accuracy}
            onChange={(accuracy) => onChange({ ...value, accuracy })}
            options={template.accuracies.map((a) => ({
              value: a,
              label: `(${a})`,
            }))}
          />
        )}
        <SelectField
          label="Tipo de dano"
          value={value.damageType}
          onChange={(damageType) =>
            onChange({ ...value, damageType: damageType as DamageType })
          }
          options={DAMAGE_ORDER.map((type) => ({
            value: type,
            label: capitalize(DAMAGE_LABEL[type]),
          }))}
        />
      </div>

      {template.options && (
        <div role="radiogroup" aria-label="Opção do ataque" className="mt-3">
          {template.options.map((option) => (
            <label
              key={option.id}
              className="flex min-h-[44px] items-start gap-2"
            >
              <input
                type="radio"
                name={`option-${template.id}`}
                checked={value.option === option.id}
                onChange={() =>
                  onChange({ ...value, option: option.id, choices: {} })
                }
              />
              <span>
                <strong>{option.label}</strong>
              </span>
            </label>
          ))}
        </div>
      )}

      {slots.length > 0 && (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {slots.map((slot: AssemblySlot) => (
            <SlotField
              key={slot.id}
              slot={slot}
              value={value.choices[slot.id] ?? []}
              onChange={(picked) =>
                onChange({
                  ...value,
                  choices: { ...value.choices, [slot.id]: picked },
                })
              }
            />
          ))}
        </div>
      )}
    </fieldset>
  );
}

/**
 * The Creature Assembler ("Montagem de Criaturas"): builds a Creature by Quick
 * Assembly. The draft lives in this component's state only; the stat block can be
 * copied as text, and nothing is saved.
 */
export function CreatureAssembler({ rules, roles, open, onClose }: Props) {
  const [role, setRole] = useState<Role>('brute');
  const [input, setInput] = useState<AssemblyInput>(() =>
    defaultInput(roles.brute),
  );
  const [traitsText, setTraitsText] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const profile = roles[role];
  const result = useMemo(
    () => assembleCreature(rules, profile, input),
    [rules, profile, input],
  );
  const set = (patch: Partial<AssemblyInput>) =>
    setInput((prev) => ({ ...prev, ...patch }));

  const changeRole = (next: Role) => {
    setRole(next);
    // Each Role has its own attacks: start those over, keep the rest.
    const fresh = defaultInput(roles[next]);
    setInput((prev) => ({ ...prev, attacks: fresh.attacks, choices: {} }));
  };

  const grantSlots = profile.grants
    .filter((g) => g.level <= input.level)
    .flatMap((g) => g.slots ?? []);

  const markdown = creatureToMarkdown(
    result.name.trim() || 'Criatura sem nome',
    result.details,
    result.ultimaPoints,
  );
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied('Ficha copiada.');
    } catch {
      setCopied('Não foi possível copiar. Selecione e copie o texto da ficha.');
    }
  };

  const { required } = result;
  const skillsNote = [
    result.roleSkills > 0 &&
      `${result.roleSkills} ${result.roleSkills === 1 ? 'poder de função' : 'poderes de função'}`,
    result.bossSkills > 0 &&
      `${result.bossSkills} ${result.bossSkills === 1 ? 'poder de chefe' : 'poderes de chefe'}`,
  ].filter(Boolean);

  return (
    <Modal open={open} onClose={onClose} title="Montagem de Criaturas">
      <div className="flex-1 overflow-y-auto px-4 pb-6 sm:px-6">
        <p className="mt-3 text-muted">
          Siga a <strong>Montagem Rápida</strong> do Bestiary Vol. I (livro em
          inglês; os termos em português são tradução nossa). Nada é salvo:
          copie a ficha antes de fechar.
        </p>

        <div className="mt-4 grid gap-6 lg:grid-cols-2">
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                label="Nome"
                value={input.name}
                onChange={(name) => set({ name })}
              />
              <SelectField
                label="Função"
                value={role}
                onChange={(value) => changeRole(value as Role)}
                options={options(ROLE_ORDER, ROLE_LABEL)}
              />
              <SelectField
                label="Nível"
                value={String(input.level)}
                onChange={(level) => set({ level: Number(level) })}
                options={rules.levels.map((l) => ({
                  value: String(l),
                  label: String(l),
                }))}
              />
              <SelectField
                label="Patente"
                value={input.rank}
                onChange={(rank) => set({ rank: rank as Rank })}
                options={options(RANK_ORDER, RANK_LABEL)}
              />
              {input.rank === 'champion' && (
                <SelectField
                  label="Soldados substituídos (X)"
                  value={String(input.championX)}
                  onChange={(x) => set({ championX: Number(x) })}
                  options={[2, 3, 4, 5, 6].map((x) => ({
                    value: String(x),
                    label: String(x),
                  }))}
                />
              )}
              <SelectField
                label="Espécie"
                value={input.species}
                onChange={(species) => set({ species: species as Species })}
                options={options(
                  Object.keys(SPECIES_LABEL) as Species[],
                  SPECIES_LABEL,
                )}
              />
            </div>
            <p className="mt-1 text-[15px] text-muted">
              A Espécie entra só na ficha: as regras dela ainda não são
              aplicadas aqui.
            </p>

            <div className="mt-3">
              <TextField
                label="Traços"
                value={traitsText}
                placeholder="robusto, vigilante, ..."
                onChange={(text) => {
                  setTraitsText(text);
                  set({
                    traits: text
                      .split(',')
                      .map((t) => t.trim())
                      .filter(Boolean),
                  });
                }}
              />
            </div>

            <CheckField
              label={`+${rules.extraHp} PV (em vez de uma personalização)`}
              checked={input.extraHp}
              disabled={input.rank === 'champion'}
              onChange={(extraHp) => set({ extraHp })}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <CheckField
                label="Vilão"
                checked={input.villain}
                onChange={(villain) => set({ villain })}
              />
              {input.villain && (
                <SelectField
                  label="Grau do vilão"
                  value={input.tier}
                  onChange={(tier) => set({ tier: tier as VillainTier })}
                  options={options(
                    Object.keys(VILLAIN_TIER_LABEL) as VillainTier[],
                    VILLAIN_TIER_LABEL,
                  )}
                />
              )}
            </div>

            <h3 className="h-tertiary mt-4">Afinidades</h3>
            <DamageChips
              legend={`Vulnerabilidades (${input.vulnerabilities.length} de ${required.vulnerabilities})`}
              value={input.vulnerabilities}
              onChange={(vulnerabilities) => set({ vulnerabilities })}
            />
            {(required.resistances > 0 || input.resistances.length > 0) && (
              <DamageChips
                legend={`Resistências (${input.resistances.length} de ${required.resistances})`}
                value={input.resistances}
                onChange={(resistances) => set({ resistances })}
              />
            )}
            {(required.immunities > 0 || input.immunities.length > 0) && (
              <DamageChips
                legend={`Imunidades (${input.immunities.length} de ${required.immunities})`}
                value={input.immunities}
                onChange={(immunities) => set({ immunities })}
              />
            )}

            <h3 className="h-tertiary mt-4">Ataques básicos</h3>
            {profile.attacks.map((template) => (
              <AttackEditor
                key={`${role}-${template.id}`}
                template={template}
                value={
                  input.attacks[template.id] ??
                  defaultInput(profile).attacks[template.id]!
                }
                onChange={(value) =>
                  set({ attacks: { ...input.attacks, [template.id]: value } })
                }
              />
            ))}

            {grantSlots.length > 0 && (
              <>
                <h3 className="h-tertiary mt-4">Benefícios do nível</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {grantSlots.map((slot) => (
                    <SlotField
                      key={slot.id}
                      slot={slot}
                      value={input.choices[slot.id] ?? []}
                      onChange={(picked) =>
                        set({
                          choices: { ...input.choices, [slot.id]: picked },
                        })
                      }
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div>
            <div className="lg:sticky lg:top-0">
              <div
                role="status"
                aria-label="Pendências"
                className="rounded border border-line p-3"
              >
                {result.warnings.length === 0 ? (
                  <p>Nenhuma pendência.</p>
                ) : (
                  <ul className="bullets">
                    {result.warnings.map((warning) => (
                      <li key={warning}>{warning}</li>
                    ))}
                  </ul>
                )}
                {skillsNote.length > 0 && (
                  <p className="mt-2">
                    Escolha {skillsNote.join(' e ')}. Esta versão ainda não
                    oferece os poderes: anote-os à parte.
                  </p>
                )}
              </div>

              <p className="mt-3">
                <button type="button" className="btn-primary" onClick={copy}>
                  Copiar ficha
                </button>{' '}
                <span role="status" className="text-[15px] text-muted">
                  {copied}
                </span>
              </p>

              <section aria-label="Ficha" className="mt-3">
                <h3 className="h-tertiary">
                  {result.name.trim() || 'Criatura sem nome'}
                </h3>
                <p className="text-muted">
                  Nível {result.details.level} ·{' '}
                  {SPECIES_LABEL[result.details.species]} ·{' '}
                  {RANK_LABEL[result.details.rank]}
                  {' · '}Função: {ROLE_LABEL[role]}
                  {result.details.villain && ' · Vilão'}
                </p>
                {result.ultimaPoints !== null && (
                  <p>
                    <strong>Pontos de Ultima: {result.ultimaPoints}</strong>
                  </p>
                )}
                <StatBlock details={result.details} />
              </section>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
