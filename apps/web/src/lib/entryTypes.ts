import type { EntryType } from '../api/types';

interface TypeInfo {
  /** URL segment, in Portuguese. */
  slug: string;
  label: string;
  plural: string;
  description: string;
}

export const TYPE_INFO: Record<EntryType, TypeInfo> = {
  rule: {
    slug: 'regras',
    label: 'Regra',
    plural: 'Regras',
    description: 'Como o jogo funciona: Traços, recursos, condições e magia.',
  },
  class: {
    slug: 'classes',
    label: 'Classe',
    plural: 'Classes',
    description: 'As classes do livro, com seus Poderes e Feitiços.',
  },
  skill: {
    slug: 'poderes',
    label: 'Poder',
    plural: 'Poderes',
    description: 'Os Poderes que cada classe oferece, com o NP máximo.',
  },
  'heroic-skill': {
    slug: 'poderes-heroicos',
    label: 'Poder Heroico',
    plural: 'Poderes Heroicos',
    description:
      'Poderes que se adquirem ao dominar uma classe, alguns com requisitos.',
  },
  spell: {
    slug: 'feiticos',
    label: 'Feitiço',
    plural: 'Feitiços',
    description: 'Custo em PM, alvo e duração de cada Feitiço.',
  },
  equipment: {
    slug: 'equipamento',
    label: 'Equipamento',
    plural: 'Equipamento',
    description: 'Armas, armaduras, escudos e acessórios.',
  },
  creature: {
    slug: 'criaturas',
    label: 'Criatura',
    plural: 'Criaturas',
    description:
      'As criaturas do Bestiário: nível, Espécie, Afinidades a dano, ataques e feitiços.',
  },
  service: {
    slug: 'servicos',
    label: 'Serviço',
    plural: 'Serviços',
    description: 'Hospedagem, recarga de PI e passagens, com o custo em zênites.',
  },
  transport: {
    slug: 'transportes',
    label: 'Transporte',
    plural: 'Transportes',
    description:
      'Montarias e veículos genéricos: custo, passageiros e distância por dia de Viagem.',
  },
  guide: {
    slug: 'guias',
    label: 'Guia',
    plural: 'Guias',
    description: 'Roteiros passo a passo para criar um personagem e jogar.',
  },
};

/** The types a Reader browses directly; guides have their own place. */
export const BROWSE_TYPES: EntryType[] = [
  'rule',
  'class',
  'skill',
  'heroic-skill',
  'spell',
  'equipment',
  'creature',
  'service',
  'transport',
];

/** The two lists the menu reaches with one link and the Serviços | Transportes switch joins. */
export const TRAVEL_TYPES: readonly EntryType[] = ['service', 'transport'];

export function typeFromSlug(slug: string | undefined): EntryType | undefined {
  return (Object.keys(TYPE_INFO) as EntryType[]).find(
    (type) => TYPE_INFO[type].slug === slug,
  );
}

export const typePath = (type: EntryType) => `/${TYPE_INFO[type].slug}`;

export const entryPath = (entry: { type: EntryType; slug: string }) =>
  `${typePath(entry.type)}/${entry.slug}`;

export const countLabel = (count: number) =>
  count === 1 ? '1 entrada' : `${count} entradas`;
