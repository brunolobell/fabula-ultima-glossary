import { useId, useMemo } from 'react';
import { Link } from 'react-router-dom';
import type {
  EntrySummary,
  EquipmentDetails,
  RareArmorRuleDetails,
} from '../../api/types';
import {
  armorEffectLines,
  armorStatLine,
  baseFromEquipment,
  computeRareArmor,
  defenseText,
  emptyArmorChoice,
  type ArmorChoice,
} from '../../lib/armorForge';
import { decorateChecks } from '../../lib/check';
import { equipmentPath } from '../../lib/equipmentKinds';
import { useDraft } from '../../lib/forgeDraft';
import { CUSTOM_FEATURE, formatZ } from '../../lib/weaponForge';
import { OptionRow } from './OptionRow';
import { ResultCard } from './ResultCard';
import { ResultPanel } from './ResultPanel';

interface Props {
  rules: RareArmorRuleDetails;
  /** Every Equipment entry; the basic armors and shields are picked out here. */
  equipment: EntrySummary[];
}

const GROUP_LABEL = {
  defensive: 'Defensiva',
  improvement: 'De melhoria',
} as const;

const KIND_ORDER = { armor: 0, shield: 1 } as const;

const baseLine = (name: string, d: EquipmentDetails) => {
  const base = baseFromEquipment(name, d);
  return `${defenseText(base)}${base.martial ? '. Marcial' : ''}.`;
};

/**
 * The Armor Forge page: builds a Rare Armor or a Rare Shield from a basic one
 * and a single feature. The draft is kept in memory for the session
 * (`useDraft`): nothing is saved, and a reload discards it.
 */
export function ArmorForge({ rules, equipment }: Props) {
  const id = useId();
  const [baseSlug, setBaseSlug] = useDraft<string | null>(
    'armor:base',
    () => null,
  );
  const [choice, setChoice] = useDraft<ArmorChoice>(
    'armor:choice',
    emptyArmorChoice,
  );

  const bases = useMemo(
    () =>
      equipment
        .filter((e) => {
          const d = e.details as EquipmentDetails;
          return (
            (d.kind === 'armor' || d.kind === 'shield') && d.rarity === 'basic'
          );
        })
        .sort((a, b) => {
          const da = a.details as EquipmentDetails;
          const db = b.details as EquipmentDetails;
          return (
            KIND_ORDER[da.kind as 'armor' | 'shield'] -
              KIND_ORDER[db.kind as 'armor' | 'shield'] ||
            (da.cost ?? 0) - (db.cost ?? 0) ||
            a.name.localeCompare(b.name, 'pt-BR')
          );
        }),
    [equipment],
  );

  const picked = bases.find((e) => e.slug === baseSlug);
  const result = picked
    ? computeRareArmor(
        rules,
        baseFromEquipment(picked.name, picked.details as EquipmentDetails),
        choice,
      )
    : null;

  const reset = () => {
    setBaseSlug(null);
    setChoice(emptyArmorChoice());
  };
  const set = (patch: Partial<ArmorChoice>) =>
    setChoice((prev) => ({ ...prev, ...patch }));

  const baseGroup = (kind: 'armor' | 'shield') =>
    bases.filter((e) => (e.details as EquipmentDetails).kind === kind);

  return (
    <div>
      <h1 className="h-main">Forja de Armaduras e Escudos</h1>
      <div className="mt-3 flex items-center justify-between gap-3">
        <Link to={equipmentPath('armaduras')} className="tap">← Armaduras</Link>
        <button type="button" className="chip" onClick={reset}>
          Recomeçar
        </button>
      </div>
      <p className="mt-2 text-meta text-muted">
        Nada é salvo; o rascunho some ao recarregar.
      </p>
      <div className="grid gap-x-8 md:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0 pt-3">
          <p>
            Parta de uma armadura ou escudo básico e acrescente{' '}
            <strong>uma única característica</strong>, somando o custo dela ao
            preço do item (Livro Básico, p. 280).
          </p>

          <h3 className="h-tertiary">1. Item de base</h3>
          {(['armor', 'shield'] as const).map((kind) => (
            <div key={kind}>
              <h4 className="mt-3 font-heading uppercase tracking-wider text-heading">
                {kind === 'armor' ? 'Armaduras' : 'Escudos'}
              </h4>
              <ul className="mt-1">
                {baseGroup(kind).map((entry) => {
                  const d = entry.details as EquipmentDetails;
                  return (
                    <OptionRow
                      key={entry.slug}
                      type="radio"
                      name={`${id}-base`}
                      checked={baseSlug === entry.slug}
                      onChange={() => setBaseSlug(entry.slug)}
                      label={entry.name}
                      tag={formatZ(d.cost ?? 0)}
                      summary={baseLine(entry.name, d)}
                    />
                  );
                })}
              </ul>
            </div>
          ))}

          {picked && (
            <>
              <h3 className="h-tertiary">2. Característica</h3>
              <ul className="mt-2">
                {(['defensive', 'improvement'] as const).map((group) =>
                  rules.features
                    .filter((f) => f.group === group)
                    .map((feature) => (
                      <OptionRow
                        key={feature.id}
                        type="radio"
                        name={`${id}-feature`}
                        checked={choice.featureId === feature.id}
                        onChange={() => set({ featureId: feature.id })}
                        label={feature.name}
                        tag={`+${formatZ(feature.cost)}`}
                        summary={`${GROUP_LABEL[group]}. ${feature.summary}`}
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
            </>
          )}

          <ul className="bullets mt-6 text-meta">
            {rules.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
        {result ? (
          <ResultPanel total={result.total} problems={result.problems.length}>
            <ResultCard
              cost={result.cost}
              total={result.total}
              problems={result.problems}
              notes={[]}
            >
              <div className="mt-2">
                {result.stats.feature && (
                  <p className="font-heading uppercase tracking-wider text-heading">
                    {result.stats.name} + {result.stats.feature.name}
                  </p>
                )}
                <p>{decorateChecks(armorStatLine(result.stats))}</p>
                {armorEffectLines(result.stats).map((line) => (
                  <p key={line} className="text-meta">
                    {decorateChecks(line)}
                  </p>
                ))}
              </div>
            </ResultCard>
          </ResultPanel>
        ) : (
          <div className="sticky bottom-0 z-10 bg-bg md:top-0 md:self-start md:pt-3">
            <div className="highlight-key">
              <p>Escolha uma armadura ou um escudo básico para começar.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
