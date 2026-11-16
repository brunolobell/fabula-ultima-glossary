import { SeedEntry } from '../../types';
import { rareWeapon } from '../rare-helpers';

const B = 'techno-fantasy' as const;

/**
 * "Armas personalizadas Techno Fantasy" (Atlas Techno Fantasy, p. 115-119):
 * seven families, each with a basic Custom Weapon example and a possible Rare
 * Evolution. All are two-handed. The accuracy and damage line is Form I; Form II
 * of a Mutável weapon is written out in `formII`.
 */
export const armasPersonalizadasTechnoFantasy: SeedEntry[] = [
  // Aegislâminas (p. 115)
  rareWeapon(B, {
    name: 'Escudo Gládio',
    page: 115,
    cost: 300,
    category: 'espada',
    accuracy: 'DES + VIG',
    accuracyBonus: 2,
    damage: 10,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    custom: true,
    effect:
      'Sem características. É certeira, poderosa e com aumento na Defesa.',
    body: 'Família **Aegislâminas**: uma espada telescópica que se guarda dentro de um escudo magnético pesado, a arma marcante da piloto Catlin Xalco. Esta é a versão básica.',
  }),
  rareWeapon(B, {
    name: 'Aegis Flamejante',
    page: 115,
    cost: 2000,
    category: 'espada',
    accuracy: 'DES + VIG',
    accuracyBonus: 2,
    damage: 14,
    damageType: 'fogo',
    hands: 2,
    range: 'melee',
    martial: true,
    evolutionOf: 'escudo-gladio',
    effect:
      'Ao entrar no seu veículo pessoal durante um conflito, seus módulos de arma podem causar 5 de dano adicional e passar a causar apenas dano de fogo (tipo que não pode ser mudado); isso dura até você sair do veículo. É certeira, poderosa e com aumento na Defesa.',
    body: 'O efeito vale para o [[veiculo-pessoal]] do Piloto.',
  }),

  // Alabardas-morteiro (p. 116)
  rareWeapon(B, {
    name: 'Lança Explosiva',
    page: 116,
    cost: 300,
    category: 'fogo',
    accuracy: 'DES + VIG',
    accuracyBonus: 2,
    damage: 10,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    custom: true,
    effect:
      'Sem características. É certeira, poderosa e com aumento na Defesa.',
    body: 'Família **Alabardas-morteiro**: armas volumosas e difíceis de manter, que juntam um morteiro à haste de uma lança. Arma de fogo usada **corpo a corpo**, como o livro imprime.',
  }),
  rareWeapon(B, {
    name: 'Boca de Trovão',
    page: 116,
    cost: 900,
    category: 'fogo',
    accuracy: 'DES + VIG',
    accuracyBonus: 2,
    damage: 10,
    damageType: 'raio',
    hands: 2,
    range: 'melee',
    martial: true,
    evolutionOf: 'lanca-explosiva',
    effect:
      'Causa 5 de dano adicional a feras e monstros. É certeira, poderosa e com aumento na Defesa.',
    body: 'Arma de fogo usada **corpo a corpo**, como o livro imprime.',
  }),

  // Botas blindadas (p. 116)
  rareWeapon(B, {
    name: 'Quebra-muralha',
    page: 116,
    cost: 300,
    category: 'luta',
    accuracy: 'DES + VIG',
    accuracyBonus: 2,
    damage: 10,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    custom: true,
    effect:
      'Sem características. É certeira, poderosa e com aumento na Defesa.',
    body: 'Família **Botas blindadas**: o livro lembra que armas sempre ocupam os espaços de mão, mas isso não impede quem personalizou as botas.',
  }),
  rareWeapon(B, {
    name: 'Botas Megatômicas',
    page: 116,
    cost: 2100,
    category: 'luta',
    accuracy: 'DES + VIG',
    accuracyBonus: 2,
    damage: 14,
    damageType: 'terra',
    hands: 2,
    range: 'melee',
    martial: true,
    evolutionOf: 'quebra-muralha',
    effect:
      'Criaturas atingidas por ela ficam abaladas. É certeira, poderosa e com aumento na Defesa.',
  }),

  // Chaves gigantes (p. 117)
  rareWeapon(B, {
    name: 'Chave Inglesa',
    page: 117,
    cost: 300,
    category: 'pesada',
    accuracy: 'DES + VIG',
    damage: 12,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    custom: true,
    effect:
      'Sem características. É poderosa e com aumento na Defesa e na Defesa Mágica.',
    body: 'Família **Chaves gigantes**: ferramentas imensas, boas para consertar máquinas gigantes e para derrubar os oponentes mais fortes.',
  }),
  rareWeapon(B, {
    name: 'Fixador',
    page: 117,
    cost: 1000,
    category: 'pesada',
    accuracy: 'DES + VIG',
    damage: 16,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    evolutionOf: 'chave-inglesa',
    effect:
      'No fim do seu turno durante um conflito, você pode restaurar 5 PV de um construto que consiga ver. É poderosa e com aumento na Defesa e na Defesa Mágica.',
  }),

  // Ioiôs de combustão (p. 117)
  rareWeapon(B, {
    name: 'Girador de Combustão',
    page: 117,
    cost: 300,
    category: 'malho',
    accuracy: 'DES + AST',
    damage: 7,
    damageType: 'fogo',
    hands: 2,
    range: 'melee',
    martial: true,
    custom: true,
    effect: 'Sem características. É elemental (fogo) e rápida.',
    body: 'Família **Ioiôs de combustão**: aparelhos movidos a combustão, mais pesados que um ioiô comum, que soltam uma série de ataques rápidos.',
  }),
  rareWeapon(B, {
    name: 'Tornado Infernal',
    page: 117,
    cost: 1600,
    category: 'malho',
    accuracy: 'DES + AST',
    accuracyBonus: 1,
    damage: 11,
    damageType: 'fogo',
    hands: 2,
    range: 'melee',
    martial: true,
    evolutionOf: 'girador-de-combustao',
    effect:
      'Causa dano adicional igual ao número de vezes que você atingiu uma ou mais criaturas com ela na cena atual. É elemental (fogo) e rápida.',
  }),

  // Maletas de espião (p. 118)
  rareWeapon(B, {
    name: 'Calibre Noturno',
    page: 118,
    cost: 400,
    category: 'luta',
    accuracy: 'DES + VIG',
    damage: 5,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    custom: true,
    effect:
      'Arma de duas Formas (Mutável). Forma I: sem características; é mutável e com aumento na Defesa e na Defesa Mágica.',
    formII:
      'Arma de Fogo, marcial, duas mãos, à distância. Precisão (DES + VIG) +2, dano (RA + 10) físico. Sem características; é certeira, mutável e poderosa.',
    body: 'Família **Maletas de espião**: maletas reforçadas que escondem armas surpreendentemente fortes. O custo de 400z já inclui as duas Formas.',
  }),
  rareWeapon(B, {
    name: 'Arquivo Frio',
    page: 118,
    cost: 1600,
    category: 'luta',
    accuracy: 'DES + VIG',
    damage: 9,
    damageType: 'gelo',
    hands: 2,
    range: 'melee',
    martial: true,
    evolutionOf: 'calibre-noturno',
    effect:
      'Arma de duas Formas (Mutável). Após fazer um teste de Precisão com ela, você recupera 1 Ponto de Inventário por dado que mostrar 8 ou mais. Forma I: é mutável e com aumento na Defesa e na Defesa Mágica.',
    formII:
      'Arma de Fogo, marcial, duas mãos, à distância. Precisão (DES + VIG) +2, dano (RA + 14) gelo. Tem o mesmo efeito da Forma I (recupera 1 Ponto de Inventário por dado de 8 ou mais após um teste de Precisão); é certeira, mutável e poderosa.',
  }),

  // Rifles de fluxo (p. 119)
  rareWeapon(B, {
    name: 'Ectorrifle',
    page: 119,
    cost: 400,
    category: 'fogo',
    accuracy: 'DES + AST',
    accuracyBonus: 2,
    damage: 10,
    damageType: 'físico',
    hands: 2,
    range: 'ranged',
    martial: true,
    custom: true,
    effect:
      'Arma de duas Formas (Mutável). Forma I (não marcial): sem características; é certeira, poderosa e mutável.',
    formII:
      'Arcana, marcial, duas mãos, à distância. Precisão (DES + AST) +2, dano (RA + 7) luz. Sem características; é certeira, poderosa e mutável.',
    body: 'Família **Rifles de fluxo**: usados sobretudo pelas Unidades Médicas da Federação, unem bom poder de fogo a um sistema de refração espiritual. A Forma I não é marcial; a Forma II é, então a arma conta como marcial.',
  }),
  rareWeapon(B, {
    name: 'Esculápio',
    page: 119,
    cost: 1200,
    category: 'fogo',
    accuracy: 'DES + AST',
    accuracyBonus: 2,
    damage: 14,
    damageType: 'físico',
    hands: 2,
    range: 'ranged',
    martial: true,
    evolutionOf: 'ectorrifle',
    effect:
      'Arma de duas Formas (Mutável). Se você tiver Poder Curativo, seu NP nele conta como 1 ponto maior (máximo NP 3). Forma I: é certeira, mutável e poderosa.',
    formII:
      'Arcana, marcial, duas mãos, à distância. Precisão (DES + AST) +2, dano (RA + 11) luz. Tem o mesmo efeito da Forma I; é certeira, elemental e mutável.',
    body: 'O efeito altera o Poder [[poder-curativo]] do Espiritualista.',
  }),
];
