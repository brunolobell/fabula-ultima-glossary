import { EquipmentDetails } from '../../entries/entry-types';
import { slugify } from '../../entries/slug';
import { seedEntries } from './index';

/**
 * Counts per block as printed in the books (audit of 2026-11-16, see
 * docs/content-backlog.md P1.2): a missing or extra row means a seeding slip.
 */
const equipment = seedEntries.filter((e) => e.type === 'equipment');
const details = (e: (typeof equipment)[number]) =>
  e.details as EquipmentDetails;
const from = (source: string) => equipment.filter((e) => e.source === source);
const count = (
  entries: typeof equipment,
  kind: string,
  rarity: EquipmentDetails['rarity'] = 'rare',
) =>
  entries.filter(
    (e) => details(e).kind === kind && details(e).rarity === rarity,
  ).length;

describe('rare items seeded from the books', () => {
  describe('Livro Básico (p. 270-291)', () => {
    const lb = from('livro-basico').filter((e) => details(e).rarity === 'rare');

    it('has every printed weapon category', () => {
      const perCategory: Record<string, number> = {};
      for (const e of lb) {
        const d = details(e);
        if (d.kind === 'weapon' && d.category)
          perCategory[d.category] = (perCategory[d.category] ?? 0) + 1;
      }
      expect(perCategory).toEqual({
        'Armas Arcanas': 10,
        Arcos: 11,
        Luta: 12,
        Adagas: 11,
        'Armas de Fogo': 11,
        Malhos: 11,
        'Armas Pesadas': 12,
        Lanças: 11,
        Espadas: 12,
        'Armas de Arremesso': 12,
      });
      expect(count(lb, 'weapon')).toBe(113);
    });

    it('has the printed armors, shields, accessories and artifacts', () => {
      expect(count(lb, 'armor')).toBe(22);
      expect(count(lb, 'shield')).toBe(12);
      expect(count(lb, 'accessory')).toBe(29);
      expect(count(lb, 'artifact')).toBe(11);
    });

    it('has the printed martial weapons', () => {
      const martial = lb.filter(
        (e) => details(e).kind === 'weapon' && details(e).martial,
      );
      expect(martial).toHaveLength(59);
    });

    it('seeds its page numbers inside the printed range', () => {
      for (const e of lb) {
        expect(e.page).toBeGreaterThanOrEqual(270);
        expect(e.page).toBeLessThanOrEqual(291);
      }
    });

    it('seeds the two Rules the items link to', () => {
      for (const name of ['Criar acessórios raros', 'Artefatos']) {
        const rule = seedEntries.find((e) => e.name === name);
        expect(rule?.type).toBe('rule');
        expect(rule?.source).toBe('livro-basico');
      }
    });
  });

  describe.each([
    ['high-fantasy', 45, 109, 113],
    ['natural-fantasy', 45, 115, 119],
    ['techno-fantasy', 59, 115, 119],
  ])('%s', (book, rareCount, firstPage, lastPage) => {
    const items = from(book);

    it('keeps the printed rare items and adds 7 evolutions and 7 examples', () => {
      const evolutions = items.filter((e) => e.tags?.includes('evolução rara'));
      const examples = items.filter((e) => details(e).rarity === 'custom');
      expect(evolutions).toHaveLength(7);
      expect(examples).toHaveLength(7);
      const rare = items.filter(
        (e) =>
          details(e).rarity === 'rare' && !e.tags?.includes('evolução rara'),
      );
      expect(rare).toHaveLength(rareCount);
      for (const e of [...evolutions, ...examples]) {
        expect(e.page).toBeGreaterThanOrEqual(firstPage);
        expect(e.page).toBeLessThanOrEqual(lastPage);
      }
    });

    it('links each evolution to a custom weapon example of the same book', () => {
      for (const e of items.filter((e) => e.tags?.includes('evolução rara'))) {
        const link = /Evolução rara de \[\[([^\]]+)\]\]/.exec(
          e.body ?? '',
        )?.[1];
        expect(link).toBeDefined();
        const target = items.find((i) => (i.slug ?? slugify(i.name)) === link);
        expect(target && details(target).rarity).toBe('custom');
      }
    });
  });

  describe('Bestiary Vol. I rewards', () => {
    it('seeds the three fixed accessories', () => {
      const items = from('bestiary-vol-1').filter(
        (e) => e.type === 'equipment',
      );
      expect(items).toHaveLength(3);
      for (const e of items) expect(details(e).kind).toBe('accessory');
    });

    it('lists the 23 Qualities in one Rule', () => {
      const rule = seedEntries.find((e) =>
        e.name.startsWith('Qualidades de recompensa'),
      );
      expect(rule?.type).toBe('rule');
      const rows = (rule?.body ?? '')
        .split('\n')
        .filter(
          (l) => l.startsWith('|') && !/^\|\s*(-|Nome|Qualidade)/i.test(l),
        );
      expect(rows).toHaveLength(23);
    });
  });
});
