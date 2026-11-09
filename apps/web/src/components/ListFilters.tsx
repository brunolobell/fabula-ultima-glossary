import type { FilterRow, Selection } from '../lib/listFilters';

interface Props {
  rows: FilterRow[];
  selection: Selection;
  onToggle: (param: string, value: string) => void;
  /** Shown only while some filter is active. */
  onClear?: () => void;
}

/** Rows of toggle chips: OR inside a row, AND between rows. */
export function ListFilters({ rows, selection, onToggle, onClear }: Props) {
  if (rows.length === 0 && !onClear) return null;
  return (
    <div className="mt-4 space-y-3">
      {rows.map((row) => (
        <div key={row.param} role="group" aria-label={row.label}>
          <p className="text-[15px] text-muted">{row.label}</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {row.options.map((option) => (
              <button
                key={option.value}
                type="button"
                className="chip"
                aria-pressed={(selection[row.param] ?? []).includes(option.value)}
                onClick={() => onToggle(row.param, option.value)}
              >
                {option.label}
                <span className="text-muted">{option.count}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
      {onClear && (
        <button type="button" className="underline text-primary" onClick={onClear}>
          Limpar filtros
        </button>
      )}
    </div>
  );
}
