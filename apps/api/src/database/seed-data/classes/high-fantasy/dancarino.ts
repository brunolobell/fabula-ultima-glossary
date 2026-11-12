import { classEntry, skill } from '../../helpers';
import { SeedEntry } from '../../types';

const CLASS = 'Dançarino';

export const dancarino: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 138,
    summary:
      'Acrobata que dirige forças espirituais com movimentos repetitivos e precisos: apresenta danças entre as ações para ganhar resistências, enfraquecer inimigos ou ajudar aliados.',
    body: `Dançarinos treinaram o corpo para obter coordenação e flexibilidade excepcionais, seja para impressionar uma multidão com acrobacias ou para afastar o mal. Os mais habilidosos sabem direcionar o fluxo das forças espirituais com movimentos precisos e repetitivos, elevando suas habilidades e manifestando efeitos mágicos.

São combatentes surpreendentemente capazes, embora um pouco… dramáticos.

## Para pensar no personagem

- Suas habilidades exigem bastante foco e disciplina? Quem te ensinou?
- Por que você dança? É um tipo de arte, uma profissão, ou algo diferente?
- Você é gracioso e charmoso ou malandro e espalhafatoso?
- Como são suas apresentações e acrobacias?

## As Danças

Cada vez que adquire o Poder [[danca]], você aprende uma das danças abaixo (páginas 140 e 141 do Atlas). Uma dança **instantânea** é resolvida na hora; as demais duram até o início do seu próximo turno.

As danças elementais (Anjo, Fênix, Golem, Grifo, Ieti, Mirmidão e Morcego) funcionam todas do mesmo jeito: **escolha um**: você fica Resistente ao tipo de dano indicado, **ou** todo dano de seus ataques e feitiços vira desse tipo.

| Dança | Duração | Efeito |
| --- | --- | --- |
| Dança do Anjo | até o início do próximo turno | Elemental: dano de **luz**. |
| Dança da Fênix | até o início do próximo turno | Elemental: dano de **fogo**. |
| Dança do Golem | até o início do próximo turno | Elemental: dano de **raio**. |
| Dança do Grifo | até o início do próximo turno | Elemental: dano de **ar**. |
| Dança do Ieti | até o início do próximo turno | Elemental: dano de **gelo**. |
| Dança do Mirmidão | até o início do próximo turno | Elemental: dano de **terra**. |
| Dança do Morcego | até o início do próximo turno | Elemental: dano de **trevas**. |
| Dança da Hidra | até o início do próximo turno | Depois de sofrer dano, escolha: recupera 5 PV **ou** 5 PM. |
| Dança da Banshee | instantânea | Criatura que o veja e já esteja **lenta** fica imediatamente **abalada**. |
| Dança do Kraken | instantânea | Criatura que o veja e já esteja **atordoada** fica imediatamente **lenta**. |
| Dança do Pesadelo | instantânea | Criatura que o veja e já esteja **abalada** fica imediatamente **fraca**. |
| Dança do Sátiro | instantânea | Criatura que o veja e já esteja **fraca** fica imediatamente **atordoada**. |
| Dança do Leão | instantânea | Você se recupera de uma condição à sua escolha. |
| Dança da Mênade | instantânea | Criatura que o veja perde PM igual ao seu dado atual de Destreza. |
| Dança do Ouroboros | instantânea | Um aliado que você veja e que ainda não agiu na rodada joga logo após você. |
| Dança do Pavão | instantânea | A próxima vez nesta cena que uma criatura que o veja atacar ou lançar feitiço ofensivo, você deve estar entre os alvos, se possível. |
| Dança do Unicórnio | instantânea | Você e um aliado que o veja e tenha Laço com você recuperam PV igual ao seu dado atual de Destreza (+5 a partir do 20º nível, +10 a partir do 40º). |`,
    otherNames: ['Acrobata', 'Bufão', 'Bucaneiro'],
    quote: 'Minha história? Dance comigo para descobrir.',
    freeBenefits: [
      'Aumenta permanentemente seus PV ou PM máximos em 5 (à sua escolha).',
    ],
  }),

  skill(
    CLASS,
    'Dança',
    139,
    10,
    'Aprende uma dança a cada nível. No seu turno em conflito, sem armadura marcial, gaste 10 PM (5 se trocar de dança) para apresentar uma antes ou depois da ação.',
    `Sempre que adquirir este poder, aprenda uma **dança** (veja a lista no corpo da classe [[dancarino]]).

Em seu turno numa cena de conflito, se **não** tiver uma armadura marcial equipada, você pode gastar **10 PM** para apresentar uma das danças que aprendeu. Isso **não usa ação**, mas a dança só pode ser apresentada **antes ou depois** da sua ação e **uma vez por turno**.

Se você já apresentou uma dança **diferente** no turno anterior na mesma cena, o custo da nova dança cai em **5 PM**.`,
  ),

  skill(
    CLASS,
    'Dançarino de Guerra',
    139,
    5,
    'Depois de apresentar uma dança, ataques com adaga, arremesso, luta e malho (e feitiços ofensivos, com arma arcana) causam NP de dano adicional até o início do próximo turno.',
    `Depois de apresentar uma dança, seus ataques com armas das categorias **adaga, arremesso, luta e malho** causam **(NP)** pontos de dano adicional até o início do seu próximo turno.

Se você tiver uma **arma arcana** equipada, seus feitiços ofensivos também causam **(NP)** de dano adicional até o início do seu próximo turno.`,
  ),

  skill(
    CLASS,
    'Me Acompanhe',
    139,
    1,
    'Ao apresentar uma dança que dura até o início do próximo turno, gaste 10 PM para que um personagem com quem você tem Laço de afeto receba seus benefícios.',
    `Ao apresentar uma dança com duração de "até o início de seu próximo turno", você pode gastar **10 PM**. Se fizer isso, escolha um personagem com quem você tenha um **Laço de afeto**: ele também recebe os benefícios da dança como se fosse você, até o início do seu próximo turno.`,
  ),

  skill(
    CLASS,
    'Sapateado Frenético',
    139,
    2,
    'Ao apresentar uma dança que dura até o início do próximo turno, testes opostos de acrobacia, coordenação ou velocidade recebem bônus de NP × 2.',
    `Ao apresentar uma dança com duração de "até o início de seu próximo turno", todos os **testes opostos** que dependam de acrobacia, coordenação ou velocidade recebem um bônus igual a **(NP × 2)** até o início do seu próximo turno.`,
  ),

  skill(
    CLASS,
    'Troca de Figurino',
    139,
    1,
    'Depois de apresentar uma dança, você faz a ação Equipamento sem gastar ação.',
    `Depois de apresentar uma dança, você pode fazer a ação **Equipamento** sem usar nenhuma ação.`,
  ),
];
