import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

/**
 * One row of a Home list: a title and, optionally, a line of what is behind it
 * and a small fact at the right (a count). Without the line the row is compact
 * (a name that explains itself needs no gloss). Whole row is the link, styled as
 * a search result (`result-row`: hairline, hover tint that bleeds past the text);
 * there is no card. The title is the same `result-name` as a
 * search result (a name is read, not scanned: DESIGN 6.9); only the guides pass
 * their own `titleClass`.
 */
export function HomeRow({
  to,
  title,
  titleClass = 'result-name',
  aside,
  children,
}: {
  to: string;
  title: ReactNode;
  titleClass?: string;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <li className="break-inside-avoid">
      <Link
        to={to}
        className={`result-row ${children ? 'py-4' : 'py-3'}`}
      >
        <span className="flex items-baseline justify-between gap-3">
          <span className={`text-primary ${titleClass}`}>{title}</span>
          {aside && <span className="text-meta text-muted">{aside}</span>}
        </span>
        {children && <span className="mt-1 line-clamp-2 block">{children}</span>}
      </Link>
    </li>
  );
}
