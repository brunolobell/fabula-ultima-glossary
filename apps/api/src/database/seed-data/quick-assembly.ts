import {
  AttributeCode,
  Rank,
  Role,
  RoleSkill,
  SpeciesOption,
  SpeciesRule,
  SpellGrant,
} from '../../entries/entry-types';
import { rule } from './helpers';
import { quickAssemblyRoles, quickAssemblyRules } from './quick-assembly-data';
import { SeedEntry } from './types';

/** Bestiary Vol. I, printed pages (the PDF index is one higher). */
const ASSEMBLY = '/laboratorio-oroboros';

const ROLE_NAME: Record<Role, string> = {
  brute: 'Bruto',
  hunter: 'Caçador',
  mage: 'Mago',
  saboteur: 'Sabotador',
  sentinel: 'Sentinela',
  support: 'Apoio',
};

const ROLE_PAGE: Record<Role, number> = {
  brute: 30,
  hunter: 34,
  mage: 38,
  saboteur: 42,
  sentinel: 46,
  support: 50,
};

const ROLE_SUMMARY: Record<Role, string> = {
  brute:
    'Muitos PV, defesas baixas e ataques fortes; tem várias Vulnerabilidades e sofre com envenenado e fraco. É o contraponto simples aos inimigos complexos.',
  hunter:
    'Dano preciso, corpo a corpo ou à distância, quase sempre contra um único alvo: Precisão e Defesa altas, feitiços imprecisos e muita fraqueza a enfurecido e lento.',
  mage: 'Faz estragos com feitiços, em geral contra vários alvos: o maior potencial de dano, mas com poucos PV e dependente de PM.',
  saboteur:
    'Enfraquece os heróis com condições, perda de PM e negação de ações; fica mais perigoso contra quem já está debilitado.',
  sentinel:
    'Defende os outros e intercepta ataques: boa Defesa, Defesa Mágica e PV, mas dano médio. Quase nunca é enfrentado sozinho.',
  support:
    'Fortalece os aliados com cura, defesas melhores ou mais dano; é alvo prioritário e nunca deve ser enfrentado sozinho.',
};

