import * as E from 'fp-ts/Either.ts'
import * as O from 'fp-ts/Option.ts'
import * as RA from 'fp-ts/ReadonlyArray.ts'
import { pipe } from 'fp-ts/function.ts'
import { Predicate } from 'fp-ts/Predicate.ts'

export const findFirstByPredicate = <P>(predicate: Predicate<P>) => {
  return (as: ReadonlyArray<P>): O.Option<P> => {
    return pipe(
      as,
      RA.findFirst(predicate),
    )
  }
}

export const findFirstByPredicateE = <P>(predicate: Predicate<P>) => {
  return (as: ReadonlyArray<P>): E.Either<Error, P> => {
    return pipe(
      as,
      findFirstByPredicate(predicate),
      E.fromOption(() => {
        return new Error('NotFound')
      }),
    )
  }
}

export const findFirstByProperty = <P, V>(propertyName: keyof P, propertyValue: V) => {
  return (as: ReadonlyArray<P>): O.Option<P> => {
    return pipe(
      as,
      RA.findFirst((entry) => {
        return entry[propertyName] === propertyValue
      }),
    )
  }
}

export const findFirstByPropertyE = <P, V>(propertyName: keyof P, propertyValue: V) => {
  return (as: ReadonlyArray<P>): E.Either<Error, P> => {
    return pipe(
      as,
      findFirstByProperty(propertyName, propertyValue),
      E.fromOption(() => {
        return new Error('NotFound')
      }),
    )
  }
}
