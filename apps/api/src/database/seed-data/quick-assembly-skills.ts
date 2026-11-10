import type { AssemblySlot, Role, RoleSkill } from '../../entries/entry-types';

/**
 * The Role Skills and customizations of Quick Assembly (Bestiary Vol. I, English,
 * printed p. 30-53), in our own words. Spells ("learns N spells from…") come in a
 * later step. Names that the book does not give (a Skill that only changes a basic
 * attack, say) are ours, and unofficial like every other term from this book.
 * Keep this file importing only types.
 */

const DAMAGE_PT: [string, string][] = [
  ['physical', 'físico'],
  ['air', 'ar'],
  ['bolt', 'raio'],
  ['dark', 'trevas'],
  ['earth', 'terra'],
  ['fire', 'fogo'],
  ['ice', 'gelo'],
  ['light', 'luz'],
  ['poison', 'veneno'],
];

/** "dano do tipo {id}": a damage type picked by the Reader. */
const damage = (id: string, count = 1, min?: number): AssemblySlot => ({
  id,
  label: count === 1 ? 'Tipo de dano' : 'Tipos de dano',
  count,
  ...(min !== undefined && { min }),
  options: DAMAGE_PT.map(([value, label]) => ({ value, label })),
});

const STATUS_PT: [string, string][] = [
  ['dazed', 'atordoado'],
  ['enraged', 'enfurecido'],
  ['poisoned', 'envenenado'],
  ['shaken', 'abalado'],
  ['slow', 'lento'],
  ['weak', 'fraco'],
];

const status = (
  id: string,
  count = 1,
  only?: string[],
  label = count === 1 ? 'Condição' : 'Condições',
): AssemblySlot => ({
  id,
  label,
  count,
  options: STATUS_PT.filter(([value]) => !only || only.includes(value)).map(
    ([value, text]) => ({ value, label: text }),
  ),
});

const pick = (
  id: string,
  label: string,
  options: [string, string][],
  count = 1,
  min?: number,
): AssemblySlot => ({
  id,
  label,
  count,
  ...(min !== undefined && { min }),
  options: options.map(([value, text]) => ({ value, label: text })),
});

const ATTRIBUTES_PT: [string, string][] = [
  ['DES', 'Destreza'],
  ['AST', 'Astúcia'],
  ['VIG', 'Vigor'],
  ['VON', 'Vontade'],
];

const ELITE_UP: RoleSkill['ranks'] = ['elite', 'champion'];

const rule = (
  id: string,
  name: string,
  text: string,
  extra: Partial<RoleSkill> = {},
): RoleSkill => ({ id, name, effects: [{ to: 'rule', text }], ...extra });

const action = (
  id: string,
  name: string,
  text: string,
  extra: Partial<RoleSkill> = {},
): RoleSkill => ({ id, name, effects: [{ to: 'action', text }], ...extra });

const onAttack = (
  id: string,
  name: string,
  to: 'normal' | 'strong',
  text: string,
  extra: Partial<RoleSkill> = {},
): RoleSkill => ({ id, name, effects: [{ to, text }], ...extra });

// ---- Shared by several Roles ----

const normalMultiple = (extra: Partial<RoleSkill> = {}) =>
  onAttack(
    'normal-multi',
    'Ataque normal múltiplo',
    'normal',
    'O ataque tem multi (2).',
    extra,
  );

const normalMagicDefense = onAttack(
  'normal-magic-defense',
  'Ataque normal contra Defesa Mágica',
  'normal',
  'Atinge a Defesa Mágica em vez da Defesa.',
);

const strongMagicDefense = onAttack(
  'strong-magic-defense',
  'Ataque forte contra Defesa Mágica',
  'strong',
  'Atinge a Defesa Mágica em vez da Defesa.',
);

const statusImmunity = (only: string[]) =>
  rule(
    'immunity',
    'Imunidade a condições',
    'Imune às condições {conditions}.',
    { slots: [status('conditions', 2, only)] },
  );

const normalMp = onAttack(
  'normal-mp',
  'Recuperação de PM no ataque',
  'normal',
  'Quando o ataque acerta um ou mais alvos, o NPC recupera 10 PM (20 PM se for de nível 30 ou mais).',
);

