import { vi } from 'vitest';
import type {
  CreatureDetails,
  Entry,
  EntryWithChildren,
  Role,
} from '../api/types';
import { npcSpells } from '../../../api/src/database/seed-data/npc-spells-data';
import {
  quickAssemblyRoles,
  quickAssemblyRules,
} from '../../../api/src/database/seed-data/quick-assembly-data';

const base = {
  createdAt: '',
  updatedAt: '',
  tags: [] as string[],
  source: 'livro-basico' as const,
};

const tracos: Entry = {
  ...base,
  id: '1',
  slug: 'tracos',
  name: 'Traços',
  type: 'rule',
  summary: 'Todo personagem tem três Traços.',
  body: '## Os três Traços\n\n- **Identidade.** Uma frase curta.\n\nVeja [[como-lancar-um-feitico]].',
  page: 34,
  details: {},
};

const comoLancar: Entry = {
  ...base,
  id: '2',
  slug: 'como-lancar-um-feitico',
  name: 'Como lançar um feitiço',
  type: 'rule',
  summary: 'Requisitos e seis passos para lançar um feitiço.',
  body: 'Teste de Magia: **(AST + VON)**.\n\n> **Exemplo:** o Raio exige teste.',
  page: 115,
  details: {},
};

const magiaElemental: Entry = {
  ...base,
  id: '3',
  slug: 'magia-elemental',
  name: 'Magia Elemental',
  type: 'skill',
  summary: 'Aprende um feitiço de Elementalista.',
  body: '',
  page: 187,
  details: { classSlug: 'elementalista', maxLevel: 10 },
};

const raio: Entry = {
  ...base,
  id: '4',
  slug: 'raio',
  name: 'Raio',
  type: 'spell',
  summary: 'Um relâmpago contra o adversário.',
  body: 'Causa **(RA + 25)** pontos de dano de raio.',
  page: 189,
  details: {
    classSlug: 'elementalista',
    mpCost: '20',
    target: 'Uma criatura',
    duration: 'Instantânea',
    offensive: true,
  },
};

const elementalista: EntryWithChildren = {
  ...base,
  id: '5',
  slug: 'elementalista',
  name: 'Elementalista',
  type: 'class',
  summary: 'Conjurador que canaliza os elementos.',
  body: 'Siga as regras de [[como-lancar-um-feitico]].',
  page: 186,
  details: {
    otherNames: ['Feiticeiro'],
    quote: 'Ignore os avisos.',
    freeBenefits: ['Aumenta seus PM máximos em 5.'],
  },
  children: [magiaElemental, raio],
};

const katana: Entry = {
  ...base,
  id: '6',
  slug: 'katana',
  name: 'Katana',
  type: 'equipment',
  summary: 'Arma básica marcial.',
  body: '',
  tags: ['equipamento', 'arma', 'espadas'],
  page: 131,
  details: {
    kind: 'weapon',
    rarity: 'basic',
    martial: true,
    cost: 200,
    category: 'Espadas',
    accuracy: 'DES + AST',
    accuracyBonus: 1,
    damage: 10,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    notes: null,
  },
};

// A second kind, so the "Tipo de item" filter row has a real choice.
const anel: Entry = {
  ...base,
  id: '8',
  slug: 'anel-de-prata',
  name: 'Anel de Prata',
  type: 'equipment',
  summary: 'Acessório simples.',
  body: '',
  tags: ['equipamento', 'acessório'],
  page: 140,
  details: {
    kind: 'accessory',
    rarity: 'basic',
    martial: false,
    cost: 100,
    notes: null,
  },
};

const criar: Entry = {
  ...base,
  id: '7',
  slug: 'criar-um-personagem',
  name: 'Criar um personagem',
  type: 'guide',
  summary: 'Os oito passos para criar um personagem.',
  body: 'Crie junto com o grupo.',
  page: 154,
  details: {
    order: 3,
    steps: [
      {
        title: 'Identidade',
        intro: 'Crie uma frase curta.',
        entries: ['tracos'],
      },
      { title: 'Tema', intro: 'Crie um ideal.', entries: ['tracos'] },
      {
        title: 'Classes',
        intro: 'Escolha duas ou três.',
        entries: ['elementalista'],
      },
    ],
  },
};

