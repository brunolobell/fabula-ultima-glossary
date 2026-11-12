import type { NpcSpell } from '../../entries/entry-types';
import { damage, status } from './assembly-slots';

/**
 * The Livro Básico list of NPC spells (p. 310-311), in our own words with the
 * book's numbers. The book asks the Game Master to rename a spell and pick its
 * damage type or condition when making the stat block: those are the slots.
 * Keep this file importing only types and the slot helpers.
 */
export const npcSpells: NpcSpell[] = [
  {
    id: 'quicken',
    name: 'Acelerar',
    mpCost: '20',
    target: 'Uma criatura',
    duration: 'Instantânea',
    offensive: false,
    effect:
      'O alvo pode fazer imediatamente um ataque livre com a arma equipada (ou com um ataque básico, se o alvo for um NPC).',
  },
  {
    id: 'war-cry',
    name: 'Brado de Guerra',
    mpCost: '10 × A',
    target: 'Até três criaturas',
    duration: 'Cena',
    offensive: false,
    effect: 'Enquanto durar, cada alvo recebe +1 em testes de Precisão.',
  },
  {
    id: 'shell',
    name: 'Concha',
    mpCost: '10',
    target: 'Pessoal',
    duration: 'Cena',
    offensive: false,
    effect: 'Enquanto durar, o NPC fica Resistente a dano físico.',
  },
  {
    id: 'area-status',
    name: 'Condição em Área',
    mpCost: '20',
    target: 'Especial',
    duration: 'Instantânea',
    offensive: false,
    effect:
      'Todos os inimigos que o NPC consiga ver sofrem a condição {condition}.',
    slots: [status('condition', 1, ['shaken', 'dazed', 'weak', 'slow'])],
  },
  {
    id: 'devastation',
    name: 'Devastação',
    mpCost: '30',
    target: 'Especial',
    duration: 'Instantânea',
    offensive: false,
    damage: 30,
    flat: true,
    effect:
      'Causa {damage} de dano do tipo {type} a cada inimigo que o NPC consiga ver. Só para campeão ou elite de nível 30 ou mais, e só no último turno de cada rodada (o que cria um padrão que os jogadores podem prever).',
    slots: [damage('type')],
  },
  {
    id: 'weaken',
    name: 'Enfraquecer',
    mpCost: '10',
    target: 'Uma criatura',
    duration: 'Cena',
    offensive: true,
    effect:
      'Enquanto durar, todas as fontes que causam dano do tipo {type} causam 5 de dano adicional ao alvo.',
    slots: [damage('type')],
  },
  {
    id: 'poison',
    name: 'Envenenar',
    mpCost: '10 × A',
    target: 'Até três criaturas',
    duration: 'Instantânea',
    offensive: true,
    effect: 'Todos os alvos atingidos ficam envenenados.',
  },
  {
    id: 'rage',
    name: 'Fúria',
    mpCost: '10 × A',
    target: 'Até três criaturas',
    duration: 'Instantânea',
    offensive: true,
    effect: 'Todos os alvos atingidos ficam enfurecidos.',
  },
  {
    id: 'lick-wounds',
    name: 'Lamber Feridas',
    mpCost: '5',
    target: 'Pessoal',
    duration: 'Instantânea',
    offensive: false,
    effect:
      'O NPC recupera 20 PV (30 se for de nível 20 ou mais, 40 se for de nível 40 ou mais, 50 se for de nível 60 ou mais).',
  },
  {
    id: 'curse',
    name: 'Maldição',
    mpCost: '5',
    target: 'Uma criatura',
    duration: 'Instantânea',
    offensive: true,
    effect: 'O alvo sofre a condição {condition}.',
    slots: [status('condition', 1, ['shaken', 'dazed', 'weak', 'slow'])],
  },
  {
    id: 'mind-theft',
    name: 'Roubo de Mana',
    mpCost: '10',
    target: 'Uma criatura',
    duration: 'Instantânea',
    offensive: true,
    damage: 15,
    effect:
      'Causa ({damage}) de dano do tipo {type} ao alvo. Em seguida, o NPC recupera PM iguais à metade dos PV que o alvo perdeu.',
    slots: [damage('type')],
  },
  {
    id: 'life-theft',
    name: 'Roubo de Vida',
    mpCost: '10',
    target: 'Uma criatura',
    duration: 'Instantânea',
    offensive: true,
    damage: 15,
    effect:
      'Causa ({damage}) de dano do tipo {type} ao alvo. Em seguida, o NPC recupera PV iguais à metade dos PV que o alvo perdeu.',
    slots: [damage('type')],
  },
  {
    id: 'breath',
    name: 'Sopro',
    mpCost: '5',
    target: 'Uma criatura',
    duration: 'Instantânea',
    offensive: true,
    damage: 10,
    effect: 'Causa ({damage}) de dano do tipo {type} ao alvo.',
    slots: [damage('type')],
  },
  {
    id: 'cursed-breath',
    name: 'Sopro Amaldiçoado',
    mpCost: '10',
    target: 'Uma criatura',
    duration: 'Instantânea',
    offensive: true,
    damage: 15,
    effect:
      'Causa ({damage}) de dano do tipo {type} ao alvo, que também sofre a condição {condition}.',
    slots: [
      damage('type'),
      status('condition', 1, ['shaken', 'dazed', 'weak', 'slow']),
    ],
  },
  {
    id: 'curse-xl',
    name: 'Ultramaldição',
    mpCost: '10',
    target: 'Uma criatura',
    duration: 'Instantânea',
    offensive: true,
    effect: 'O alvo sofre as condições {conditions}.',
    slots: [status('conditions', 2, ['shaken', 'dazed', 'weak', 'slow'])],
  },
];
