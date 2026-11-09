import { useId, useState } from 'react';
import type { FilterRow, Selection } from '../lib/listFilters';

/** A row with more options than this shows a few and a "Mostrar todas". */
const LONG_ROW = 8;
const SHOWN_WHEN_LONG = 6;
/** More chips than this in all: the whole block sits behind "Filtrar" at every width. */
const COMPACT_TOTAL = 10;

interface Props {
  rows: FilterRow[];
  selection: Selection;
  onToggle: (param: string, value: string) => void;
  /** Shown only while some filter is active. */
  onClear?: () => void;
}

function Row({
  row,
  chosen,
  onToggle,
}: {
  row: FilterRow;
  chosen: readonly string[];
  onToggle: (param: string, value: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const long = row.options.length > LONG_ROW;
  // Original order is kept (no chip jumps when toggled); a chosen chip past
  // the cut stays visible so the Reader always sees what is on.
  const visible =
    !long || expanded
      ? row.options
      : row.options.filter(
          (option, i) => i < SHOWN_WHEN_LONG || chosen.includes(option.value),
        );

  return (
    <div role="group" aria-label={row.label} className={row.menuRow ? 'lg:hidden' : undefined}>
      <p className="text-[15px] text-muted">{row.label}</p>
      <div className="mt-1 flex flex-wrap gap-2">
        {visible.map((option) => (
          <button
            key={option.value}
            type="button"
            className="chip"
            aria-pressed={chosen.includes(option.value)}
            data-empty={option.count === 0 || undefined}
            onClick={() => onToggle(row.param, option.value)}
          >
            {option.label}
            <span className="chip-count text-muted">{option.count}</span>
          </button>
        ))}
      </div>
      {long && (
        <button
          type="button"
          className="flex min-h-[44px] items-center text-[15px] underline text-primary"
          aria-expanded={expanded}
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded ? 'Mostrar menos' : `Mostrar todas (${row.options.length})`}
        </button>
      )}
    </div>
  );
}

/**
 * Rows of toggle chips: OR inside a row, AND between rows. Long rows show a
 * few chips; on phones (and, for big lists, everywhere) the rows sit behind a
 * "Filtrar" toggle so the list is not pushed off the screen.
 */
export function ListFilters({ rows, selection, onToggle, onClear }: Props) {
  const panelId = useId();
  const shownActive = rows.reduce(
    (n, row) => (row.menuRow ? n : n + (selection[row.param] ?? []).length),
    0,
  );
  const compact = rows.reduce((n, row) => n + row.options.length, 0) > COMPACT_TOTAL;
  // Until the Reader toggles it, the block follows the URL: a link that arrives
  // with filters set shows them. (The rows can arrive after the first render,
  // once the list has loaded, so this cannot be a one-time initial state.)
  const [chosenOpen, setChosenOpen] = useState<boolean | null>(null);
  const open = chosenOpen ?? shownActive > 0;

  if (rows.length === 0 && !onClear) return null;
  return (
    <div className="mt-4">
      {rows.length > 0 && (
        <button
          type="button"
          className={`chip ${compact ? '' : 'md:hidden'}`}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setChosenOpen(!open)}
        >
          Filtrar
          {shownActive > 0 && <span className="chip-count text-muted">{shownActive}</span>}
        </button>
      )}
      <div
        id={panelId}
        className={`space-y-3 ${open ? 'mt-3' : 'hidden'} ${compact ? '' : 'md:mt-0 md:block'}`}
      >
        {rows.map((row) => (
          <Row
            key={row.param}
            row={row}
            chosen={selection[row.param] ?? []}
            onToggle={onToggle}
          />
        ))}
      </div>
      {onClear && (
        <button type="button" className="mt-1 flex min-h-[44px] items-center underline text-primary" onClick={onClear}>
          Limpar filtros
        </button>
      )}
    </div>
  );
}
