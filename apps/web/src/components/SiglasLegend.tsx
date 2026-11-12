import { abbreviationsIn } from '../lib/abbreviations';

/**
 * A closed disclosure naming the abbreviations the page uses. The summary line
 * already lists them, so a Reader who knows them can ignore it; a newcomer
 * opens it. Native <details>, so it works with touch and a keyboard alike.
 */
export function SiglasLegend({ texts }: { texts: (string | undefined)[] }) {
  const used = abbreviationsIn(...texts);
  if (used.length === 0) return null;
  return (
    <details className="disclosure">
      <summary>
        Siglas nesta página{' '}
        <span className="text-muted">{used.map((a) => a.sigla).join(', ')}</span>
      </summary>
      <dl>
        {used.map((a) => (
          <div key={a.sigla}>
            <dt>{a.sigla}</dt>
            <dd>
              <strong>{a.term}</strong>: {a.gloss}.
            </dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
