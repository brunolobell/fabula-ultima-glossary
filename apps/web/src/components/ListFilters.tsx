import { useId, useState } from 'react';
import type { FilterRow, Selection } from '../lib/listFilters';

interface Props {
  rows: FilterRow[];
  selection: Selection;
  onToggle: (param: string, value: string) => void;
  /** Shown only while some filter is active. */
  onClear?: () => void;
}

/** "Classe", "Classe: Guardião" or "Classe: 3". */
function buttonLabel(row: FilterRow, chosen: readonly string[]) {
  if (chosen.length === 0) return row.label;
  if (chosen.length === 1) {
    const option = row.options.find((o) => o.value === chosen[0]);
    return `${row.label}: ${option?.label ?? chosen[0]}`;
  }
  return `${row.label}: ${chosen.length}`;
}

/**
 * One button per filter on a single line; a button opens its options in a panel
 * under the bar (one at a time). OR inside a filter, AND between filters. The
 * panel stays open while the Reader ticks options and closes on its button,
 * on Escape or when another filter opens.
 */
export function ListFilters({ rows, selection, onToggle, onClear }: Props) {
  const baseId = useId();
  const [openParam, setOpenParam] = useState<string | null>(null);

  if (rows.length === 0 && !onClear) return null;

  const openRow = rows.find((row) => row.param === openParam);
  const panelId = (param: string) => `${baseId}-${param}`;

  return (
    <div
      className="mt-4"
      onKeyDown={(event) => {
        if (event.key !== 'Escape' || !openParam) return;
        event.currentTarget.querySelector<HTMLButtonElement>('[aria-expanded="true"]')?.focus();
        setOpenParam(null);
      }}
    >
      <div className="flex flex-wrap items-center gap-2">
        {rows.map((row) => {
          const chosen = selection[row.param] ?? [];
          const open = openParam === row.param;
          return (
            <button
              key={row.param}
              type="button"
              className={`chip ${row.menuRow ? 'lg:hidden' : ''}`}
              data-active={chosen.length > 0 || undefined}
              aria-expanded={open}
              aria-controls={panelId(row.param)}
              onClick={() => setOpenParam(open ? null : row.param)}
            >
              {buttonLabel(row, chosen)}
              <span aria-hidden="true">{open ? '▴' : '▾'}</span>
            </button>
          );
        })}
        {onClear && (
          <button
            type="button"
            className="inline-flex min-h-[44px] items-center px-2 underline text-primary"
            onClick={onClear}
          >
            Limpar filtros
          </button>
        )}
      </div>
      {openRow && (
        <div
          id={panelId(openRow.param)}
          role="group"
          aria-label={openRow.label}
          className={`mt-2 max-h-64 overflow-y-auto rounded border border-line px-3 py-1 sm:grid sm:grid-cols-2 sm:gap-x-4 md:grid-cols-3 ${
            openRow.menuRow ? 'lg:hidden' : ''
          }`}
        >
          {openRow.options.map((option) => (
            <label
              key={option.value}
              className="flex min-h-[44px] cursor-pointer items-center gap-2"
            >
              <input
                type="checkbox"
                style={{ accentColor: 'var(--primary)' }}
                checked={(selection[openRow.param] ?? []).includes(option.value)}
                onChange={() => onToggle(openRow.param, option.value)}
              />
              <span className={option.count === 0 ? 'text-muted' : undefined}>{option.label}</span>
              <span className="ml-auto text-muted">{option.count}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
