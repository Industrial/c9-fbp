export type Comparator<A> = (a: A, b: A) => boolean

export const byProperty =
  <K extends string, A extends { [P in K]: unknown }>(p: K): Comparator<A> => (a: A, b: A): boolean => a[p] === b[p]

export const and = <A>(f: Comparator<A>, g: Comparator<A>) => (a: A, b: A) => f(a, b) && g(a, b)
