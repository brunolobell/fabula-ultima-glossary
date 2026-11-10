import { slugify } from '../../entries/slug';
import { rule, service, transport } from './helpers';
import { SeedEntry } from './types';

const CORE_RULE = 'servicos-e-transporte';
const SPACE_RULE = 'servicos-e-transporte-viagem-espacial';

const see = (slug: string) => `Veja as regras de preço e uso em [[${slug}]].`;

type Transport = Extract<SeedEntry, { type: 'transport' }>;

const zenits = (cost: number) => `${cost.toLocaleString('pt-BR')}z`;

const scale = (multiplier: number | null) =>
  multiplier === null ? '-' : `×${multiplier}`;

/** The rule's Transport table, built from the entries so the numbers cannot drift. */
const transportTable = (
  rows: Transport[],
  distance: (d: Transport['details']['distance']) => string,
) =>
  [
    '| Transporte | Custo | Passageiros | Distância |',
    '| --- | --- | --- | --- |',
    ...rows.map(({ name, details: d }) => {
      const passengers = `${d.approximate ? 'cerca de' : 'até'} ${d.passengers}`;
      return `| [[${slugify(name)}]] | ${zenits(d.cost)} | ${passengers} | ${distance(d.distance)} |`;
    }),
  ].join('\n');

/** Livro Básico, p. 124-125: the generic Transports. */
const transports: Transport[] = [
  transport({
    name: 'Montaria terrestre',
    page: 125,
    transportClass: 'mount',
    medium: 'land',
    cost: 200,
    passengers: 2,
    distance: [2, null, null],
    summary:
      'Montaria genérica de terra: 200z, leva uma ou duas pessoas e dobra a distância de um dia de Viagem.',
    body: `Leva **uma ou duas** pessoas e multiplica por **×2** a distância de um dia de Viagem. Só viaja por terra.\n\n${see(CORE_RULE)}`,
  }),
  transport({
    name: 'Montaria aquática',
    page: 125,
    transportClass: 'mount',
    medium: 'water',
    cost: 500,
    passengers: 6,
    approximate: true,
    distance: [2, null, null],
    summary:
      'Montaria genérica de água: 500z, leva cerca de seis pessoas e dobra a distância de um dia de Viagem.',
    body: `Leva cerca de **seis** pessoas e multiplica por **×2** a distância de um dia de Viagem. Só viaja pela superfície da água.\n\n${see(CORE_RULE)}`,
  }),
  transport({
    name: 'Montaria submarina',
    page: 125,
    transportClass: 'mount',
    medium: 'submarine',
    cost: 1000,
    passengers: 6,
    approximate: true,
    distance: [2, null, null],
    summary:
      'Montaria genérica que mergulha: 1.000z, leva cerca de seis pessoas e dobra a distância de um dia de Viagem.',
    body: `Leva cerca de **seis** pessoas e multiplica por **×2** a distância de um dia de Viagem. Viaja pela superfície e pelas profundezas da água.\n\n${see(CORE_RULE)}`,
  }),
  transport({
    name: 'Montaria voadora',
    page: 125,
    transportClass: 'mount',
    medium: 'air',
    cost: 2000,
    passengers: 6,
    approximate: true,
    distance: [3, null, null],
    summary:
      'Montaria genérica que voa: 2.000z, leva cerca de seis pessoas e triplica a distância de um dia de Viagem.',
    body: `Leva cerca de **seis** pessoas e multiplica por **×3** a distância de um dia de Viagem. Viaja pelo céu.\n\n${see(CORE_RULE)}`,
  }),
  transport({
    name: 'Veículo terrestre',
    page: 125,
    transportClass: 'vehicle',
    medium: 'land',
    cost: 600,
    passengers: 6,
    approximate: true,
    distance: [2, null, null],
    summary:
      'Veículo genérico de terra: 600z, leva cerca de seis pessoas e dobra a distância de um dia de Viagem.',
    body: `Leva cerca de **seis** pessoas e multiplica por **×2** a distância de um dia de Viagem. Só viaja por terra.\n\n${see(CORE_RULE)}`,
  }),
  transport({
    name: 'Veículo aquático',
    page: 125,
    transportClass: 'vehicle',
    medium: 'water',
    cost: 2000,
    passengers: 10,
    approximate: true,
    distance: [2, null, null],
    summary:
      'Veículo genérico de água: 2.000z, leva cerca de dez pessoas e dobra a distância de um dia de Viagem.',
    body: `Leva cerca de **dez** pessoas e multiplica por **×2** a distância de um dia de Viagem. Só viaja pela superfície da água.\n\n${see(CORE_RULE)}`,
  }),
  transport({
    name: 'Veículo submarino',
    page: 125,
    transportClass: 'vehicle',
    medium: 'submarine',
    cost: 4000,
    passengers: 10,
    approximate: true,
    distance: [2, null, null],
    summary:
      'Veículo genérico que mergulha: 4.000z, leva cerca de dez pessoas e dobra a distância de um dia de Viagem.',
    body: `Leva cerca de **dez** pessoas e multiplica por **×2** a distância de um dia de Viagem. Viaja pela superfície e pelas profundezas da água.\n\n${see(CORE_RULE)}`,
  }),
  transport({
    name: 'Veículo voador',
    page: 125,
    transportClass: 'vehicle',
    medium: 'air',
    cost: 8000,
    passengers: 20,
    approximate: true,
    distance: [3, null, null],
    summary:
      'Veículo genérico que voa: 8.000z, leva cerca de vinte pessoas e triplica a distância de um dia de Viagem.',
    body: `Leva cerca de **vinte** pessoas e multiplica por **×3** a distância de um dia de Viagem. Viaja pelo céu.\n\n${see(CORE_RULE)}`,
  }),
];

