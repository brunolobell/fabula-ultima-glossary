import { describe, expect, it } from 'vitest';
import { SOURCE_LABEL } from './sources';

describe('SOURCE_LABEL', () => {
  it('names the Codex Extra and the Fabula Bonus books', () => {
    expect(SOURCE_LABEL['codex-extra']).toBe('Codex Extra');
    expect(SOURCE_LABEL['bonus-ace-of-cards']).toBe(
      'Fabula Bonus: Ace of Cards (inglês)',
    );
    expect(SOURCE_LABEL['bonus-necromancer']).toBe(
      'Fabula Bonus: Necromancer (inglês)',
    );
  });
});
