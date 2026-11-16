import { rule } from './helpers';
import { SeedEntry } from './types';

/**
 * "Magia e Rituais" chapters of the three Atlas: High Fantasy p. 66-73, Natural Fantasy
 * p. 68-71, Techno Fantasy p. 70-75 (and p. 68 for vehicles). The books do not reprint
 * each other here: each gives setting advice for its own genre, with very little
 * mechanics. This is a digest of what changes play; the world-building prose
 * (gods, afterlife, deicide...) is summarised, not transcribed. One Entry, seeded under
 * High Fantasy (its `page` is that book's); the other two books are cited per section.
 */
export const atlasMagicRule: SeedEntry = rule(
  'Magia e Rituais (Atlas)',
  66,
  'Dicas dos três Atlas para usar magia e rituais em cada gênero (High Fantasy, Natural Fantasy e Techno Fantasy): rituais comuns e especiais, reações dos espíritos, magia reinterpretada, rede de almas e Arcanos novos.',
  `Cada Atlas traz um capítulo "Magia e Rituais" com conselhos para o gênero do livro. **As regras de ritual não mudam** ([[rituais]]): são sugestões de narrativa e de ambientação, e um punhado de pontos que mexem em regras. Os Poderes Heroicos [[rituais-ageis]] e [[selos-rituais]] também vêm do Atlas: High Fantasy.

## High Fantasy (p. 66-73)

### Rituais comuns e especiais (p. 73)

Como a magia é central no High Fantasy, os PJs usam rituais para avançar a história. Eles costumam cumprir um de dois papéis:

- **Rituais comuns:** magia cotidiana e discreta, como tochas de cristal na estrada, núcleos elementais nos motores das aeronaves ou golens que cuidam da cidade.
- **Rituais especiais:** eventos raros, ligados ao núcleo da história, como despertar uma maldição antiga, aprisionar um dragão ou provocar uma avalanche que soterre uma aldeia.

Os dois tipos seguem **as mesmas regras**. A diferença é de papel: um ritual especial deve deixar **consequências duradouras** no mundo e na forma como as pessoas veem a magia.

### Arcanos e invocações (p. 66-70)

- Em mundos de High Fantasy, os Arcanos estão ao alcance e dá para se comunicar com eles, em geral em locais específicos ou por meio de **rituais**. Ou têm um papel ativo em eventos de escala mundial, ou têm motivos pessoais para ficar de fora.
- O que o PJ recebe é só uma **fração** do poder de um conceito ou ser ancestral, dada de bom grado ou obtida por quem fizer os ritos certos (talvez com um teste de coragem ou uma exigência estranha). Se o PJ consegue, o vilão também pode. Invocar é uma **imitação imperfeita**, moldada pela visão do arcanista.
- Grupos temáticos funcionam bem: "Seis Pilares", "Doze Arcanos do Zodíaco". Também há o clássico "último Arcano secreto", que pode ser redescoberto com o Poder Heroico Revelação (Livro Básico, p. 240).
- Com mais de um arcanista no grupo, pergunte primeiro se é preciso. Para o poder incrível de uso pontual, os Poderes Zero (p. 124 do Atlas) podem bastar. Se for preciso, o grupo pode limitar cada arcanista a subgrupos de Arcanos, ou todos participarem juntos do processo de vincular.
- A **aparência** de um Arcano pode variar conforme o mundo ou quem o invoca, sem mudar seus efeitos mecânicos.

#### Criar Arcanos novos

O Livro Básico já permite Arcanos personalizados; no mundo de jogo eles combinam com mitologias específicas. Não há regras restritivas, e o processo deve envolver a mesa toda. Três dicas:

- **Simplicidade:** muitas vezes basta mudar nome, domínios, tipo de dano ou Resistências de um Arcano existente. Cuidado com combinações poderosas demais (juntar o benefício de fundição da Espada com o efeito de dispensar da Forja, por exemplo).
- **Moderação:** nenhum Arcano deve fazer "um pouco de tudo" nem ser uma versão melhorada de outro.
- **Domínios úteis e sem redundância:** a personalidade e os temas do Arcano precisam servir aos rituais de arcanismo.

O livro dá dois exemplos prontos:

> **Arcano do Touro.** Domínios: paciência, tenacidade, terra.
> **Fundir:** você é imune às condições fraco e enfurecido; ao recuperar PM, recupera 5 PM adicionais.
> **Dispensar (Terremoto):** escolha qualquer quantidade de criaturas que você veja; cada uma sofre 30 pontos de dano de terra, que ignora Resistências.

> **Boudicca, a Lança Rebelde** (mais forte que a média por ter surgido de uma Revelação). Domínios: batalha, independência, rebelião.
> **Fundir:** seus ataques causam 5 pontos de dano adicional; todo dano que você causa vira de luz, e esse tipo não pode ser alterado.
> **Dispensar (Segunda Chance):** escolha qualquer quantidade de criaturas que você veja; cada uma recupera 30 PV e se recupera de todas as condições (40 PV a partir do 20° nível; 50 a partir do 40°). Só pode ser usado se você estiver em crise.

### Deuses, demônios e rio das almas (p. 71-73)

- A batalha final costuma ser contra um ser antigo e reverenciado. Pela regra da espécie **demônio**, fé, tradição e até propaganda podem fazer o rio das almas criar "deuses". Indivíduos temidos ou idolatrados também podem virar demônios, o que combina com o **escalonamento** de um vilão ([[pontos-de-ultima]]).
- Um demônio é energia reunida por vontade (a dele ou a de quem crê). Só desaparece de vez quando as emoções que o sustentam somem, o que dá aos heróis o papel de mediadores entre culturas. Isso abre espaço para uma "campanha de continuação".
- O rio das almas deve estar presente, ao menos em parte: criaturas somem em partículas azuis ao morrer; objetos mágicos têm auras visíveis. Ele guarda fragmentos de memórias, e agitá-lo demais pode alterar a realidade. Ligue as mudanças nele aos objetivos do grupo ou aos planos do vilão.
- **Vida após a morte:** em geral, as criaturas voltam ao rio das almas ao morrer; uma distorção desse processo cria mortos-vivos. Há exceções possíveis (um objeto, local ou fórmula que ressuscita sem corromper, sempre a um preço terrível, e personagens com a peculiaridade Regressado). Quem morreu em **sacrifício** (Livro Básico, p. 88) não volta; no máximo seu espírito aparece como NPC para ajudar ou aconselhar.

## Natural Fantasy (p. 68-71)

- **Magia como negociação:** a magia é uma relação delicada entre humanidade, ecossistema e os mistérios da vida. O pilar "Tudo tem alma" vai ao máximo: a magia é viva, em geral encarnada como espírito ou presença local, com vontade e personalidade. Pergunte qual a fonte dos poderes dos PJs e como eles alteram o equilíbrio.
- **Reações favoráveis e desfavoráveis (p. 69):** usar feitiços, rituais e habilidades mágicas pode provocar uma reação dos espíritos, **exceto** a classe Invocador. Elas entram no jogo por oportunidades, Pontos de Fabula, sacrifícios, rendições ou **rituais que falham**, e o mestre também pode adicioná-las quando quiser. Para isso, as regras mais indicadas são os efeitos ambientais danosos ou benéficos (Livro Básico, p. 299), uma mudança inesperada nos mananciais elementais ou, em casos extremos, uma nova ameaça.
- **Meditação e rituais (p. 69):** um ritual é um diálogo com a natureza e exige autodisciplina, empatia e preparo; costuma ser privilégio de **um** membro do grupo. Quimerismo, elementalismo e espiritualismo são as disciplinas comuns (flora e fauna, elementos, energias positivas e negativas). Arcanismo vira a dádiva de espíritos protetores, guardada num objeto ou até no corpo do arcanista (tatuagem, escarificação, metamorfose parcial). Entropismo e ritualismo são incomuns.
- **Magia como forma de controle (p. 70):** entropismo e ritualismo servem a quem quer controle absoluto sobre as forças sobrenaturais, sem se importar com o equilíbrio. O entropismo pode ser o legado de uma civilização avançada e imprudente (daí androides e seres despertos após milênios); o ritualismo é visto com olhar acadêmico e utilitário, até como ferramenta para reativar máquinas antigas. Um personagem erudito, inventor, mercador ou simbolista pode começar com essa visão fria e amadurecê-la ao longo da campanha.
- **Deicídio e medo da morte (p. 71):** matar um deus não é rebelião justa, mas um ato violento e egoísta; a busca pela imortalidade é inútil e polui o ciclo da vida.

## Techno Fantasy (p. 70-75)

- **Magia como símbolo (p. 70-72):** a magia ainda é um princípio do mundo, e seu papel muda com o tema da campanha. Na exploração de recursos, vira fonte de energia (em circuitos ou cristalizada e radioativa). Num tema social e filosófico, o rio das almas guarda os ecos de pensamentos e medos, e conjuradores se confundem com hackers. Num tema existencial, a magia tende a ser ritualística e reservada a igrejas e cultos, e as revelações sobre o rio das almas costumam vir na segunda metade da campanha, pelo mestre ou por 1 Ponto de Fabula.
- **Magia 2.0 (p. 73):** dicas para reinterpretar classes num cenário futurista: Arcanos como imagens psíquicas na rede de almas, Imitação Mágica como estudo de genomas, feitiços de elementalista, entropista e espiritualista como estudo do rio das almas ou superpoderes, Virtuoso como idol, Simbolista como mágico de rua ou hacker. **Nenhuma dessas mudanças afeta as regras de feitiços e poderes, nem as torna mais fáceis ou difíceis.** Um elementalista que descreve seus feitiços como um enxame de drones não ganha lançamento remoto, e os drones só sofrem o que um feitiço normal sofreria.
- **Rede de almas (p. 74-75):** ajuste opcional que troca o rio das almas por uma rede que transfere energia e informação (quase padrão se alguém joga Esper).
  - Quando é um espaço real, há **terminais** que qualquer um usa sem pré-requisito, mas as ações que as autoridades não permitem exigem **rituais ou projetos**, pelas regras normais.
  - Ela tem mapa, regiões, ameaças e população própria (em geral demônios), e o espaço pode ser distorcido: dois portais distantes no mundo real podem ficar próximos na rede.
  - Papéis possíveis: rede de telecomunicações, viagem pelo hiperespaço, manipulação de memórias e percepções, lar dos Arcanos, origem das tecnosferas.
- **Veículos (p. 68):** um veículo tem acesso a **todos os rituais** que seus tripulantes podem realizar.`,
  ['magia', 'ritual', 'atlas', 'ambientação'],
);