/** Atlas Techno Fantasy, p. 79: the space Transports. */
const transportsTechnoFantasy: Transport[] = [
  transport({
    name: 'Montaria interplanetária',
    page: 79,
    transportClass: 'mount',
    medium: 'interplanetary',
    cost: 3000,
    passengers: 6,
    approximate: true,
    distance: [3, 1, null],
    summary:
      'Montaria espacial entre planetas: 3.000z, leva cerca de seis pessoas, ×3 no planeta e ×1 entre planetas.',
    body: `Leva cerca de **seis** pessoas. Distância: **×3** em viagem planetária, **×1** em interplanetária; não faz viagem interestelar.\n\n${see(SPACE_RULE)}`,
  }),
  transport({
    name: 'Montaria interestelar',
    page: 79,
    transportClass: 'mount',
    medium: 'interstellar',
    cost: 6000,
    passengers: 10,
    approximate: true,
    distance: [3, 2, 1],
    summary:
      'Montaria espacial entre estrelas: 6.000z, leva cerca de dez pessoas, ×3 / ×2 / ×1 nas três escalas.',
    body: `Leva cerca de **dez** pessoas. Distância: **×3** em viagem planetária, **×2** em interplanetária e **×1** em interestelar.\n\n${see(SPACE_RULE)}`,
  }),
  transport({
    name: 'Veículo interplanetário',
    page: 79,
    transportClass: 'vehicle',
    medium: 'interplanetary',
    cost: 15000,
    passengers: 20,
    approximate: true,
    distance: [3, 1, null],
    summary:
      'Veículo espacial entre planetas: 15.000z, leva cerca de vinte pessoas, ×3 no planeta e ×1 entre planetas.',
    body: `Leva cerca de **vinte** pessoas. Distância: **×3** em viagem planetária, **×1** em interplanetária; não faz viagem interestelar.\n\n${see(SPACE_RULE)}`,
  }),
  transport({
    name: 'Veículo planetário',
    page: 79,
    transportClass: 'vehicle',
    medium: 'planetary',
    cost: 20000,
    passengers: 50,
    approximate: true,
    distance: [4, 2, 1],
    summary:
      'Veículo espacial de grande porte: 20.000z, leva cerca de cinquenta pessoas, ×4 / ×2 / ×1 nas três escalas.',
    body: `Leva cerca de **cinquenta** pessoas. Distância: **×4** em viagem planetária, **×2** em interplanetária e **×1** em interestelar.\n\n${see(SPACE_RULE)}`,
  }),
];

