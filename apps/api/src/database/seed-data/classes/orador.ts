import { classEntry, skill } from '../helpers';
import { SeedEntry } from '../types';

const CLASS = 'Orador';

export const orador: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 216,
    summary:
      'Mestre da palavra que lê emoções e reúne aliados: reacende a coragem dos amigos ou semeia o desespero nos inimigos, às vezes sem querer.',
    body: `Alguns Oradores são graciosos e de sorriso fácil, outros são sutis e perspicazes, mas todos são igualmente habilidosos em ler emoções e reunir aliados em prol de suas causas, às vezes sem querer.

As palavras de um Orador podem reacender a coragem ou causar desespero nos oponentes. Ao longo dos séculos, os talentos de alguns levaram nações inteiras à ruína, da mesma forma que muitos fizeram ressurgir reinos antes destruídos.

## Para pensar no personagem

- Você acha que qualquer um pode ser persuadido? Todos têm um preço?
- Você foi traído por alguém que parecia estar do seu lado. Quem era?
- Como você se sente ao manipular pessoas, ainda que por uma boa causa?
- No passado, suas palavras colocaram você em apuros. O que aconteceu?`,
    otherNames: ['Artista', 'Diplomata', 'Embaixador'],
    quote:
      'Palavras só servem de algo se as ações subsequentes também servirem.',
    freeBenefits: ['Aumenta permanentemente seus PM máximos em 5.'],
  }),

  skill(
    CLASS,
    'Aliado Inesperado',
    217,
    1,
    'Com uma ação e 1 Ponto de Fabula, você escolhe uma criatura não hostil que possa ouvir e entender você: ela se torna solícita, desde que seja tratada com respeito e gentileza e os pedidos sejam razoáveis.',
  ),

  skill(
    CLASS,
    'Condenar',
    217,
    4,
    'Com uma ação e 5 PM, você faz um teste oposto de (AST + VON) contra um inimigo que ouve e entende suas acusações; em caso de sucesso, ele perde (NP × 10) PM, fica abalado ou atordoado à sua escolha e sofre (NP) de dano adicional de todas as fontes.',
    `Você pode usar uma **ação** e **5 PM** para fazer um **teste oposto** de **(AST + VON)** contra um inimigo capaz de ouvir e entender suas acusações. Você recebe um bônus igual a **(NP)** nesse teste.

Em caso de sucesso:

- o inimigo perde **(NP × 10) PM**;
- você escolhe se ele fica **abalado** ou **atordoado**; e
- todas as fontes causam **(NP)** pontos de dano adicional a esse inimigo até o início do seu próximo turno.`,
  ),

  skill(
    CLASS,
    'Confio em Você',
    217,
    2,
    'Quando outro PJ que ouve você faz um teste, você pode gastar 1 Ponto de Fabula para evocar um Traço ou Laço dele; se você tem um Laço com esse personagem, ele recupera (NP × 10) PM.',
    `Quando outro PJ capaz de ouvir você faz um teste, você pode gastar **1 Ponto de Fabula** para evocar um dos **Traços** ou [[lacos]] **dele**, permitindo que ele role os dados de novo ou melhore o resultado do teste (seguindo as regras normais).

Em seguida, se você tem um Laço com esse personagem, ele recupera **(NP × 10) PM**.`,
  ),

  skill(
    CLASS,
    'Encorajar',
    217,
    6,
    'Com uma ação e 5 PM, um aliado que vê e entende você recupera (NP × 5) PV e escolhe um Atributo, cujo dado atual conta como um passo maior até o início do seu próximo turno.',
    `Você pode usar uma **ação** e gastar **5 PM** para escolher um aliado que possa ver e entender você. Esse aliado:

- recupera **(NP × 5) PV**; e
- escolhe Destreza, Vigor, Astúcia ou Vontade: até o início do seu próximo turno, o dado atual desse Atributo é considerado **um passo maior** (máximo de d12).`,
  ),

  skill(
    CLASS,
    'Persuasivo',
    217,
    2,
    'Ao passar em um teste para preencher ou apagar seções de um relógio usando charme, diplomacia, enganação ou intimidação, você pode gastar até (NP × 20) PM para preencher ou apagar uma seção adicional a cada 20 PM.',
    `Quando você passa em um teste para **preencher ou apagar** seções de um relógio (veja [[relogios]]), se sua abordagem envolveu **charme, diplomacia, enganação ou intimidação**, pode gastar até **(NP × 20) PM**. Se fizer isso, preencha ou apague **uma seção adicional** desse relógio para cada **20 PM** gastos.`,
  ),
];