const ROLE_BODY: Record<Role, string> = {
  brute:
    'O bruto tem PV de sobra, defesas fracas e ataques bem fortes. A ameaça vem do número bruto, mas ele tem várias Vulnerabilidades e é sensível às condições envenenado e fraco. Brilha ao lado de inimigos mais complexos, como sabotadores.\n\nUm bruto soldado é raro, porque soldados são feitos para cair depressa. O bruto elite é comum: aguenta alguns golpes sem ser chefe. O bruto campeão é o chefe clássico de videogame, uma luta de desgaste em que o grupo vai tirando PV enquanto administra recursos, mas as condições o atrapalham muito.\n\nBrutos costumam alternar ataque normal e ataque forte; um feitiço ou ação única fica para o fim da rotina. Não devem ter Defesa boa, nem Precisão e dano à altura de caçadores e magos.',
  hunter:
    'O caçador causa dano com ataques corpo a corpo ou à distância muito precisos, quase sempre contra um só alvo, e fica mais forte quando certas condições se cumprem. Tem Precisão e Defesa altas, mas feitiços imprecisos, e é muito suscetível a enfurecido e lento.\n\nO soldado caçador é o soldado típico: uma fonte de dano previsível, que explora condições deixadas por sabotadores ou sentinelas. O elite tem ataques em vários alvos, mira que melhora o ataque seguinte ou reações que punem estratégias. O campeão é o grande predador: implacável e esquivo, com a complexidade vinda dos poderes de chefe.\n\nCaçadores repetem o ataque normal e, se tiverem, intercalam um ataque forte, feitiço ou ação única. Não devem ter PV de bruto, Defesa Mágica de mago nem feitiços fortes.',
  mage: 'O mago devasta com feitiços e magia, muitas vezes contra vários inimigos de uma vez. Tem o maior potencial de dano de todas as funções, mas poucos PV e grande dependência de PM: o grupo prudente o neutraliza drenando PM.\n\nO mago soldado costuma ser a principal fonte de dano e pode representar uma parte de um inimigo maior, como o canhão de um robô gigante. O elite é a principal fonte de dano em área e combina com sentinelas e apoios. O campeão tem muito mais PM, mas costuma ser o campeão com menos PV e sofre com efeitos que drenam PM ou proíbem a ação Feitiço.\n\nMagos repetem uma rotina de feitiços e deixam o ataque normal para quando o PM acaba (elites e campeões o incluem na rotina). Não devem ter Defesa de sentinela.',
  saboteur:
    'O sabotador enfraquece os inimigos de muitas formas: condições, perda de PM e negação de ações. Falta-lhe o dano de magos e caçadores e a defesa de brutos e sentinelas, mas muitas habilidades dele ficam mais fortes contra alvos já debilitados. Um grupo que cura ou evita condições o neutraliza.\n\nSabotadores soldados afogam os heróis em condições e penalidades, e costumam ser liderados por um campeão. Os elites punem cada vez mais, protegidos por sentinelas ou apoios. O campeão é o chefe mais traiçoeiro do jogo: parece fraco no início, mas pune quem sofre condições, e pode até enfrentar o grupo sozinho.\n\nSabotadores usam cada ferramenta uma vez e recomeçam, deixando para o fim da rodada a ação que explora condições.',
  sentinel:
    'A sentinela defende os outros e intercepta ataques e tentativas de ganhar vantagem. Tem boa Defesa, Defesa Mágica e PV, mas dano médio; algumas contra-atacam e punem certas estratégias ou têm feitiços um pouco mais fortes que o ataque normal.\n\nA sentinela soldado acompanha criaturas mais importantes e dificulta chegar a elas, de modo que o grupo não derrube o alvo principal só com seus maiores danos. A elite luta ao lado de outro elite ou campeão e compra tempo para os aliados. A campeã, um cavaleiro ou comandante, lidera da frente e pune quem ataca os aliados frágeis; sozinha, quase não ameaça, por isso costuma convocar aliados. Uma sentinela nunca é enfrentada sem aliados.\n\nSentinelas alternam ataque normal e ataque forte; habilidades de apoio entram assim que possível e a cura fica para quando estão em crise.',
  support:
    'O apoio fortalece o potencial dos aliados: ora de forma ofensiva (mais dano e Precisão, ações seguintes melhores), ora defensiva (cura, defesas e Afinidades melhores). Costuma ser alvo prioritário e deve andar com aliados agressivos, como caçadores, magos e sabotadores.\n\nO apoio soldado auxilia soldados ou um campeão poderoso; como seus feitiços acabam quando ele cai, podem ser fortes, mas convém só um por conflito. O elite é mais robusto e vem com vários soldados ou com um elite ofensivo. O campeão tem muitos PV, então feitiços de duração Cena duram quase a luta toda: prefira benefícios mais fracos ou ações únicas que melhorem o próximo turno de um aliado. Um apoio nunca é enfrentado sem aliados.\n\nApoios alternam ataque normal e habilidades de apoio, e usam o ataque normal quando um feitiço seria redundante. Curas ficam para alvos em crise.',
};

const attrs: AttributeCode[] = ['DES', 'AST', 'VIG', 'VON'];

const RANK_PT: Record<Rank, string> = {
  soldier: 'soldado',
  elite: 'elite',
  champion: 'campeão',
};

/** A choice reads as "(escolha: tipo de dano)"; an amount as the three values of the table. */
const readable = (text: string, skill: RoleSkill) =>
  text.replace(/\{(\w+)\}/g, (_, id: string) => {
    if (id === 'minor' || id === 'heavy' || id === 'massive') {
      return quickAssemblyRules.amounts.map((a) => a[id]).join('/');
    }
    const slot = skill.slots?.find((s) => s.id === id);
    return `(escolha: ${(slot?.label ?? id).toLowerCase()})`;
  });

/** "dois feitiços ou um feitiço e +10 PM", then the list with its level limits. */
const grantText = (grant: SpellGrant) => {
  const options = grant.options.map((o) => o.label.toLowerCase()).join(' ou ');
  const list = grant.from
    .map((r) => (r.minLevel ? `${r.name} (nível ${r.minLevel}+)` : r.name))
    .join(', ');
  return `Escolha ${options}, entre: ${list}. Os feitiços de NPC estão em [[feiticos-de-npc]]; os demais são feitiços de classe do Livro Básico.`;
};

