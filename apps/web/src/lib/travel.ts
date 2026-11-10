import type {
  Medium,
  ServiceGroup,
  TransportClass,
  TransportDistance,
} from '../api/types';

/** The Media in the order of the book's scale: ground, water, air, then space. */
export const MEDIUM_ORDER: readonly Medium[] = [
  'land',
  'water',
  'submarine',
  'air',
  'planetary',
  'interplanetary',
  'interstellar',
];

export const MEDIUM_LABEL: Record<Medium, string> = {
  land: 'Terrestre',
  water: 'Aquático',
  submarine: 'Submarino',
  air: 'Aéreo',
  planetary: 'Planetário',
  interplanetary: 'Interplanetário',
  interstellar: 'Interestelar',
};

export const TRANSPORT_CLASS_ORDER: readonly TransportClass[] = [
  'mount',
  'vehicle',
];

export const TRANSPORT_CLASS_LABEL: Record<TransportClass, string> = {
  mount: 'Montaria',
  vehicle: 'Veículo',
};

export const SERVICE_GROUP_ORDER: readonly ServiceGroup[] = [
  'settlement',
  'travel',
];

/** The book groups Services as "Serviços de vila" and "Serviços de Viagem". */
export const SERVICE_GROUP_LABEL: Record<ServiceGroup, string> = {
  settlement: 'Vila',
  travel: 'Viagem',
};

/** Zeniths as a Reader writes them: "20.000z". */
export const costLabel = (cost: number) => `${cost.toLocaleString('pt-BR')}z`;

const SCALES: [keyof TransportDistance, string][] = [
  ['planetary', 'Planetária'],
  ['interplanetary', 'Interplanetária'],
  ['interstellar', 'Interestelar'],
];

/** "Planetária ×4 · Interplanetária ×2"; the scales a Transport cannot reach are left out. */
export const distanceLabel = (distance: TransportDistance) =>
  SCALES.filter(([scale]) => distance[scale] !== null)
    .map(([scale, label]) => `${label} ×${distance[scale]}`)
    .join(' · ');
