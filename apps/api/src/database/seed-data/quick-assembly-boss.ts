import type { RoleSkill } from '../../entries/entry-types';
import { damage, pick, status } from './assembly-slots';

/**
 * The Boss Skills of Quick Assembly (Bestiary Vol. I, English, printed p. 54-67), in
 * our own words, with the book's numbers. A champion takes them; a Negative Skill can
 * buy one for a soldier. Names are our translation and unofficial. Keep this file
 * importing only types and the slot helpers.
 */

export const bossGroups = [
  {
    id: 'battlefield',
    name: 'Campo de batalha',
    summary:
      'Efeitos permanentes que afetam a cena inteira: uma aura mágica, um perigo do ambiente, a natureza própria do campo de batalha.',
  },
  {
    id: 'control',
    name: 'Controle',
    summary:
      'Complicam as coisas negando ou punindo as ações dos heróis e dificultam executar estratégias.',
  },
  {
    id: 'destructive',
    name: 'Destrutivos',
    summary:
      'Acontecem sempre no último turno do chefe em cada rodada, para serem previsíveis, e liberam efeitos poderosos sobre todos os PJs. Garanta que o grupo tenha como mitigar ou evitar o efeito; senão ele parecerá maldade gratuita.',
  },
  {
    id: 'elemental',
    name: 'Elementais',
    summary:
      'Mexem com tipos de dano e Afinidades e evitam que o grupo explore sempre as mesmas Vulnerabilidades. Para versões mais fortes, conceda Absorções no lugar de Imunidades. Dê pistas claras do estado elemental do chefe (cor, aura, habilidades) e garanta que o grupo possa explorar as Vulnerabilidades.',
  },
  {
    id: 'objective',
    name: 'Objetivo',
    summary:
      'Dão ao chefe vantagem em conflitos baseados em Relógios ou em que a ação Objetivo e os testes opostos pesam.',
  },
  {
    id: 'summoner',
    name: 'Invocação',
    summary:
      'Para chefes que chegam ao conflito com dois ou mais aliados soldado e se coordenam com eles. Soldados invocados entram no fim da rodada atual, com PV e PM cheios e sem condições; havendo mais de um tipo de soldado, sorteie qual é invocado. Os efeitos nunca devem levar o total de turnos inimigos além do de uma batalha difícil.',
  },
  {
    id: 'survival',
    name: 'Sobrevivência',
    summary:
      'Tornam mais difícil derrotar o chefe diretamente, seja por ser mais difícil de acertar, seja por recuperar-se rápido.',
  },
];

const boss = (
  group: string,
  id: string,
  name: string,
  text: string,
  extra: Partial<RoleSkill> = {},
): RoleSkill => ({
  id,
  name,
  group,
  effects: [{ to: 'rule', text }],
  ...extra,
});

const STATUS4 = ['dazed', 'shaken', 'slow', 'weak'];
const ONE_TWO = (id: string, label: string, options: [string, string][]) =>
  pick(id, label, options, 3, 1);

const battlefield = [
  boss(
    'battlefield',
    'aura-of-suffering',
    'Aura de Sofrimento',
    'Todas as criaturas presentes na cena não podem se recuperar de {condition}, perdem qualquer imunidade prévia a essa condição e não podem ganhá-la.',
    { slots: [status('condition')] },
  ),
  boss(
    'battlefield',
    'life-and-death',
    'Vida e Morte',
    'Nas rodadas ímpares, todas as criaturas causam 5 de dano adicional; nas rodadas pares, todas as fontes de recuperação de PV restauram 10 PV adicionais.',
  ),
  boss(
    'battlefield',
    'near-and-far',
    'Perto e Longe',
    'Enquanto a cena durar, {option}.',
    {
      advice:
        'útil em batalhas entre dirigíveis, plataformas flutuantes e outras situações caóticas',
      slots: [
        pick('option', 'Opção', [
          [
            'melee',
            'as criaturas não podem ser alvo de ataques corpo a corpo nas rodadas ímpares',
          ],
          [
            'ranged',
            'as criaturas não podem ser alvo de ataques à distância nas rodadas pares',
          ],
          [
            'both',
            'as criaturas não podem ser alvo de ataques corpo a corpo nas rodadas ímpares nem de ataques à distância nas rodadas pares',
          ],
        ]),
      ],
    },
  ),
  boss(
    'battlefield',
    'zombification',
    'Zumbificação',
    'Quando uma criatura que não seja o chefe recupera PV, se ela estiver {condition}, perde metade desse tanto de PV em vez disso.',
    {
      advice: 'use só se os PJs conseguirem remover condições com eficiência',
      slots: [status('condition', 1, ['weak', 'poisoned'])],
    },
  ),
];