const skillLine = (skill: RoleSkill) => {
  const only = skill.ranks
    ? ` (só ${skill.ranks.map((r) => RANK_PT[r]).join(' e ')})`
    : '';
  const effects = skill.effects.map((e) => readable(e.text, skill));
  const affinity = [
    skill.resistances &&
      `Resistência a ${skill.resistances} tipos de dano${skill.notPhysical ? ' (exceto físico)' : ''}.`,
    skill.immunities && `Imunidade a ${skill.immunities} tipo de dano.`,
    skill.addsAttack &&
      `Ganha um ${skill.addsAttack.name.toLowerCase()} (RA + ${skill.addsAttack.damage}), com Precisão (${skill.addsAttack.accuracies.join(') ou (')}).`,
    skill.extraVulnerabilities && 'Fica Vulnerável a um tipo de dano a mais.',
    skill.spells && grantText(skill.spells),
  ].filter(Boolean);
  return `- **${skill.name}**${only}: ${[...effects, ...affinity].join(' ')}`;
};

const negativeLine = (skill: RoleSkill) =>
  `- **${skill.name}** (${skill.advice}): ${skill.effects.map((e) => readable(e.text, skill)).join(' ')}`;

const bossLine = (skill: RoleSkill) => {
  const text = [
    ...skill.effects.map((e) => readable(e.text, skill)),
    ...(skill.spells ? [grantText(skill.spells)] : []),
  ].join(' ');
  return `- **${skill.name}**${skill.advice ? ` (${skill.advice})` : ''}: ${text}`;
};

const bossSection = quickAssemblyRules.bossGroups
  .map(
    (group) =>
      `### ${group.name}\n\n${group.summary}\n\n${quickAssemblyRules.bossSkills
        .filter((b) => b.group === group.id)
        .map(bossLine)
        .join('\n')}`,
  )
  .join('\n\n');

const SPECIES_PT: Record<string, string> = {
  beast: 'Fera',
  construct: 'Construto',
  demon: 'Demônio',
  elemental: 'Elemental',
  humanoid: 'Humanoide',
  monster: 'Monstro',
  plant: 'Planta',
  undead: 'Morto-vivo',
};

const TYPE_PT: Record<string, string> = {
  physical: 'físico',
  air: 'ar',
  bolt: 'raio',
  dark: 'trevas',
  earth: 'terra',
  fire: 'fogo',
  ice: 'gelo',
  light: 'luz',
  poison: 'veneno',
};

const STATUS_NAME: Record<string, string> = {
  dazed: 'atordoado',
  enraged: 'enfurecido',
  poisoned: 'envenenado',
  shaken: 'abalado',
  slow: 'lento',
  weak: 'fraco',
};

const dmg = (type: string) =>
  type === 'physical' ? 'físico' : `de ${TYPE_PT[type]}`;
const joinE = (items: string[]) =>
  items.length <= 1
    ? (items[0] ?? '')
    : `${items.slice(0, -1).join(', ')} e ${items[items.length - 1]}`;

const optionLine = (o: SpeciesOption) => {
  const times = o.max && o.max > 1 ? ` (até ${o.max} vezes)` : '';
  const text = (() => {
    if (o.rule) {
      return o.rule.text.replace(/\{(\w+)\}/g, (_, id: string) => {
        const slot = o.slots?.find((sl) => sl.id === id);
        return `(escolha: ${(slot?.label ?? id).toLowerCase()})`;
      });
    }
    if (o.spells) return grantText(o.spells);
    if (o.kind === 'hp') return 'Aumenta os PV máximos em 10.';
    if (o.kind === 'role-skill')
      return 'Dá um poder de função a mais, da função do NPC.';
    if (o.kind === 'resistances')
      return 'Resistência a dois tipos de dano, exceto físico.';
    return `Troca ${o.swaps === 'resistant' ? 'uma Resistência' : o.swapType ? `a Imunidade a dano ${dmg(o.swapType)}` : 'uma Imunidade'} por uma Absorção${o.swapType ? ` (dano ${dmg(o.swapType)})` : ''}.`;
  })();
  return `- **${o.label}**${times}: ${text}`;
};

