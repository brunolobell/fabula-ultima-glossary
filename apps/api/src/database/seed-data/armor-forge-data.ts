import type { RareArmorRuleDetails } from '../../entries/entry-types';

// The numbers behind the Armor Forge. This file imports nothing but types so the
// web tests can load it and check the Forge's arithmetic against the books' own
// examples (see docs/adr/0002-weapon-forge-rule-data.md).

/** Livro Básico p. 280. The same list serves armors and shields. */
export const rareArmorRules: RareArmorRuleDetails = {
  forge: 'rare-armor',
  features: [
    {
      id: 'anticondicao',
      name: 'Anticondição',
      group: 'defensive',
      cost: 500,
      summary: 'Imunidade a uma condição.',
    },
    {
      id: 'resistencia',
      name: 'Resistência',
      group: 'defensive',
      cost: 700,
      summary: 'Resistência a um tipo de dano (exceto físico).',
    },
    {
      id: 'dupla-resistencia',
      name: 'Dupla resistência',
      group: 'defensive',
      cost: 1000,
      summary: 'Resistência a dois tipos de dano (exceto físico).',
    },
    {
      id: 'quebra-laminas',
      name: 'Quebra-lâminas',
      group: 'defensive',
      cost: 1000,
      summary: 'Resistência a dano físico.',
    },
    {
      id: 'imunidade',
      name: 'Imunidade',
      group: 'defensive',
      cost: 1500,
      summary: 'Imunidade a um tipo de dano (exceto físico).',
    },
    {
      id: 'saude-perfeita',
      name: 'Saúde perfeita',
      group: 'defensive',
      cost: 2000,
      summary: 'Imunidade a todas as condições.',
    },
    {
      id: 'mais-iniciativa',
      name: 'Mais Iniciativa',
      group: 'improvement',
      cost: 500,
      summary: 'Bônus de +4 na Iniciativa.',
      initiative: 4,
    },
    {
      id: 'mais-precisao',
      name: 'Mais Precisão',
      group: 'improvement',
      cost: 1000,
      summary: 'Bônus de +1 em testes de Precisão.',
    },
    {
      id: 'mais-magia',
      name: 'Mais Magia',
      group: 'improvement',
      cost: 1000,
      summary: 'Bônus de +1 em testes de Magia.',
    },
    {
      id: 'mais-vitalidade',
      name: 'Mais vitalidade',
      group: 'improvement',
      cost: 1000,
      summary: 'Ao recuperar Pontos de Vida, você recupera 5 PV adicionais.',
    },
    {
      id: 'mais-cura',
      name: 'Mais cura',
      group: 'improvement',
      cost: 1500,
      summary: 'Seus feitiços que recuperam PV recuperam 5 PV adicionais.',
    },
    {
      id: 'mais-conjuracao',
      name: 'Mais conjuração',
      group: 'improvement',
      cost: 2000,
      summary: 'Seus feitiços causam 5 pontos de dano adicional.',
    },
    {
      id: 'mais-dano',
      name: 'Mais dano',
      group: 'improvement',
      cost: 2000,
      summary:
        'Seus ataques corpo a corpo ou à distância (um à escolha) causam 5 pontos de dano adicional.',
    },
  ],
  notes: [
    'Um item raro só pode ter uma característica.',
    'Nenhum personagem deve equipar mais de dois itens que melhorem Precisão, Magia, Defesa ou Defesa Mágica, a menos que sejam opções que não se usam ao mesmo tempo.',
    'Evite copiar feitiços e poderes exclusivos de uma classe.',
    'O preço de um efeito personalizado é decidido pelo mestre, seguindo os exemplos do livro.',
  ],
};