const ATTACK_OR_SPELL: [string, string][] = [
  ['attack', 'faz um ataque livre com o ataque normal'],
  [
    'spell',
    'lança um feitiço ofensivo específico, de custo total de até 10 PM',
  ],
];

const control = [
  boss(
    'control',
    'auto-counter',
    'Contra-ataque Automático',
    'Depois que um inimigo faz o chefe perder PV com uma ação, o chefe automaticamente {response} contra esse inimigo (depois de resolvida a ação dele). O ataque ou feitiço só pode mirar o inimigo que causou a perda de PV, e o chefe trata a rolagem alta como 0 para o dano.',
    { slots: [pick('response', 'Reação', ATTACK_OR_SPELL)] },
  ),
  boss(
    'control',
    'crisis-status',
    'Condição na Crise',
    'Na primeira vez em uma cena de conflito que o chefe entra em crise, todo inimigo presente na cena sofre a(s) condição(ões) {conditions}.',
    {
      slots: [
        pick(
          'conditions',
          'Condições',
          status('c', 6).options.map((o): [string, string] => [
            o.value,
            o.label,
          ]),
          2,
          1,
        ),
      ],
    },
  ),
  boss(
    'control',
    'mark-of-shared-pain',
    'Marca da Dor Compartilhada',
    'Quando {source} acerta um ou mais inimigos com {attack}, cada um desses inimigos fica marcado, até o fim da cena ou até recuperar qualquer quantidade de PV. Quando o chefe perde qualquer quantidade de PV, a perda é dividida o mais igualmente possível entre o chefe e todos os inimigos marcados presentes na cena (o que sobrar fica com o chefe); depois, todos deixam de estar marcados. Exemplo: se o chefe perde 46 PV e há dois inimigos marcados, cada um deles perde 15 PV e o chefe perde 16.',
    {
      slots: [
        pick('source', 'Quem marca', [
          ['boss', 'o chefe'],
          ['ally', 'um aliado do chefe'],
        ]),
        pick('attack', 'Com', [
          ['normal', 'um ataque normal'],
          ['spell', 'um feitiço ofensivo'],
        ]),
      ],
    },
  ),
  boss(
    'control',
    'observe-and-punish',
    'Observar e Punir',
    'Quando um inimigo que o chefe consiga ver {trigger}, esse inimigo passa a ser observado e qualquer inimigo observado antes deixa de ser. No primeiro turno do chefe em cada rodada depois da primeira, ele faz o ataque normal mirando só o inimigo observado (se puder). Se o ataque acertar, causa 10 de dano adicional e o inimigo sofre a condição {condition}.',
    {
      slots: [
        pick('trigger', 'Gatilho', [
          ['boss', 'causa dano ao chefe'],
          ['ally', 'causa dano a um aliado do chefe'],
          ['action', 'faz a ação Feitiço ou Poder'],
        ]),
        status('condition', 1, STATUS4),
      ],
    },
  ),
  boss(
    'control',
    'tyrants-decree',
    'Decreto do Tirano',
    'No primeiro turno do chefe em cada rodada, ele usa uma ação para proibir, ao acaso, um tipo de ação entre {actions}; os Jogadores devem ser avisados de qual está proibida, e a proibição dura até o fim da cena ou até o efeito disparar de novo. Depois que um inimigo faz uma ação proibida, o chefe automaticamente {response} contra esse inimigo (depois de resolvida a ação dele). O ataque ou feitiço só pode mirar o inimigo que fez a ação proibida, e o chefe trata a rolagem alta como 0 para o dano. Escolher mais ações torna o poder mais forte: guarde isso para quando os PJs forem mais capazes.',
    {
      advice:
        'bom para um chefe que impõe leis ou decretos mágicos, ou muito atento e preparado contra uma abordagem específica',
      slots: [
        ONE_TWO('actions', 'Ações proibíveis', [
          ['attack', 'Ataque'],
          ['guard', 'Guarda'],
          ['hinder', 'Impedimento'],
          ['inventory', 'Inventário'],
          ['objective', 'Objetivo'],
          ['spell', 'Feitiço'],
          ['skill', 'Poder'],
        ]),
        pick('response', 'Reação', [
          ['hinder', 'faz a ação Impedimento'],
          ...ATTACK_OR_SPELL,
        ]),
      ],
    },
  ),
  boss(
    'control',
    'you-just-proved-my-point',
    'Você Acabou de Provar Meu Ponto',
    'No início de cada rodada, o chefe escolhe ao acaso um tipo de Traço entre Identidade, Tema e Origem; esse tipo fica arriscado até o início da rodada seguinte. O mestre deve declarar que um tipo de Traço está arriscado, mas não revela qual. Quando um PJ evoca um Traço arriscado para rolar um teste de novo, em vez disso os dois dados passam a mostrar 1, gerando uma falha crítica.',
  ),
];

