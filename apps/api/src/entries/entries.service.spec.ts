import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntriesService } from './entries.service';
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

describe('EntriesService', () => {
  let service: EntriesService;
  const repo = { findOne: jest.fn(), createQueryBuilder: jest.fn() };

  beforeEach(async () => {
    jest.resetAllMocks();
    const moduleRef = await Test.createTestingModule({
      providers: [
        EntriesService,
        { provide: getRepositoryToken(Entry), useValue: repo },
      ],
    }).compile();
    service = moduleRef.get(EntriesService);
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
