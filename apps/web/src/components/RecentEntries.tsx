import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TYPE_INFO, entryPath } from '../lib/entryTypes';
import { useEntryIndex } from '../hooks/useEntryIndex';
import { readRecents } from '../lib/recent';

/**
 * The last entries the Reader opened, as plain links. Shown where a Reader
 * who comes back mid-session lands (Home, an empty search). Renders nothing
 * on a first visit, so a new Reader sees no empty box. Read once on mount:
 * the list is already in localStorage, so there is no layout shift.
 */
export function RecentEntries({ className = '' }: { className?: string }) {
  const [saved] = useState(readRecents);
  const { bySlug, isSuccess } = useEntryIndex();
  // An entry renamed or dropped by a later seed would lead to "não encontrado":
  // once the index is known, leave those out. Until then show what was saved.
  const recents = isSuccess ? saved.filter((r) => bySlug.has(r.slug)) : saved;
  if (recents.length === 0) return null;

  return (
    <nav aria-label="Vistos recentemente" className={className}>
      <p className="text-meta text-muted" aria-hidden>
        Vistos recentemente
      </p>
      <ul className="flex flex-wrap gap-x-5">
        {recents.map((entry) => (
          <li key={entry.slug} className="flex items-center">
            <Link to={entryPath(entry)} className="tap font-bold">
              {entry.name}
            </Link>
            <span className="ml-1.5 text-meta text-muted">
              {TYPE_INFO[entry.type].label}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