const TYPE_AND = (name: string) => `${name}`;
void TYPE_AND;

const destructive = [
  boss(
    'destructive',
    'catastrophe-charger',
    'Carregador de Catástrofe',
    'No último turno dele em cada rodada, o chefe usa uma ação para fazer cada aliado soldado presente na cena perder 30 PM; depois, ganha Pontos de Catástrofe iguais ao total de PM perdidos por eles. Por fim, se tiver 100 ou mais Pontos de Catástrofe, perde todos e causa uma quantidade grande ({heavy}) de dano do tipo {type} a cada inimigo presente na cena. Os inimigos que perdem PV assim também sofrem a condição {condition}.',
    {
      advice:
        'poder único, adequado a chefes que usam os aliados como baterias mágicas para uma explosão devastadora',
      slots: [damage('type'), status('condition', 1, STATUS4)],
    },
  ),
  boss(
    'destructive',
    'corrosive-status',
    'Condição Corrosiva',
    'No último turno dele em cada rodada, o chefe usa uma ação para causar uma quantidade pequena ({minor}) de dano do tipo {type} a cada inimigo presente na cena que esteja {condition}. Se o chefe for de nível 30 ou mais, a quantidade passa a ser grande ({heavy}).',
    {
      advice:
        'ótimo para chefes cruéis, calculistas, oportunistas ou venenosos',
      slots: [damage('type'), status('condition')],
    },
  ),
  boss(
    'destructive',
    'destructive-formation',
    'Formação Destrutiva',
    'No último turno dele em cada rodada, se houver dois ou mais aliados soldado na cena, o chefe usa uma ação para causar uma quantidade pequena ({minor}) de dano do tipo {type} a cada inimigo presente na cena. Se o chefe for de nível 30 ou mais, a quantidade passa a ser grande ({heavy}).',
    {
      advice:
        'excelente para um gênio tático, um líder ou uma mente coletiva de enxame',
      slots: [damage('type')],
    },
  ),
  {
    id: 'devastation',
    name: 'Devastação',
    group: 'destructive',
    advice:
      'bom para conjuradores poderosos, elementais e demônios; só para chefes de nível 30 ou mais',
    effects: [],
    spells: {
      from: [
        { kind: 'npc', id: 'devastation', name: 'Devastação', minLevel: 30 },
      ],
      options: [{ id: 'one', label: 'Devastação', count: 1, mp: 0 }],
    },
  } satisfies RoleSkill,
  boss(
    'destructive',
    'doom',
    'Condenação',
    'O chefe entra no conflito acompanhado de um Relógio da Condenação, de 6 seções. No último turno dele em cada rodada, o chefe usa uma ação para preencher automaticamente 1 seção do relógio (2 se estiver em crise). Depois, se o relógio estiver cheio, todo inimigo fica com exatamente 1 PV e o relógio sai da cena. Os Jogadores podem interagir com o relógio normalmente e adiar o golpe; se quiser, certos eventos (como o chefe sofrer dano de um tipo a que é Vulnerável) também apagam 1 seção.',
    {
      advice:
        'o mestre deve deixar claro que o Relógio da Condenação representa uma derrota provável',
    },
  ),
  boss(
    'destructive',
    'hellish-gamble',
    'Aposta Infernal',
    'No último turno dele em cada rodada par, o chefe usa uma ação e gasta 20 PM para liberar um poder imprevisível, causando uma quantidade grande ({heavy}) de dano do tipo {type} a uma criatura ao acaso presente na cena (incluindo o próprio chefe). O tipo escolhido deve ser um a que o chefe tenha Afinidade neutra, e a perda de PV causada por esse dano não pode reduzir ninguém abaixo de 1 PV.',
    { slots: [damage('type')] },
  ),
  boss(
    'destructive',
    'nihilo',
    'Nihilo',
    'No último turno dele em cada rodada par, o chefe usa uma ação e gasta 10 PM para encerrar todos os feitiços com duração Cena e todos os efeitos que duram "até o fim da cena" ou que terminam no início ou no fim do turno de uma criatura, dispensar à força todos os Arcanos e destruir todos os símbolos presentes na cena.',
  ),
];