const collateralDamage = rule(
  'collateral-damage',
  'Dano Colateral',
  'Quando o NPC faz com sucesso a ação Impedimento, também pode causar 10 de dano do tipo {type} ao alvo (20 se o NPC for de nível 30 ou mais).',
  { slots: [damage('type')] },
);

const vulnerabilityBlock = rule(
  'vulnerability-block',
  'Bloqueio de Vulnerabilidade',
  'Escolha uma Vulnerabilidade de um aliado elite ou campeão: enquanto o NPC estiver na cena, essa Vulnerabilidade é substituída por uma Resistência.',
);

// ---- Brute ----

const brute = {
  extra: 'hp' as const,
  skills: [
    statusImmunity(['poisoned', 'shaken', 'slow']),
    normalMagicDefense,
    {
      id: 'ranged-strong',
      name: 'Ataque forte à distância',
      effects: [
        {
          to: 'strong',
          text: 'Cada alvo atingido sofre a condição {condition}.',
          patch: { range: 'ranged', accuracy: 'DES + VIG' },
        },
      ],
      slots: [status('condition', 1, ['dazed', 'shaken', 'slow', 'weak'])],
    } satisfies RoleSkill,
    rule(
      'collapse',
      'Relógio de Colapso',
      'Quando o ataque forte erra todos os alvos, preenche 1 seção de um relógio de seis seções chamado "Colapso". Se o relógio ficar cheio, o NPC perde este poder e cada criatura presente na cena sofre uma quantidade pequena ({minor}) de dano do tipo {type}.',
      { ranks: ELITE_UP, slots: [damage('type')] },
    ),
    rule(
      'enhancing-guard',
      'Guarda Reforçada',
      'Depois de fazer a ação Guarda, o NPC usa a primeira ação disponível do turno seguinte para fazer o {attack}; esse ataque causa 5 de dano adicional e ignora Resistências.',
      {
        slots: [
          pick('attack', 'Ataque', [
            ['normal', 'ataque normal'],
            ['strong', 'ataque forte'],
          ]),
        ],
      },
    ),
    {
      id: 'crush',
      name: 'Esmagar',
      effects: [
        {
          to: 'action',
          text: 'Gasta uma ação para fazer cada inimigo que estiver envolvendo perder 20 PV (30 PV se o NPC for de nível 30 ou mais).',
        },
        {
          to: 'strong',
          text: 'As criaturas atingidas ficam envolvidas até o NPC usar o ataque forte de novo ou sofrer dano de um tipo a que seja Vulnerável.',
        },
      ],
    } satisfies RoleSkill,
    rule(
      'sore-loser',
      'Mau Perdedor',
      'Depois de falhar em um teste oposto durante o turno de um inimigo, se esse inimigo encheu ou apagou 2 ou mais seções de um Relógio com o teste, ele sofre a condição {condition}.',
      {
        slots: [status('condition', 1, ['dazed', 'shaken', 'slow', 'weak'])],
      },
    ),
    rule(
      'steady-recovery',
      'Recuperação Constante',
      'No fim de cada turno do NPC, se ele sofrer três ou mais condições, recupera-se de todas.',
    ),
  ],
  customizations: [
    rule(
      'bad-temper',
      'Mau Humor',
      'Enquanto estiver em crise, o NPC {benefit}.',
      {
        slots: [
          pick('benefit', 'Benefício', [
            ['immune', 'é imune a todas as condições, exceto enfurecido'],
            ['damage', 'causa 5 de dano adicional com o ataque normal'],
          ]),
        ],
      },
    ),
    collateralDamage,
    rule(
      'die-hard',
      'Vida Dura',
      'Na primeira vez em uma cena que o NPC for reduzido a 0 PV, ele fica com exatamente 1 PV.',
    ),
    rule(
      'special-armor',
      'Armadura Especial',
      'Enquanto não estiver em crise, o NPC reduz em 5 todo dano que sofre de {source} (antes das Afinidades).',
      {
        slots: [
          pick('source', 'Fonte do dano', [
            ['attacks', 'ataques'],
            ['spells', 'feitiços'],
            ['skills', 'poderes'],
          ]),
        ],
      },
    ),
    rule(
      'vengeful-attack',
      'Ataque Vingativo',
      'Quando um inimigo reduz o NPC a 0 PV, o NPC faz imediatamente um ataque forte livre contra ele, tratando a rolagem alta do teste de Precisão como 0 para o dano.',
    ),
  ],
};

