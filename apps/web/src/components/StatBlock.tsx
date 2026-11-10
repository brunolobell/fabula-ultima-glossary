import type { ReactNode } from 'react';
import type { CreatureDetails } from '../api/types';
import { decorateChecks } from '../lib/check';
import { DAMAGE_LABEL, DAMAGE_ORDER, affinityLabel } from '../lib/creatures';
import { numberCells, signed } from '../lib/statBlock';
import { BoltIcon } from './Icons';
import { StatBar } from './StatBar';

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="h-secondary">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** The stat block of a Creature: the facts a Game Master reads at the table. */
export function StatBlock({ details: d }: { details: CreatureDetails }) {
  const affinities = DAMAGE_ORDER.flatMap((damage) => {
    const affinity = d.affinities[damage];
    return affinity ? [{ damage, affinity }] : [];
  });

  return (
    <div>
      {d.traits.length > 0 && (
        <p>
          <strong>Traços típicos:</strong> {d.traits.join(', ')}.
        </p>
      )}

      <div role="group" aria-label="Atributos e defesas">
        <StatBar cells={numberCells(d)} />
      </div>

      <Section id="afinidades" title="Afinidades a dano">
        {affinities.length > 0 ? (
          <ul
            aria-label="Afinidades a dano"
            className="flex flex-wrap gap-x-6 gap-y-1"
          >
            {affinities.map(({ damage, affinity }) => (
              <li key={damage}>{affinityLabel(damage, affinity)}</li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma Afinidade a dano.</p>
        )}
      </Section>

      {d.attacks.length > 0 && (
        <Section id="ataques-basicos" title="Ataques básicos">
          <ul className="bullets">
            {d.attacks.map((attack) => (
              <li key={attack.name}>
                <p>
                  <strong>{attack.name}</strong>{' '}
                  <span className="text-muted">
                    ·{' '}
                    {attack.range === 'melee' ? 'corpo a corpo' : 'à distância'}
                  </span>
                </p>
                <p>
                  {decorateChecks(
                    `(${attack.accuracy})${attack.accuracyBonus ? ` ${signed(attack.accuracyBonus)}` : ''}`,
                  )}
                  {attack.damage !== null && (
                    <>
                      {' · '}
                      {decorateChecks(`(RA + ${attack.damage})`)} de dano
                      {attack.damageType &&
                        ` ${DAMAGE_LABEL[attack.damageType]}`}
                    </>
                  )}
                </p>
                {attack.effect && <p>{decorateChecks(attack.effect)}</p>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {d.spells.length > 0 && (
        <Section id="feiticos" title="Feitiços">
          <ul className="bullets">
            {d.spells.map((spell) => (
              <li key={spell.name}>
                <p>
                  <strong>{spell.name}</strong>{' '}
                  {spell.offensive && (
                    <span className="inline-flex items-center gap-1 text-accent-ink">
                      <BoltIcon /> Ofensivo
                    </span>
                  )}
                </p>
                <p className="text-[15px] text-muted">
                  {spell.accuracy && (
                    <>
                      {decorateChecks(
                        `(${spell.accuracy})${spell.accuracyBonus ? ` ${signed(spell.accuracyBonus)}` : ''}`,
                      )}
                      {' · '}
                    </>
                  )}
                  <span>PM {spell.mpCost}</span> · {spell.target} ·{' '}
                  {spell.duration}
                </p>
                <p>{decorateChecks(spell.effect)}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {d.otherActions.length > 0 && (
        <Section id="outras-acoes" title="Outras ações">
          <ul className="bullets">
            {d.otherActions.map((action) => (
              <li key={action.name}>
                <strong>{action.name}</strong> · {decorateChecks(action.effect)}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {d.specialRules.length > 0 && (
        <Section id="regras-especiais" title="Regras especiais">
          <ul className="bullets">
            {d.specialRules.map((rule) => (
              <li key={rule.name}>
                <strong>{rule.name}</strong> · {decorateChecks(rule.effect)}
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}
