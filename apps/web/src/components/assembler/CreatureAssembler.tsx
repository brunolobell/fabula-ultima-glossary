import { useMemo, useState } from 'react';
import type {
  EntrySummary,
  NpcSpellsRuleDetails,
  SpellGrant,
  AssemblySlot,
  DamageType,
  QuickAssemblyRoleDetails,
  QuickAssemblyRuleDetails,
  Rank,
  Role,
  RoleAttackTemplate,
  RoleSkill,
  Species,
  VillainTier,
} from '../../api/types';
import {
  assembleCreature,
  bossKey,
  customKey,
  negativeKey,
  defaultAttackChoice,
  defaultInput,
  EXTRA_CUSTOMIZATION,
  type AssemblyInput,
  type AttackChoice,
  buildSpellCatalog,
  type Choices,
  type SpellCatalog,
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
import { SpellPicker } from './SpellPicker';
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
  /** The Rule "Feitiços de NPC" and every entry (for the Class spells). */
  npcSpells?: NpcSpellsRuleDetails;
  entries: ReadonlyMap<string, EntrySummary>;
  open: boolean;
  onClose: () => void;
}

const options = <T extends string>(
  values: readonly T[],
  label: Record<T, string>,
) => values.map((value) => ({ value, label: label[value] }));

/** The first effect of a Skill with its choices left as "…", to read before picking it. */
const skillPreview = (skill: RoleSkill) =>
  skill.spells
    ? `Escolha ${skill.spells.options.map((o) => o.label.toLowerCase()).join(' ou ')}.`
    : (skill.effects[0]?.text ?? '').replace(/\{(\w+)\}/g, '…');

/** What picking `skill` asks the Reader besides ticking it: its choices and its spells. */
function SkillChoices({
  skill,
  value,
  onChange,
  catalog,
  spellChoices,
  onSpellChoices,
}: {
  skill: RoleSkill;
  value: Choices;
  onChange: (value: Choices) => void;
  catalog: SpellCatalog;
  spellChoices: Record<string, Choices>;
  onSpellChoices: (key: string, choices: Choices) => void;
}) {
  if (!skill.slots?.length && !skill.spells) return null;
  return (
    <div className="mb-2 ml-7">
      {skill.slots && (
        <div className="grid gap-3 sm:grid-cols-2">
          {skill.slots.map((slot) => (
            <SlotField
              key={slot.id}
              slot={slot}
              value={value[slot.id] ?? []}
              onChange={(picked) => onChange({ ...value, [slot.id]: picked })}
            />
          ))}
        </div>
      )}
      {skill.spells && (
        <SpellPicker
          grant={skill.spells as SpellGrant}
          catalog={catalog}
          value={value}
          spellChoices={spellChoices}
          onChange={onChange}
          onSpellChoices={onSpellChoices}
        />
      )}
    </div>
  );
}

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
 * The Creature Assembler ("Laboratório Oroboros"): builds a Creature by Quick
 * Assembly. The draft lives in this component's state only; the stat block can be
 * copied as text, and nothing is saved.
 */