const speciesBlock = (r: SpeciesRule) => {
  const always = [
    ...Object.entries(r.affinities).map(
      ([type, affinity]) =>
        `${{ resistant: 'Resistência', immune: 'Imunidade', vulnerable: 'Vulnerabilidade', absorbs: 'Absorção' }[affinity as string]} a dano ${dmg(type)}`,
    ),
    ...(r.statusImmunities.length
      ? [
          `imunidade ${r.statusImmunities.length > 1 ? 'às condições' : 'à condição'} ${joinE(r.statusImmunities.map((c) => STATUS_NAME[c]))}`,
        ]
      : []),
    ...(r.resistances
      ? [`Resistência a ${r.resistances} tipos de dano à sua escolha`]
      : []),
    ...(r.immunities
      ? [`Imunidade a mais ${r.immunities} tipo de dano à sua escolha`]
      : []),
    ...(r.vulnerability
      ? [
          `Vulnerabilidade a um destes tipos de dano: ${joinE(r.vulnerability.map((t) => TYPE_PT[t]))}`,
        ]
      : []),
  ];
  const lines = [
    `### ${SPECIES_PT[r.species]}`,
    '',
    ...(always.length ? [`**Sempre tem:** ${always.join('; ')}.`, ''] : []),
    ...(r.note ? [r.note, ''] : []),
    ...(r.picks > 0 ? [`Escolha ${r.picks} das opções abaixo.`, ''] : []),
    ...(r.extra
      ? [
          `Opcional: uma Vulnerabilidade a mais (${joinE(r.extra.vulnerability.map((t) => TYPE_PT[t]))}). Se a escolher, escolha ${r.extra.picks} das opções abaixo.`,
          '',
        ]
      : []),
    ...r.options.map(optionLine),
  ];
  return lines.join('\n');
};

const speciesSection = quickAssemblyRules.species
  .map(speciesBlock)
  .join('\n\n');

const roleTable = (role: Role) => {
  const d = quickAssemblyRoles[role];
  const dice = (a: Partial<Record<AttributeCode, number>>) =>
    attrs
      .filter((code) => a[code] !== undefined)
      .map((code) => `${code} d${a[code]}`)
      .join(', ') || '—';
  const rows = d.progression
    .map(
      (r) =>
        `| ${r.level} | ${dice(r.attributes)} | ${r.hp} | ${r.mp} | +${r.accuracy} | ${r.extraDamage ? `+${r.extraDamage}` : '—'} |`,
    )
    .join('\n');
  const base = d.base;
  return `| | DES | AST | VIG | VON | PV | PM | Inic. | Defesa | Def. Mágica | Vulnerabilidades |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Nível 5** | d${base.attributes.DES} | d${base.attributes.AST} | d${base.attributes.VIG} | d${base.attributes.VON} | ${base.hp} (crise ${Math.floor(base.hp / 2)}) | ${base.mp} | ${base.initiative} | +${base.defense} | +${base.magicDefense} | ${base.vulnerabilities} |

Dos níveis seguintes em diante, só aparecem os dados que mudam em relação ao nível 5 (os dados mudam de nível em nível e acumulam):

| Nível | Dados que mudam | PV | PM | Precisão e Magia | Dano extra em ataques e feitiços |
| --- | --- | --- | --- | --- | --- |
${rows}`;
};