const elemental = [
  boss(
    'elemental',
    'binary-elements',
    'Elementos Binários',
    'O chefe é um fluxo constante de opostos. Escolha até dois pares de tipos de dano: {pairs}. O chefe fica Imune a um tipo de cada par escolhido e Vulnerável ao outro; essas Afinidades substituem as que ele já tivesse para esses tipos. No fim de cada rodada, o chefe troca essas Afinidades.',
    {
      slots: [
        pick(
          'pairs',
          'Pares de tipos',
          [
            ['air-earth', 'ar e terra'],
            ['dark-light', 'trevas e luz'],
            ['fire-ice', 'fogo e gelo'],
          ],
          2,
          1,
        ),
      ],
    },
  ),
  boss(
    'elemental',
    'elemental-crisis',
    'Crise Elemental',
    'Na primeira vez em um conflito que o chefe entra em crise, as Afinidades dele a dano e/ou o tipo de dano de seus ataques, feitiços e poderes mudam até o fim da cena. Garanta que, depois da transformação, o chefe ainda tenha uma ou mais Vulnerabilidades que os PJs possam explorar.',
  ),
  boss(
    'elemental',
    'elemental-stance',
    'Postura Elemental',
    'Escolha de duas a cinco posturas: {stances}. Cada postura torna o chefe Imune ao tipo de dano dela e Vulnerável a outro (ar: vulnerável a raio; raio: a terra; trevas: a luz; terra: a ar; fogo: a gelo; gelo: a fogo; luz: a trevas). Gatilho de mudança: {trigger}. O chefe entra no conflito em uma postura à sua escolha e passa automaticamente a outra, seguindo um padrão, sempre que o gatilho ocorre; as Afinidades de uma postura substituem as que ele já tivesse para esses tipos. Complexidade extra: {twist}.',
    {
      advice:
        'excelente para chefes que dominam várias técnicas elementais; recomendado a partir do nível 30, quando o grupo derrete qualquer inimigo de Afinidades fixas',
      slots: [
        pick(
          'stances',
          'Posturas',
          [
            ['air', 'ar'],
            ['bolt', 'raio'],
            ['dark', 'trevas'],
            ['earth', 'terra'],
            ['fire', 'fogo'],
            ['ice', 'gelo'],
            ['light', 'luz'],
          ],
          5,
          2,
        ),
        pick('trigger', 'Gatilho de mudança', [
          [
            'attack',
            'depois que o chefe faz o ataque normal (resolvido o ataque)',
          ],
          ['guard', 'depois que o chefe faz a ação Guarda'],
          [
            'weak',
            'depois que o chefe perde PV por dano de um tipo a que é Vulnerável',
          ],
          ['round', 'no fim de cada rodada'],
        ]),
        pick('twist', 'Complexidade extra', [
          ['none', 'nenhum acréscimo'],
          [
            'random',
            'o chefe passa a uma postura sorteada em vez de seguir um padrão',
          ],
          ['crisis-trigger', 'em crise, usa outro gatilho'],
          ['crisis-extra', 'em crise, ganha um gatilho a mais'],
          [
            'benefit',
            'cada postura dá um benefício próprio (por exemplo, terra torna imune a todas as condições e luz faz o ataque normal causar atordoado)',
          ],
        ]),
      ],
    },
  ),
];

