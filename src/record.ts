export const merge = <R extends Record<string, unknown>>(a: R, b: R, ...cs: ReadonlyArray<R>): R =>
  cs.length === 0 ? { ...a, ...b } : merge(b, cs[0], ...cs.slice(1))

export const mergeOnto = <R extends Record<string, unknown>>(a: R) => (b: R): R => ({
  ...b,
  ...a,
})
