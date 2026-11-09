export interface Abbreviation {
  sigla: string;
  /** The book's own term. */
  term: string;
  /** One short line in our own words. */
  gloss: string;
}

// Every term is the Livro Básico's (see its pages 34-39 and the attribute
// names on the character sheet); never invent a translation here.
export const ABBREVIATIONS: readonly Abbreviation[] = [
  { sigla: 'NP', term: 'nível de poder', gloss: 'quantas vezes o Poder foi escolhido' },
  { sigla: 'PV', term: 'Pontos de Vida', gloss: 'resistência a dor e fadiga' },
  { sigla: 'PM', term: 'Pontos de Mana', gloss: 'foco e concentração' },
  { sigla: 'PI', term: 'Pontos de Inventário', gloss: 'recurso para criar itens consumíveis na hora' },
  { sigla: 'DES', term: 'Destreza', gloss: 'atributo' },
  { sigla: 'VIG', term: 'Vigor', gloss: 'atributo' },
  { sigla: 'AST', term: 'Astúcia', gloss: 'atributo' },
  { sigla: 'VON', term: 'Vontade', gloss: 'atributo' },
  { sigla: 'RA', term: 'rolagem alta', gloss: 'o maior dos dois dados de um teste; calcula dano' },
  { sigla: 'ND', term: 'nível de dificuldade', gloss: 'o teste precisa igualá-lo ou superá-lo' },
  { sigla: 'PJ', term: 'personagem de jogador', gloss: 'o herói de quem joga' },
  { sigla: 'NPC', term: 'personagem do Mestre', gloss: 'todo personagem que o Mestre conduz' },
];

const WORDS = new RegExp(
  `(?<![\\p{L}\\p{N}])(${ABBREVIATIONS.map((a) => a.sigla).join('|')})(?![\\p{L}\\p{N}])`,
  'gu',
);

/** The abbreviations that appear in these texts, in the table's order. */
export function abbreviationsIn(...texts: (string | undefined)[]): Abbreviation[] {
  const found = new Set<string>();
  for (const text of texts) {
    for (const match of (text ?? '').matchAll(WORDS)) found.add(match[1]);
  }
  return ABBREVIATIONS.filter((a) => found.has(a.sigla));
}