const roleRule = (role: Role): SeedEntry => {
  const name = `Montagem Rápida: ${ROLE_NAME[role]}`;
  const { amounts, elite, champion } = quickAssemblyRules;
  const roleDetails = quickAssemblyRoles[role];
  return {
    ...rule(
      name,
      ROLE_PAGE[role],
      ROLE_SUMMARY[role],
      `${ROLE_BODY[role]}

Para montar uma criatura com esta função e copiar a ficha, abra o [Laboratório Oroboros](${ASSEMBLY}). Os passos e o resto da regra estão em [[montagem-rapida]].

## Perfil e tabela de níveis

${roleTable(role)}

## Elite e campeão

- **Elite:** PV ×${elite.hpMultiplier}, Iniciativa +${elite.initiative} e +${elite.roleSkills} poder de função.
- **Campeão (X):** PV ×X, PM ×${champion.mpMultiplier}, Iniciativa +X, X poderes de função e ${champion.bossSkills} poder de chefe. X é o número de soldados que ele substitui.
- **Soldado ou elite:** pode somar +${quickAssemblyRules.extraHp} PV (antes de multiplicar) em vez de uma personalização.

Os valores "pequeno, grande e enorme" das habilidades dependem do nível: ${amounts
        .map(
          (a) =>
            `${a.minor}/${a.heavy}/${a.massive} a partir do nível ${a.fromLevel}`,
        )
        .join('; ')}.

${
  roleDetails.baseSpells
    ? `## Feitiços\n\n${grantText(roleDetails.baseSpells)}\n\n`
    : ''
}## Poderes de função

Um poder de função é escolhido da lista abaixo.

${roleDetails.skills.map(skillLine).join('\n')}

## Personalização

Um soldado ou elite pode, em vez de um poder, escolher uma destas opções (um campeão não).

${roleDetails.customizations.map(skillLine).join('\n')}`,
      ['montagem rápida', 'quick assembly', role, 'função', 'criatura'],
    ),
    source: 'bestiary-vol-1',
    details: quickAssemblyRoles[role],
  };
};

const amountsTable = `| A partir do nível | Pequeno | Grande | Enorme |
| --- | --- | --- | --- |
${quickAssemblyRules.amounts
  .map((a) => `| ${a.fromLevel} | ${a.minor} | ${a.heavy} | ${a.massive} |`)
  .join('\n')}`;

export const quickAssemblyRule: SeedEntry = {
  ...rule(
    'Montagem Rápida',
    25,
    'Método do Bestiary Vol. I para montar um NPC depressa: escolha uma função, um nível (5 ou 10 a 60) e uma patente, copie o perfil da função e some poderes de função, de chefe, negativos e da espécie.',
    `A **Montagem Rápida** é o método do Bestiary Vol. I (livro em inglês, sem edição brasileira: os termos em português desta página são tradução nossa e não oficiais) para criar NPCs de forma rápida. Em vez de decidir cada número, você escolhe uma **função** e copia o perfil dela, ajustado pelo nível e pela patente. Para criar uma criatura e copiar a ficha, abra o [Laboratório Oroboros](${ASSEMBLY}) (nada é salvo).

## Os passos

1. **Função.** Escolha entre [[montagem-rapida-bruto]], [[montagem-rapida-cacador]], [[montagem-rapida-mago]], [[montagem-rapida-sabotador]], [[montagem-rapida-sentinela]] e [[montagem-rapida-apoio]]. As melhores batalhas misturam funções.
2. **Nível e patente.** O nível é 5 ou um múltiplo de 10 (10, 20, 30, 40, 50 ou 60). Um chefe é um **campeão**.
3. **Perfil.** Copie o perfil da função e ajuste Atributos, PV, PM, Iniciativa, defesas, Afinidades e ataques básicos conforme nível e patente. Você ainda pode somar feitiços, ações únicas e regras especiais.
4. **Poderes de chefe.** Se for campeão, escolha poderes de chefe.
5. **Poder negativo.** Opcional: dá a ele um poder de função (ou de chefe) a mais.
6. **Espécie.** Cada espécie dá opções, entre elas feitiços e poderes de função adicionais.
7. **Nome e Traços.**
8. **Táticas e rotina de ações.** Pense em como a criatura e seus companheiros se combinam durante a cena.

Se a criatura tiver feitiços ofensivos, o teste de Magia dela pode ser (AST + VON) ou (VIG + VON).

## Princípios

- **A função vem primeiro.** Um poder só entra se combinar com a função: um feitiço em área é coisa de mago, não de sentinela. Chefes podem forçar um pouco a regra; inimigos comuns devem ficar na própria faixa.
- **Varie.** Misture funções e evite que uma mesma estratégia, habilidade ou tipo de dano seja bom contra todos, sem alguma reviravolta.
- **Não é uma prisão.** O método é direto e fica sem surpresas depressa. Pode-se inventar poderes novos; não é obrigatório gastar todo o orçamento.
- **A ilusão do "médio".** Os grupos raramente são médios: examine como cada função e poder ameaça os PJs.

## O que muda em relação à criação padrão

- Todo NPC tem nível 5, 10, 20, 30, 40, 50 ou 60, sem níveis intermediários.
- Todo NPC tem ao menos uma Vulnerabilidade, salvo regra ou truque específico (que deve somar Vulnerabilidades por si).
- A Vulnerabilidade a dano físico dá **um** poder adicional, não dois.
- NPCs não usam equipamento. Por isso o humanoide ganha um poder adicional.

## Valores pequenos, grandes e enormes

Várias habilidades falam em uma quantidade "pequena", "grande" ou "enorme" de PV, PM ou dano. O número depende do nível do NPC:

${amountsTable}

## Poderes negativos

Um poder negativo dá ao NPC uma desvantagem própria e, em troca, **um poder de função ou de chefe a mais**. A maioria foi pensada para NPCs com uma função específica no conflito, e o conselho do livro vem junto do nome.

${quickAssemblyRules.negativeSkills.map(negativeLine).join('\n')}

## Poderes de chefe

Um campeão recebe poderes de chefe conforme a patente, e um poder negativo pode comprar um para um soldado. Algumas regras do livro:

- Alguns poderes de chefe exigem Pontos de Ultima e foram pensados para vilões.
- Alguns dependem de o chefe estar em crise. Em um conflito de Relógios, em que os PV não contam, considere o chefe em crise enquanto metade ou mais do relógio de resolução dos PJs estiver preenchida.
- Para dar mais poderes de chefe, troque-os por poderes de função na mesma quantidade, mas tome muito cuidado com mais de dois no mesmo chefe e evite vários da mesma lista.
- Cada poder combina de um jeito com os poderes dos outros NPCs da cena: procure sinergias e crie situações que desafiem os PJs sem esmagá-los. O desafio deve ser interessante e até tenso, nunca malvado ou injusto.
- As escolhas de um poder de chefe são feitas ao criar o chefe, não a cada uso.

${bossSection}

## Espécies

Estas regras substituem as de Espécie do Livro Básico (p. 304-305) para uma criatura montada assim. Escolha pela aparência e pela função do NPC na cena: por exemplo, evite aumentar os PV de um caçador fera, porque caçadores não devem ser duráveis, mas dê a ele Resistências, que os jogadores podem identificar e contornar. Os humanoides não ganham Usar Equipamento (a Montagem Rápida não usa equipamento de NPC) e as Vulnerabilidades adicionais opcionais se restringem a certos tipos de dano. Desvie das opções para dar personalidade ao NPC, sem perder de vista a função dele.

${speciesSection}

## Patentes

- **Elite:** conta como dois soldados. PV ×${quickAssemblyRules.elite.hpMultiplier}, Iniciativa +${quickAssemblyRules.elite.initiative}, +${quickAssemblyRules.elite.roleSkills} poder de função e dois turnos por rodada.
- **Campeão (X):** substitui X soldados. PV ×X, PM ×${quickAssemblyRules.champion.mpMultiplier}, Iniciativa +X, X poderes de função, ${quickAssemblyRules.champion.bossSkills} poder de chefe e X turnos por rodada.
- **Vilão:** o mestre pode declarar qualquer criatura um vilão; o grau (menor, maior ou supremo) dá ${quickAssemblyRules.villainTiers.minor}, ${quickAssemblyRules.villainTiers.major} ou ${quickAssemblyRules.villainTiers.supreme} Pontos de Ultima (veja [[pontos-de-ultima]]).`,
    ['montagem rápida', 'quick assembly', 'criatura', 'npc'],
  ),
  source: 'bestiary-vol-1',
  details: quickAssemblyRules,
};

export const quickAssemblySeed: SeedEntry[] = [
  quickAssemblyRule,
  ...(
    ['brute', 'hunter', 'mage', 'saboteur', 'sentinel', 'support'] as Role[]
  ).map(roleRule),
];
