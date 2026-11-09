import { rule } from './helpers';
import { SeedEntry } from './types';

export const rules: SeedEntry[] = [
  rule(
    'Traços',
    34,
    'Todo personagem tem três Traços — Identidade, Tema e Origem — que o definem na história e podem ser evocados para aumentar a chance de sucesso em um teste.',
    `## Os três Traços

- **Identidade.** Uma frase curta que resume o conceito do personagem, como "pirata celeste" ou "cavaleiro sem rainha". Pode ser trocada depois, se o personagem evoluir além dela.
- **Tema.** Um ideal ou sentimento forte que move as ações do personagem, como Raiva, Justiça ou Ambição. Também pode mudar ao longo do jogo.
- **Origem.** A terra natal do personagem.

Você escolhe os Traços na criação do personagem. Durante o jogo, pode **evocá-los** para aumentar sua chance de sucesso ao rolar dados, gastando [[pontos-de-fabula]].

Os [[lacos]] funcionam de forma parecida.`,
    ['personagem', 'criação'],
  ),

  rule(
    'Laços',
    35,
    'Um Laço liga seu personagem a outra pessoa por até três emoções; quanto mais emoções, mais forte o Laço (máximo 3). Ele pode ser evocado para melhorar testes.',
    `## Emoções

Cada Laço pode ter até três emoções, no máximo uma de cada par:

- Admiração **ou** inferioridade;
- Lealdade **ou** desconfiança;
- Afeto **ou** ódio.

## Força

A **força** de um Laço é o número de emoções que ele tem, até o máximo de 3.

> **Exemplo:** um Laço de inferioridade e lealdade com a princesa Safira tem força 2. Se depois surgir afeto por ela, a força passa a 3.

## Evocar e limite

Assim como os [[tracos]], os Laços podem ser **evocados** para melhorar suas rolagens e sua capacidade de ajudar companheiros. Um personagem pode ter até **seis** Laços ao mesmo tempo.

O livro trata dos Laços em detalhe na página 56.`,
    ['personagem', 'criação', 'narrativa'],
  ),

  rule(
    'Pontos de Fabula',
    35,
    'Moeda de troca poderosa: você os ganha ao superar adversidades e os gasta para evocar Traços e Laços, reforçar efeitos especiais ou acrescentar elementos à história.',
    `## Como funcionam

- **Ganhar.** Você recebe Pontos de Fabula ao superar adversidades.
- **Gastar.** Eles pagam a evocação de [[tracos]] e [[lacos]] e melhoram uma variedade de efeitos especiais.
- **Moldar a história.** Jogadores também podem gastá-los para apresentar novos elementos na história e moldar o mundo ao redor de seus personagens.

O livro detalha esse recurso na página 96.`,
    ['recurso', 'narrativa'],
  ),

  rule(
    'Nível e Experiência',
    35,
    'O nível mostra o poder do personagem: os PJs costumam começar no nível 5 e chegar ao 50, subindo ao acumular EXP, em média um nível a cada duas sessões.',
    `- Os PJs geralmente começam suas aventuras no **nível 5** e podem chegar ao **nível 50**.
- Para subir de nível, é preciso acumular **experiência (EXP)** suficiente; a média é **um nível a cada duas sessões**.
- A cada nível, o personagem avança em uma [[classes-e-poderes]].

A progressão completa está na página 226.`,
    ['personagem', 'progressão'],
  ),

  rule(
    'Atributos',
    36,
    'Quatro Atributos — Destreza, Vigor, Astúcia e Vontade — medem o treinamento do personagem, cada um representado por um dado de d6 a d12.',
    `## Os quatro Atributos

- **Destreza (DES).** Precisão, coordenação, agilidade e reflexos. Usada para se mover com cuidado, defender-se de ataques, criar objetos e lutar com armas leves, arcos e armas de fogo.
- **Vigor (VIG).** Capacidade física e robustez. A maioria das armas pesadas exige Vigor. Também ligado à resistência a dor e fadiga, por meio dos [[pontos-de-vida]].
- **Astúcia (AST).** Observação, compreensão e raciocínio. Importante para investigar situações, lançar feitiços e se defender de magia.
- **Vontade (VON).** Determinação, carisma e disciplina. Usada em diplomacia e persuasão, e influencia indiretamente os feitiços e poderes por meio dos [[pontos-de-mana]].

## Dados

Cada Atributo é um dado, do de seis lados (**d6**) ao de doze lados (**d12**).

- O **dado básico** é o que está na ficha.
- O **dado atual** é o dado em uso no momento, que alguns efeitos podem alterar temporariamente, como as [[condicoes]].`,
    ['personagem', 'criação'],
  ),

  rule(
    'Classes e Poderes',
    36,
    'A cada nível, o personagem avança em uma das 15 classes do livro (nova ou já obtida) e escolhe seus Poderes; alguns Poderes podem ser tomados várias vezes, aumentando o NP.',
    `## Classes

Sempre que o personagem sobe de nível, você pode progredir em uma das **quinze classes** do livro: desenvolver uma que já tem ou começar uma nova. Cada classe apresenta vários poderes e habilidades, e você escolhe em quais investir. Dois personagens com as mesmas classes podem ser bem diferentes na construção e no jogo.

## Nível de poder (NP)

Alguns Poderes podem ser escolhidos várias vezes, ficando mais fortes ou flexíveis. A cada nova escolha, o **nível de poder (NP)** daquele Poder aumenta. Um Poder marcado com o símbolo de repetição e um número, como (5), pode ser obtido até esse número de vezes.

> **Exemplo:** se você escolher duas vezes o Poder [[fortaleza]] do Guardião, seu NP nele é 2.

As classes e seus Poderes começam na página 176.`,
    ['personagem', 'classes'],
  ),

  rule(
    'Pontos de Vida',
    84,
    'Medem a energia vital e o espírito de luta do personagem, não sua integridade física. Quando chegam a 0, o espírito de luta se quebra.',
    `Abreviados como **PV**, os Pontos de Vida indicam a energia vital, o espírito de luta e a saúde geral do personagem, além da capacidade de aguentar dor e fadiga. Perder PV não significa necessariamente sofrer ferimentos graves: pense nos PV como um "escudo" que protege o personagem do golpe final.

## Valores

- **PV atuais.** Quanto o personagem tem agora. Nunca menos que 0 nem mais que os PV máximos.
- **PV máximos.** O teto dos PV atuais.

> **Exemplo:** com PV máximos 50 e PV atuais 40, um item que restaura 60 PV deixa o personagem com 50 PV, não com 100.

## Gastar PV

Alguns efeitos exigem que você **gaste** PV. Só é possível se isso não reduzir seus PV a 0: para gastar 30 PV, é preciso ter pelo menos 31. Gastar PV não conta como "perder" Pontos de Vida.

## Chegar a 0 PV

O espírito de luta do personagem é quebrado. As consequências dependem do papel na história: PJ, vilão ou NPC comum (veja a página 87).

Veja também a [[crise]].`,
    ['recurso', 'combate'],
  ),

  rule(
    'Crise',
    84,
    'Um personagem está em crise quando seus PV atuais são iguais ou inferiores à metade dos PV máximos (arredondada para baixo); alguns efeitos só se ativam ou só valem nesse estado.',
    `O valor de **Crise** é igual à metade dos [[pontos-de-vida]] máximos do personagem, **arredondada para baixo**. Se seus PV atuais forem iguais ou inferiores a esse valor, você está **em crise**.

> **Exemplo:** um personagem com 65 PV máximos fica em crise com 32 PV ou menos.

Alguns efeitos de jogo se ativam quando o personagem entra em crise; outros permanecem ativos apenas enquanto ele estiver em crise.`,
    ['combate', 'estado'],
  ),

  rule(
    'Pontos de Mana',
    85,
    'Medem a força interna e a concentração do personagem; são gastos para lançar feitiços e usar diversas habilidades.',
    `Abreviados como **PM**, os Pontos de Mana medem a força interna, o potencial mágico e a capacidade de concentração do personagem. Costumam ser gastos para aprimorar magias ou realizar feitos heroicos quase sobre-humanos.

## Valores

- **PM atuais.** Quanto o personagem tem agora. Nunca menos que 0 nem mais que os PM máximos.
- **PM máximos.** O teto dos PM atuais.

## Gastar PM

Feitiços e várias outras habilidades exigem que você gaste PM. Só é possível se você tiver PM suficientes para pagar o custo completo: não dá para lançar um feitiço de 10 PM com apenas 9 PM. Gastar PM não conta como "perder" Pontos de Mana.

## Chegar a 0 PM

O personagem fica mentalmente exausto, mas não sofre outra consequência além de não poder usar magias e habilidades que consomem PM.`,
    ['recurso', 'magia'],
  ),

  rule(
    'Condições',
    94,
    'Seis condições — Abalado, Atordoado, Enfurecido, Envenenado, Fraco e Lento — reduzem temporariamente um ou mais dados de Atributo.',
    `Personagens dos jogadores e NPCs podem sofrer condições, em geral como consequência de ataques e feitiços.

| Condição | Efeito |
| --- | --- |
| **Abalado** | Reduz temporariamente o dado de Vontade em um. |
| **Atordoado** | Reduz temporariamente o dado de Astúcia em um. |
| **Enfurecido** | Reduz temporariamente os dados de Destreza e Astúcia em um. |
| **Envenenado** | Reduz temporariamente os dados de Vigor e Vontade em um. |
| **Fraco** | Reduz temporariamente o dado de Vigor em um. |
| **Lento** | Reduz temporariamente o dado de Destreza em um. |

## Condições cumulativas

Condições diferentes que afetam o mesmo Atributo se acumulam.

> **Exemplo:** atordoado e enfurecido juntos reduzem o dado de Astúcia em dois.

Os [[atributos]] nunca ficam com um dado menor que **d6**. Se o personagem já tem uma condição e é afetado por ela de novo, nada acontece.

## Recuperação

As condições podem ser curadas com descanso, feitiços, poderes e itens.`,
    ['estado', 'combate'],
  ),

  rule(
    'Como lançar um feitiço',
    115,
    'Para lançar um feitiço é preciso se mover e falar livremente, ter PM para o custo total e ver os alvos; depois, seis passos levam da declaração ao efeito.',
    `## Requisitos

Para lançar um feitiço, o personagem precisa cumprir **todos** estes requisitos:

- Conseguir mover o corpo livremente. Pode estar segurando itens, desde que consiga mover os braços.
- Poder falar e pronunciar a invocação.
- Ter [[pontos-de-mana]] suficientes para o **custo total de PM** do feitiço, incluindo qualquer PM adicional gasto para aprimorar o efeito.
- Estar vendo os alvos, a menos que o feitiço tenha alvo **pessoal** ou **especial**.

## Passo a passo

1. Declare qual feitiço o personagem quer lançar, dentre os que aprendeu, e qual efeito ele causa.
2. Defina, se necessário, os alvos.
3. Descreva como o personagem faz os gestos mágicos e pronuncia a fórmula. Criaturas próximas verão e escutarão.
4. Gaste a quantidade necessária de PM.
5. Se o feitiço for **ofensivo**, faça um **teste de Magia**.
6. Aplique os efeitos do feitiço.

## Teste de Magia

- Elementalismo, entropismo e espiritualismo usam **(AST + VON)**.
- Quimerismo usa **(AST + VON)** ou **(VIG + VON)**, à sua escolha.
- Feitiços **não ofensivos** têm sucesso automático, sem teste.
- Falhas críticas e sucessos críticos no teste de Magia geram **oportunidades** normalmente.`,
    ['magia', 'feitiços'],
  ),

  rule(
    'Equipamento',
    126,
    'Há quatro categorias de itens equipáveis — acessórios, armaduras, armas e escudos —, básicos ou raros; itens marciais só podem ser equipados por certas classes.',
    `## Categorias

Os itens equipáveis são de quatro categorias: **acessórios**, **armaduras**, **armas** e **escudos**. Cada item pode ser **básico** ou **raro**, exceto os acessórios, que são **sempre raros**.

## Itens marciais

Itens com o ícone de marcial só podem ser equipados por personagens de certas classes:

- **Guerreiros Sombrios:** armas corpo a corpo e armaduras marciais.
- **Furiosos:** armas corpo a corpo e armaduras marciais.
- **Guardiões** ([[guardiao]]): armaduras e escudos marciais.
- **Atiradores:** armas à distância e escudos marciais.
- **Mestres de Armas:** armas corpo a corpo e escudos marciais.

Quem não tem a classe adequada ainda pode **carregar** itens marciais, mas não pode equipá-los nem usar seus benefícios.

## Acessórios

Acessórios são itens mágicos que concedem características especiais a quem os equipa. Cada um traz o nome, o custo em zênites (z) e as características concedidas.

> **Exemplo:** o Elmo de crista custa 1.000z e dá +1 em testes de Precisão.

Há uma lista de acessórios de exemplo nas páginas 285 a 287.`,
    ['equipamento', 'itens'],
  ),

  rule(
    'Projetos',
    134,
    'Regra de criação de invenções (poções, golens, aeronaves…) para personagens Inventores: o custo sai de potência × área × uso e o projeto avança 1 ponto de progresso por dia por PJ (mais 1 por Inventor) até chegar a custo ÷ 100.',
    `Assim como conjuradores têm a magia ritualística, personagens [[inventor]] podem iniciar **projetos** e trabalhar em invenções personalizadas, de poções do amor a aeronaves. O Inventor ganha o direito de iniciar Projetos na classe; a regra em si vale para qualquer PJ que ajude no trabalho.

## Passo a passo

1. **Descreva a invenção.** Diga o que ela faz, como é operada, que energia usa e quais benefícios específicos oferece. O mestre tem a palavra final sobre ser possível criá-la naquelas circunstâncias.
2. **Divida, se for complexo.** Uma invenção muito complexa (uma moto tecnomágica que é veículo e arma ao mesmo tempo) pode ser separada pelo mestre em duas ou mais invenções, cada uma com seu próprio projeto.
3. **Defina o custo.** Com as tabelas de potência, área e uso, o mestre determina o **custo total em materiais**, pago na hora. Em invenções de potência **média ou maior**, ele também descreve um ingrediente ou material especial que não pode ser comprado: consegui-lo deve ser o foco de uma ou duas sessões.
4. **Defeito (opcional).** Você pode negociar com o mestre um defeito terrível (recarga constante, peso, barulho, pouca confiabilidade). Ele **reduz o custo do projeto em 25%**.
5. **Acumule progresso.** Para concluir, é preciso somar progresso igual a **um centésimo do custo em zênites** (mínimo de 1). Ao fim de cada dia, o projeto avança:
   - +1 de progresso por PJ que trabalhou nele;
   - +1 de progresso extra por PJ com pelo menos um nível de Inventor que trabalhou nele.
6. **Invenção pronta.** Ao atingir o progresso necessário, a invenção é criada. Se num mesmo dia o grupo gerar mais progresso do que o necessário, ela fica pronta em uma ou duas horas.

## Custo: potência, área e uso

**Custo total = custo base da potência × multiplicador de área × multiplicador de uso** (e depois −25% se houver defeito).

| Potência | Custo base | A invenção pode… |
| --- | --- | --- |
| Menor | 100z | Iluminar, transportar pessoas ou carga por terra ou água, dar uma pequena proteção. |
| Média | 200z | Viajar submersa, suprimir um efeito mágico, emitir sons ou fala, executar uma operação específica no lugar do inventor, fornecer energia a curto prazo. |
| Maior | 400z | Voar, alterar a natureza de uma área por pouco tempo, cancelar efeitos de um feitiço, ter inteligência rudimentar, lutar ao lado do inventor, fornecer energia a longo prazo, capturar ou imobilizar o alvo. |
| Extrema | 800z | Alterar a natureza de uma área por um longo período, suprimir o poder de um demônio, evitar uma catástrofe, ter inteligência e personalidade completas. |

| Área | Multiplicador | A invenção afeta… |
| --- | --- | --- |
| Individual | ×1 | Uma criatura de tamanho humano, uma porta, uma árvore, uma arma. |
| Pequena | ×2 | Um grupo de criaturas de tamanho humano, uma criatura grande, uma pequena clareira, um vagão de trem, uma cabana. |
| Grande | ×3 | Uma multidão, uma pequena floresta, uma aeronave ou galeão, um salão de castelo, uma casa, uma criatura gigante. |
| Enorme | ×4 | Uma fortaleza, um lago, um cume de montanha, uma aldeia, um quarteirão. |

| Uso | Multiplicador | Depois de ativada, a invenção… |
| --- | --- | --- |
| Consumível | ×1 | Não pode ser usada de novo, a menos que o criador faça uma cópia. |
| Permanente | ×5 | Fica disponível para vários usos e situações. |

> **Exemplo:** uma grande aeronave para cinquenta pessoas é potência Maior (400z), área Grande (×3) e uso Permanente (×5): 400 × 3 × 5 = **6.000z**, ou seja, **60 de progresso**, sem defeito.

## Dano e proteção

O mestre decide a potência de qualquer invenção, usando esta tabela como guia para itens que ajudam em batalha:

| Potência | Dano | Cura | Proteção |
| --- | --- | --- | --- |
| Menor | indisponível | indisponível | Uma Resistência (somente consumíveis) |
| Média | Fraco | Forte | Uma Resistência |
| Maior | Forte | Intenso | Uma Imunidade ou duas Resistências |
| Extrema | Intenso | Intenso +20 | Duas Imunidades ou três Resistências |

- Evite criar invenções que deem Imunidade a dano físico.
- Um projeto com efeitos mistos (por exemplo, dar Resistência a um tipo de dano e também causar dano) deve ser dividido em mais de um projeto.

Os valores de dano e cura dependem do **nível atual do criador**:

| Nível | Fraco | Forte | Intenso |
| --- | --- | --- | --- |
| 5+ | 10 | 30 | 40 |
| 20+ | 20 | 40 | 60 |
| 40+ | 30 | 50 | 80 |

## Materiais

Você pode pagar o custo do projeto com materiais preciosos obtidos nas aventuras, conforme o mestre aceitar. O ingrediente especial exigido pela potência da invenção (passo 3) **não** pode ser usado também para pagar o custo.

## Ajudantes

Para progredir mais rápido, ou para o projeto andar sem a presença do criador, é possível contratar ajudantes.

- Cada ajudante exige pagamento igual à **metade do custo total** do projeto (alguns ajudam de graça, por gratidão ou gentileza).
- Ao fim de cada dia, cada ajudante gera **+1 de progresso**.

## Como usar Projetos

- As regras são leves e flexíveis, não realistas nem à prova de falhas: servem para que inventores criem soluções heroicas, não itens comuns, e sem atrapalhar a progressão do jogo.
- Projetos não devem conflitar com a narrativa: devem ajudar na missão do grupo, e não virar um minijogo separado nem um jeito de "quebrar" o sistema.
- Prefira projetos que possam ser feitos durante uma Viagem, narrando o avanço em cenas de interlúdio.
- Projetos caros costumam ser inviáveis por falta de tempo ou recursos: foque em consumíveis mais baratos e em apoiar o grupo com os demais Poderes.

O Poder [[visionario]] acelera projetos e paga parte do custo de materiais.

## Exemplos do livro

| Invenção | Potência | Área | Uso | Custo | Progresso | Defeito |
| --- | --- | --- | --- | --- | --- | --- |
| Aeronave "Descoberta" | Maior | Grande | Permanente | 6.000z | 60 | não |
| Metralhagolem (arma flutuante semi-inteligente que causa dano físico fraco no fim do turno do criador) | Maior | Individual | Permanente | 1.500z | 15 | sim |
| Botas magnéticas (andar em superfícies metálicas, inclusive paredes e teto) | Média | Individual | Permanente | 1.000z | 10 | não |
| Traje tecnomágico (armadura de quatro patas) | Média + Média | Individual | Permanente | 1.750z | 17 | sim |

O traje tecnomágico é dividido pelo mestre em dois projetos, a armadura (Resistência a dano físico) e o canhão de calor (dano fraco de fogo, com teste de Precisão de (DES + AST)). O criador aceitou Vulnerabilidade a dano de raio como defeito em um deles para baratear o custo.`,
    ['invenção', 'inventor', 'criação'],
  ),

  rule(
    'Domínio de classe',
    227,
    'Ao investir o 10º nível numa classe, o personagem a domina e escolhe um Poder Heroico; não pode mais pôr níveis nela, e só pode ter três classes não dominadas ao mesmo tempo.',
    `## Dominar uma classe

Uma classe tem no máximo **dez níveis**. Ao investir o décimo, o personagem **domina** a classe: ela fica fechada a novos níveis e ele escolhe um **Poder Heroico** da lista (veja a página 232 do Livro Básico e a lista "Novos Poderes Heroicos" de cada Atlas).

O Poder Heroico é uma **adição** ao Poder de classe que o personagem ganha normalmente ao investir aquele décimo nível.

## Limite de classes abertas

Um personagem **não pode ter mais de três classes não dominadas** ao mesmo tempo. Para diversificar além disso, ele precisa primeiro dominar uma das classes que já tem.

## Requisitos dos Poderes Heroicos

Muitos Poderes Heroicos exigem dominar uma classe específica (ou uma entre várias), e alguns exigem também um Poder ou Feitiço, ou um nível mínimo. Os poucos sem requisito servem a qualquer personagem.

Veja também [[classes-e-poderes]] e [[nivel-e-experiencia]].`,
    ['personagem', 'progressão', 'poder heroico'],
  ),
];
