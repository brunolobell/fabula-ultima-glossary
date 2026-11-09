import { vi } from 'vitest';
import type { Entry, EntryWithChildren } from '../api/types';

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
    steps: [
      { title: 'Identidade', intro: 'Crie uma frase curta.', entries: ['tracos'] },
      { title: 'Tema', intro: 'Crie um ideal.', entries: ['tracos'] },
      { title: 'Classes', intro: 'Escolha duas ou três.', entries: ['elementalista'] },
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
    criar,
  ].map(
    (e) => [e.slug, 'children' in e ? e : { ...e, children: [] }],
  ),
);

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
  details,
});

const fold = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/** Stubs fetch with the fixtures; returns the mock to assert on. */
export function mockApi() {
  const fetchMock = vi.fn(async (input: string) => {
    const url = new URL(input, 'http://localhost');
    if (url.pathname === '/api/entries') {
      const q = fold(url.searchParams.get('search') ?? '');
      const list = Object.values(DETAILS)
        .filter((e) => fold(`${e.name} ${e.summary} ${e.body}`).includes(q))
        .map(summaryOf);
      return { ok: true, status: 200, json: async () => list };
    }
    const entry = DETAILS[url.pathname.replace('/api/entries/', '')];
    return entry
      ? { ok: true, status: 200, json: async () => entry }
      : { ok: false, status: 404, json: async () => ({}) };
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}
