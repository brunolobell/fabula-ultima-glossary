import { rule } from './helpers';
import { SeedEntry } from './types';

/** Rules read before and while the Table creates its World and Party. */
export const gameSetupRules: SeedEntry[] = [
  rule(
    'Os Oito Pilares',
    14,
    'Oito traços que todo mundo de Fabula Ultima compartilha, seja qual for o cenário que a mesa invente: um mundo antigo e em perigo, dividido em conflitos, onde tudo tem alma e a trama gira em torno dos heróis.',
    `Não existe um mundo "oficial": cada mesa cria o seu (veja [[criar-um-mundo]]). O que liga todos eles são os **Oito Pilares**. O mundo e os personagens criados devem respeitá-los.

## Os pilares

- **Ruínas antigas e terras inóspitas.** O mundo é velho e perigoso. Cidades e aldeias ficam separadas por planícies, desertos, picos gelados e florestas fechadas, e há fortalezas e santuários de divindades esquecidas. Civilizações antigas deixaram artefatos, lendas e lugares mágicos (e perigosos).
- **Mundo em perigo.** Aldeias, castelos e cidades-estado são das poucas áreas livres de monstros, bandidos e criaturas hostis. Vilões poderosos lançam sua sombra sobre todas as regiões, e há um único horror por trás de tantos perigos, com o qual os heróis um dia vão cruzar.
- **Comunidades em conflito.** Mesmo ameaçado, o povo vive dividido por rixas antigas: cismas religiosos, crimes de guerra, o choque entre magia e ciência. Unir as pessoas é essencial para vencer os vilões, e cabe aos heróis ajudá-las a ver as diferenças como bênçãos.
- **Tudo tem alma.** Tudo o que existe, de criaturas e terra a astros e até entidades tidas como divinas, nasce de um vasto fluxo de energia espiritual e volta a ele. Quem manipula essa energia é uma força digna de nota. Os detalhes variam de mundo a mundo, mas o pilar sustenta temas como coexistência, harmonia e resistência contra chances esmagadoras.
- **Magia e tecnologia.** Ciência e magia são dois modos de estudar a realidade: uma foca na matéria, a outra nas almas que a habitam. Maquinários milagrosos podem estar sob ruínas antigas, e até os magos mais poderosos usam veículos e aeronaves. Muitos mundos têm uma disciplina que combina as duas, a **tecnomagia**.
- **Heróis de todos os tipos.** Os PJs são heróis completos, com habilidades únicas, e suas ações moldam o destino do mundo. Mesmo ladrões e cavaleiros sombrios têm bom coração e fazem a coisa certa quando importa. Não há regra de realismo: criança com poderes incríveis ou guerreiro idoso que enfrenta um exército, o que conta é a força de vontade.
- **Tudo gira em torno dos heróis.** Todo evento relevante se liga, direta ou indiretamente, aos PJs: as reviravoltas acontecem com eles em cena, e as grandes potências (e males) do mundo voltam a atenção para eles. A determinação deles é o que permite o impossível, como derrotar um império ou selar uma divindade.
- **Mistério, descoberta e crescimento.** O jogo é sobre descobrir: mistérios antigos e poderes esquecidos, mas acima de tudo os próprios heróis, seus sentimentos e o que aceitam fazer para enfrentar as trevas. Eles são complexos, às vezes trágicos, e a jornada os muda para sempre.

## Na criação do mundo

Ao criar o cenário (Livro Básico, p. 148), dê atenção especial a três pilares:

- **Almas.** Toda vida e não vida está ligada pelo rio das almas. Alguns mundos têm máquinas movidas por almas; em outros, a corrupção espiritual gera criaturas monstruosas. Decida com a mesa o que as pessoas sabem sobre as almas.
- **Conflitos e injustiças.** As culturas do mundo não conseguiram se unir por uma causa. As motivações podem vir de rivalidades centenárias, disputas ideológicas ou religiosas, desentendimentos ou a crueldade de uma nação contra outra. Inspirar-se no mundo real ajuda.
- **Um mundo fantástico e diverso.** Não se preocupe com realismo, verossimilhança ou precisão histórica: uma cidade-estado de inspiração grega pode fazer fronteira com uma fortaleza voadora, ser guardada por guerreiros de armaduras Song e praticar alquimia renascentista. O que importa é que cada lugar traga os temas e emoções da história.`,
    ['mundo', 'criação', 'pilares'],
  ),

  rule(
    'Antes de começar (sessão zero)',
    144,
    'A sessão zero reúne a mesa para combinar o que ela quer do jogo antes de criar mundo e personagens: tempo e frequência, tom e temas, nível de desafio e as linhas e véus de cada pessoa.',
    `## Sessão zero

O capítulo "Aperte Start" pode ser lido sozinho, mas as etapas seguintes pedem a **mesa inteira reunida**. Esse encontro é a **sessão zero**: nela se definem os princípios do cenário, os temas das aventuras e os heróis que vão surgir.

- Para o **mestre**, é a chance de conhecer os PJs e pensar em situações, locais e antagonistas: pergunte e anote bastante.
- Para os **jogadores**, é a hora de cooperar na criação do mundo e dos personagens e de trazer ideias, como uma estética, uma tecnologia mágica ou um grande perigo.

As etapas (mundo, grupo, personagens) vêm numa ordem, mas **dá para voltar e mudar escolhas** a qualquer momento: marcar um lugar novo no mapa enquanto cria seu personagem, ou concluir que o grupo se encaixa melhor em outro tipo. Levem o tempo que precisarem.

Antes de criar o mundo e os personagens, a mesa conversa sobre os pontos abaixo (Livro Básico, p. 146-147).

## Comprometimento e expectativas

Combinem o tempo e o esforço que cada pessoa pode dar, para evitar problemas depois:

- A mesa joga um número fechado de sessões ou começa e vê até onde vai a história?
- Com que frequência: toda semana, a cada duas semanas, uma vez por mês?
- O jogo foi pensado para sessões de cerca de **quatro horas**. Se as da mesa forem mais curtas ou longas, lembre-se de conferir a EXP mais ou menos a cada quatro horas (veja [[nivel-e-experiencia]]).
- Se faltar alguém, a sessão é remarcada ou se joga assim mesmo? E o que acontece com o personagem de quem falta? O livro dá sugestões na página 143.

## Tom e temas

O jogo é amplo e o tom muda conforme o mundo. Como a narração é coletiva, todos precisam concordar, ou ao menos ter uma base sólida, e dá para rever isso mais tarde.

- Que tom a mesa quer: um conto dramático, com situações e emoções complexas, ou uma fantasia em que bem e mal são fáceis de distinguir?
- Há temas que alguém queira explorar?
- Os heróis são amigos desde o início? Tudo bem haver crises e desentendimentos no grupo, e como resolvê-los?
- Nas descrições de cenas e ações, tudo bem exagerar como nos animes, ou a mesa prefere algo mais heroico e fantástico?

O livro traz sugestões na página 141.

## Desafio e regras

Dá para ajustar as regras e o nível de desafio.

- A mesa vai usar alguma regra opcional? Veja as de conflito (Livro Básico, p. 82) e as de avanço (p. 230).
- Quer um jogo mais "hardcore", focado em otimizar personagens e com adversários extremamente duros, ou uma experiência tranquila, com pouco foco em regras? **Todos precisam saber e concordar**, porque expectativas diferentes podem estragar a experiência.

## Linhas e véus

RPG é envolvente, e isso também nos deixa vulneráveis. Conversem sobre descrições, situações, cenas e elementos que causam desconforto. Cada pessoa deve apontar as **linhas e véus** que quer aplicar nas sessões (o livro os explica na página 140). Pode ser feito de forma anônima, para proteger a privacidade de quem participa.

Falem em especial sobre:

- **Violência.** Por padrão, o jogo não prioriza carnificina nem sangue: como nos JRPGs clássicos, a morte aparece como o personagem se ajoelhando ou sumindo numa nuvem de partículas espirituais. Mesmo assim, combinem o que é aceitável.
- **A natureza do mal.** Controle mental, perseguição de minorias e imperialismo violento são comuns em jogos de mesa, mas para algumas pessoas são ameaças reais. Tentem fazer do jogo um espaço seguro.
- **Romance, relacionamentos e sexualidade.** São comuns nos JRPGs. Vejam se todos estão confortáveis com essas interações e até que ponto.

Durante o jogo, qualquer um pode reconsiderar uma decisão: conversem e façam um novo acordo.

Depois desta conversa, a mesa segue para [[criar-um-mundo]].`,
    ['sessão zero', 'mesa', 'criação', 'linhas e véus'],
  ),
];
