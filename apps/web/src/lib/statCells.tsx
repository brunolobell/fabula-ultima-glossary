import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type {
  EquipmentDetails,
  Entry,
  EntrySummary,
  SkillDetails,
  SpellDetails,
} from '../api/types';
import { BoltIcon } from '../components/Icons';
import { decorateChecks } from './check';
import { entryPath } from './entryTypes';

export interface Cell {
  label: string;
  value: ReactNode;
}

const KIND_LABEL = {
  weapon: 'Arma',
  armor: 'Armadura',
  shield: 'Escudo',
  accessory: 'Acessório',
} as const;

function classLink(slug: string, index: ReadonlyMap<string, EntrySummary>) {
  const entry = index.get(slug);
  return entry ? <Link to={entryPath(entry)}>{entry.name}</Link> : slug;
}

/** The labelled facts shown in an entry's stat bar, by Entry Type. */
export function statCells(
  entry: Entry,
  index: ReadonlyMap<string, EntrySummary>,
): Cell[] {
  switch (entry.type) {
    case 'skill': {
      const d = entry.details as SkillDetails;
      return [
        { label: 'NP máximo', value: d.maxLevel },
        { label: 'Classe', value: classLink(d.classSlug, index) },
      ];
    }
    case 'spell': {
      const d = entry.details as SpellDetails;
      const cells: Cell[] = [
        {
          label: 'PM',
          value: (
            <span title={d.mpCost.includes('×') ? 'Custo por alvo' : undefined}>
              {d.mpCost}
            </span>
          ),
        },
        { label: 'Alvo', value: d.target },
        { label: 'Duração', value: d.duration },
        { label: 'Classe', value: classLink(d.classSlug, index) },
      ];
      if (d.offensive) {
        cells.push({
          label: 'Tipo',
          value: (
            <span className="inline-flex items-center gap-1 text-accent-ink">
              <BoltIcon /> Ofensivo
            </span>
          ),
        });
      }
      return cells;
    }
    case 'equipment': {
      const d = entry.details as EquipmentDetails;
      const cells: Cell[] = [{ label: 'Tipo', value: KIND_LABEL[d.kind] }];
      if (d.kind === 'weapon') {
        const bonus = d.accuracyBonus ? ` +${d.accuracyBonus}` : '';
        cells.push(
          { label: 'Categoria', value: d.category },
          {
            label: 'Precisão',
            value: decorateChecks(`(${d.accuracy})${bonus}`),
          },
          {
            label: 'Dano',
            value: decorateChecks(`(RA + ${d.damage}) ${d.damageType}`),
          },
          {
            label: 'Empunhadura',
            value: `${d.hands === 1 ? 'Uma mão' : 'Duas mãos'}, ${
              d.range === 'melee' ? 'corpo a corpo' : 'à distância'
            }`,
          },
        );
      }
      cells.push({
        label: 'Custo',
        value: d.cost === null ? '—' : `${d.cost.toLocaleString('pt-BR')}z`,
      });
      if (d.martial) cells.push({ label: 'Marcial', value: 'Sim' });
      return cells;
    }
    default:
      return [];
  }
}
