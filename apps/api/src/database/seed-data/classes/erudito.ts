import { classEntry, skill } from '../helpers';
import { SeedEntry } from '../types';

const CLASS = 'Erudito';

export const erudito: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 194,
    summary:
      'Estudioso movido por uma fome insaciável de descobertas, convencido de que conhecimento é poder, e muitas vezes distraído demais para notar as consequências.',
    body: `Eruditos são famosos pela fome insaciável por descobertas. Acreditam de verdade que conhecimento é poder e dariam todo o ouro do mundo pela chance de resolver um bom mistério.

Infelizmente, muitos são desligados e se distraem com facilidade, pouco se preocupando com assuntos "pragmáticos", a ponto de não notarem as consequências sombrias das próprias descobertas.

## Para pensar no personagem

- Quem é ou era seu mentor? Como é ou era a sua relação com essa pessoa?
- Você frequentava uma academia ou escola? Que tipo de gente conheceu lá?
- Há um mistério milenar pelo qual você tem obsessão. Qual?
- É verdade que algumas coisas são melhores se esquecidas pelo tempo?`,
    otherNames: ['Acadêmico', 'Arquivista', 'Sábio'],
    quote: 'Ah, eu sabia que isto aconteceria.',
    freeBenefits: ['Aumenta permanentemente seus PM máximos em 5.'],
  }),

  skill(
    CLASS,
    'Análise Rápida',
    195,
    6,
    'No início de um conflito, você gasta até (NP × 5) PM e, a cada 5 PM, descobre um Traço de uma criatura ou a Afinidade dela a um tipo de dano.',
    `No início de um conflito, você pode gastar até **(NP × 5) PM**. Para cada **5 PM** gastos, escolha uma opção:

- escolha uma criatura que você veja e o Mestre revela **um dos Traços** dela; ou
- escolha um tipo de dano e uma criatura que você veja, e o Mestre revela a **Afinidade** dela ao tipo escolhido.`,
  ),

  skill(
    CLASS,
    'Concentrado',
    195,
    5,
    'Aumenta seus PM máximos em (NP × 3) e dá bônus de (NP) em testes abertos feitos com (AST + AST).',
    `Aumente permanentemente seus PM máximos em **(NP × 3)**.

Ao fazer um **teste aberto** usando **(AST + AST)**, você recebe um bônus igual a **(NP)** nesse teste (funciona apenas em testes abertos).`,
  ),

  skill(
    CLASS,
    'Conhecimento é Poder',
    195,
    1,
    'Em um teste de Precisão, você pode trocar um dos seus dados de Atributo por Astúcia, como (AST + AST) com uma pistola ou (AST + VIG) com um machado de guerra.',
  ),

  skill(
    CLASS,
    'Lampejo de Saber',
    195,
    3,
    'Ao tirar 13 ou mais num teste para investigar uma criatura, item ou local, você pode fazer até (NP) perguntas ao Mestre sobre o assunto; só uma vez por criatura, item ou local.',
    `Quando você tira **13 ou mais** em um teste para investigar uma criatura, item ou local (inclusive na ação **Estudo**), pode fazer até **(NP)** perguntas ao Mestre sobre o tópico da investigação. As perguntas podem ser feitas na hora ou em um momento oportuno no futuro.

O Mestre responde com informações verdadeiras, mas você deve descrever o **processo dedutivo** do seu personagem.

Este Poder só pode ser usado **uma vez** na mesma criatura, item ou local.`,
  ),

  skill(
    CLASS,
    'Memória Treinada',
    195,
    1,
    'Você se lembra com perfeição dos detalhes de qualquer cena da última semana e pode "voltar no tempo" mentalmente para examiná-la de novo; Lampejo de Saber também funciona nessas memórias.',
    `Você pode lembrar com perfeição dos detalhes de qualquer cena em que esteve na **última semana**. Pode "voltar no tempo" dentro da sua mente para examinar ou investigar essas cenas de novo.

O Poder [[lampejo-de-saber]] também pode ser usado nessas memórias.`,
  ),
];