const feiticoPoderoso: Entry = {
  ...base,
  id: '20',
  slug: 'feitico-poderoso',
  name: 'Feitiço Poderoso',
  type: 'heroic-skill',
  summary: 'Seus feitiços causam 5 de dano adicional.',
  body: 'Seus feitiços causam **5 pontos de dano adicional**.',
  page: 236,
  details: {
    requirements: {
      classes: ['elementalista'],
      required: 1,
      alsoRequires: ['raio'],
      note: null,
    },
    repeatable: false,
  },
};

const pvExtras: Entry = {
  ...base,
  id: '21',
  slug: 'pv-extras',
  name: 'PV Extras',
  type: 'heroic-skill',
  summary: 'Aumenta permanentemente seus PV máximos em 10.',
  body: 'Aumente seus **PV máximos em 10**.',
  page: 239,
  details: {
    requirements: { classes: [], required: 0, alsoRequires: [], note: null },
    repeatable: false,
  },
};

const grilhoes: Entry = {
  ...base,
  id: '50',
  slug: 'grilhoes-do-coracao',
  name: 'Grilhões do Coração',
  type: 'peculiarity',
  source: 'high-fantasy',
  summary: 'Você segue os mandamentos de uma instituição que começa a questionar.',
  body: 'Crie um [[lacos]] com a instituição e **três mandamentos**.',
  page: 118,
  details: {
    requirement: 'Só com o Tema Dúvida; o Tema não pode mudar.',
  },
};

const voo: Entry = {
  ...base,
  id: '51',
  slug: 'voo',
  name: 'Voo',
  type: 'peculiarity',
  source: 'natural-fantasy',
  summary: 'Você sabe voar ou levitar.',
  body: 'Você sabe voar.',
  page: 122,
  details: { requirement: null },
};

const montariaTerrestre: Entry = {
  ...base,
  id: '30',
  slug: 'montaria-terrestre',
  name: 'Montaria terrestre',
  type: 'transport',
  summary: 'Cavalgadura genérica de terra.',
  body: 'Leva uma ou duas pessoas.',
  tags: ['transporte', 'montaria'],
  page: 125,
  details: {
    transportClass: 'mount',
    medium: 'land',
    cost: 200,
    passengers: 2,
    distance: { planetary: 2, interplanetary: null, interstellar: null },
  },
};

const veiculoPlanetario: Entry = {
  ...base,
  id: '31',
  slug: 'veiculo-planetario',
  name: 'Veículo planetário',
  type: 'transport',
  summary: 'Nave grande para viagens espaciais.',
  body: 'Leva muita gente.',
  tags: ['transporte', 'veículo'],
  source: 'techno-fantasy',
  page: 79,
  details: {
    transportClass: 'vehicle',
    medium: 'planetary',
    cost: 20000,
    passengers: 50,
    approximate: true,
    distance: { planetary: 4, interplanetary: 2, interstellar: 1 },
  },
};

const viagemAerea: Entry = {
  ...base,
  id: '32',
  slug: 'viagem-aerea',
  name: 'Viagem aérea',
  type: 'service',
  summary: 'Passagem de um dia pelo ar.',
  body: 'Pague para uma pessoa voar.',
  tags: ['serviço', 'viagem'],
  page: 125,
  details: { group: 'travel', medium: 'air', cost: 40 },
};

const descansoVila: Entry = {
  ...base,
  id: '33',
  slug: 'descanso-vila',
  name: 'Descanso (vila)',
  type: 'service',
  summary: 'Uma noite de descanso.',
  body: 'Pague para dormir uma noite.',
  tags: ['serviço', 'assentamento'],
  page: 125,
  details: { group: 'settlement', cost: 10 },
};

