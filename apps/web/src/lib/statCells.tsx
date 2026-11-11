import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type {
  CreatureDetails,
  EquipmentDetails,
  HeroicSkillDetails,
  Entry,
  EntrySummary,
  ServiceDetails,
  SkillDetails,
  SpellDetails,
  TransportDetails,
} from '../api/types';
import { BoltIcon } from '../components/Icons';
import { Requirements } from '../components/Requirements';
import { decorateChecks } from './check';
import {
  RANK_LABEL,
  ROLE_LABEL,
  SPECIES_LABEL,
  isCreatureGroup,
} from './creatures';
import { entryPath } from './entryTypes';
import {
  MEDIUM_LABEL,
  SERVICE_GROUP_LABEL,
  TRANSPORT_CLASS_LABEL,
  costLabel,
  distanceLabel,
} from './travel';


export interface Cell {
  label: string;
  value: ReactNode;
}

const KIND_LABEL = {
  weapon: 'Arma',
  armor: 'Armadura',
  shield: 'Escudo',
  accessory: 'Acessório',
  artifact: 'Artefato',
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
    case 'heroic-skill': {
      const d = entry.details as HeroicSkillDetails;
      const cells: Cell[] = [
        {
          label: 'Requisitos',
          value: <Requirements requirements={d.requirements} index={index} />,
        },
      ];
      if (d.repeatable) cells.push({ label: 'Repetível', value: 'Sim' });
      return cells;
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
      if (d.kind === 'armor' || d.kind === 'shield') {
        cells.push({
          label: 'Defesa',
          value: decorateChecks(d.defense ?? '—'),
        });
        if (d.magicDefense) {
          cells.push({
            label: 'Def. Mágica',
            value: decorateChecks(d.magicDefense),
          });
        }
        if (d.kind === 'armor' && d.initiative !== undefined) {
          cells.push({ label: 'Iniciativa', value: String(d.initiative) });
        }
      }
      cells.push({
        label: 'Custo',
        value: d.cost === null ? '—' : `${d.cost.toLocaleString('pt-BR')}z`,
      });
      if (d.martial) cells.push({ label: 'Marcial', value: 'Sim' });
      return cells;
    }
    case 'creature': {
      if (isCreatureGroup(entry.details)) return [];
      const d = entry.details as CreatureDetails;
      const cells: Cell[] = [
        { label: 'Nível', value: d.level },
        { label: 'Espécie', value: SPECIES_LABEL[d.species] },
        { label: 'Patente', value: RANK_LABEL[d.rank] },
      ];
      if (d.role) cells.push({ label: 'Função', value: ROLE_LABEL[d.role] });
      if (d.villain) cells.push({ label: 'Vilão', value: 'Sim' });
      if (d.originalName)
        cells.push({ label: 'Nome original', value: d.originalName });
      return cells;
    }
    case 'service': {
      const d = entry.details as ServiceDetails;
      const cells: Cell[] = [
        { label: 'Custo', value: costLabel(d.cost) },
        { label: 'Grupo', value: SERVICE_GROUP_LABEL[d.group] },
      ];
      if (d.medium) cells.push({ label: 'Meio', value: MEDIUM_LABEL[d.medium] });
      return cells;
    }
    case 'transport': {
      const d = entry.details as TransportDetails;
      return [
        { label: 'Custo', value: costLabel(d.cost) },
        { label: 'Classe', value: TRANSPORT_CLASS_LABEL[d.transportClass] },
        { label: 'Meio', value: MEDIUM_LABEL[d.medium] },
        { label: 'Passageiros', value: `${d.approximate ? 'Cerca de' : 'Até'} ${d.passengers}` },
        { label: 'Distância', value: distanceLabel(d.distance) },
      ];
    }
    default:
      return [];
  }
}
