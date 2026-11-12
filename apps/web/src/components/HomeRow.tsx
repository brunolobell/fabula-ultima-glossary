import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

/**
 * One row of a Home list: a title, a line of what is behind it and, optionally,
 * a small fact at the right (a count). Whole row is the link; a hairline
 * separates rows, there is no card.
 */
export function HomeRow({
  to,
  title,
  titleClass = 'font-heading text-xl uppercase tracking-wide',
  aside,
  children,
}: {
  to: string;
  title: ReactNode;
  titleClass?: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <li>
      <Link
        to={to}
        className="block border-b border-line py-4 text-ink no-underline hover:bg-tint-key hover:no-underline"
      >
        <span className="flex items-baseline justify-between gap-3">
          <span className={`text-primary ${titleClass}`}>{title}</span>
          {aside && <span className="text-meta text-muted">{aside}</span>}
        </span>
        <span className="mt-1 line-clamp-2 block">{children}</span>
      </Link>
    </li>
  );
}
