import { classEntry, skill, spell } from '../helpers';
import { SeedEntry } from '../types';

const CLASS = 'Elementalista';

export const elementalista: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 186,
    summary:
      'Conjurador que canaliza as almas dos elementos (água, terra, fogo e ar) para causar dano e impor condições, ou para proteger em harmonia com a natureza.',
    body: `Elementalistas aprendem a canalizar as almas que fluem dentro dos elementos básicos da criação: Água, Terra, Fogo e Ar. Alguns desenvolvem feitiços complexos para conter os poderosos elementos da natureza; outros buscam proteção em harmonia e comunhão.

A magia elemental pode ser muito destrutiva, causando dano e impondo condições negativas. Por isso, muita gente cobiça as habilidades de um Elementalista, às vezes para fins maléficos.

Quem lança feitiços precisa seguir as regras de [[como-lancar-um-feitico]].

## Para pensar no personagem

- Quem treinou você no caminho dos Elementos?
- Sua magia pode ser devastadora. Você teme a si mesmo?
- A magia elemental é muito usada na guerra. Você serviu no exército?
- Qual a aparência da sua magia?`,
    otherNames: ['Feiticeiro', 'Geomante', 'Mago de Batalha'],
    quote: 'Ignore os avisos deste mundo por sua conta e risco.',
    traits: ['mp', 'rituals'],
    freeBenefits: [
      'Aumenta permanentemente seus PM máximos em 5.',
      'Pode fazer rituais cujos efeitos pertencem à disciplina de ritualismo.',
    ],
  }),

  skill(
    CLASS,
    'Artilharia Mágica',
    187,
    3,
    'Ao lançar um feitiço ofensivo com uma arma arcana equipada, você recebe bônus de NP × 2 no teste de Magia.',
    'Quando lança um feitiço ofensivo com uma **arma arcana** equipada, você recebe um bônus igual a **(NP × 2)** no teste de Magia.',
  ),

  skill(
    CLASS,
    'Cataclismo',
    187,
    3,
    'Ao lançar um feitiço instantâneo com uma arma arcana equipada, você pode pagar até NP × 10 PM a mais e causar 5 de dano adicional a cada 10 PM acrescentados.',
    'Quando lança um feitiço de duração **instantânea** com uma arma arcana equipada, você pode aumentar o custo total de PM do feitiço em até **(NP × 10) PM**. Se o fizer, o feitiço causa **5 pontos de dano adicional** para cada 10 PM acrescentados dessa forma.',
  ),

  skill(
    CLASS,
    'Elementalismo Ritualista',
    187,
    1,
    'Permite fazer rituais da disciplina elementalismo, que usam (AST + VON) no teste de Magia.',
    'Você pode fazer rituais da disciplina **elementalismo**. Esses rituais usam **(AST + VON)** no teste de Magia.',
  ),

  skill(
    CLASS,
    'Lâmina Mágica',
    187,
    4,
    'Ao lançar um feitiço ofensivo de alvo único com custo total de até NP × 20 PM, você pode usar a fórmula de Precisão de uma arma não arcana equipada no teste de Magia.',
    `Quando você lança um feitiço ofensivo com custo total de PM igual ou inferior a **(NP × 20)** e cujo alvo é uma **única criatura**, pode escolher uma arma equipada que não seja arcana. Nesse caso, seu teste de Magia usa a mesma fórmula do teste de Precisão da arma. Se a fórmula inclui Destreza, você também recebe um bônus igual ao NP no teste de Magia.

> **Exemplo:** com uma [[espada-de-bronze]] e NP 2 neste Poder, o teste de Magia de um feitiço de Elementalista será **(DES + VIG) +3**, em vez de (AST + VON).`,
  ),

  skill(
    CLASS,
    'Magia Elemental',
    187,
    10,
    'A cada vez que adquire este Poder, você aprende um feitiço de Elementalista; os feitiços ofensivos da classe usam (AST + VON) no teste de Magia.',
    `Sempre que adquirir este Poder, você **aprende um feitiço de Elementalista** (veja os feitiços nas páginas 188 e 189).

Os feitiços ofensivos de Elementalista usam **(AST + VON)** no teste de Magia.`,
  ),

  spell(CLASS, {
    name: 'Arma Elemental',
    page: 188,
    mpCost: '10',
    target: 'Uma arma',
    duration: 'Cena',
    summary:
      'Imbui uma arma equipada com energia elemental: você escolhe um tipo de dano e todo o dano da arma passa a ser desse tipo enquanto o feitiço durar.',
    body: `Você imbui a arma com energia elemental. Escolha um tipo de dano: **ar**, **fogo**, **gelo**, **raio** ou **terra**. Enquanto o feitiço durar, todo o dano causado pela arma passa a ser do tipo escolhido.

Se você tiver essa arma equipada ao lançar o feitiço, pode fazer um **ataque livre** com ela como parte da mesma ação.

O feitiço só pode ser lançado em armas equipadas de criaturas voluntárias.`,
  }),

  spell(CLASS, {
    name: 'Clarão',
    page: 188,
    mpCost: '20',
    target: 'Uma criatura',
    duration: 'Instantânea',
    offensive: true,
    summary:
      'Um raio de fogo tão quente que supera as defesas do alvo: causa (RA + 25) pontos de dano de fogo, ignorando Resistências.',
    body: 'Você canaliza um único raio de fogo contra o adversário, causando **(RA + 25)** pontos de dano de **fogo** ao alvo atingido. Esse dano **ignora Resistências**.',
  }),

  spell(CLASS, {
    name: 'Fulgur',
    page: 188,
    mpCost: '10 × A',
    target: 'Até três criaturas',
    duration: 'Instantânea',
    offensive: true,
    summary:
      'Uma onda de raios: causa (RA + 15) pontos de dano de raio a cada alvo atingido; na oportunidade, os alvos ficam atordoados.',
    body: `Você cria uma onda de raios crepitantes, causando **(RA + 15)** pontos de dano de **raio** a cada alvo atingido.

**Oportunidade:** os alvos atingidos também ficam **atordoados**.`,
  }),

  spell(CLASS, {
    name: 'Glacies',
    page: 188,
    mpCost: '10 × A',
    target: 'Até três criaturas',
    duration: 'Instantânea',
    offensive: true,
    summary:
      'Uma camada de gelo cobre os adversários: causa (RA + 15) pontos de dano de gelo a cada alvo atingido; na oportunidade, os alvos ficam lentos.',
    body: `Você cobre os adversários com uma densa camada de gelo, causando **(RA + 15)** pontos de dano de **gelo** a cada alvo atingido.

**Oportunidade:** os alvos atingidos também ficam **lentos**.`,
  }),

  spell(CLASS, {
    name: 'Golpe de Sobrevoo',
    page: 188,
    mpCost: '10',
    target: 'Pessoal',
    duration: 'Instantânea',
    summary:
      'O vento leva seu ataque pelo campo de batalha: um ataque livre com arma corpo a corpo que pode atingir até quem não é alcançável em corpo a corpo.',
    body: `Faça um **ataque livre** com uma arma corpo a corpo equipada. Esse ataque também pode ter como alvo criaturas que não podem ser acertadas por ataques corpo a corpo.

- Se você usou uma arma das categorias **espada**, **lança** ou **luta**, o ataque causa **5 pontos de dano adicional**.
- Um alvo voador atingido é imediatamente forçado a pousar.`,
  }),

  spell(CLASS, {
    name: 'Iceberg',
    page: 188,
    mpCost: '20',
    target: 'Uma criatura',
    duration: 'Instantânea',
    offensive: true,
    summary:
      'Um pilar mágico de gelo envolve o adversário: causa (RA + 25) pontos de dano de gelo, ignorando Resistências.',
    body: 'Um pilar mágico de gelo envolve o adversário e baixa sua temperatura a um nível crítico. Você causa **(RA + 25)** pontos de dano de **gelo** ao alvo. Esse dano **ignora Resistências**.',
  }),

  spell(CLASS, {
    name: 'Ignis',
    page: 189,
    mpCost: '10 × A',
    target: 'Até três criaturas',
    duration: 'Instantânea',
    offensive: true,
    summary:
      'Uma chuva de fogo contra os inimigos: causa (RA + 15) pontos de dano de fogo a cada alvo atingido; na oportunidade, cada alvo fica abalado.',
    body: `Você conjura chamas no ar e libera uma chuva de fogo contra os inimigos, causando **(RA + 15)** pontos de dano de **fogo** a cada alvo atingido.

**Oportunidade:** cada alvo atingido fica **abalado**.`,
  }),

  spell(CLASS, {
    name: 'Mortalha Elemental',
    page: 189,
    mpCost: '5 × A',
    target: 'Até três criaturas',
    duration: 'Cena',
    summary:
      'Protege os alvos contra a fúria dos elementos: você escolhe um tipo de dano e cada alvo fica Resistente a ele enquanto o feitiço durar.',
    body: 'Você manipula energia mágica para proteger os alvos. Escolha um tipo de dano: **ar**, **fogo**, **gelo**, **raio** ou **terra**. Enquanto o feitiço durar, cada alvo fica **Resistente** ao tipo escolhido.',
  }),

  spell(CLASS, {
    name: 'Pedregulho',
    page: 189,
    mpCost: '20',
    target: 'Uma criatura',
    duration: 'Instantânea',
    offensive: true,
    summary:
      'Uma rocha colossal cai sobre o inimigo: causa (RA + 25) pontos de dano de terra, ignorando Resistências.',
    body: 'Você invoca uma rocha colossal contra o inimigo, causando **(RA + 25)** pontos de dano de **terra** ao alvo. Esse dano **ignora Resistências**.',
  }),

  spell(CLASS, {
    name: 'Raio',
    page: 189,
    mpCost: '20',
    target: 'Uma criatura',
    duration: 'Instantânea',
    offensive: true,
    summary:
      'Um relâmpago contra o adversário: causa (RA + 25) pontos de dano de raio, ignorando Resistências.',
    body: 'Você lança um relâmpago contra o adversário, causando **(RA + 25)** pontos de dano de **raio** ao alvo atingido. Esse dano **ignora Resistências**.',
  }),

  spell(CLASS, {
    name: 'Terra',
    page: 189,
    mpCost: '10 × A',
    target: 'Até três criaturas',
    duration: 'Instantânea',
    offensive: true,
    summary:
      'Pináculos de rocha cercam os inimigos: causa (RA + 15) pontos de dano de terra a cada alvo; na oportunidade, os alvos fazem uma ação a menos no próximo turno.',
    body: `Pináculos de rocha irrompem do chão e cercam os inimigos, causando **(RA + 15)** pontos de dano de **terra** a cada alvo atingido.

Criaturas voando, flutuando, caindo ou suspensas no ar de outra forma **não podem ser alvo** deste feitiço.

**Oportunidade:** os alvos atingidos fazem **uma ação a menos** no próximo turno deles (mínimo de zero ações).`,
  }),

  spell(CLASS, {
    name: 'Ventus',
    page: 189,
    mpCost: '10 × A',
    target: 'Até três criaturas',
    duration: 'Instantânea',
    offensive: true,
    summary:
      'O poder dos ventos contra o inimigo: causa (RA + 15) pontos de dano de ar a cada alvo atingido; na oportunidade, alvos voadores são forçados a pousar.',
    body: `Você invoca o poder dos ventos contra o inimigo, causando **(RA + 15)** pontos de dano de **ar** a cada alvo atingido.

**Oportunidade:** alvos voadores atingidos são imediatamente forçados a pousar.`,
  }),

  spell(CLASS, {
    name: 'Vórtice',
    page: 189,
    mpCost: '20',
    target: 'Uma criatura',
    duration: 'Cena',
    offensive: true,
    summary:
      'Ventos de alta pressão contra um inimigo: causa (RA + 25) pontos de dano de ar ao alvo, ignorando Resistências.',
    body: 'Você ataca um inimigo com ventos de alta pressão, causando **(RA + 25)** pontos de dano de **ar** ao alvo. Esse dano **ignora Resistências**.',
  }),
];
