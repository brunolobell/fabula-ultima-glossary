import { describe, expect, it } from 'vitest';
import type { EntrySummary } from '../api/types';
import {
  applyFilters,
  buildRows,
  clearFilters,
  hasActiveFilters,
  readSelection,
  toggleValue,
} from './listFilters';

const entry = (
  slug: string,
  type: EntrySummary['type'],
  details: unknown,
  source: EntrySummary['source'] = 'livro-basico',
): EntrySummary => ({
  id: slug,
  slug,
  name: slug,
  type,
  summary: '',
  source,
  page: 1,
  tags: [],
  details: details as EntrySummary['details'],
});

const classEntry = (slug: string, name: string): EntrySummary => ({
  ...entry(slug, 'class', {}),
  name,
});
const index = new Map(
  [classEntry('elementalista', 'Elementalista'), classEntry('entropista', 'Entropista')].map(
    (e) => [e.slug, e],
  ),
);

const spell = (slug: string, classSlug: string, offensive: boolean, source?: EntrySummary['source']) =>
  entry(slug, 'spell', { classSlug, mpCost: '10', target: '', duration: '', offensive }, source);

const spells = [
  spell('raio', 'elementalista', true),
  spell('cura', 'elementalista', false),
  spell('veneno', 'entropista', true, 'natural-fantasy'),
];

const sel = (query: string) => readSelection('spell', new URLSearchParams(query));
const slugs = (list: EntrySummary[]) => list.map((e) => e.slug);

describe('readSelection', () => {
  it('splits comma-separated values and drops empties and duplicates', () => {
    expect(sel('classe=elementalista,,entropista,elementalista').classe).toEqual([
      'elementalista',
      'entropista',
    ]);
  });

  it('ignores params that belong to other types', () => {
    expect(sel('item=armas')).not.toHaveProperty('item');
  });
});

describe('applyFilters', () => {
  it('returns everything when no row is on', () => {
    expect(applyFilters('spell', spells, sel(''))).toHaveLength(3);
    expect(hasActiveFilters(sel(''))).toBe(false);
  });

  it('is OR inside a row', () => {
    const shown = applyFilters('spell', spells, sel('classe=elementalista,entropista'));
    expect(slugs(shown)).toEqual(['raio', 'cura', 'veneno']);
  });

  it('is AND between rows', () => {
    const shown = applyFilters('spell', spells, sel('classe=elementalista&ofensivo=sim'));
    expect(slugs(shown)).toEqual(['raio']);
  });

  it('filters by book', () => {
    expect(slugs(applyFilters('spell', spells, sel('livro=natural-fantasy')))).toEqual(['veneno']);
  });

  it('matches a Heroic Skill on any of its required Classes, and open ones by requisito', () => {
    const heroic = (slug: string, classes: string[]) =>
      entry(slug, 'heroic-skill', {
        requirements: { classes, required: 1, alsoRequires: [], note: null },
        repeatable: false,
      });
    const list = [heroic('a', ['elementalista', 'entropista']), heroic('b', ['entropista']), heroic('c', [])];
    const pick = (q: string) =>
      slugs(applyFilters('heroic-skill', list, readSelection('heroic-skill', new URLSearchParams(q))));
    expect(pick('classe=elementalista')).toEqual(['a']);
    expect(pick('classe=entropista')).toEqual(['a', 'b']);
    expect(pick('requisito=livres')).toEqual(['c']);
    expect(pick('requisito=livres&classe=entropista')).toEqual([]);
  });

  it('filters Peculiarities by book only', () => {
    const list = [
      entry('voo', 'peculiarity', { requirement: null }, 'high-fantasy'),
      entry('voo-natural-fantasy', 'peculiarity', { requirement: null }, 'natural-fantasy'),
      entry('agitador', 'peculiarity', { requirement: null }, 'techno-fantasy'),
    ];
    expect(buildRows('peculiarity', list, index).map((r) => r.param)).toEqual(['livro']);
    expect(
      slugs(applyFilters('peculiarity', list, readSelection('peculiarity', new URLSearchParams('livro=high-fantasy,techno-fantasy')))),
    ).toEqual(['voo', 'agitador']);
  });

  it('filters equipment by kind, rarity and martial', () => {
    const item = (slug: string, kind: string, rarity: string, martial: boolean) =>
      entry(slug, 'equipment', { kind, rarity, martial, cost: null });
    const list = [
      item('katana', 'weapon', 'basic', true),
      item('escudo', 'shield', 'basic', false),
      item('relíquia', 'artifact', 'rare', false),
    ];
    const pick = (q: string) =>
      slugs(applyFilters('equipment', list, readSelection('equipment', new URLSearchParams(q))));
    expect(pick('item=armas,escudos')).toEqual(['katana', 'escudo']);
    expect(pick('raridade=raro')).toEqual(['relíquia']);
    expect(pick('marcial=nao&raridade=basico')).toEqual(['escudo']);
  });

  it('filters weapons by category and leaves other items out', () => {
    const item = (slug: string, kind: string, category?: string) =>
      entry(slug, 'equipment', { kind, rarity: 'basic', martial: false, cost: null, category });
    const list = [
      item('katana', 'weapon', 'Espadas'),
      item('punhal', 'weapon', 'Adagas'),
      item('soco', 'weapon', 'Luta'),
      item('escudo', 'shield'),
    ];
    const pick = (q: string) =>
      slugs(applyFilters('equipment', list, readSelection('equipment', new URLSearchParams(q))));
    expect(pick('categoria=Luta')).toEqual(['soco']);
    expect(pick('categoria=Adagas,Espadas')).toEqual(['katana', 'punhal']);
    const rows = buildRows('equipment', list, new Map());
    const row = rows.find((r) => r.param === 'categoria');
    expect(row?.options.map((o) => o.value)).toEqual(['Adagas', 'Espadas', 'Luta']);
  });
});

