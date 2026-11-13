import { classEntry, skill } from '../../helpers';
import { SeedEntry } from '../../types';

const CLASS = 'Piloto';

export const piloto: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 158,
    summary:
      'Luta e viaja num veículo pessoal único (montaria, exoesqueleto ou mecha) montado com módulos de arma, armadura e suporte que o piloto liga e desliga conforme a situação.',
    body: `Corredores audaciosos, soldados treinados ou choferes elegantes, pilotos desenvolvem um elo especial com o veículo: de certa forma, ele vira uma extensão do corpo, em quem se pode confiar para lutar e viajar.

Transportes de todo tipo aparecem nos mundos de Fabula Ultima, mas o veículo de um piloto é único e insubstituível: pode ser o mecha que a mãe pilotou numa batalha, uma aeromoto turbinada que nem deveria voar ou outra maravilha tecnológica.

## Para pensar no personagem

- Onde você aprendeu a pilotar? A pessoa que ensinou ainda está viva?
- Como conseguiu seu veículo? Construiu por conta própria? Herdou?
- Qual toque pessoal faz seu veículo se destacar dos outros?
- Quem ou o que você jamais deixaria entrar no seu veículo?

## O veículo do piloto

Regras especiais do veículo pessoal (veja [[veiculo-pessoal]]):

- **Entrar** no veículo num conflito exige a ação **Objetivo**. Normalmente não pede teste, mas o Mestre pode usar um relógio se houver perigos ou obstáculos. Se o veículo estiver disponível no início do conflito, os PJs entram imediatamente antes do teste de Iniciativa.
- **Sair** não exige ação, mas em conflito só pode ser feito no seu turno, antes ou depois de uma ação.
- Só o piloto pode pilotar. Passageiros (número depende da estrutura e dos módulos) **não podem dar cobertura** com a ação Guarda.
- O máximo de módulos ativos ao mesmo tempo é **3 + seu NP em Veículo Pessoal**. Fora de conflito você redistribui módulos ativos e inativos à vontade; esse limite sempre vale (inclusive ao ativar módulos com [[configuracao-flexivel]]).
- O veículo **não tem atributos próprios**: é extensão do PJ. Pode ficar danificado ou inutilizável como consequência narrativa, mas só pode ser destruído se o jogador concordar. Consertar um veículo danificado custa **100 × NP em Veículo Pessoal** zênites.

### Estruturas

Cada piloto escolhe a estrutura ao obter o poder, e ela nunca muda.

| Estrutura | Passageiros | Distância (1 dia de viagem) | Módulos |
| --- | --- | --- | --- |
| Exoesqueleto (armaduras energizadas, membros mecânicos) | Nenhum | sem modificador | Até 2 de arma, 1 de armadura, qualquer número de suporte. Com Compressão Tecnológica, ignore o custo em PI. |
| Mecha (grandes robôs pilotados por dentro) | Nenhum | × 2 | Até 2 de arma, 1 de armadura, qualquer número de suporte. |
| Montaria (animais de montaria, motos, caças pequenos, skates voadores) | Até um | × 2 | Até 1 de arma, 1 de armadura, qualquer número de suporte. Com Coração no Motor, ignore o custo em PM. |

### Módulos de armadura

Com um módulo de armadura ativo, o piloto **não usa seu espaço de armadura** (ele passa a ser ocupado pelo módulo). Ao parar de pilotar, volta a usar sua armadura. Os marcados como marciais contam como armadura marcial e dão Def. e Def.M fixas (bônus de escudo e outros efeitos ainda valem); o piloto pode ativá-los mesmo sem poder equipar armadura marcial.

| Módulo | Defesa | Def.M | Marcial |
| --- | --- | --- | --- |
| Cobertura Flexível | dado de DES + 2 | dado de AST + 1 | não |
| Cobertura Pesada | 12 | 8 | sim |
| Cobertura Rúnica | 10 | 11 | sim |
| Cobertura Padrão | 11 | 10 | sim |

### Módulos de arma

Com um ou mais módulos de arma ativos, o piloto **não usa seus espaços de mão**. Cada módulo conta como arma de uma mão, **não marcial** (exceto o Escudo, tratado como escudo); declare qual ocupa a mão dominante e qual a secundária. Dois módulos da mesma categoria permitem as regras de ataque com duas armas (com Ambidestria, quaisquer dois). Regras especiais de módulos **não são características**.

| Módulo | Precisão | Dano | Categoria | Alcance | Observação |
| --- | --- | --- | --- | --- | --- |
| Arcano | (DES + VON) | (RA + 8) físico | Arcana | corpo a corpo | — |
| Machado | (DES + AST) | (RA + 12) físico | Pesada | corpo a corpo | — |
| Lâmina | (DES + AST) + 1 | (RA + 6) físico | Adaga | corpo a corpo | — |
| Arco | (DES + AST) + 1 | (RA + 12) físico | Arco | à distância | Exclusivo: sem outro módulo de arma ativo. |
| Canhão | (DES + AST) | (RA + 14) físico | Arma de fogo | à distância | Exclusivo. |
| Garra | (DES + AST) | (RA + 8) físico | Luta | corpo a corpo | Pode interagir na cena como mão livre. |
| Claymore | (DES + AST) + 1 | (RA + 14) físico | Luta | corpo a corpo | Exclusivo. |
| Esotérico | (DES + VON) | (RA + 12) físico | Arcana | corpo a corpo | Exclusivo. |
| Malho | (DES + AST) | (RA + 10) físico | Luta | corpo a corpo | — |
| Lança-chamas | (DES + AST) | (RA + 8) fogo | Arma de fogo | corpo a corpo (assim impresso) | — |
| Metralhadora | (DES + AST) | (RA + 10) físico | Arma de fogo | corpo a corpo (assim impresso) | Exclusivo. Na ação Ataque, pode fazer dois ataques separados (mesmo alvo ou alvos diferentes), seguindo as regras de duas armas: perdem a propriedade multi e a RA de cada teste conta como 0 no dano. |
| Rifle | (DES + AST) | (RA + 10) físico | Arma de fogo | à distância | — |
| Foice | (DES + AST) | (RA + 16) físico | Pesada | corpo a corpo | Exclusivo. |
| Lança | (DES + AST) | (RA + 10) físico | Lança | corpo a corpo | — |
| Espada | (DES + AST) + 1 | (RA + 8) físico | Espada | corpo a corpo | — |
| Tridente | (DES + AST) + 1 | (RA + 14) físico | Lança | corpo a corpo | Exclusivo. |
| Escudo (só Exoesqueleto e Mecha) | — | — | escudo | — | Ao dirigir, +2 em Def. e Def.M. Conta como escudo equipado, não como arma. Só vai na mão dominante com Duplo Escudeiro; nesse caso os Escudos Gêmeos causam 2 de dano adicional (acumula com dois módulos Escudo ativos). |

### Módulos de suporte

Beneficiam o piloto e, muitas vezes, os passageiros. Só um módulo de suporte de cada nome pode estar ativo, e alguns contam como **dois módulos** no limite.

- **Aéreo** (conta como dois). O veículo voa e a distância vira × 3. Seus ataques corpo a corpo atingem voadores e ninguém a bordo é atingido em corpo a corpo, a menos que o atacante voe ou alcance voadores. Não vale com o veículo desligado ou em terra, com você em crise ou dando cobertura com Guarda; e cessa até o início do seu próximo turno se alguém a bordo sofrer dano de ar, raio ou gelo em conflito.
- **Antielemento.** A cada ativação, escolha ar, fogo, gelo, raio ou terra: criaturas a bordo ficam Resistentes a esse dano enquanto o módulo estiver ativo.
- **Assento** (só Mecha e Montaria). Um passageiro humano extra.
- **Cobertura Expandida** (só Mecha e Montaria). Com Cobertura Pesada, Rúnica ou Padrão ativa, os passageiros podem usar a Defesa e Def.M do módulo (ou seus valores normais, se melhores).
- **Contragolpe.** Se uma criatura a bordo for atingida por ataque à distância, gaste 1 PI: o atacante sofre 10 de dano físico (+5 a partir do 20º nível, +10 a partir do 40º) depois do ataque.
- **Escavação.** Luzes potentes e capacidade de escavar o solo.
- **Interface Rápida.** Ao entrar no veículo em seu turno em conflito, você faz uma ação adicional.
- **Magistático.** Depois de pagar o PM de um arcano, feitiço ou verso, pilotando e com arma arcana equipada, você recupera 5 PM (10 se o custo for 30 PM ou mais).
- **Mira Avançada.** +2 nos testes de Precisão e de Magia de feitiços ofensivos.
- **Navegante.** O veículo viaja na água e debaixo dela.
- **Ofensiva Secundária** (só Exoesqueleto e Mecha). A cada ativação, escolha um módulo de arma inativo: enquanto ele estiver inativo e este módulo ativo, uma ação permite um ataque livre com ele.
- **Poder** (só Exoesqueleto e Mecha). +2 em testes opostos de força bruta ou resistência física.
- **Sensor.** +2 nos testes abertos para examinar criaturas, itens e locais próximos.
- **Turbo.** +2 em testes opostos de velocidade e manobras rápidas.

### Módulos raros como recompensa

O Mestre deve incluir módulos novos (ou versões melhoradas) entre as recompensas.

- Cada módulo de **arma ou armadura** tem custo base de **500z**; versões raras seguem as regras de itens raros do Livro Básico (página 266), com duas exceções: o dano de um módulo de arma só sobe 4 pontos a cada +200z (nunca vira de duas mãos), e módulo de arma nunca vira marcial, mesmo com dano (RA + 10) ou mais.
- Cada módulo de **suporte** custa cerca de **1.000z**, e módulos de suporte são raros.
- Um piloto nunca deve ter dois módulos de suporte de nomes diferentes com efeitos parecidos ou cumulativos.
- Módulos raros podem ser comprados em lojas especializadas, achados em fábricas e laboratórios ou recebidos por derrotar adversários robóticos ou artificiais.
- Um Inventor pode usar o poder heroico Melhoria e as regras de projetos (Livro Básico, páginas 238 e 134) para melhorar módulos ou inventar personalizações. Módulos criados por projetos não devem atrapalhar os papéis dos outros personagens: dê-lhes usos limitados ou falhas interessantes.

## Exemplos de veículos pessoais

| Veículo | Estrutura e NP | Módulos ativos | Módulos inativos |
| --- | --- | --- | --- |
| Armadura Classe Escorpião | Exoesqueleto, NP 2 | Cobertura Flexível, Lâmina × 2, Ofensiva Secundária (Foice) | Foice |
| Caça Espacial | Montaria, NP 2 | Aéreo, Cobertura Padrão, Metralhadora, Mira Avançada | Canhão |
| Caranguejo Mecânico | Mecha, NP 2 | Cobertura Pesada, Garra × 2, Navegante, Poder | — |
| Destróier Bípede | Mecha, NP 2 | Cobertura Padrão, Lança-chamas, Machado, Ofensiva Secundária (Canhão) | Canhão |
| Exoesqueleto de Assalto | Exoesqueleto, NP 3 | Cobertura Pesada, Contragolpe, Escudo, Mira Avançada, Rifle, Sensor | Aéreo |
| Explorador Infiltrador | Mecha, NP 2 | Antielemento, Cobertura Rúnica, Lança, Rifle, Sensor | — |
| Motocicleta Blindada | Montaria, NP 2 | Assento, Cobertura Expandida, Cobertura Pesada, Metralhadora, Turbo | — |
| Skate Voador | Montaria, NP 1 | Aéreo, Claymore, Interface Rápida | — |`,
    otherNames: ['Motoqueiro', 'Piloto de Mecha', 'Pirata do Céu'],
    quote:
      'Dentro deste aço batem os corações e esperanças de todos em Minerva IV. O Império já perdeu, só não sabe disso ainda.',
    traits: ['hp', 'melee-weapon', 'ranged-weapon'],
    freeBenefits: [
      'Aumenta permanentemente seus PV máximos em 5.',
      'Pode equipar armas corpo a corpo e à distância marciais.',
    ],
  }),

  skill(
    CLASS,
    'Compressão Tecnológica',
    159,
    1,
    'Sem ninguém a bordo, você faz seu veículo pessoal sumir do mundo; com a ação Inventário e 2 PI, ele reaparece perto de você e você embarca sem custo.',
    `Quando não houver ninguém a bordo do seu veículo pessoal, você pode fazê-lo **desaparecer do mundo de jogo** a qualquer momento. (O que permite isso? Fica a seu critério.)

Se o veículo não estiver presente no mundo e você estiver num espaço grande o bastante para ele, pode usar a ação **Inventário** e gastar **2 PI** para fazê-lo aparecer perto de você, e embarcar sem custos.`,
  ),

  skill(
    CLASS,
    'Configuração Flexível',
    159,
    4,
    'Ao usar Equipamento ou Guarda pilotando, desativa até NP módulos ativos e ativa até NP módulos inativos.',
    `Ao usar a ação **Equipamento** ou **Guarda** enquanto pilota seu veículo pessoal, você pode escolher até **(NP)** dos seus módulos ativos e desativá-los. Se fizer isso, escolha até **(NP)** módulos inativos e ative-os.`,
  ),

  skill(
    CLASS,
    'Coração no Motor',
    159,
    3,
    'No início do turno em conflito, pilotando, gaste 10 PM e escolha: NP × 2 de dano adicional no próximo dano causado, redução de NP × 2 no próximo dano sofrido, ou recuperação de lento ou fraco.',
    `No início do seu turno durante um conflito, se estiver pilotando seu veículo pessoal, você pode gastar **10 PM**. Se fizer isso, escolha um efeito:

- na próxima vez que causar dano neste turno, causa **(NP × 2)** pontos de dano adicional; **ou**
- na próxima vez que sofrer dano antes do início do próximo turno, esse dano é reduzido em **(NP × 2)** (antes das Afinidades a dano); **ou**
- você se recupera de **lento** ou **fraco** (à sua escolha).`,
  ),

  skill(
    CLASS,
    'Pulso Firme',
    159,
    1,
    'Em testes de Precisão com um módulo de arma, pode substituir um atributo por Vigor.',
    `Ao fazer um teste de Precisão com um **módulo de arma**, você pode substituir um dos atributos por **Vigor** (por exemplo, (VIG + VON) para um módulo arcano).`,
  ),

  skill(
    CLASS,
    'Veículo Pessoal',
    159,
    5,
    'Você recebe um veículo pessoal com estrutura à sua escolha e três módulos; cada novo nível dá mais dois módulos.',
    `Ao adquirir este poder, você recebe um **veículo pessoal** com uma **estrutura** à sua escolha (exoesqueleto, mecha ou montaria) e **três módulos diferentes** à sua escolha. Sempre que o adquirir de novo, ganha **dois módulos adicionais**.

Regras completas de estruturas, módulos, dano e conserto estão no corpo da classe [[piloto]].`,
  ),
];
