import * as E from 'fp-ts/Either.ts'
import * as O from 'fp-ts/Option.ts'
import * as RA from 'fp-ts/ReadonlyArray.ts'
import { pipe } from 'fp-ts/function.ts'
import { Predicate } from 'fp-ts/Predicate.ts'

export const findFirstByPredicate = <P>(predicate: Predicate<P>) => (as: ReadonlyArray<P>): O.Option<P> =>
  pipe(
    as,
    RA.findFirst(predicate),
  )

export const findFirstByPredicateE = <P>(predicate: Predicate<P>) => (as: ReadonlyArray<P>): E.Either<Error, P> =>
  pipe(
    as,
    findFirstByPredicate(predicate),
    E.fromOption(() => new Error('NotFound')),
  )

export const findFirstByProperty =
  <P, V>(propertyName: keyof P, propertyValue: V) => (as: ReadonlyArray<P>): O.Option<P> =>
    pipe(
      as,
      RA.findFirst((entry) => entry[propertyName] === propertyValue),
    )

export const findFirstByPropertyE =
  <P, V>(propertyName: keyof P, propertyValue: V) => (as: ReadonlyArray<P>): E.Either<Error, P> =>
    pipe(
      as,
      findFirstByProperty(propertyName, propertyValue),
      E.fromOption(() => new Error('NotFound')),
    )
