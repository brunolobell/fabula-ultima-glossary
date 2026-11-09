import { guide } from './helpers';
import { SeedEntry } from './types';

export const guides: SeedEntry[] = [
  guide({
    name: 'Criar um personagem',
    page: 154,
    summary:
      'Os oito passos do livro para criar um personagem de nível 5, da Identidade ao nome. A ordem é só um roteiro: dá para voltar e mudar escolhas a qualquer momento.',
    body: `Os personagens devem ser criados **juntos**, com o grupo discutindo escolhas mecânicas e narrativas para cobrir uma variedade de arquétipos. O Mestre também participa, incentivando um elenco variado de heróis.

Os passos lembram os da criação de mundo, mas **não precisam seguir uma ordem exata**: você pode voltar e mudar suas escolhas a qualquer momento. Normalmente os personagens são criados no **nível 5**; para PJs de nível mais alto, veja a página 229.`,
    steps: [
      {
        title: 'Identidade',
        intro:
          'Crie uma frase curta que resuma como o personagem se vê no momento.',
        entries: ['tracos'],
      },
      {
        title: 'Tema',
        intro:
          'Crie ou escolha um ideal, emoção ou sentimento forte que dita as ações do personagem.',
        entries: ['tracos'],
      },
      {
        title: 'Origem',
        intro:
          'Crie ou escolha o local de onde o personagem veio. Você pode escolher um da ficha de mundo ou adicionar um novo.',
        entries: ['tracos'],
      },
      {
        title: 'Classes',
        intro:
          'Escolha duas ou três classes e distribua entre elas os cinco níveis iniciais. Anote os benefícios iniciais e os Poderes obtidos.',
        entries: [
          'classes-e-poderes',
          'nivel-e-experiencia',
          'guardiao',
          'elementalista',
        ],
      },
      {
        title: 'Atributos',
        intro:
          'Determine o tipo de dado básico dos quatro Atributos: Destreza, Vigor, Astúcia e Vontade.',
        entries: ['atributos'],
      },
      {
        title: 'Valores iniciais',
        intro:
          'Calcule os valores iniciais de Pontos de Vida, Pontos de Mana, Pontos de Inventário, Defesa, Defesa Mágica e o modificador de Iniciativa.',
        entries: ['pontos-de-vida', 'pontos-de-mana'],
      },
      {
        title: 'Equipamento e dinheiro',
        intro:
          'Use o valor inicial de 500z para comprar equipamentos e some o que sobrar a uma rolagem de 2d6 × 10 para determinar o dinheiro inicial.',
        entries: ['equipamento'],
      },
      {
        title: 'Descrição e nome',
        intro: 'Descreva o personagem e escolha seu nome e pronomes.',
        entries: [],
      },
    ],
  }),

  guide({
    name: 'Como jogar',
    page: null,
    summary:
      'Um roteiro do app pelas regras já resumidas aqui: a ficha, os recursos, o que acontece quando as coisas apertam e como funciona a magia.',
    body: `Este roteiro é uma **seleção do app**, não uma sequência do livro. Ele junta as regras essenciais já resumidas aqui; cada página indica onde ler o texto completo no Livro Básico.`,
    steps: [
      {
        title: 'A ficha do personagem',
        intro:
          'Traços, Laços e Atributos dizem quem o personagem é e no que ele é bom.',
        entries: ['tracos', 'lacos', 'atributos'],
      },
      {
        title: 'Recursos',
        intro:
          'Pontos de Vida, Pontos de Mana e Pontos de Fabula: o que cada um representa e como são gastos.',
        entries: ['pontos-de-vida', 'pontos-de-mana', 'pontos-de-fabula'],
      },
      {
        title: 'Quando as coisas apertam',
        intro:
          'Crise e condições mudam o que o personagem consegue fazer durante um conflito.',
        entries: ['crise', 'condicoes'],
      },
      {
        title: 'Magia',
        intro:
          'Os requisitos e os seis passos para lançar um feitiço, com exemplos na classe Elementalista.',
        entries: ['como-lancar-um-feitico', 'elementalista'],
      },
      {
        title: 'Equipamento',
        intro:
          'Quatro categorias de itens, básicos ou raros, e o que significa um item ser marcial.',
        entries: ['equipamento'],
      },
    ],
  }),
];
