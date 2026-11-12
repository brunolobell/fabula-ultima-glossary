import type { Cell } from '../lib/statCells';

export function StatBar({ cells }: { cells: Cell[] }) {
  if (cells.length === 0) return null;
  return (
    <dl className="stat-bar">
      {cells.map((cell) => (
        <div key={cell.label} data-tone={cell.tone}>
          <dt>{cell.label}</dt>
          <dd>{cell.value}</dd>
        </div>
      ))}
    </dl>
  );
}
