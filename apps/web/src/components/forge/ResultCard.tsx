import { decorateChecks } from '../../lib/check';
import {
  effectLines,
  formatZ,
  statLine,
  type CostLine,
  type WeaponStats,
} from '../../lib/weaponForge';

interface Props {
  kind: 'custom' | 'rare';
  forms: WeaponStats[];
  cost: CostLine[];
  total: number;
  /** What is still missing or wrong. */
  problems: string[];
  /** Reminders that apply to the build. */
  notes: string[];
  className?: string;
}

/** The weapon as built so far, in the same format as the entries, with its cost breakdown. */
export function ResultCard({
  kind,
  forms,
  cost,
  total,
  problems,
  notes,
  className,
}: Props) {
  return (
    <section
      aria-labelledby="forge-result-title"
      className={`highlight-key max-h-[40vh] overflow-y-auto md:max-h-none ${className ?? ''}`}
    >
      <h3
        id="forge-result-title"
        className="font-heading text-[21px] uppercase tracking-wider text-heading"
      >
        Resultado
      </h3>
      <div aria-live="polite">
        {forms.map((stats, index) => (
          <div key={index} className="mt-2">
            {forms.length > 1 && (
              <p className="font-heading uppercase tracking-wider text-heading">
                Forma {index === 0 ? 'I' : 'II'}
              </p>
            )}
            <p>{decorateChecks(statLine(stats, kind))}</p>
            {effectLines(stats).map((line) => (
              <p key={line} className="text-[15px]">
                {decorateChecks(line)}
              </p>
            ))}
          </div>
        ))}
        {problems.length > 0 && (
          <ul className="mt-2 text-[15px] text-accent-ink">
            {problems.map((problem) => (
              <li key={problem}>{problem}</li>
            ))}
          </ul>
        )}
      </div>
      <ul className="mt-3 text-[15px]">
        {cost.map((line, index) => (
          <li
            key={`${line.label}-${index}`}
            className="flex justify-between gap-4"
          >
            <span>{line.label}</span>
            <span className="tabular-nums">{formatZ(line.amount)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-1 flex justify-between gap-4 border-t border-line pt-1 font-bold">
        <span>Custo total</span>
        <span className="tabular-nums">{formatZ(total)}</span>
      </p>
      {notes.map((note) => (
        <p key={note} className="mt-2 text-[15px] text-muted">
          {note}
        </p>
      ))}
    </section>
  );
}