describe('buildRows', () => {
  it('lists only values some entry has, with counts, class rows by name', () => {
    const rows = buildRows('spell', spells, index);
    const byParam = Object.fromEntries(rows.map((r) => [r.param, r.options]));
    expect(byParam.classe).toEqual([
      { value: 'elementalista', label: 'Elementalista', count: 2 },
      { value: 'entropista', label: 'Entropista', count: 1 },
    ]);
    expect(byParam.ofensivo.map((o) => [o.label, o.count])).toEqual([
      ['Ofensivo', 2],
      ['Não ofensivo', 1],
    ]);
    expect(byParam.livro.map((o) => o.value)).toEqual(['livro-basico', 'natural-fantasy']);
  });

  it('has no rows for types without filters', () => {
    expect(buildRows('rule', [entry('r', 'rule', {})], index)).toEqual([]);
  });
});

describe('toggleValue / clearFilters', () => {
  it('adds, appends and removes values, dropping an emptied row', () => {
    let params = toggleValue(new URLSearchParams('q=1'), 'classe', 'a');
    params = toggleValue(params, 'classe', 'b');
    expect(params.get('classe')).toBe('a,b');
    params = toggleValue(toggleValue(params, 'classe', 'a'), 'classe', 'b');
    expect(params.has('classe')).toBe(false);
    expect(params.get('q')).toBe('1');
  });

  it('clears only the type\'s own rows', () => {
    const next = clearFilters('spell', new URLSearchParams('classe=a&livro=x&q=1'));
    expect(next.toString()).toBe('q=1');
  });
});

describe('single-option rows', () => {
  it('are left out, since one option filters nothing', () => {
    const rows = buildRows('spell', [spell('a', 'elementalista', true)], index);
    // One class, one effect, one book: nothing to choose.
    expect(rows).toEqual([]);
  });

  it('stay when the list offers a choice', () => {
    const rows = buildRows(
      'spell',
      [spell('a', 'elementalista', true), spell('b', 'entropista', true)],
      index,
    );
    expect(rows.map((r) => r.param)).toEqual(['classe']);
  });
});

describe('counts follow the other rows', () => {
  const spells = [
    spell('a', 'elementalista', true),
    spell('b', 'elementalista', false),
    spell('c', 'entropista', true),
  ];
  const countsOf = (rows: ReturnType<typeof buildRows>, param: string) =>
    Object.fromEntries(rows.find((r) => r.param === param)!.options.map((o) => [o.value, o.count]));

  it('count the whole list when nothing is chosen', () => {
    const rows = buildRows('spell', spells, index);
    expect(countsOf(rows, 'classe')).toEqual({ elementalista: 2, entropista: 1 });
    expect(countsOf(rows, 'ofensivo')).toEqual({ sim: 2, nao: 1 });
  });

  it('show what choosing a chip would give, given the other rows', () => {
    const rows = buildRows('spell', spells, index, { ofensivo: ['nao'] });
    // Only "b" is non-offensive, so entropista would show nothing.
    expect(countsOf(rows, 'classe')).toEqual({ elementalista: 1, entropista: 0 });
    // A row ignores its own choice, so its other chip keeps a real number.
    expect(countsOf(rows, 'ofensivo')).toEqual({ sim: 2, nao: 1 });
  });
});


