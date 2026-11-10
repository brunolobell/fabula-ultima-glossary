import type { RoleSkill } from '../../entries/entry-types';
import { damage, pick, status } from './assembly-slots';

/**
 * The Negative Skills of Quick Assembly (Bestiary Vol. I, English, printed p. 68-69),
 * in our own words. Each is a drawback that lets the NPC take one more Role Skill or
 * Boss Skill. Names are our translation and unofficial. Keep this file importing only
 * types and the slot helpers.
 */

const WHEN_DOWN = 'Quando o NPC chega a 0 PV ou é forçado a sair da cena, ';

const statuses = ['dazed', 'shaken', 'slow', 'weak'];

const bind = (id: string, label: string) => status(id, 1, statuses, label);

const note = (
  id: string,
  name: string,
  advice: string,
  text: string,
  extra: Partial<RoleSkill> = {},
): RoleSkill => ({
  id,
  name,
  advice,
  effects: [{ to: 'rule', text }],
  ...extra,
});

export const negativeSkills: RoleSkill[] = [
  note(
    'final-delay',
    'Atraso Final',
    'para NPCs soldado que sabotam ou atrasam o progresso da facção ao serem derrotados',
    `${WHEN_DOWN}apaga 1 seção de um Relógio que beneficiaria os aliados dele quando cheio.`,
  ),
  note(
    'final-detonation',
    'Detonação Final',
    'para NPCs soldado que explodem e ferem os aliados ao serem derrotados',
    `${WHEN_DOWN}causa uma quantidade grande ({heavy}) de dano do tipo {type} a cada aliado dele presente na cena.`,
    { slots: [damage('type')] },
  ),
  note(
    'final-restore',
    'Restauração Final',
    'para NPCs soldado que curam os inimigos ao serem derrotados',
    `${WHEN_DOWN}cada inimigo dele presente na cena recupera uma quantidade grande ({heavy}) de {resource}.`,
    {
      slots: [
        pick('resource', 'Recupera', [
          ['hp', 'PV'],
          ['mp', 'PM'],
        ]),
      ],
    },
  ),
  note(
    'final-status',
    'Condição Final',
    'para NPCs soldado que passam condições aos aliados ao serem derrotados',
    `${WHEN_DOWN}cada aliado dele presente na cena sofre a condição {condition}.`,
    { slots: [status('condition', 1, statuses)] },
  ),
  note(
    'final-weakening',
    'Enfraquecimento Final',
    'para NPCs soldado que acompanham um chefe campeão, sobretudo se puderem ser invocados com frequência',
    `${WHEN_DOWN}o chefe campeão que ele acompanha fica Vulnerável a dano do tipo {type}. Essa Vulnerabilidade substitui qualquer Afinidade anterior do chefe a esse tipo e dura até o fim da rodada atual.`,
    { slots: [damage('type')] },
  ),
  note(
    'forced-landing',
    'Pouso Forçado',
    'para NPCs voadores que têm um ataque forte',
    'Quando o NPC faz o ataque forte, perde os benefícios do poder Voo até o fim da rodada atual.',
  ),
  note(
    'painful-miss',
    'Erro Doloroso',
    'para um NPC meio imprudente, que costuma ferir a si mesmo ou aos aliados',
    'Depois de errar todos os alvos com o {attack}, o NPC faz {victim} perder uma quantidade pequena ({minor}) de PV (depois de resolvido o ataque).',
    {
      slots: [
        pick('attack', 'Ataque', [
          ['normal', 'ataque normal'],
          ['strong', 'ataque forte'],
        ]),
        pick('victim', 'Quem se fere', [
          ['self', 'ele mesmo'],
          ['ally', 'um aliado escolhido ao acaso'],
        ]),
      ],
    },
  ),
  note(
    'status-bind',
    'Amarras de Condição',
    'para que os Jogadores usem condições para negar e controlar as ações do inimigo; pode valer para a maioria dos chefes de uma campanha',
    'Cada uma destas ações é ligada a uma condição diferente: ataque normal ({normal}), ataque forte ({strong}), ação Poder ({skill}) e ação Feitiço ({spell}). O NPC perde qualquer imunidade a atordoado, abalado, lento e fraco e não pode ganhá-la. Enquanto sofrer uma dessas condições, não pode fazer o ataque ou a ação ligada a ela. No fim de toda rodada par, o NPC se recupera de todas as condições.',
    {
      slots: [
        bind('normal', 'Condição do ataque normal'),
        bind('strong', 'Condição do ataque forte'),
        bind('skill', 'Condição da ação Poder'),
        bind('spell', 'Condição da ação Feitiço'),
      ],
    },
  ),
];