const objective = [
  boss(
    'objective',
    'attrition',
    'Desgaste',
    'Depois que o chefe falha em um teste oposto durante o turno de um inimigo, esse inimigo sofre a condição {condition}. Se já sofria essa condição, em vez disso {consequence}. As quantidades de PV ou PM perdidas dobram se o chefe for de nível 30 ou mais.',
    {
      slots: [
        status('condition', 1, STATUS4),
        pick('consequence', 'Se já sofria', [
          ['hp', 'perde 5 PV'],
          ['mp', 'perde 10 PM'],
          ['other', 'sofre outra condição entre as quatro'],
        ]),
      ],
    },
  ),
  boss(
    'objective',
    'countdown',
    'Contagem Regressiva',
    'O chefe entra no conflito acompanhado de um Relógio da Contagem Regressiva, de 6 seções. No fim de cada rodada, 1 seção é preenchida; se o relógio ficar cheio, o conflito termina na hora e o chefe alcança o objetivo. Só se pode interagir com o relógio para apagar seções e adiar a derrota; as seções só são preenchidas no fim da rodada, como descrito, ou por uma oportunidade.',
    {
      advice:
        'põe os Jogadores contra o relógio: o mestre deve explicar que a Contagem Regressiva é um limite estrito de rodadas',
    },
  ),
  boss(
    'objective',
    'cruel-twist',
    'Reviravolta Cruel',
    'Uma vez por cena de conflito, o chefe pode usar uma ação e gastar 2 Pontos de Ultima para trocar o número de seções preenchidas de dois Relógios diferentes. Se isso levar um Relógio a mais seções do que o máximo, ele apenas é completado e o excesso se perde.',
    {
      advice:
        'o chefe tem um plano secreto e está um passo à frente dos heróis',
    },
  ),
  boss(
    'objective',
    'crushing-advantage',
    'Vantagem Esmagadora',
    'Ao escolher este poder, defina um campo em que o chefe é um verdadeiro especialista: {field}. No último turno dele em cada rodada, o chefe gasta uma ação e 20 PM para preencher ou apagar automaticamente 2 seções de um Relógio à escolha dele ligado a esse campo. Se quiser, também pode gastar 1 Ponto de Ultima para preencher ou apagar uma seção a mais desse Relógio.',
    {
      slots: [
        pick('field', 'Campo de especialidade', [
          ['court', 'intriga da corte'],
          ['chase', 'perseguições nas ruas'],
          ['watch', 'vigilância'],
          ['tech', 'engenhocas tecnológicas'],
          ['magic', 'experimentos mágicos'],
          ['other', 'outro campo, à escolha do mestre'],
        ]),
      ],
    },
  ),
  boss(
    'objective',
    'i-know-you-well',
    'Eu Conheço Vocês',
    'Quando uma criatura faz um teste, o chefe pode gastar 1 Ponto de Ultima para evocar um Traço à sua escolha da ficha de um PJ e rolar de novo um ou os dois dados do teste. Quando um Traço de PJ é evocado assim, ele fica forçado até o fim da cena. No fim do turno de cada PJ, se os PM atuais dele forem iguais ou maiores que os PM máximos, todos os Traços forçados dele deixam de estar forçados. PJs não podem evocar Traços forçados; enquanto um PJ tiver um ou mais, todo dano que ele causa ignora Vulnerabilidades e todo dano que ele sofre ignora Resistências.',
    {
      advice:
        'o chefe é um inimigo recorrente ou reuniu muita informação sobre os heróis e os manipula com facilidade',
    },
  ),
  boss(
    'objective',
    'ruinous-influence',
    'Influência Ruinosa',
    'Depois que o chefe faz um teste oposto, pode gastar 2 Pontos de Ultima para fazer todos os dados rolados pelos inimigos que participaram do teste mostrarem 1, forçando cada um a gerar uma falha crítica (cada falha crítica dá uma oportunidade separada ao chefe). Não pode ser usado em um teste oposto em que um ou mais inimigos tiraram sucesso crítico.',
    { advice: 'o chefe tece o destino e a sorte contra os heróis' },
  ),
];

