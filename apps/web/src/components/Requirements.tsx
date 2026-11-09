import { Link } from 'react-router-dom';
import type { EntrySummary, HeroicSkillRequirements } from '../api/types';
import { entryPath } from '../lib/entryTypes';
import { sentence } from '../lib/requirements';

/** The requirement sentence with each Class and required Skill/Spell linked. */
export function Requirements({
  requirements,
  index,
}: {
  requirements: HeroicSkillRequirements;
  index: ReadonlyMap<string, EntrySummary>;
}) {
  return (
    <>
      {sentence(requirements, (slug) => {
        const entry = index.get(slug);
        return entry ? (
          <Link key={slug} to={entryPath(entry)}>
            {entry.name}
          </Link>
        ) : (
          slug
        );
      })}
    </>
  );
}
