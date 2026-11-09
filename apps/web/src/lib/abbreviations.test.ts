import { describe, expect, it } from 'vitest';
import { abbreviationsIn } from './abbreviations';

const siglas = (...texts: string[]) => abbreviationsIn(...texts).map((a) => a.sigla);

describe('abbreviationsIn', () => {
  it('finds the abbreviations a text uses, in the table order', () => {
    expect(siglas('Gaste 10 PM e perca PV; (DES + AST) +1, NP 2.')).toEqual(['NP', 'PV', 'PM', 'DES', 'AST']);
  });

  it('matches whole words only', () => {
    // "PMs" is not PM, "DESCANSO" is not DES, "RAIO" is not RA.
    expect(siglas('PMs', 'DESCANSO', 'RAIO', 'CAPIM', 'ND2x')).toEqual([]);
  });

  it('is case sensitive and ignores missing text', () => {
    expect(abbreviationsIn(undefined, 'pm des ra')).toEqual([]);
  });

  it('reads a check formula', () => {
    expect(siglas('causa (RA + 25) pontos de dano')).toEqual(['RA']);
  });

  it('does not mistake NPC for NP or PJ-less text', () => {
    expect(siglas('Um NPC amigável')).toEqual(['NPC']);
  });
});