const cactonto: Entry = {
  ...base,
  id: '20',
  slug: 'cactonto',
  name: 'Cactonto',
  type: 'creature',
  summary: 'Cacto imponente do deserto que drena a água das vítimas.',
  body: '',
  tags: ['criatura'],
  page: 352,
  details: {
    level: 15,
    species: 'plant',
    rank: 'soldier',
    villain: false,
    traits: ['assustador', 'enorme', 'sensível à água', 'territorial'],
    attributes: { DES: 8, AST: 6, VIG: 12, VON: 6 },
    hp: 90,
    crisis: 45,
    mp: 55,
    initiative: 7,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    hasSpells: true,
    affinities: {
      air: 'resistant',
      earth: 'resistant',
      fire: 'resistant',
      ice: 'vulnerable',
      light: 'resistant',
    },
    attacks: [
      {
        name: 'Abraço Perfurador',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 1,
        damage: 10,
        damageType: 'physical',
      },
      {
        name: 'Barragem de Espinhos',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'physical',
      },
    ],
    spells: [
      {
        name: 'Drenar Umidade',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 1,
        effect:
          'Causa (RA + 15) de dano de veneno e recupera metade dos PV perdidos pelo alvo.',
      },
    ],
    otherActions: [
      {
        name: 'Seiva de Cactonto',
        effect:
          'Se recupera de fraco e lento e ataca com Barragem de Espinhos.',
      },
    ],
    specialRules: [
      { name: 'Planta', effect: 'É imune a abalado, atordoado e enfurecido.' },
    ],
  },
};

/** A Creature Group of the Livro Básico shape, for `mockApi({ groups: true })`. */
const ghost = (
  id: string,
  slug: string,
  name: string,
  level: number,
  species: 'undead' | 'beast',
  hp: number,
): Entry => ({
  ...cactonto,
  id,
  slug,
  name,
  summary: `${name} assombra as ruínas.`,
  page: 340,
  details: {
    ...(cactonto.details as CreatureDetails),
    level,
    species,
    hp,
    crisis: Math.floor(hp / 2),
    groupSlug: 'fantasmas',
  },
});

const espectro = ghost('30', 'espectro', 'Espectro', 20, 'undead', 100);
const aparicao = ghost('31', 'aparicao', 'Aparição', 25, 'undead', 130);

const fantasmas: EntryWithChildren = {
  ...base,
  id: '32',
  slug: 'fantasmas',
  name: 'Fantasmas',
  type: 'creature',
  summary: 'Almas que não encontraram descanso.',
  body: 'Os fantasmas **sempre** aparecem em bando. [[tracos]]',
  tags: ['criatura'],
  page: 340,
  details: { group: true },
  children: [espectro, aparicao],
};

/** A Bestiary Vol. I champion, for `mockApi({ vol1: true })`. */
const dragaoArboreo: Entry = {
  ...cactonto,
  id: '40',
  slug: 'dragao-arboreo',
  name: 'Dragão Arbóreo',
  source: 'bestiary-vol-1',
  summary: 'Dragão ancestral cujas escamas seguem as estações.',
  page: 95,
  details: {
    ...(cactonto.details as CreatureDetails),
    level: 40,
    rank: 'champion',
    championX: 3,
    role: 'support',
    flags: ['solo', 'unique'],
    villain: true,
    originalName: 'Arboreal Dragon',
    hp: 360,
    crisis: 180,
  },
};

const ROLE_SLUG: Record<Role, [string, string]> = {
  brute: ['montagem-rapida-bruto', 'Montagem Rápida: Bruto'],
  hunter: ['montagem-rapida-cacador', 'Montagem Rápida: Caçador'],
  mage: ['montagem-rapida-mago', 'Montagem Rápida: Mago'],
  saboteur: ['montagem-rapida-sabotador', 'Montagem Rápida: Sabotador'],
  sentinel: ['montagem-rapida-sentinela', 'Montagem Rápida: Sentinela'],
  support: ['montagem-rapida-apoio', 'Montagem Rápida: Apoio'],
};

const quickAssembly: Entry = {
  ...base,
  id: '30',
  slug: 'montagem-rapida',
  name: 'Montagem Rápida',
  type: 'rule',
  source: 'bestiary-vol-1',
  summary: 'Método para montar um NPC depressa.',
  body: 'Escolha uma função e copie o perfil.',
  page: 25,
  details: quickAssemblyRules,
};

