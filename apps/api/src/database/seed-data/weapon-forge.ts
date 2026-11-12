import { rule } from './helpers';
import { SeedEntry } from './types';
import { customWeaponRules, rareWeaponRules } from './weapon-forge-data';

const z = (n: number) => `${n.toLocaleString('pt-BR')}z`;

const customizationTable = `| Personalização | Efeito | Conta como | Custo |
| --- | --- | --- | --- |
${customWeaponRules.customizations
  .map(
    (c) =>
      `| **${c.name}**${c.martial ? ' (marcial)' : ''} | ${c.summary} | ${c.slots === 1 ? '1' : `${c.slots} personalizações`} | ${c.cost > 0 ? `+${z(c.cost)}` : '—'} |`,
  )
  .join('\n')}`;

const featureTable = (group: 'defensive' | 'offensive') =>
  `| Característica | Custo | Efeito |
| --- | --- | --- |
${rareWeaponRules.features
  .filter((f) => f.group === group)
  .map((f) => `| **${f.name}** | +${z(f.cost)} | ${f.summary} |`)
  .join('\n')}`;

const FORGE = '/equipamento?item=armas&forja';

/**
 * Atlas High Fantasy p. 106-108. Natural Fantasy p. 112-114 and Techno Fantasy
 * p. 112-114 reprint the same text with their own examples.
 */
export const customWeaponRule: SeedEntry = {
  ...rule(
    'Armas Personalizadas',
    106,
    'Regra para o Jogador montar uma arma própria na criação do personagem: categoria à escolha, 300z, duas mãos, dano (RA + 5) físico e três personalizações da lista, entre elas Mutável e Rápida.',
    `Uma **arma personalizada** é montada pelo Jogador para o seu herói, no lugar de uma arma básica. Ela expressa o estilo do personagem e não é, necessariamente, melhor que uma arma básica: escolha pelo que combina com a visão do PJ. Mais tarde, o mestre pode criar versões raras dela seguindo [[criar-armas-raras]].

Os três Atlas imprimem o mesmo texto (aqui, o Atlas High Fantasy; no Natural Fantasy e no Techno Fantasy, páginas 112 a 114), cada um com os seus exemplos.

> **Exemplo:** o Grimório da Força é uma arma arcana de (DES + AST), dano (RA + 5), rápida e com aumento na Defesa Mágica. Custa 300z.

Para montar uma arma e ver o resultado na hora, abra a [Forja de Armas](${FORGE}=personalizada) (nada é salvo).

## Como ela começa

- **Categoria** à escolha: adaga, arcana, arco, arremessável, de fogo, espada, lança, luta, malho ou pesada.
- Não é **marcial**, mas pode virar marcial conforme as personalizações.
- É sempre de **duas mãos**, nunca de uma, e ocupa os dois espaços de mão (por isso não se beneficia de Mão de Gorila, Livro Básico p. 238).
- É **corpo a corpo** ou **à distância**, à escolha, seja qual for a categoria.
- Custa **300z**.
- Precisão **(DES + AST)** ou **(DES + VIG)**, à escolha.
- Dano **(RA + 5)** físico.
- Recebe **três personalizações** da lista abaixo.

## Escolhendo as personalizações

- Cada personalização só pode ser escolhida **uma vez** para a mesma arma.
- Escolher uma personalização marcada como marcial torna a arma **marcial**.
- Quando uma personalização fala em "você", fala de quem está com a arma equipada.
- Algumas personalizações muito poderosas contam como duas ou aumentam o custo.

${customizationTable}

## Compatibilidade

A regra permite armas bem esquisitas, mas pede equilíbrio. Uma arma rápida e certeira, por exemplo, perde flexibilidade, porque não se combina com outra arma: há prós e contras em cada escolha. Personalizações não são características da arma.

## Armas mutáveis

**Mutável** é a escolha mais complexa. A segunda forma é montada como outra arma personalizada que também leva Mutável (que conta como uma das suas três personalizações) e não custa nada: o custo total é 300z mais 100z.

- Se uma forma for corpo a corpo e a outra à distância, ou se forem de categorias diferentes, você só recebe os benefícios de **uma** de cada vez. Por exemplo, não usa Tiro Poderoso e Ataque Poderoso ao dano, nem faz Contra-ataque enquanto puder usar Fogo Cruzado.
- Quem empunha a arma decide a forma inicial no começo de um conflito.
- Uma arma mutável pode ter apenas **uma característica**, aplicada às duas formas. O mesmo vale para qualquer bônus de dano ou de Precisão que venha de uma versão rara.

## Versões raras

Para uma arma personalizada rara, siga [[criar-armas-raras]]. Uma boa ideia é descrever a versão rara como uma versão "aprimorada" da original (gemas na espada, cartuchos únicos na arma de fogo), sem alterar as regras de itens. Nunca se empunha uma arma personalizada com uma só mão, nem reduzindo o dano em 4 como a regra de armas raras permitiria para uma arma básica.`,
    ['regra', 'equipamento', 'arma', 'personalizada'],
  ),
  source: 'high-fantasy',
  details: customWeaponRules,
};