describe('services and transports', () => {
  const transport = (
    slug: string,
    transportClass: string,
    medium: string,
    source?: EntrySummary['source'],
  ) =>
    entry(slug, 'transport', { transportClass, medium, cost: 1, passengers: 2 }, source);
  const service = (slug: string, group: string, medium?: string) =>
    entry(slug, 'service', { group, medium, cost: 1 });

  const transports = [
    transport('montaria-terrestre', 'mount', 'land'),
    transport('veiculo-voador', 'vehicle', 'air'),
    transport('veiculo-planetario', 'vehicle', 'planetary', 'techno-fantasy'),
  ];
  const services = [
    service('descanso-vila', 'settlement'),
    service('viagem-aerea', 'travel', 'air'),
    service('viagem-terrestre', 'travel', 'land'),
  ];
  const read = (type: 'service' | 'transport', query: string) =>
    readSelection(type, new URLSearchParams(query));

  it('offers Transports a Classe, a Meio and a Livro row', () => {
    const rows = buildRows('transport', transports, index);
    expect(rows.map((r) => [r.param, r.label])).toEqual([
      ['classe', 'Classe'],
      ['meio', 'Meio'],
      ['livro', 'Livro'],
    ]);
    expect(rows[0].options.map((o) => o.label)).toEqual(['Montaria', 'Veículo']);
    expect(rows[1].options.map((o) => o.label)).toEqual([
      'Terrestre',
      'Aéreo',
      'Planetário',
    ]);
  });

  it('filters Transports by class and by medium (AND between rows)', () => {
    const vehicles = applyFilters('transport', transports, read('transport', 'classe=vehicle'));
    expect(slugs(vehicles)).toEqual(['veiculo-voador', 'veiculo-planetario']);
    const aerial = applyFilters(
      'transport',
      transports,
      read('transport', 'classe=vehicle&meio=air'),
    );
    expect(slugs(aerial)).toEqual(['veiculo-voador']);
  });

  it('offers Services a Grupo and a Meio row, with only travel fares in Meio', () => {
    const rows = buildRows('service', services, index);
    expect(rows.map((r) => r.param)).toEqual(['grupo', 'meio']);
    expect(rows[0].options.map((o) => o.label)).toEqual([
      'Vila',
      'Viagem',
    ]);
    expect(rows[1].options.map((o) => o.label)).toEqual(['Terrestre', 'Aéreo']);
    const air = applyFilters('service', services, read('service', 'meio=air'));
    expect(slugs(air)).toEqual(['viagem-aerea']);
  });
});

describe('creatures', () => {
  const creature = (
    slug: string,
    d: Record<string, unknown>,
    source?: EntrySummary['source'],
  ) =>
    entry(
      slug,
      'creature',
      {
        level: 5,
        species: 'beast',
        rank: 'soldier',
        villain: false,
        hasSpells: false,
        affinities: {},
        ...d,
      },
      source,
    );

  const list = [
    creature('cactonto', {
      level: 15,
      species: 'plant',
      hasSpells: true,
      affinities: { ice: 'vulnerable', fire: 'resistant' },
    }),
    creature('rato-gigante', { level: 5, species: 'beast' }),
    creature('golem-de-bronze', {
      level: 15,
      species: 'construct',
      affinities: { ice: 'vulnerable', poison: 'immune' },
    }),
    creature(
      'kraken',
      { level: 20, species: 'monster', rank: 'champion', villain: true, role: 'mage' },
      'bestiary-vol-1',
    ),
  ];
  const pick = (query: string) =>
    slugs(
      applyFilters('creature', list, readSelection('creature', new URLSearchParams(query))),
    );

  it('filters by Species, level, Rank, Villain and whether it casts spells', () => {
    expect(pick('especie=plant,construct')).toEqual(['cactonto', 'golem-de-bronze']);
    expect(pick('nivel=15')).toEqual(['cactonto', 'golem-de-bronze']);
    expect(pick('patente=champion')).toEqual(['kraken']);
    expect(pick('vilao=sim')).toEqual(['kraken']);
    expect(pick('feiticos=sim')).toEqual(['cactonto']);
  });

  it('filters by Role and by Source, and ANDs the rows', () => {
    expect(pick('funcao=mage')).toEqual(['kraken']);
    expect(pick('livro=bestiary-vol-1')).toEqual(['kraken']);
    expect(pick('nivel=15&especie=plant')).toEqual(['cactonto']);
  });

  it('filters by Affinity: a damage type and how the Creature fares against it', () => {
    expect(pick('afinidade=ice:vulnerable')).toEqual(['cactonto', 'golem-de-bronze']);
    expect(pick('afinidade=poison:immune,fire:resistant')).toEqual([
      'cactonto',
      'golem-de-bronze',
    ]);
    expect(pick('afinidade=fire:vulnerable')).toEqual([]);
  });

  it('names the options in Portuguese, as the Livro Básico does', () => {
    const rows = buildRows('creature', list, new Map());
    const labels = (param: string) =>
      rows.find((r) => r.param === param)?.options.map((o) => o.label);
    expect(labels('especie')).toEqual(['Construto', 'Fera', 'Monstro', 'Planta']);
    expect(labels('nivel')).toEqual(['Nível 5', 'Nível 15', 'Nível 20']);
    expect(labels('patente')).toEqual(['Soldado', 'Campeão']);
    expect(labels('afinidade')).toEqual(
      expect.arrayContaining(['Vulnerável a gelo', 'Resistente a fogo', 'Imune a veneno']),
    );
    expect(rows.find((r) => r.param === 'livro')?.options.map((o) => o.label)).toEqual([
      'Livro Básico',
      'Bestiary Vol. I (inglês)',
    ]);
  });
});
