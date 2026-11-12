import type { ReactNode } from 'react';
import { formatZ, type CostLine } from '../../lib/weaponForge';

interface Props {
  /** The item as built so far (a weapon's stat blocks, an armor's stat line). */
  children: ReactNode;
  cost: CostLine[];
  total: number;
  /** What is still missing or wrong. */
  problems: string[];
  /** Reminders that apply to the build. */
  notes: string[];
  className?: string;
}

/** The item as built so far, in the same format as the entries, with its cost breakdown. */
export function ResultCard({
  children,
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
        className="sr-only font-heading text-[1.3125rem] uppercase tracking-wider text-heading md:not-sr-only"
      >
        Resultado
      </h3>
      <div aria-live="polite">
        {children}
        {problems.length > 0 && (
          <ul className="mt-2 text-meta text-accent-ink">
            {problems.map((problem) => (
              <li key={problem}>{problem}</li>
            ))}
          </ul>
        )}
      </div>
      <ul className="mt-3 text-meta">
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
        <p key={note} className="mt-2 text-meta text-muted">
          {note}
        </p>
      ))}
    </section>
  );
}