/** Livro Básico p. 264-269, "Como criar itens raros" and "Como criar armas raras". */
export const rareWeaponRule: SeedEntry = {
  ...rule(
    'Criar armas raras',
    268,
    'Regra para criar uma arma rara: parte de uma arma básica, troca o tipo de dano (+100z), aplica uma alteração, e pode ganhar uma característica da lista de preços. A arma vira marcial se o dano chegar a +10.',
    `Armas são os itens raros mais complexos de criar, mas isso as torna uma das recompensas mais especiais para conceder. Para criar um item raro novo, o mestre pode seguir estas regras (ou escolher um item que já existe nos livros).

Para montar uma arma e somar o custo na hora, abra a [Forja de Armas](${FORGE}=rara) (nada é salvo).

## Em quatro passos

1. **Escolha uma arma básica** da lista de armas do [[equipamento]] (Livro Básico, p. 130-131), exceto *ataque desarmado* e *improvisada*.
2. **Tipo de dano.** Armas causam dano físico por padrão. Mudar para ar, fogo, gelo, luz, raio, terra, trevas ou veneno aumenta o custo em **${z(rareWeaponRules.damageTypeCost)}**.
3. **Uma alteração**, à escolha:
   - de duas mãos para **uma mão**, com **−4 de dano**;
   - de uma mão para **duas mãos**, com **+4 de dano** (não vale para adagas, armas de arremesso e de luta);
   - **+1 na Precisão** por **+100z** (não vale se a arma já dá +1 ou mais);
   - **+4 de dano** por **+200z**;
   - **trocar os Atributos** do teste de Precisão; se o novo teste usar um só Atributo, **+50z**.
4. **Uma característica** (opcional), da lista abaixo, ou um efeito personalizado seguindo os exemplos do livro. O custo final sobe conforme a característica.

Se o modificador de dano final da arma for **+10 ou mais**, ela se torna automaticamente uma arma **marcial**.

> **Exemplo:** o Grimório do Vento parte do Grimório da Força (300z, (DES + AST), (RA + 5)): ganha +1 de Precisão (100z), +4 de dano (200z), dano de ar (100z) e Anticondição para lento (500z), num total de **1.200z**. O Atlas High Fantasy aplica as duas alterações juntas nas suas evoluções raras; a regra impressa permite uma só.

## Características de armas (p. 269)

### Defensivas

${featureTable('defensive')}

### Ofensivas

${featureTable('offensive')}

## Cuidados (p. 266-267)

- Um item raro só pode ter **uma característica**.
- Bônus em um tipo de teste, em Defesa ou em Defesa Mágica são fortes: nenhum personagem deve equipar mais de **dois** itens desse tipo ao mesmo tempo, a menos que sejam opções que não se usam juntas.
- Evite copiar feitiços e poderes exclusivos de uma classe; prefira fortalecer o que os PJs já têm.
- Se errar a mão, não retire o item. Explique aos jogadores e ajuste os efeitos com eles.

## Regra opcional: comprar características

Um ferreiro ou artesão pode acrescentar uma característica a uma arma, armadura ou escudo normal, ou trocar a característica de um item raro. A característica escolhida deve custar **+1.000z ou menos** na lista padrão do tipo de item (a das armas está acima; a de armaduras e escudos, em [[criar-armaduras-e-escudos-raros]]). O personagem paga o custo da característica e o trabalho leva cerca de um dia por item. Por exemplo, aplicar Multi custa 1.000z e trocá-la por Resistência, 700z. O poder heroico Melhoria (Livro Básico, p. 238) é uma versão aprimorada desta regra.

## Quanto vale uma recompensa

O valor máximo de **um** item de recompensa depende do maior nível entre os PJs (p. 264): **500z** a partir do nível 5, **1.000z** do 10, **1.500z** do 20, **2.000z** do 30 e sem limite a partir do 40. Em geral é melhor dividir o valor entre vários itens do que dar um só muito poderoso.

Na regra opcional de fabricação do Atlas Natural Fantasy (p. 76), o custo total do item esboçado deve ser igual ou menor que **60 × o maior nível dos PJs**, e os materiais devem valer pelo menos o custo do item.

## Armas personalizadas raras

Uma [[armas-personalizadas]] pode ser a base: ela entra no passo 1 no lugar de uma arma básica, mas nunca vira arma de uma mão. Se for mutável, as alterações e a característica valem para as duas formas e são pagas uma vez.`,
    ['regra', 'equipamento', 'arma', 'rara'],
  ),
  details: rareWeaponRules,
};

export const weaponForgeRules: SeedEntry[] = [customWeaponRule, rareWeaponRule];
