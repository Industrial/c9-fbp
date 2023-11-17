import * as E from 'fp-ts/Either.ts'
import * as RA from 'fp-ts/ReadonlyArray.ts'
import * as fpjson from 'fp-ts/Json.ts'
import { pipe } from 'fp-ts/function.ts'

export const stringify = fpjson.stringify as <A>(a: A) => E.Either<Error, string>

export const stringifyReadonlyArrayE = <A>(a: ReadonlyArray<A>) =>
  pipe(
    a,
    RA.map(stringify),
    E.sequenceArray,
  )