const summoner = [
  boss(
    'summoner',
    'call-reinforcements',
    'Chamar Reforços',
    'O chefe {version}.',
    {
      advice:
        'ótimo para comandantes, invocadores, necromantes e qualquer chefe que convoque hordas de lacaios',
      slots: [
        pick('version', 'Versão', [
          [
            'action',
            'pode usar uma ação e gastar 1 Ponto de Ultima para invocar até dois aliados soldado',
          ],
          [
            'auto',
            'invoca automaticamente, no fim de cada rodada e sem exigir uma ação, até um aliado soldado (versão mais forte)',
          ],
        ]),
      ],
    },
  ),
  boss(
    'summoner',
    'counter-summoning',
    'Contra-invocação',
    'No fim de cada turno, se o chefe perdeu PV durante ele, invoca um aliado soldado. Um chefe com este poder deve começar o conflito sem aliados.',
    {
      advice:
        'excelente para chefes que invocam criaturas mais fracas ao serem feridos, como lodos que se dividem ou chefes que carregam uma horda e "soltam" parte dela',
    },
  ),
  boss(
    'summoner',
    'emergency-reinforcements',
    'Reforços de Emergência',
    'No fim de cada rodada, se o chefe estiver em crise e restarem menos de dois aliados soldado na cena, {version}.',
    {
      advice:
        'útil para chefes que regeneram os membros ou chamam novos aliados em perigo',
      slots: [
        pick('version', 'Versão', [
          ['one', 'um aliado soldado se junta ao conflito'],
          [
            'two',
            'o chefe gasta 1 Ponto de Ultima e dois aliados soldado se juntam ao conflito (versão mais forte)',
          ],
        ]),
      ],
    },
  ),
  boss(
    'summoner',
    'part-regeneration',
    'Regeneração de Partes',
    'Na primeira vez em um conflito que o chefe entra em crise, ele e todos os aliados dele presentes na cena se recuperam de todas as condições, e então o chefe invoca soldados até o lado dele voltar à mesma composição que tinha no início da cena. Exemplo: se um chefe-cabeça que começou acompanhado de um braço direito, um braço esquerdo e uma cauda entra em crise com só o braço direito restante, ele invoca um braço esquerdo e uma cauda.',
    {
      advice:
        'reinício para chefes acompanhados de soldados que são partes do corpo deles',
    },
  ),
  boss(
    'summoner',
    'perfect-coordination',
    'Coordenação Perfeita',
    'Enquanto o chefe estiver na cena, os aliados soldado dele podem gastar Pontos de Ultima da reserva do chefe para evocar os Traços deles e rolar testes de novo.',
    {
      advice:
        'o chefe tem controle muito direto sobre seus lacaios (ou partes do corpo)',
    },
  ),
];

