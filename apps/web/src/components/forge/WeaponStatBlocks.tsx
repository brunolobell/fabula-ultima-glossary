import { decorateChecks } from '../../lib/check';
import { effectLines, statLine, type WeaponStats } from '../../lib/weaponForge';

interface Props {
  /** How the stat line is labelled. */
  kind: 'custom' | 'rare';
  /** One stat block per form. */
  forms: WeaponStats[];
}

/** The weapon as built so far, in the same format as the entries. */
export function WeaponStatBlocks({ kind, forms }: Props) {
  return (
    <>
      {forms.map((stats, index) => (
        <div key={index} className="mt-2">
          {forms.length > 1 && (
            <p className="font-heading uppercase tracking-wider text-heading">
              Forma {index === 0 ? 'I' : 'II'}
            </p>
          )}
          <p>{decorateChecks(statLine(stats, kind))}</p>
          {effectLines(stats).map((line) => (
            <p key={line} className="text-[15px]">
              {decorateChecks(line)}
            </p>
          ))}
        </div>
      ))}
    </>
  );
}