const quickAssemblyRoleRules: Entry[] = (Object.keys(ROLE_SLUG) as Role[]).map(
  (role, i) => ({
    ...base,
    id: String(31 + i),
    slug: ROLE_SLUG[role][0],
    name: ROLE_SLUG[role][1],
    type: 'rule' as const,
    source: 'bestiary-vol-1' as const,
    summary: `Perfil da função ${role}.`,
    body: '',
    page: 30 + i * 4,
    details: quickAssemblyRoles[role],
  }),
);

const npcSpellsRule: Entry = {
  ...base,
  id: '40',
  slug: 'feiticos-de-npc',
  name: 'Feitiços de NPC',
  type: 'rule',
  summary: 'Os feitiços que um NPC pode aprender.',
  body: '',
  page: 310,
  details: { forge: 'npc-spells', spells: npcSpells },
};

const fulgur: Entry = {
  ...base,
  id: '41',
  slug: 'fulgur',
  name: 'Fulgur',
  type: 'spell',
  summary:
    'Uma onda elétrica: causa (RA + 15) pontos de dano a cada alvo atingido.',
  body: '',
  page: 188,
  details: {
    classSlug: 'elementalista',
    mpCost: '10 × A',
    target: 'Até três criaturas',
    duration: 'Instantânea',
    offensive: true,
  },
};

const DETAILS: Record<string, Entry | EntryWithChildren> = Object.fromEntries(
  [
    tracos,
    comoLancar,
    magiaElemental,
    raio,
    elementalista,
    katana,
    anel,
    feiticoPoderoso,
    pvExtras,
    montariaTerrestre,
    veiculoPlanetario,
    viagemAerea,
    descansoVila,
    cactonto,
    quickAssembly,
    ...quickAssemblyRoleRules,
    npcSpellsRule,
    fulgur,
    criar,
  ].map((e) => [e.slug, 'children' in e ? e : { ...e, children: [] }]),
);

const HEAVY_FORGES = ['quick-assembly', 'quick-assembly-role', 'npc-spells'];

const summaryOf = ({
  id,
  slug,
  name,
  type,
  summary,
  source,
  page,
  tags,
  details,
}: Entry) => ({
  id,
  slug,
  name,
  type,
  summary,
  source,
  page,
  tags,
  // Like the API: the big assembler Rules reach the list as their marker only.
  details: HEAVY_FORGES.includes((details as { forge?: string }).forge ?? '')
    ? { forge: (details as { forge: string }).forge }
    : details,
});

const fold = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/** Stubs fetch with the fixtures; returns the mock to assert on. */
/**
 * `stale`: serve the Quick Assembly Rules as an older seed wrote them (no Negative
 * Skills), as a browser can when it holds a cached response from before a re-seed.
 * `groups`: also serve the Creature Group "Fantasmas" and its two members.
 */
export function mockApi({
  stale = false,
  groups = false,
  vol1 = false,
  peculiarities = false,
}: {
  stale?: boolean;
  groups?: boolean;
  vol1?: boolean;
  peculiarities?: boolean;
} = {}) {
  const extra: Entry[] = [
    ...(peculiarities ? [grilhoes, voo] : []),
    ...(vol1 ? [dragaoArboreo] : []),
    ...(groups ? [fantasmas, espectro, aparicao] : []),
  ];
  const table: Record<string, Entry | EntryWithChildren> = {
    ...DETAILS,
    ...Object.fromEntries(
      extra.map((e) => [e.slug, 'children' in e ? e : { ...e, children: [] }]),
    ),
  };
  const older = <T extends { slug: string; details: unknown }>(entry: T): T =>
    stale && entry.slug === 'montagem-rapida'
      ? {
          ...entry,
          details: { ...(entry.details as object), negativeSkills: undefined },
        }
      : entry;
  const fetchMock = vi.fn(async (input: string) => {
    const url = new URL(input, 'http://localhost');
    if (url.pathname === '/api/entries') {
      const q = fold(url.searchParams.get('search') ?? '');
      const list = Object.values(table)
        .filter((e) => fold(`${e.name} ${e.summary} ${e.body}`).includes(q))
        .map(summaryOf);
      return { ok: true, status: 200, json: async () => list };
    }
    const entry = table[url.pathname.replace('/api/entries/', '')];
    return entry
      ? { ok: true, status: 200, json: async () => older(entry) }
      : { ok: false, status: 404, json: async () => ({}) };
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}