// ---- Hunter ----

const hunter = {
  extra: 'skill' as const,
  skills: [
    normalMagicDefense,
    {
      id: 'strong-attack',
      name: 'Ataque forte',
      effects: [],
      addsAttack: {
        id: 'strong' as const,
        name: 'Ataque Forte',
        ranges: ['melee', 'ranged'] as ('melee' | 'ranged')[],
        accuracies: ['DES + AST', 'DES + VIG'],
        damage: 15,
        effect:
          'O ataque tem multi (2). Depois de resolvido, acertando ou não, o NPC não pode fazer ações nem ataques livres até o fim do próximo turno dele.',
      },
    } satisfies RoleSkill,
    strongMagicDefense,
    rule(
      'ambush',
      'Emboscada',
      'Durante a primeira rodada de cada conflito, o NPC trata o dado de {attribute} como um passo maior (máximo d12).',
      {
        slots: [
          pick('attribute', 'Atributo', [
            ['DES', 'Destreza'],
            ['AST', 'Astúcia'],
            ['VON', 'Vontade'],
          ]),
        ],
      },
    ),
    rule(
      'elusive',
      'Esquivo',
      'Enquanto não sofrer nenhuma condição, nenhuma fonte de dano causa dano a ele.',
    ),
    rule(
      'hunters-bait',
      'Isca do Caçador',
      'Depois que um inimigo acerta ou erra o NPC com {source}, se o resultado do teste de Precisão ou de Magia for um número par, o NPC faz um ataque livre com o ataque normal contra esse inimigo (depois de resolvido o ataque ou feitiço), tratando a rolagem alta do teste de Precisão como 0 para o dano.',
      {
        slots: [
          pick('source', 'Ataque do inimigo', [
            ['melee', 'um ataque corpo a corpo'],
            ['ranged', 'um ataque à distância'],
            ['spell', 'um feitiço ofensivo'],
          ]),
        ],
      },
    ),
    rule(
      'opportunist',
      'Oportunista',
      'Quando o NPC faz um teste oposto contra uma criatura atordoada e/ou lenta, o teste é um sucesso crítico se os dois dados mostrarem o mesmo número (e o resultado não for uma falha crítica).',
    ),
    rule(
      'target-lock',
      'Mira Fixa',
      'Ao fazer a ação Guarda, o NPC fixa a mira em um inimigo aleatório que consiga ver, até o fim do próximo turno dele. Se fizer o ataque normal enquanto estiver com a mira fixa, deve mirar esse inimigo, se puder; nesse caso o ataque causa 10 de dano adicional e a mira se desfaz (mesmo que o ataque erre).',
    ),
  ],
  customizations: [
    rule(
      'emergency-camouflage',
      'Camuflagem de Emergência',
      'Na primeira vez em uma cena que o NPC entrar em crise, fica invisível para todos os inimigos até o início do próximo turno dele.',
    ),
    rule(
      'false-sense-of-security',
      'Falsa Sensação de Segurança',
      'Quando um aliado falha em um teste oposto ou erra todos os alvos com um ataque ou feitiço ofensivo, o NPC recebe +3 no próximo teste que fizer na cena. O benefício não acumula.',
    ),
    rule(
      'lightning-fast',
      'Rápido como um Raio',
      'Quando o NPC causa dano durante o turno de outra criatura, causa 5 de dano adicional, a menos que sofra alguma condição.',
    ),
    rule(
      'special-resistance',
      'Resistência Especial',
      'O NPC fica Resistente a todos os tipos de dano vindos de fontes que causam dano a {targets}.',
      {
        slots: [
          pick('targets', 'Fontes que causam dano a', [
            ['one', 'exatamente uma criatura'],
            ['many', 'duas ou mais criaturas'],
          ]),
        ],
      },
    ),
  ],
};

// ---- Mage ----