export function CreatureAssembler({
  rules,
  roles,
  npcSpells,
  entries,
  open,
  onClose,
}: Props) {
  const [role, setRole] = useState<Role>('brute');
  const [input, setInput] = useState<AssemblyInput>(() =>
    defaultInput(roles.brute),
  );
  const [traitsText, setTraitsText] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const profile = roles[role];
  const catalog = useMemo(
    () => buildSpellCatalog(npcSpells, entries),
    [npcSpells, entries],
  );
  const result = useMemo(
    () => assembleCreature(rules, profile, input, catalog),
    [rules, profile, input, catalog],
  );
  const set = (patch: Partial<AssemblyInput>) =>
    setInput((prev) => ({ ...prev, ...patch }));

  const changeRole = (next: Role) => {
    setRole(next);
    // Each Role has its own attacks: start those over, keep the rest.
    const fresh = defaultInput(roles[next]);
    setInput((prev) => ({
      ...prev,
      attacks: fresh.attacks,
      choices: {},
      // The Negative and Boss Skills belong to the Creature, not to the Role: keep them.
      skills: Object.fromEntries(
        Object.entries(prev.skills).filter(
          ([key]) => key.startsWith('n:') || key.startsWith('b:'),
        ),
      ),
      customization: null,
      baseSpells: {},
      spellChoices: {},
    }));
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
  const toggleSkill = (skill: RoleSkill, on: boolean) =>
    setInput((prev) => {
      const skills = { ...prev.skills };
      if (on) skills[skill.id] = {};
      else delete skills[skill.id];
      return { ...prev, skills };
    });
  const toggleBoss = (skill: RoleSkill, on: boolean) =>
    setInput((prev) => {
      const skills = { ...prev.skills };
      if (on) skills[bossKey(skill.id)] = {};
      else delete skills[bossKey(skill.id)];
      return {
        ...prev,
        skills,
        bosses: on
          ? [...prev.bosses, skill.id]
          : prev.bosses.filter((id) => id !== skill.id),
      };
    });
  const showBosses =
    input.rank === 'champion' ||
    input.negative !== null ||
    input.bosses.length > 0;
  const setSpellChoices = (key: string, choices: Choices) =>
    setInput((prev) => ({
      ...prev,
      spellChoices: { ...prev.spellChoices, [key]: choices },
    }));
  const setSkillChoices = (key: string, choices: Choices) =>
    setInput((prev) => ({
      ...prev,
      skills: { ...prev.skills, [key]: choices },
    }));
  const pickedSkills = profile.skills.filter(
    (skill) => skill.id in input.skills,
  );
  const extraLabel = {
    hp: `+${rules.extraHp} PV`,
    immunity: 'Imunidade a um tipo de dano',
    skill: 'Mais um poder de função',
  }[profile.extra];
  const negativeSkill = rules.negativeSkills.find(
    (n) => n.id === input.negative,
  );
  const customization = profile.customizations.find(
    (c) => customKey(c.id) === input.customization,
  );

  return (
    <Modal open={open} onClose={onClose} title="Laboratório Oroboros">
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

            {input.rank !== 'champion' && (
              <div className="mt-3">
                <SelectField
                  label="Personalização"
                  value={input.customization ?? ''}
                  onChange={(value) => set({ customization: value || null })}
                  options={[
                    { value: '', label: 'Nenhuma' },
                    { value: EXTRA_CUSTOMIZATION, label: extraLabel },
                    ...profile.customizations.map((c) => ({
                      value: customKey(c.id),
                      label: c.name,
                    })),
                  ]}
                />
                {customization && (
                  <>
                    <p className="mt-1 text-[15px] text-muted">
                      {skillPreview(customization)}
                    </p>
                    <div className="mt-2">
                      <SkillChoices
                        skill={customization}
                        value={input.skills[customKey(customization.id)] ?? {}}
                        onChange={(choices) =>
                          setSkillChoices(customKey(customization.id), choices)
                        }
                        catalog={catalog}
                        spellChoices={input.spellChoices}
                        onSpellChoices={setSpellChoices}
                      />
                    </div>
                  </>
                )}
              </div>
            )}
            <div
              role="group"
              aria-label="Escolhas do poder negativo"
              className="mt-3"
            >
              <SelectField
                label="Poder negativo"
                value={input.negative ?? ''}
                onChange={(value) => set({ negative: value || null })}
                options={[
                  { value: '', label: 'Nenhum' },
                  ...rules.negativeSkills.map((n) => ({
                    value: n.id,
                    label: n.name,
                  })),
                ]}
              />
              {negativeSkill && (
                <>
                  <p className="mt-1 text-[15px] text-muted">
                    Pensado {negativeSkill.advice}. Dá um poder de função (ou de
                    chefe) a mais.
                  </p>
                  <div className="mt-2">
                    <SkillChoices
                      skill={negativeSkill}
                      value={input.skills[negativeKey(negativeSkill.id)] ?? {}}
                      onChange={(choices) =>
                        setSkillChoices(negativeKey(negativeSkill.id), choices)
                      }
                      catalog={catalog}
                      spellChoices={input.spellChoices}
                      onSpellChoices={setSpellChoices}
                    />
                  </div>
                </>
              )}
            </div>
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

            {profile.baseSpells && (
              <fieldset className="mt-4">
                <legend className="h-tertiary">Feitiços</legend>
                <SpellPicker
                  grant={profile.baseSpells}
                  catalog={catalog}
                  value={input.baseSpells}
                  spellChoices={input.spellChoices}
                  onChange={(baseSpells) => set({ baseSpells })}
                  onSpellChoices={setSpellChoices}
                />
              </fieldset>
            )}
            {result.details.spells.some((spell) => spell.offensive) && (
              <div className="mt-3 sm:w-1/2">
                <SelectField
                  label="Teste de Magia"
                  value={input.magicFormula}
                  onChange={(magicFormula) => set({ magicFormula })}
                  options={[
                    { value: 'AST + VON', label: '(AST + VON)' },
                    { value: 'VIG + VON', label: '(VIG + VON)' },
                  ]}
                />
              </div>
            )}

            <fieldset className="mt-4">
              <legend className="h-tertiary">
                Poderes de função ({pickedSkills.length} de {result.roleSkills})
              </legend>
              <ul className="mt-2">
                {profile.skills.map((skill) => {
                  const on = skill.id in input.skills;
                  return (
                    <li key={skill.id}>
                      <label className="flex min-h-[44px] items-start gap-2">
                        <input
                          type="checkbox"
                          className="mt-1"
                          checked={on}
                          onChange={(event) =>
                            toggleSkill(skill, event.target.checked)
                          }
                        />
                        <span>
                          <strong>{skill.name}</strong>
                          {skill.ranks && (
                            <span className="text-muted">
                              {' '}
                              (só{' '}
                              {skill.ranks
                                .map((r) => RANK_LABEL[r].toLowerCase())
                                .join(' e ')}
                              )
                            </span>
                          )}
                          <span className="block text-[15px] text-muted">
                            {skillPreview(skill)}
                          </span>
                        </span>
                      </label>
                      {on && (
                        <SkillChoices
                          skill={skill}
                          value={input.skills[skill.id]}
                          onChange={(choices) =>
                            setSkillChoices(skill.id, choices)
                          }
                          catalog={catalog}
                          spellChoices={input.spellChoices}
                          onSpellChoices={setSpellChoices}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </fieldset>

            {showBosses && (
              <fieldset className="mt-4">
                <legend className="h-tertiary">
                  Poderes de chefe ({input.bosses.length} de {result.bossSkills}
                  )
                </legend>
                {rules.bossGroups.map((group) => (
                  <div key={group.id}>
                    <h4 className="mt-3 font-heading uppercase tracking-wider">
                      {group.name}
                    </h4>
                    <p className="text-[15px] text-muted">{group.summary}</p>
                    <ul className="mt-1">
                      {rules.bossSkills
                        .filter((b) => b.group === group.id)
                        .map((skill) => {
                          const on = input.bosses.includes(skill.id);
                          return (
                            <li key={skill.id}>
                              <label className="flex min-h-[44px] items-start gap-2">
                                <input
                                  type="checkbox"
                                  className="mt-1"
                                  checked={on}
                                  onChange={(event) =>
                                    toggleBoss(skill, event.target.checked)
                                  }
                                />
                                <span>
                                  <strong>{skill.name}</strong>
                                  {skill.advice && (
                                    <span className="text-muted">
                                      {' '}
                                      ({skill.advice})
                                    </span>
                                  )}
                                  <span className="block text-[15px] text-muted">
                                    {skillPreview(skill)}
                                  </span>
                                </span>
                              </label>
                              {on && (
                                <SkillChoices
                                  skill={skill}
                                  value={input.skills[bossKey(skill.id)] ?? {}}
                                  onChange={(choices) =>
                                    setSkillChoices(bossKey(skill.id), choices)
                                  }
                                  catalog={catalog}
                                  spellChoices={input.spellChoices}
                                  onSpellChoices={setSpellChoices}
                                />
                              )}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                ))}
              </fieldset>
            )}

            <h3 className="h-tertiary mt-4">Ataques básicos</h3>
            {[
              ...profile.attacks,
              ...pickedSkills.flatMap((skill) =>
                skill.addsAttack ? [skill.addsAttack] : [],
              ),
            ].map((template) => (
              <AttackEditor
                key={`${role}-${template.id}`}
                template={template}
                value={
                  input.attacks[template.id] ?? defaultAttackChoice(template)
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
