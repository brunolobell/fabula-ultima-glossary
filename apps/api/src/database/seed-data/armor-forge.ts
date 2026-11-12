import { rule } from './helpers';
import { rareArmorRules } from './armor-forge-data';
import { SeedEntry } from './types';

const z = (n: number) => `${n.toLocaleString('pt-BR')}z`;

const featureTable = (group: 'defensive' | 'improvement') =>
  `| Característica | Custo | Efeito |
| --- | --- | --- |
${rareArmorRules.features
  .filter((f) => f.group === group)
  .map((f) => `| **${f.name}** | +${z(f.cost)} | ${f.summary} |`)
  .join('\n')}`;

const FORGE = '/equipamento?item=armaduras&forja=rara';

/** Livro Básico p. 280, "Como criar armaduras e escudos raros". */
export const rareArmorRule: SeedEntry = {
  ...rule(
    'Criar armaduras e escudos raros',
    280,
    'Regra para criar uma armadura ou um escudo raro: parte de um item básico e ganha uma única característica da lista de preços, que se soma ao custo.',
    `Criar uma armadura ou um escudo raro é bem mais simples do que criar uma arma rara ([[criar-armas-raras]]). O mestre pode seguir estes dois passos (ou escolher um item que já existe nos livros).

Para montar o item e somar o custo na hora, abra a [Forja de Armaduras e Escudos](${FORGE}) (nada é salvo).

## Em dois passos

1. **Escolha um item básico** da lista de armaduras e escudos do [[equipamento]] (Livro Básico, p. 132-133).
2. **Acrescente uma única característica** da lista abaixo. O custo dela se soma ao preço do item. Se quiser, crie uma característica própria usando a lista como referência e decida o preço seguindo os exemplos.

## Características de armaduras e escudos (p. 280)

### Defensivas

${featureTable('defensive')}

### De melhoria

${featureTable('improvement')}

> **Exemplo:** a Túnica Sombria parte da túnica de combate (150z, Iniciativa 0) e ganha Mais Iniciativa (+500z): custa **650z** e tem Iniciativa **+4**. O escudo Égide, Ignis parte do escudo de bronze (100z) com Resistência (+700z): custa **800z** e resiste a fogo.

Os cuidados da seção de armas raras (Livro Básico, p. 266-267; veja [[criar-armas-raras]]) valem também para armaduras e escudos.

A regra opcional de comprar características (veja [[criar-armas-raras]]) usa esta mesma lista para armaduras e escudos normais.`,
    ['regra', 'equipamento', 'armadura', 'escudo', 'rara'],
  ),
  details: rareArmorRules,
};

export const armorForgeRules: SeedEntry[] = [rareArmorRule];