const mage = {
  extra: 'immunity' as const,
  skills: [
    statusImmunity(['dazed', 'enraged', 'poisoned', 'shaken']),
    {
      id: 'resist-two',
      name: 'Resistência a dois tipos de dano',
      effects: [],
      resistances: 2,
      notPhysical: true,
    } satisfies RoleSkill,
    normalMp,
    onAttack(
      'volatile',
      'Alvos voláteis',
      'normal',
      'Quando o ataque faz um ou mais inimigos perderem PV, eles ficam voláteis: o dano causado a uma criatura volátil ignora Resistências. A criatura deixa de ser volátil ao recuperar qualquer quantidade de PV ou no fim da cena.',
    ),
    rule(
      'element-drain',
      'Dreno Elemental',
      'Quando o NPC sofre dano, se ele tiver um tipo e esse tipo não for físico nem veneno, o NPC recupera PM iguais à metade do dano sofrido.',
    ),
    rule(
      'element-shift',
      'Mudança Elemental',
      'Quando o NPC lança um feitiço que causa dano de ar, raio, trevas, terra, fogo, gelo ou luz, passa a Absorver esse tipo e fica Vulnerável a outro tipo que seja intuitivamente eficaz contra ele (sugestão, respectivamente: raio, terra, luz, ar, gelo, fogo ou trevas). Essas Afinidades substituem as base do NPC para esses tipos e duram até o fim da cena ou até a regra ser ativada de novo.',
    ),
    rule(
      'magical-mastery',
      'Maestria Mágica',
      'Quando o NPC tem sucesso em um teste oposto ligado à magia ou a forças sobrenaturais, se o teste permitir preencher ou apagar seções de um Relógio, ele pode preencher ou apagar 1 seção adicional.',
    ),
  ],
  customizations: [
    collateralDamage,
    rule(
      'overwhelm',
      'Sobrepujar',
      'Quando o NPC faz um teste oposto contra uma criatura abalada e/ou fraca, o teste é um sucesso crítico se os dois dados mostrarem o mesmo número (e o resultado não for uma falha crítica).',
    ),
    rule(
      'soulburst',
      'Explosão da Alma',
      'Quando o NPC se rende ou é forçado a sair da cena, toda outra criatura presente na cena recupera uma quantidade grande ({heavy}) de PM.',
    ),
  ],
};

// ---- Saboteur ----

const saboteur = {
  extra: 'skill' as const,
  skills: [
    normalMultiple(),
    normalMagicDefense,
    {
      id: 'strong-attack',
      name: 'Ataque forte',
      effects: [],
      addsAttack: {
        id: 'strong' as const,
        name: 'Ataque Forte',
        ranges: ['melee', 'ranged'] as ('melee' | 'ranged')[],
        accuracies: ['DES + AST'],
        damage: 5,
        effect: 'O alvo {effects} até o fim do próximo turno dele.',
        slots: [
          pick(
            'effects',
            'Efeitos no alvo',
            [
              ['hp', 'não pode recuperar PV'],
              ['mp', 'não pode recuperar PM'],
              ['action', 'não pode fazer um tipo de ação à escolha do mestre'],
              ['free', 'não pode fazer ataques livres'],
              ['npc', 'não consegue ver o NPC'],
              ['allies', 'não consegue ver os aliados do NPC'],
              [
                'affinities',
                'perde todas as Resistências e Imunidades e não pode ganhá-las',
              ],
            ],
            2,
            1,
          ),
        ],
      },
    } satisfies RoleSkill,
    strongMagicDefense,
    action(
      'cruel-hypnosis',
      'Hipnose Cruel',
      'Gasta uma ação e 20 PM para escolher um inimigo que consiga ver e que esteja {condition}. Esse inimigo deve fazer imediatamente um ataque livre com a arma equipada ou um ataque básico, contra um alvo escolhido pelo NPC.',
      {
        ranks: ELITE_UP,
        slots: [status('condition', 1, ['dazed', 'enraged', 'shaken'])],
      },
    ),
    rule(
      'secret-technique',
      'Técnica Secreta',
      'Escolha um dos ataques básicos ou feitiços do NPC: ele pode fazê-lo sem que ninguém além dos alvos perceba o que foi (em geral disfarçado de comentário cortante, movimento elaborado ou truque inofensivo).',
    ),
    rule(
      'parting-gift',
      'Presente de Despedida',
      'Depois que o NPC chega a 0 PV ou é forçado a sair da cena, cada inimigo afetado por um feitiço Enfraquecer lançado por ele perde uma quantidade pequena ({minor}) de PV.',
      { ranks: ['soldier', 'elite'] },
    ),
    rule(
      'shadow-of-doubt',
      'Sombra da Dúvida',
      'Enquanto o NPC estiver na cena, qualquer PJ que sofra duas ou mais condições não pode evocar Traços e Laços.',
    ),
  ],
  customizations: [
    rule(
      'aura-of-unease',
      'Aura de Mal-estar',
      'Enquanto o NPC estiver na cena, os inimigos não podem se recuperar de {conditions}.',
      { slots: [status('conditions', 2)] },
    ),
    rule(
      'entangle',
      'Emaranhar',
      'Enquanto o NPC estiver na cena, os inimigos que sofram duas ou mais condições não podem fazer ataques livres.',
    ),
    rule(
      'exhausting-compromise',
      'Concessão Exaustiva',
      'Depois que o NPC falha em um teste oposto durante o turno de um inimigo, se esse inimigo sofrer duas ou mais condições, o NPC pode gastar 20 PM para preencher ou apagar 1 seção de um Relógio à escolha dele.',
    ),
    rule(
      'hindering-specialist',
      'Especialista em Impedimentos',
      'Uma vez por turno, depois de ter sucesso em um teste da ação Impedimento, o NPC pode fazer imediatamente outra ação Impedimento de graça.',
    ),
    rule(
      'syphon-mind',
      'Sugar a Mente',
      'Enquanto o NPC estiver na cena, todos os custos de PM dos inimigos aumentam em 5.',
    ),
  ],
};

