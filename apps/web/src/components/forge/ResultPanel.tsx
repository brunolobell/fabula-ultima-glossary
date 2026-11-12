import { useId, useState, type ReactNode } from 'react';
import { formatZ } from '../../lib/weaponForge';
import { ChevronIcon } from '../Icons';

interface Props {
  total: number;
  /** How many things are still missing or wrong. */
  problems: number;
  /** The `ResultCard`. */
  children: ReactNode;
}

/**
 * The result of a forge, always in view. From `md` it is the right column. On a
 * phone it is a strip pinned to the bottom that starts folded to one line (the
 * total and what is pending) and opens on tap, so the form keeps the screen.
 */
export function ResultPanel({ total, problems, children }: Props) {
  const [expanded, setExpanded] = useState(false);
  const bodyId = useId();
  const line = `${formatZ(total)}${
    problems > 0
      ? ` · ${problems} ${problems === 1 ? 'pendência' : 'pendências'}`
      : ''
  }`;

  return (
    <div className="sticky bottom-0 z-10 bg-bg md:top-0 md:self-start md:pt-3">
      <button
        type="button"
        className="flex min-h-[44px] w-full items-center justify-between gap-3 border-t border-line px-4 text-left md:hidden"
        aria-expanded={expanded}
        aria-controls={bodyId}
        onClick={() => setExpanded((open) => !open)}
      >
        <span className="font-heading uppercase tracking-wider text-heading">
          Resultado
        </span>
        <span className="flex items-center gap-2 font-bold tabular-nums">
          {line}
          <ChevronIcon className={expanded ? 'rotate-180' : ''} />
        </span>
      </button>
      {/* The card below is hidden while folded, so its live region would stay
          silent on a phone: this line carries the changes instead. */}
      <p className="sr-only" aria-live="polite">
        {expanded ? '' : line}
      </p>
      <div id={bodyId} className={expanded ? 'block' : 'hidden md:block'}>
        {children}
      </div>
    </div>
  );
}
