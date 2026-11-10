import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntriesService } from './entries.service';
import { CreatureStats } from './entities/creature-stats.entity';
import { Entry } from './entities/entry.entity';

function queryBuilder(result: unknown[] = []) {
  const qb: Record<string, jest.Mock> = {};
  for (const method of [
    'select',
    'where',
    'andWhere',
    'setParameter',
    'orderBy',
    'addOrderBy',
  ]) {
    qb[method] = jest.fn().mockReturnValue(qb);
  }
  qb.getMany = jest.fn().mockResolvedValue(result);
  return qb;
}

/** A `creature_stats` row as the database holds it. */
const cactontoRow = {
  entryId: 'e1',
  level: 15,
  species: 'plant',
  rank: 'soldier',
  role: null,
  villain: false,
  originalName: null,
  traits: ['assustador', 'territorial'],
  des: 8,
  ast: 6,
  vig: 12,
  von: 6,
  hp: 90,
  crisis: 45,
  mp: 55,
  initiative: 7,
  defense: 0,
  defenseFixed: false,
  magicDefense: 0,
  hasSpells: true,
  affinities: { fire: 'resistant', ice: 'vulnerable' },
  attacks: [
    {
      name: 'Abraço Perfurador',
      range: 'melee',
      accuracy: 'VIG + VIG',
      accuracyBonus: 1,
      damage: 10,
      damageType: 'physical',
    },
  ],
  spells: [{ name: 'Drenar Umidade' }],
  otherActions: [{ name: 'Seiva de Cactonto', effect: 'Se recupera.' }],
  specialRules: [{ name: 'Planta', effect: 'Imune a abalado.' }],
};

describe('EntriesService', () => {
  let service: EntriesService;
  const repo = { findOne: jest.fn(), createQueryBuilder: jest.fn() };
  const stats = { findOne: jest.fn(), find: jest.fn() };

  beforeEach(async () => {
    jest.resetAllMocks();
    const moduleRef = await Test.createTestingModule({
      providers: [
        EntriesService,
        { provide: getRepositoryToken(Entry), useValue: repo },
        { provide: getRepositoryToken(CreatureStats), useValue: stats },
      ],
    }).compile();
    service = moduleRef.get(EntriesService);
  });

  it('serves the stat block of a Creature as its details', async () => {
    repo.findOne.mockResolvedValue({
      id: 'e1',
      slug: 'cactonto',
      type: 'creature',
      details: {},
    });
    stats.findOne.mockResolvedValue(cactontoRow);

    const { details } = await service.findOne('cactonto');

    expect(stats.findOne).toHaveBeenCalledWith({ where: { entryId: 'e1' } });
    expect(details).toEqual({
      level: 15,
      species: 'plant',
      rank: 'soldier',
      villain: false,
      traits: ['assustador', 'territorial'],
      attributes: { DES: 8, AST: 6, VIG: 12, VON: 6 },
      hp: 90,
      crisis: 45,
      mp: 55,
      initiative: 7,
      defense: { value: 0, fixed: false },
      magicDefense: 0,
      hasSpells: true,
      affinities: { fire: 'resistant', ice: 'vulnerable' },
      attacks: cactontoRow.attacks,
      spells: cactontoRow.spells,
      otherActions: cactontoRow.otherActions,
      specialRules: cactontoRow.specialRules,
    });
  });

  it('lists a Creature with its scalar stats and no abilities', async () => {
    const qb = queryBuilder([
      { id: 'e1', slug: 'cactonto', type: 'creature', details: {} },
      { id: 'e2', slug: 'crise', type: 'rule', details: {} },
    ]);
    repo.createQueryBuilder.mockReturnValue(qb);
    stats.find.mockResolvedValue([cactontoRow]);

    const list = await service.findAll(undefined, 'creature');

    expect(list).toHaveLength(2);
    expect(list[0].details).toMatchObject({
      level: 15,
      species: 'plant',
      hp: 90,
      hasSpells: true,
      attributes: { DES: 8, AST: 6, VIG: 12, VON: 6 },
    });
    expect(list[0].details).not.toHaveProperty('attacks');
    expect(list[0].details).not.toHaveProperty('spells');
    expect(list[1].details).toEqual({});
  });

  it('does not touch the stats table when the list has no Creature', async () => {
    repo.createQueryBuilder.mockReturnValue(
      queryBuilder([{ id: 'e2', slug: 'crise', type: 'rule', details: {} }]),
    );

    await service.findAll();

    expect(stats.find).not.toHaveBeenCalled();
  });

  it('throws NotFoundException for a missing entry', async () => {
    repo.findOne.mockResolvedValue(null);
    await expect(service.findOne('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('returns a Class with its Skills and Spells as children', async () => {
    const children = [{ slug: 'fortaleza' }];
    const qb = queryBuilder(children);
    repo.findOne.mockResolvedValue({ slug: 'guardiao', type: 'class' });
    repo.createQueryBuilder.mockReturnValue(qb);

    const result = await service.findOne('guardiao');

    expect(result.children).toBe(children);
    // 'skill' sorts before 'spell', matching the book: Poderes, then Feitiços.
    expect(qb.orderBy).toHaveBeenCalledWith('entry.type', 'ASC');
    expect(qb.andWhere).toHaveBeenCalledWith(
      "entry.details ->> 'classSlug' = :classSlug",
      { classSlug: 'guardiao' },
    );
  });

  it('does not look up children for non-Class entries', async () => {
    repo.findOne.mockResolvedValue({ slug: 'crise', type: 'rule' });
    const result = await service.findOne('crise');
    expect(result.children).toEqual([]);
    expect(repo.createQueryBuilder).not.toHaveBeenCalled();
  });

  it('searches ignoring accents and case, and escapes LIKE wildcards', async () => {
    const qb = queryBuilder();
    repo.createQueryBuilder.mockReturnValue(qb);

    await service.findAll('  PERÍCIA_50% ');

    expect(qb.setParameter).toHaveBeenCalledWith('like', '%pericia\\_50\\%%');
  });

  it('filters by type', async () => {
    const qb = queryBuilder();
    repo.createQueryBuilder.mockReturnValue(qb);

    await service.findAll(undefined, 'spell');

    expect(qb.andWhere).toHaveBeenCalledWith('entry.type = :type', {
      type: 'spell',
    });
    expect(qb.setParameter).not.toHaveBeenCalled();
  });
});