// ---- Sentinel ----

const sentinel = {
  extra: 'skill' as const,
  skills: [
    {
      id: 'resist-two',
      name: 'Resistência a dois tipos de dano',
      effects: [],
      resistances: 2,
    } satisfies RoleSkill,
    normalMultiple({ ranks: ELITE_UP }),
    onAttack(
      'normal-ignores-resistances',
      'Ataque normal ignora Resistências',
      'normal',
      'O dano do ataque ignora Resistências.',
    ),
    onAttack(
      'spell-breaker',
      'Quebra de Feitiços',
      'strong',
      'Quando um inimigo é atingido pelo ataque, se ele estiver {condition}, deixa de ser afetado por quaisquer feitiços de duração Cena que o estivessem afetando.',
      {
        slots: [status('condition', 1, ['dazed', 'shaken', 'slow', 'weak'])],
      },
    ),
    action(
      'barricade',
      'Barricada',
      'Gasta uma ação e 10 PM para que ele e todos os seus aliados fiquem Resistentes a dano do tipo {types}. O benefício dura até o fim da cena ou até o NPC sofrer dano de um tipo a que seja Vulnerável.',
      { slots: [damage('types', 2, 1)] },
    ),
    rule(
      'avenge',
      'Vingança',
      'Depois que um inimigo acerta você e/ou um ou mais aliados com {sources}, o NPC faz um ataque livre com o ataque forte contra esse inimigo (depois de resolvido o ataque ou feitiço), tratando a rolagem alta do teste de Precisão como 0 para o dano.',
      {
        ranks: ELITE_UP,
        slots: [
          pick(
            'sources',
            'Ataques do inimigo',
            [
              ['melee', 'um ataque corpo a corpo'],
              ['ranged', 'um ataque à distância'],
              ['spell', 'um feitiço ofensivo'],
            ],
            2,
            1,
          ),
        ],
      },
    ),
    rule(
      'reassuring-aura',
      'Aura Tranquilizadora',
      'Os aliados do NPC que consigam vê-lo e/ou ouvi-lo são imunes à condição {condition}.',
      {
        slots: [status('condition', 1, ['dazed', 'shaken', 'slow', 'weak'])],
      },
    ),
    rule(
      'reduce-progress',
      'Reduzir Progresso',
      'Quando um inimigo do NPC enche ou apaga 2 ou mais seções de um Relógio, se o NPC não estiver sofrendo nenhuma das condições {conditions}, esse inimigo enche ou apaga 1 seção a menos (mínimo de 1).',
      { slots: [status('conditions', 2)] },
    ),
  ],
  customizations: [
    rule(
      'intercept',
      'Interceptar',
      'Idêntico ao poder Proteger do Guardião (Livro Básico, p. 203), mas com usos ilimitados e só pode proteger um aliado específico do NPC, escolhido no início da cena de conflito.',
    ),
    rule(
      'threaten',
      'Ameaçar',
      'Os inimigos devem incluir o NPC entre os alvos de seus ataques e feitiços ofensivos, se puderem. Quando o NPC sofre dano de um tipo a que seja Vulnerável, perde esta regra até o início do próximo turno dele.',
    ),
    vulnerabilityBlock,
    rule(
      'unwavering-support',
      'Apoio Inabalável',
      'Aliados vilões podem gastar Pontos de Ultima para evocar um dos Traços do NPC e rolar de novo os próprios testes. Quando um vilão faz isso, o teste dele é um sucesso crítico se os dois dados mostrarem o mesmo número (e não for uma falha crítica).',
    ),
  ],
};

