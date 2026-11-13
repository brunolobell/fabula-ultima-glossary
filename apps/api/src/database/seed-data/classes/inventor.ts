import { classEntry, skill } from '../helpers';
import { SeedEntry } from '../types';

const CLASS = 'Inventor';

export const inventor: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 206,
    summary:
      'Engenhoso criador de invenções excêntricas e maravilhosas: faz poções, infusões e tecnomagia, e desafia as regras da natureza e da sociedade por um futuro melhor.',
    body: `Inventores têm uma engenhosidade sem igual e são conhecidos por invenções excêntricas e maravilhosas. Viajam pelo mundo em busca infindável de teorias perdidas e maquinário antigo; seus olhos brilham diante de maravilhas da arquitetura e da engenharia.

De certo modo, são os maiores sonhadores e rebeldes, desafiando as regras da natureza e da sociedade em prol de um futuro melhor.

## Para pensar no personagem

- Você aprendeu sua arte com alguém? Qual era a sua relação com essa pessoa?
- O que você perdeu indo atrás de progresso e inovação?
- Sua arte é revolucionária, ou pertence a uma área bem estabelecida?
- Quando um item ou efeito é criado por você, como ele se parece?

Quer criar aeronaves, golens, poções de sono e outros itens? Veja Projetos na página 134.

## Tipos de invenção

O Poder [[engenhocas]] dá acesso a três tipos de invenção: **alquimia**, **infusões** e **tecnomagia**. Cada um tem benefícios básicos, avançados e superiores.

### Alquimia

*Outros nomes: Química, Bombas, Mutações.*

Você faz a ação **Inventário** para criar rapidamente uma poção com efeitos poderosos e um tanto imprevisíveis. Escolha um tipo de mistura entre os que já desbloqueou (básica, avançada ou superior) e gaste os PI necessários.

| Mistura | Custo de PI | Dados |
| --- | --- | --- |
| Básica | 3 | Role 2d20 |
| Avançada | 4 | Role 3d20 |
| Superior | 5 | Role 4d20 |

Ao criar uma mistura, role a quantidade de d20 indicada. Atribua **um** dado à tabela de **alvo** e **um** à tabela de **efeito**, e descarte os outros. Depois, descreva os efeitos da mistura.

> **Exemplo:** você gasta 5 PI numa mistura superior e rola quatro d20: 3, 14, 9 e 4. Pode atribuir 14 a alvo e 9 a efeito, dando a você e a todos os aliados Resistência a ar e a fogo. Ou pode atacar, atribuindo 9 a alvo e 4 a efeito, para causar dano de raio a um único inimigo. Ou ainda atribuir 9 a alvo e 14 a efeito para impor condições àquele adversário.

Os efeitos marcados como "Qualquer" na tabela de efeito estão sempre disponíveis e podem ser escolhidos se nenhum dos efeitos rolados agradar.

#### Alvo

| Dado | A poção afeta... |
| --- | --- |
| 1-6 | você ou um aliado que você veja e esteja na cena. |
| 7-11 | um inimigo que você veja e esteja na cena. |
| 12-16 | você e todos os aliados presentes na cena. |
| 17-20 | todos os inimigos presentes na cena. |

#### Efeito

Cada criatura afetada pela poção...

| Dado | Efeito |
| --- | --- |
| Qualquer | sofre 20 pontos de dano de veneno (30 se você está no 20º nível ou acima; 40 no 40º ou acima). |
| Qualquer | recupera 30 PV. |
| 1 | considera os dados de Destreza e Vigor um passo maior (máximo d12) até o fim do próximo turno dela. |
| 2 | como o efeito 1, mas com Astúcia e Vontade. |
| 3 | sofre 20 pontos de dano de ar (30 se você está no 20º nível ou acima; 40 no 40º ou acima). |
| 4 | como o efeito 3, mas com dano de raio. |
| 5 | como o efeito 3, mas com dano de trevas. |
| 6 | como o efeito 3, mas com dano de terra. |
| 7 | como o efeito 3, mas com dano de fogo. |
| 8 | como o efeito 3, mas com dano de gelo. |
| 9 | fica Resistente a dano de ar e de fogo até o fim da cena. |
| 10 | como o efeito 9, mas com dano de gelo e de raio. |
| 11 | como o efeito 9, mas com dano de terra e de trevas. |
| 12 | fica enfurecida. |
| 13 | fica envenenada. |
| 14 | fica abalada, atordoada, lenta e fraca. |
| 15 | se recupera de todas as condições. |
| 16-17 | recupera 50 PV e 50 PM. |
| 18 | recupera 100 PV. |
| 19 | recupera 100 PM. |
| 20 | recupera 100 PV e 100 PM. |

### Infusões

*Outros nomes: Munição Arcana, Revestimento de Lâmina, Runa de Combate.*

Quando atinge um ou mais alvos com um ataque, você pode gastar **2 PI** para produzir uma infusão especial e aplicar o efeito correspondente ao ataque (se ele tinha a propriedade multi, o efeito vale para cada alvo atingido).

- Não dá para aplicar mais de uma infusão ao mesmo ataque.
- Produzir e usar uma infusão fazem parte da ação de atacar com a arma.

| Infusão | Efeito |
| --- | --- |
| **Infusões básicas** | |
| Crio | O ataque causa 5 pontos de dano adicional e o dano vira de gelo. |
| Piro | O ataque causa 5 pontos de dano adicional e o dano vira de fogo. |
| Volt | O ataque causa 5 pontos de dano adicional e o dano vira de raio. |
| **Infusões avançadas** | |
| Ciclone | O ataque causa 5 pontos de dano adicional e o dano vira de ar. |
| Exorcismo | O ataque causa 5 pontos de dano adicional e o dano vira de luz. |
| Sísmico | O ataque causa 5 pontos de dano adicional e o dano vira de terra. |
| Sombra | O ataque causa 5 pontos de dano adicional e o dano vira de trevas. |
| **Infusões superiores** | |
| Vampiro | Escolha um: você recupera PV igual à metade dos PV perdidos pelo alvo, ou recupera PM igual à metade dos PV perdidos pelo alvo. Só pode ser usada se o ataque tiver uma única criatura como alvo. |
| Peçonha | O ataque causa 5 pontos de dano adicional, o dano vira de veneno e cada criatura atingida fica envenenada. |

### Tecnomagia

*Outros nomes: Engenharia, Golenomia, Robótica.*

Este tipo de invenção concede uma variedade de benefícios.

#### Sobreposição Tecnomágica (básica)

Em um conflito, você pode usar uma **ação** e gastar **10 PM** para escolher um inimigo **construto** ou **elemental não senciente** que você veja e que esteja sofrendo uma ou mais condições. O inimigo se recupera de todas as condições, mas o Mestre deve **revelar toda a ficha dele** e você escolhe uma ação para forçá-lo a fazer. Durante essa ação, a criatura é considerada um **aliado** do seu grupo.

#### Magicanhão (avançada)

Você pode fazer a ação **Inventário** e gastar **2 PI** para criar uma arma de fogo chamada **magicanhão**, destruindo qualquer magicanhão que tenha criado antes. Se seus dois espaços de mão estiverem vazios, você pode equipar o novo magicanhão na hora e fazer um **ataque livre** com ele. Sempre que criar um, escolha o tipo de dano dele: ar, físico, fogo, gelo, raio ou terra.

| Arma | Precisão | Dano |
| --- | --- | --- |
| Magicanhão | (DES + AST) +1 | (RA + 10) |

Duas mãos, à distância. Não pode ter características especiais.

#### Magisferas (superior)

Você cria **três magisferas**. Cada uma representa um feitiço escolhido entre as listas de Elementalista, Entropista e Espiritualista (da mesma lista ou de listas diferentes). Isso não conta como "aprender" ou "conhecer" esses feitiços.

No 20º nível você cria mais uma magisfera, e outra ao alcançar o 40º (também vale se você receber este Poder já nesses níveis).

Você pode fazer a ação **Inventário** e gastar **2 PI** para fazer a ação **Feitiço** imediatamente e sem gastar uma ação, lançando um dos feitiços para os quais criou uma magisfera. O feitiço segue as regras normais, inclusive custo em PM e teste de Magia. Veja [[elementalista]], [[entropista]] e [[espiritualista]].`,
    otherNames: ['Alquimista', 'Engenheiro Tecnomágico', 'Mecânico'],
    quote:
      'Gosto de imaginar que aquilo que temos hoje não foi um presente dos deuses.',
    traits: ['ip', 'projects'],
    freeBenefits: [
      'Aumenta permanentemente seus PI máximos em 2.',
      'Pode iniciar Projetos.',
    ],
  }),

  skill(
    CLASS,
    'Chuva de Poções',
    207,
    2,
    'Ao criar uma poção que restaura PV e/ou PM de uma única criatura, ela pode afetar até (NP) criaturas adicionais, mas cada uma restaura só metade da quantidade normal.',
  ),

  skill(
    CLASS,
    'Engenhocas',
    207,
    5,
    'Na primeira vez, você escolhe um tipo de invenção (alquimia, infusões ou tecnomagia) e ganha os benefícios básicos; a cada nova aquisição, ganha um novo tipo ou sobe um tipo que já tem para avançado ou superior.',
    `Na **primeira vez** que adquire este Poder, escolha um tipo de engenhoca: **alquimia**, **infusões** ou **tecnomagia** (veja a página da classe [[inventor]]). Você recebe os **benefícios básicos** desse tipo.

Sempre que adquirir este Poder de novo, escolha uma opção:

- os **benefícios básicos** de um novo tipo de engenhoca;
- os **benefícios avançados** de uma engenhoca cujos benefícios básicos você já tem; ou
- os **benefícios superiores** de uma engenhoca cujos benefícios avançados você já tem.`,
  ),

  skill(
    CLASS,
    'Fórmula Secreta',
    207,
    5,
    'Poções e magisferas que restauram PV e/ou PM restauram (NP × 5) a mais de cada recurso; fragmentos elementais, magisferas e poções que causam dano causam (NP) pontos de dano adicional.',
    `- Quando você cria uma poção ou magisfera cujos efeitos restauram PV e/ou PM, cada recurso restaurado aumenta em **(NP × 5)**.
- Quando você cria um fragmento elemental, uma magisfera ou uma poção que cause dano, esse item causa **(NP)** pontos de dano adicional.`,
  ),

  skill(
    CLASS,
    'Item Emergencial',
    207,
    1,
    'Uma vez por cena de conflito, quando você está em crise, pode fazer uma ação adicional no seu turno, desde que seja a ação Inventário.',
  ),

  skill(
    CLASS,
    'Visionário',
    207,
    5,
    'Ao trabalhar em um projeto, até (NP × 100) zênites do custo de material são pagos automaticamente e você gera (NP) a mais de progresso por dia; os efeitos se acumulam entre personagens com este Poder.',
    `Quando você trabalha em um projeto:

- até **(NP × 100) zênites** do custo de material são pagos automaticamente; e
- você gera mais **(NP)** de progresso todos os dias.

Se vários personagens com este Poder trabalharem no mesmo projeto, os efeitos **se acumulam**.`,
  ),
];