/** Livro Básico, p. 124-125: Services and Transports, with their shared rules. */
export const servicesAndTransport: SeedEntry[] = [
  rule(
    'Serviços e Transporte',
    124,
    'Preços de orientação para hospedagem, recarga de PI, passagens e para comprar montarias e veículos genéricos, que levam um número de passageiros e multiplicam a distância de um dia de Viagem.',
    `Preço e disponibilidade de animais, veículos, hospedagem e afins mudam de mundo para mundo. As listas abaixo são uma **orientação para o mestre** fixar os preços. Todos os valores estão em zênites (z).

## Serviços

Um **serviço** se paga e não se guarda: o dinheiro compra um favor por uma noite, um dia ou uma recarga.

- **Serviços de vila:** [[recarga-de-pi]] (10z) e o descanso de uma noite numa aldeia, numa vila ou numa cidade ([[descanso-aldeia]], [[descanso-vila]], [[descanso-cidade]]).
- **Serviços de Viagem:** a passagem de uma pessoa por um dia de Viagem, por terra, água ou ar ([[viagem-terrestre]], [[viagem-aquatica]], [[viagem-aerea]]).

## Transportes

A lista traz versões **genéricas** de montarias, carros, embarcações, aeronaves e afins. Cada transporte leva um número de passageiros e **multiplica a distância** percorrida em um dia de Viagem.

${transportTable(transports, (d) => scale(d.planetary))}

## Como usar

- Transportes **terrestres** só viajam por terra; **aquáticos**, só pela superfície; **submarinos**, pela superfície e pelas profundezas; **voadores**, pelo céu.
- Num veículo movido a tração animal, o custo dos animais já está **incluso** no preço.
- Não é preciso comprar ração nem combustível.
- Uma montaria comprada assim **não tem estatísticas e não luta**. Para montar uma criatura em batalha, veja o poder [[companheiro-fiel]] do Andarilho.`,
    ['dinheiro', 'viagem', 'transporte'],
  ),

  service({
    name: 'Recarga de PI',
    page: 125,
    cost: 10,
    group: 'settlement',
    summary: 'Por 10z, um personagem recupera 1 PI.',
    body: `Pague **10z** e um personagem recupera **1 PI** (Pontos de Inventário).\n\n${see(CORE_RULE)}`,
  }),
  service({
    name: 'Descanso (aldeia)',
    page: 125,
    cost: 5,
    group: 'settlement',
    summary: 'Por 5z, uma pessoa descansa uma noite numa aldeia.',
    body: `Pague **5z** para uma pessoa descansar por uma noite numa aldeia.\n\n${see(CORE_RULE)}`,
  }),
  service({
    name: 'Descanso (vila)',
    page: 125,
    cost: 10,
    group: 'settlement',
    summary: 'Por 10z, uma pessoa descansa uma noite numa vila.',
    body: `Pague **10z** para uma pessoa descansar por uma noite numa vila.\n\n${see(CORE_RULE)}`,
  }),
  service({
    name: 'Descanso (cidade)',
    page: 125,
    cost: 20,
    group: 'settlement',
    summary: 'Por 20z, uma pessoa descansa uma noite numa cidade.',
    body: `Pague **20z** para uma pessoa descansar por uma noite numa cidade.\n\n${see(CORE_RULE)}`,
  }),
  service({
    name: 'Viagem terrestre',
    page: 125,
    cost: 10,
    group: 'travel',
    medium: 'land',
    summary: 'Por 10z, uma pessoa viaja por terra durante um dia.',
    body: `Pague **10z** para uma pessoa viajar por **terra** durante um dia.\n\n${see(CORE_RULE)}`,
  }),
  service({
    name: 'Viagem aquática',
    page: 125,
    cost: 20,
    group: 'travel',
    medium: 'water',
    summary: 'Por 20z, uma pessoa viaja pela água durante um dia.',
    body: `Pague **20z** para uma pessoa viajar pela **água** durante um dia.\n\n${see(CORE_RULE)}`,
  }),
  service({
    name: 'Viagem aérea',
    page: 125,
    cost: 40,
    group: 'travel',
    medium: 'air',
    summary: 'Por 40z, uma pessoa viaja pelo ar durante um dia.',
    body: `Pague **40z** para uma pessoa viajar pelo **ar** durante um dia.\n\n${see(CORE_RULE)}`,
  }),

  ...transports,
];

/** Atlas Techno Fantasy, p. 79: space travel (wrapped with `inBook` in the index). */
export const servicesAndTransportTechnoFantasy: SeedEntry[] = [
  rule(
    'Serviços e Transporte (viagem espacial)',
    79,
    'Serviços e transportes para campanhas com viagem espacial. A coluna de distância traz três multiplicadores de dias de Viagem, para viagens planetárias, interplanetárias e interestelares.',
    `Se a campanha precisar de **viagem espacial**, use os serviços e transportes abaixo junto com os de [[${CORE_RULE}]]. Os preços valem as mesmas regras (zênites, passageiros e distância).

## Escala do mapa e propulsão

- Uma campanha de *space opera* pode usar só mapas de escala **interplanetária**: cada planeta é um único local, e a viagem **interestelar** acontece por "saltos instantâneos" entre antigos portais de origem desconhecida.
- A tecnologia de propulsão é decisiva para o cenário. Pode ser um combustível raro, monólitos alienígenas que ligam regiões da galáxia, distorções do espaço-tempo criadas com entropismo ou até "saltos" por dimensões paralelas, psíquicas ou espirituais.

## Distância

A coluna de distância mostra **três multiplicadores** de dias de Viagem, nesta ordem: viagem **planetária** / **interplanetária** / **interestelar**. Um traço (-) quer dizer que o transporte não faz aquela viagem.

${transportTable(transportsTechnoFantasy, (d) => [d.planetary, d.interplanetary, d.interstellar].map(scale).join(' / '))}

Os serviços são [[viagem-interplanetaria]] (60z por dia) e [[viagem-interestelar]] (100z por dia).`,
    ['dinheiro', 'viagem', 'transporte', 'espaço'],
  ),

  service({
    name: 'Viagem interplanetária',
    page: 79,
    cost: 60,
    group: 'travel',
    medium: 'interplanetary',
    summary: 'Por 60z, uma pessoa viaja entre planetas durante um dia.',
    body: `Pague **60z** para uma pessoa viajar entre **planetas** durante um dia.\n\n${see(SPACE_RULE)}`,
  }),
  service({
    name: 'Viagem interestelar',
    page: 79,
    cost: 100,
    group: 'travel',
    medium: 'interstellar',
    summary: 'Por 100z, uma pessoa viaja entre estrelas durante um dia.',
    body: `Pague **100z** para uma pessoa viajar entre **sistemas estelares** durante um dia.\n\n${see(SPACE_RULE)}`,
  }),

  ...transportsTechnoFantasy,
];