// ---- Support ----

const ADVISE =
  'Gasta uma ação e 10 PM para escolher um aliado que consiga ouvi-lo. Esse aliado se recupera de atordoado e abalado e recebe +3 no primeiro teste que fizer antes do início do próximo turno do NPC.';
const INSPIRE =
  'Gasta uma ação e 10 PM para escolher um aliado que consiga ouvi-lo. Esse aliado recupera uma quantidade pequena ({minor}) de {resource} e trata o dado de {attribute} como um passo maior até o início do próximo turno do NPC (máximo d12).';
const inspireSlots = [
  pick('resource', 'Recupera', [
    ['hp', 'PV'],
    ['mp', 'PM'],
  ]),
  pick('attribute', 'Atributo', ATTRIBUTES_PT),
];

const support = {
  extra: 'skill' as const,
  skills: [
    normalMultiple(),
    normalMagicDefense,
    onAttack(
      'normal-condition',
      'Ataque normal com condição',
      'normal',
      'As criaturas atingidas sofrem a condição {condition}.',
      {
        slots: [status('condition', 1, ['dazed', 'shaken', 'slow', 'weak'])],
      },
    ),
    normalMp,
    {
      id: 'advise-and-inspire',
      name: 'Aconselhar e Inspirar',
      ranks: ['champion'],
      extraVulnerabilities: 1,
      slots: inspireSlots,
      effects: [
        { to: 'action', name: 'Aconselhar', text: ADVISE },
        { to: 'action', name: 'Inspirar', text: INSPIRE },
      ],
    } satisfies RoleSkill,
    rule(
      'advise-all',
      'Aconselhar aprimorado',
      'O poder Aconselhar passa a fazer o aliado escolhido se recuperar de todas as condições.',
    ),
    action(
      'strategic-command',
      'Comando Estratégico',
      'Gasta uma ação e 10 PM para escolher um aliado que consiga ouvi-lo e ainda tenha turnos a cumprir nesta rodada. Esse aliado faz o próximo turno dele imediatamente depois do turno do NPC; na primeira vez que causar dano nesse turno, causa 10 de dano adicional.',
    ),
    rule(
      'follow-up',
      'Ataque de Acompanhamento',
      'Uma vez por turno, depois que um aliado acerta um ou mais inimigos com um ataque, se esse aliado estiver afetado por um feitiço de duração Cena lançado pelo NPC, o NPC faz um ataque livre com o ataque normal contra um desses inimigos, escolhido ao acaso (depois de resolvido o ataque), tratando a rolagem alta como 0 para o dano.',
    ),
    rule(
      'healing-aura',
      'Aura Curativa',
      'No fim de cada turno do NPC, todo aliado presente na cena recupera uma quantidade pequena ({minor}) de PV.',
    ),
    rule(
      'mp-battery',
      'Bateria de PM',
      'Quando um aliado gasta PM, o NPC pode gastar PM no lugar dele (desde que tenha PM suficiente para pagar o custo inteiro).',
    ),
    rule(
      'last-command',
      'Última Ordem',
      'Depois que o NPC chega a 0 PV ou é forçado a sair da cena, se tiver os poderes Aconselhar, Inspirar e/ou Comando Estratégico, faz imediatamente um deles de graça, ignorando o custo de PM.',
    ),
  ],
  customizations: [
    action('advise', 'Aconselhar', ADVISE),
    action('inspire', 'Inspirar', INSPIRE, { slots: inspireSlots }),
    vulnerabilityBlock,
  ],
};

export const quickAssemblySkills: Record<
  Role,
  {
    extra: 'hp' | 'immunity' | 'skill';
    skills: RoleSkill[];
    customizations: RoleSkill[];
  }
> = { brute, hunter, mage, saboteur, sentinel, support };
