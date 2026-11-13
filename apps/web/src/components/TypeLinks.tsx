import { Link } from 'react-router-dom';
import { BROWSE_TYPES, TYPE_INFO, typePath } from '../lib/entryTypes';

/** Every browsable type as a plain link: a way out of a search with nothing to show. */
export function TypeLinks({ className = '' }: { className?: string }) {
  return (
    <nav aria-label="Tipos de entrada" className={className}>
      <ul className="flex flex-wrap gap-x-5">
        {BROWSE_TYPES.map((type) => (
          <li key={type}>
            <Link to={typePath(type)} className="tap">
              {TYPE_INFO[type].plural}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
