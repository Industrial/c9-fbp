import * as Option from 'fp-ts/Option.ts'
import * as record from '#/record.ts'

export const add = <A>(a: A) => () => Option.some(a)

export const update = <A>(f: (x: A, y: A) => A) => (a: A) => Option.map((b: A) => f(b, a))

export const merge = update(record.merge)

export const map = Option.map

export const remove = () => Option.none
