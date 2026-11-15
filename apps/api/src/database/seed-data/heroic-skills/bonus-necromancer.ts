import { heroicSkill, withTags } from '../helpers';
import { SeedEntry } from '../types';

// "Novos Poderes Heroicos" do Fabula Bonus do Necromante (Necromancer, páginas 4–5),
// traduzidos por nós; não oficiais. Os nomes seguem os do Codex Extra.
// Aplique `inBook('bonus-necromancer', …)` ao registrar.
export const poderesHeroicosNecromancer: SeedEntry[] = [
  withTags(
    heroicSkill({
      name: 'Nascimento da Crueldade',
      page: 4,
      classes: ['Necromante'],
      summary:
        'Quando morre um NPC (não vilão) que você vê, de espécie fera, humanoide, monstro ou planta, gaste 2 Pontos de Túmulo e reduza seus PV e PM máximos pelo nível dele: o cadáver vira seu lacaio morto-vivo, de patente soldado.',
      body: `Quando morre um **NPC que não seja um vilão**, que você consiga ver e que pertença à espécie **fera**, **humanoide**, **monstro** ou **planta**, você pode gastar **2 Pontos de Túmulo** e **reduzir seus PV máximos e seus PM máximos** em uma quantidade igual ao **nível desse NPC**. Se fizer isso, o cadáver dele se torna um **lacaio** que obedece aos seus comandos telepáticos.

- **Espécie.** Ela passa a ser **morto-vivo**, e ele segue todas as regras dessa espécie (Livro Básico, página 305). As novas Afinidades a dano de **luz**, **trevas** e **veneno** substituem qualquer Afinidade que ele já tivesse, mas as demais regras da espécie original são mantidas.
- **Patente.** Ela passa a ser **soldado**. Se a criatura original era **elite** ou **campeã**, o mestre deve reduzir os PV e os PM do lacaio de acordo (os Poderes são mantidos).
- **Criatura nova.** O lacaio é uma criatura inteiramente nova: começa com **todos os PV e todos os PM** e sem nenhuma condição. Ele mantém o equipamento da criatura original.
- **Turno próprio.** Nos conflitos, o lacaio tem o **próprio turno**, e o mestre deve contá-lo como **um PJ adicional** ao montar o conflito.
- **Descanso.** Quando você descansa, o lacaio também recebe todos os benefícios do descanso.
- **Destruição.** O lacaio é destruído na mesma hora se chegar a **0 PV**, se você estiver a **mais de 1 dia de viagem** dele, ou se você **morrer** ou **ficar inconsciente**.
- **Por sua vontade.** Você pode destruir o lacaio a qualquer momento, e precisa fazê-lo antes de criar um novo.
- **Ao ser destruído,** seus PV máximos e PM máximos **voltam ao normal**.`,
    }),
    'birth of the cruel',
  ),

  withTags(
    heroicSkill({
      name: 'Ceifeiro do Pesar',
      page: 4,
      classes: ['Entropista', 'Necromante'],
      alsoRequires: ['Drenar Espírito', 'Drenar Vigor'],
      note: 'É preciso ter aprendido os feitiços Drenar Espírito e Drenar Vigor.',
      summary:
        'Com Drenar Espírito ou Drenar Vigor, você recupera PM ou PV iguais à perda total do alvo, em vez da metade; Drenar Espírito passa a tirar (RA + 20) PM do 20º nível e (RA + 25) PM do 40º.',
      body: `Ao lançar **Drenar Espírito** ou **Drenar Vigor**, a quantidade de **PM** (Drenar Espírito) ou de **PV** (Drenar Vigor) que você recupera é **igual à perda sofrida pelo alvo**, e não à metade dela.

Além disso, o seu **Drenar Espírito** faz o alvo perder **(RA + 20)** PM se você estiver no **20º nível ou acima**, ou **(RA + 25)** PM se estiver no **40º nível ou acima**, em vez do valor normal de **(RA + 15)**.`,
    }),
    'harvester of sorrow',
  ),

  withTags(
    heroicSkill({
      name: 'Pulso das Larvas',
      page: 5,
      classes: ['Necromante'],
      summary:
        'Enquanto tiver ao menos 1 Ponto de Túmulo, você tem Imunidade a trevas e veneno, Resistência a dano físico e Vulnerabilidade a luz, e essas Afinidades não podem ser alteradas.',
      body: `Enquanto você tiver **pelo menos 1 Ponto de Túmulo**, você tem **Imunidade** a dano de **trevas** e de **veneno**, **Resistência** a dano **físico** e **Vulnerabilidade** a dano de **luz**.

Essas Afinidades **substituem** qualquer outra que você tenha para esses tipos de dano e **não podem ser alteradas de nenhuma forma** enquanto você tiver pelo menos 1 Ponto de Túmulo.`,
    }),
    'pulse of the maggots',
  ),
];
