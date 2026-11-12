import { describe, expect, it } from 'vitest';
import { headingSlug, outline, plainHeading, uniqueIds } from './headings';

const index = new Map([['clarao', { name: 'Clarão', type: 'spell' as const }]]);

describe('headingSlug', () => {
  it('drops accents and punctuation', () => {
    expect(headingSlug('Os três Traços')).toBe('os-tres-tracos');
    expect(headingSlug('Ação (PM 10)!')).toBe('acao-pm-10');
  });

  it('never returns an empty id', () => {
    expect(headingSlug('???')).toBe('secao');
  });
});

describe('plainHeading', () => {
  it('keeps what a Reader sees', () => {
    expect(plainHeading('**Negrito** e `código` e [link](/x)')).toBe(
      'Negrito e código e link',
    );
  });
});

describe('uniqueIds', () => {
  it('numbers repeated headings', () => {
    expect(uniqueIds(['Exemplos', 'Regras', 'Exemplos', 'Exemplos'])).toEqual([
      'exemplos',
      'regras',
      'exemplos-2',
      'exemplos-3',
    ]);
  });
});

describe('outline', () => {
  const body = [
    '## Os três Traços',
    '',
    'Texto.',
    '',
    '### Um subtítulo',
    '',
    '```',
    '## não é título',
    '```',
    '',
    '## Veja [[clarao]]',
    '',
    '## **Os três** Traços',
  ].join('\n');

  it('lists only secondary headings, outside code, with their lines', () => {
    expect(outline(body, index)).toEqual([
      { id: 'os-tres-tracos', text: 'Os três Traços', line: 1 },
      { id: 'veja-clarao', text: 'Veja Clarão', line: 11 },
      { id: 'os-tres-tracos-2', text: 'Os três Traços', line: 13 },
    ]);
  });
});
