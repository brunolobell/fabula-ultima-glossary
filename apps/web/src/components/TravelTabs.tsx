import { NavLink } from 'react-router-dom';
import { TRAVEL_TYPES, TYPE_INFO, typePath } from '../lib/entryTypes';

/** Switches between the two lists the menu reaches with one link. */
export function TravelTabs() {
  return (
    <nav aria-label="Serviços e transporte" className="mt-4 flex gap-2">
      {TRAVEL_TYPES.map((type) => (
        <NavLink
          key={type}
          to={typePath(type)}
          end
          className={({ isActive }) =>
            `rounded border border-line px-4 py-2 min-h-[44px] no-underline hover:no-underline ${
              isActive ? 'bg-tint-key font-bold text-primary' : 'text-ink hover:bg-tint-key'
            }`
          }
        >
          {TYPE_INFO[type].plural}
        </NavLink>
      ))}
    </nav>
  );
}
