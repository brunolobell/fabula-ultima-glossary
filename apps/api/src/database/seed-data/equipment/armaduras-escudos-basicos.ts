import { SeedEntry } from '../types';

interface ArmorRow {
  name: string;
  cost: number;
  /** Defesa as printed: a fixed number or "Dado de DES +N". */
  defense: string;
  /** Defesa Mágica as printed. */
  magicDefense: string;
  /** Iniciativa modifier; 0 when the book prints a dash. */
  initiative: number;
  martial?: boolean;
}

const MARTIAL_NOTE =
  'Item **marcial**: só pode ser equipado por quem tem a classe adequada (veja [[equipamento]]).';

const armor = (row: ArmorRow): SeedEntry => {
  const martial = row.martial ?? false;
  const initiative =
    row.initiative === 0 ? 'sem modificador' : String(row.initiative);
  return {
    type: 'equipment',
    name: row.name,
    page: 132,
    summary: `Armadura básica${martial ? ' marcial' : ''}. Defesa ${row.defense}, Def. Mágica ${row.magicDefense}, Iniciativa ${initiative}, ${row.cost}z.`,
    body: martial ? MARTIAL_NOTE : '',
    tags: ['equipamento', 'armadura'],
    details: {
      kind: 'armor',
      rarity: 'basic',
      martial,
      cost: row.cost,
      defense: row.defense,
      magicDefense: row.magicDefense,
      initiative: row.initiative,
      notes: null,
    },
  };
};

interface ShieldRow {
  name: string;
  cost: number;
  defense: string;
  magicDefense?: string;
  martial?: boolean;
}

const shield = (row: ShieldRow): SeedEntry => {
  const martial = row.martial ?? false;
  return {
    type: 'equipment',
    name: row.name,
    page: 133,
    summary: `Escudo básico${martial ? ' marcial' : ''}. Defesa ${row.defense}, Def. Mágica ${row.magicDefense ?? 'sem bônus'}, ${row.cost}z.`,
    body: martial ? MARTIAL_NOTE : '',
    tags: ['equipamento', 'escudo'],
    details: {
      kind: 'shield',
      rarity: 'basic',
      martial,
      cost: row.cost,
      defense: row.defense,
      ...(row.magicDefense ? { magicDefense: row.magicDefense } : {}),
      notes: null,
    },
  };
};

/** Livro Básico p. 132-133. "Sem armadura" is not an item, so it is not seeded. */
export const armadurasEscudosBasicos: SeedEntry[] = [
  armor({
    name: 'Camisa de seda',
    cost: 100,
    defense: 'Dado de DES',
    magicDefense: 'Dado de AST +2',
    initiative: -1,
  }),
  armor({
    name: 'Traje de viagem',
    cost: 100,
    defense: 'Dado de DES +1',
    magicDefense: 'Dado de AST +1',
    initiative: -1,
  }),
  armor({
    name: 'Túnica de combate',
    cost: 150,
    defense: 'Dado de DES +1',
    magicDefense: 'Dado de AST +1',
    initiative: 0,
  }),
  armor({
    name: 'Vestes de sábio',
    cost: 200,
    defense: 'Dado de DES +1',
    magicDefense: 'Dado de AST +2',
    initiative: -2,
  }),
  armor({
    name: 'Brigantina',
    cost: 150,
    defense: '10',
    magicDefense: 'Dado de AST',
    initiative: -2,
    martial: true,
  }),
  armor({
    name: 'Placa de bronze',
    cost: 200,
    defense: '11',
    magicDefense: 'Dado de AST',
    initiative: -3,
    martial: true,
  }),
  armor({
    name: 'Placa rúnica',
    cost: 250,
    defense: '11',
    magicDefense: 'Dado de AST +1',
    initiative: -3,
    martial: true,
  }),
  armor({
    name: 'Placa de aço',
    cost: 300,
    defense: '12',
    magicDefense: 'Dado de AST',
    initiative: -4,
    martial: true,
  }),
  shield({ name: 'Escudo de bronze', cost: 100, defense: '+2' }),
  shield({
    name: 'Escudo rúnico',
    cost: 150,
    defense: '+2',
    magicDefense: '+2',
    martial: true,
  }),
];
