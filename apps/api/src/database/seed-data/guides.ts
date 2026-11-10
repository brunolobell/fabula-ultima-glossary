import { guide } from './helpers';
import { SeedEntry } from './types';

export const guides: SeedEntry[] = [
  guide({
    name: 'Criar um mundo',
    order: 1,
    page: 148,
    summary:
      'Os sete passos do livro para a mesa criar o seu mundo: forma, mapa, magia e tecnologia, reinos, eventos históricos, mistérios e ameaças. Antes deles, a conversa da sessão zero.',
    body: `O primeiro passo do jogo é a **criação compartilhada do mundo** (também chamado de "cenário") onde os personagens vão se aventurar. O mestre e os jogadores criam, juntos, a base para heróis, antagonistas, criaturas e eventos. Você vai precisar da **ficha de mundo** e da **ficha de mapa**.

Dê um nome ao cenário, mesmo que seja simples, como Terra, Gaia ou O Planeta. Todo mundo de Fabula Ultima segue os [[os-oito-pilares]]; dê atenção especial a **Almas**, **Conflitos e injustiças** e **Um mundo fantástico e diverso**.

Os passos abaixo estão numa ordem intuitiva, mas você pode voltar e ajustar o que quiser. Quando um passo diz que "cada pessoa deve contribuir com um elemento", isso não significa criar tudo sozinho: o diálogo e a comunicação são parte essencial do jogo.

> **Exemplo:** o grupo de Roberto cria uma terra nos primeiros passos da industrialização, onde a magia está ligada à linhagem de sangue.

O livro traz tabelas de ideias para quando a mesa travar (p. 149-151); elas ainda não estão resumidas aqui.`,
    steps: [
      {
        title: 'Antes de começar',
        intro:
          'Na sessão zero, a mesa combina tempo, tom, nível de desafio e as linhas e véus de cada pessoa.',
        entries: ['antes-de-comecar-sessao-zero'],
      },
      {
        title: 'Formato do mundo',
        intro:
          'Escolham a forma do mundo: redondo, plano, com regiões flutuantes entre as nuvens ou em rosquinha, como nos JRPGs clássicos. A forma pode até ainda não ter sido descoberta.',
        entries: [],
      },
      {
        title: 'Ficha de mapa',
        intro:
          'Escolham uma ficha de mapa que combine com o conceito (ou desenhem um mapa próprio, deixando espaço para assentamentos e locais) e definam quanto dura um dia de Viagem no mapa (Livro Básico, p. 106).',
        entries: [],
      },
      {
        title: 'Magia e tecnologia',
        intro:
          'Qual é o papel da magia e da tecnologia? É uma era industrial ou algo mais renascentista? A magia é vista como ciência ou como um grande mistério?',
        entries: ['os-oito-pilares'],
      },
      {
        title: 'Reinos e nações',
        intro:
          'Criem os principais reinos e nações, tracem as fronteiras no mapa e definam as relações entre eles: confiança, alianças frágeis ou conflito aberto. Cada pessoa contribui com pelo menos um reino ou nação, com costumes, crenças, indústrias, habitantes e criaturas.',
        entries: [],
      },
      {
        title: 'Eventos históricos',
        intro:
          'Discutam os eventos que moldaram o mundo. Cada pessoa contribui com pelo menos um evento importante que mudou a história do cenário de forma dramática.',
        entries: [],
      },
      {
        title: 'Mistérios',
        intro:
          'Quais são os grandes enigmas do mundo? Que perguntas ficaram sem resposta e que verdades já se confundem com lendas? Cada pessoa contribui com pelo menos um mistério que queira explorar nas aventuras.',
        entries: [],
      },
      {
        title: 'Ameaças',
        intro:
          'Quais grandes ameaças assombram o mundo? Podem ser desastres ambientais, deuses furiosos, impérios sedentos por poder ou nuvens de miasma corruptor. Cada pessoa propõe uma, de preferência algo que ameace o futuro de nações inteiras: o mestre vai usá-las como base para a maioria dos vilões e antagonistas.',
        entries: [],
      },
    ],
  }),

  guide({
    name: 'Criar um grupo',
    order: 2,
    page: 152,
    summary:
      'Com o mundo pronto, a mesa escolhe um dos cinco tipos de grupo (Exploradores, Guardiões, Heróis da Resistência, Revolucionários ou Unidos pelo Destino) para definir os temas das primeiras aventuras.',
    body: `Ao contrário da criação de mundo, a criação de grupo **não tem estrutura fixa**. Escolher um tipo de grupo é dizer "é assim que queremos explorar o mundo que criamos; queremos que a história se concentre nestes elementos". A escolha também sugere os **tipos de herói** que serão criados na sessão zero. Veja-a como uma **referência útil** quando faltar ideia de personagem, não como uma restrição.

Vocês podem dar um nome ao grupo, como Guilda da Safira, Irmandade do Grifo ou Escudos da Rainha. Para o mestre, esta é uma ótima chance de descobrir que situações, histórias e antagonistas a mesa quer ver.

## Exploradores

Procuram desesperadamente algo ou alguém: uma bruxa poderosa, uma relíquia antiga, um lugar lendário, uma maravilha tecnológica há muito perdida. O que buscam é a última esperança do mundo, ou pelo menos é nisso que acreditam.

- O que querem evitar ou remediar? O que estão procurando?
- O que sabem sobre a missão? Quem ou o que lhes deu essas informações?
- Quem não quer que encontrem o que procuram?
- O que levou cada um a partir nessa missão?

## Guardiões

Um dos PJs é o **Escolhido**, alguém com uma missão que pode mudar o destino do mundo. Os outros juraram, por dever ou escolha, protegê-lo nas viagens.

- Que laços, ligações ou rivalidades existem entre cada guardião e o Escolhido?
- Qual é a missão? Quem a deu? As autoridades a aprovam?
- O Escolhido precisa de proteção? Quem ou o que ameaça a missão?

## Heróis da Resistência

São a última linha de defesa contra um poder terrível, uma escuridão que ameaça dominar o mundo conhecido, como um reino sedento por poder ou um império opressor. O destino de muita gente está em suas mãos.

- Por que cabe a vocês essa tarefa? Já lutaram contra esse inimigo?
- Que facções famosas os ajudaram? Quais os traíram ou se opuseram?
- Quem são os líderes e seguidores mais infames do inimigo?

## Revolucionários

São uma força pequena lutando com unhas e dentes contra um poder dominante: um governo tirano, uma ocupação militar, uma empresa industrial impiedosa. A sociedade e as forças de segurança provavelmente os tratam como criminosos ou terroristas.

- Que preço os personagens pagaram pela insubordinação?
- Que facções prometeram ajuda? Quais podem se opor a vocês?
- Quais os crimes dos inimigos, e por que ninguém se opõe a eles?

## Unidos pelo Destino

Trabalham juntos por força das circunstâncias. É um clichê das fantasias clássicas e o método **mais difícil**, porque o grupo não tem objetivo preciso: todos precisam montar, durante o jogo, uma rede de relações, e por isso os [[lacos]] ganham muita importância. Ao escolher essa premissa, vale **trocar de tipo de grupo** quando os personagens passarem a ter um objetivo em comum.

- Que conexões emocionais ou familiares existem entre vocês?
- Já se conheciam? Há tensão ou rivalidade?
- O que têm em comum: crenças, inimigos, experiências passadas?`,
    steps: [
      {
        title: 'Escolher o tipo de grupo',
        intro:
          'Conversem sobre a história que querem contar e escolham o tipo de grupo que melhor mostra como vão explorar o mundo criado.',
        entries: [],
      },
      {
        title: 'Responder às perguntas do tipo',
        intro:
          'Cada tipo traz perguntas que firmam os temas das primeiras aventuras. Respondam juntos; no tipo Unidos pelo Destino, isso inclui montar a rede de Laços.',
        entries: ['lacos'],
      },
      {
        title: 'Dar um nome ao grupo',
        intro:
          'Opcional: batizem o grupo, como Guilda da Safira, Irmandade do Grifo ou Escudos da Rainha.',
        entries: [],
      },
      {
        title: 'Usar o tipo como referência para os heróis',
        intro:
          'Com o tipo escolhido, criem os personagens na sessão zero. O tipo sugere conceitos de herói, mas não os limita, e pode mudar depois.',
        entries: ['criar-um-personagem'],
      },
    ],
  }),

  guide({
    name: 'Criar um personagem',
    order: 3,
    page: 154,
    summary:
      'Os oito passos do livro para criar um personagem de nível 5, da Identidade ao nome. A ordem é só um roteiro: dá para voltar e mudar escolhas a qualquer momento.',
    body: `Antes dos personagens, a mesa cria o mundo ([[criar-um-mundo]]) e escolhe o tipo de grupo ([[criar-um-grupo]]).

Os personagens devem ser criados **juntos**, com o grupo discutindo escolhas mecânicas e narrativas para cobrir uma variedade de arquétipos. O Mestre também participa, incentivando um elenco variado de heróis.

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
        entries: ['tracos', 'criar-um-mundo'],
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
        entries: ['equipamento', 'servicos-e-transporte'],
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
    order: 4,
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
          'Pontos de Vida, Pontos de Mana e Pontos de Fabula: o que cada um representa e como são gastos. Os Pontos de Ultima são a reserva dos vilões, do lado do mestre.',
        entries: [
          'pontos-de-vida',
          'pontos-de-mana',
          'pontos-de-fabula',
          'pontos-de-ultima',
        ],
      },
      {
        title: 'Quando as coisas apertam',
        intro:
          'Crise e condições mudam o que o personagem consegue fazer durante um conflito, e os Relógios deixam à vista o avanço de um objetivo ou de um perigo.',
        entries: ['crise', 'condicoes', 'relogios'],
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
        entries: ['equipamento', 'servicos-e-transporte'],
      },
    ],
  }),
];
