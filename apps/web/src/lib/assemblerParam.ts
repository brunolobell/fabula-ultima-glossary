/** The query parameter that opens the Creature Assembler (`?montagem=rapida`). */
export const ASSEMBLER_PARAM = 'montagem';

/** Quick Assembly is the only method the Assembler offers. */
export const ASSEMBLER_METHOD = 'rapida';

export const isAssemblerOpen = (value: string | null) =>
  value === ASSEMBLER_METHOD;
