export interface PageLink {
  href: string;
  label: string;
  /** How many items the section holds (Poderes, Feitiços), shown beside the name. */
  count?: number;
}

/**
 * "Nesta página": jump links to the sections of a long entry, in a closed
 * disclosure so a dozen rows do not push the text below the fold on a phone.
 */
export function PageIndex({ links }: { links: PageLink[] }) {
  return (
    <details className="disclosure">
      <summary>
        Nesta página <span>{links.length} seções</span>
      </summary>
      <nav aria-label="Nesta página">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>
                {link.label}
                {link.count !== undefined && (
                  <span className="ml-1.5 text-muted">{link.count}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
