import type { EquipmentKind } from '../api/types';

/** The Equipment Kinds a Reader can filter by, in alphabetical order (PT-BR). */
export const EQUIPMENT_KIND_FILTERS: {
  /** Value of the `item` query parameter. */
  param: string;
  kind: EquipmentKind;
  label: string;
}[] = [
  { param: 'acessorios', kind: 'accessory', label: 'Acessórios' },
  { param: 'armaduras', kind: 'armor', label: 'Armaduras' },
  { param: 'armas', kind: 'weapon', label: 'Armas' },
  { param: 'artefatos', kind: 'artifact', label: 'Artefatos' },
  { param: 'escudos', kind: 'shield', label: 'Escudos' },
];

export const kindFromParam = (param: string | null | undefined) =>
  EQUIPMENT_KIND_FILTERS.find((f) => f.param === param);

export const equipmentPath = (param?: string) =>
  param ? `/equipamento?item=${param}` : '/equipamento';