const survival = [
  boss(
    'survival',
    'adaptive-affinities',
    'Afinidades Adaptativas',
    'Depois que o chefe perde PV por dano, se o dano tinha um tipo, ele ganha Imunidade a esse tipo até este poder disparar de novo. Se o chefe for de nível 30 ou mais, escolha uma opção: {upgrade}.',
    {
      advice:
        'o chefe se adapta por instinto ao último tipo de dano que sofreu',
      slots: [
        pick('upgrade', 'Se for de nível 30 ou mais', [
          ['none', 'nenhuma (chefe abaixo do nível 30)'],
          ['absorb', 'o poder dá Absorção em vez de Imunidade'],
          [
            'lasts',
            'toda Imunidade ganha por este poder dura até ele disparar mais duas vezes (em vez de uma)',
          ],
        ]),
      ],
    },
  ),
  boss(
    'survival',
    'camouflage',
    'Camuflagem',
    'Nas rodadas pares, o chefe {form}.',
    {
      advice: 'o chefe pode desaparecer da vista por algum tempo',
      slots: [
        pick('form', 'Forma', [
          ['invisible', 'fica invisível'],
          ['melee', 'não pode ser alvo de ataques corpo a corpo'],
          [
            'ranged',
            'não pode ser alvo de feitiços nem de ataques à distância',
          ],
        ]),
      ],
    },
  ),
  boss(
    'survival',
    'catch-me-if-you-can',
    'Pegue-me se Puder',
    'O chefe entra no conflito acompanhado de um Relógio de Perseguição, em geral de {sections} seções. Os inimigos não conseguem ver o chefe a menos que metade ou mais das seções do relógio esteja preenchida, e uma ação específica do chefe pode apagar 1 seção.',
    {
      advice:
        'para batalhas durante uma perseguição ou em que o inimigo principal está protegido por barreiras ou fortificações',
      slots: [
        pick('sections', 'Seções do relógio', [
          ['8', '8'],
          ['10', '10'],
        ]),
      ],
    },
  ),
  boss(
    'survival',
    'defensive-stance',
    'Postura Defensiva',
    'Nas rodadas ímpares, o chefe sofre metade do dano de ataques; nas rodadas pares, sofre metade do dano de qualquer fonte que não seja um ataque. O dano é sempre dividido ao meio antes das Afinidades.',
    { advice: 'o chefe alterna entre duas posturas defensivas' },
  ),
  boss(
    'survival',
    'regeneration',
    'Regeneração',
    'No fim de cada rodada, se o chefe estiver em crise, ele recupera uma quantidade grande ({heavy}) de {resources}.',
    {
      advice:
        'o chefe recupera as forças depressa quando está perto de ser derrotado',
      slots: [
        pick(
          'resources',
          'Recupera',
          [
            ['hp', 'PV'],
            ['mp', 'PM'],
          ],
          2,
          1,
        ),
      ],
    },
  ),
  boss(
    'survival',
    'second-wind',
    'Segundo Fôlego',
    'Na primeira vez em uma cena que o chefe entra em crise, ele se recupera de todas as condições e recupera uma quantidade enorme ({massive}) de PM.',
    { advice: 'encurralado, o chefe reúne forças novas' },
  ),
  boss(
    'survival',
    'temporary-defenses',
    'Defesas Temporárias',
    'O chefe sempre trata a pontuação de {defense} como igual a (12 + o nível dele dividido por 20). Na primeira vez em uma cena que entra em crise, perde esse benefício e o ataque normal dele ganha multi (2); se já tinha multi (2), passa a ter multi (3).',
    {
      advice:
        'o chefe é protegido por uma armadura, escamas, barreira mágica ou campo de força excepcional; se ela for danificada o bastante, ele fica mais agressivo',
      slots: [
        pick('defense', 'Pontuação', [
          ['defense', 'Defesa'],
          ['magic', 'Defesa Mágica'],
        ]),
      ],
    },
  ),
  boss(
    'survival',
    'undo',
    'Desfazer',
    'Quando o chefe é reduzido a 0 PV, pode gastar 1 Ponto de Ultima para, em vez disso, fazer toda criatura presente na cena (inclusive ele) recuperar uma quantidade enorme ({massive}) de PV e de PM.',
    {
      advice:
        'ao ser derrotado, o chefe pode rebobinar parte do tempo no campo de batalha inteiro',
    },
  ),
  boss(
    'survival',
    'vampiric-formation',
    'Formação Vampírica',
    'Quando o chefe faz um ou mais inimigos perderem PV, se houver dois ou mais aliados soldado dele na cena, ele recupera PV iguais à metade do total de PV perdidos por esses inimigos.',
    {
      advice:
        'uma energia vampírica se reúne quando o chefe está acompanhado de aliados e permite que ele drene a vida das vítimas',
    },
  ),
];

export const bossSkills: RoleSkill[] = [
  ...battlefield,
  ...control,
  ...destructive,
  ...elemental,
  ...objective,
  ...summoner,
  ...survival,
];
