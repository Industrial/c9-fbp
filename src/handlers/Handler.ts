import * as TE from 'fp-ts/TaskEither.ts'

export type Handler<I, E, O> = (message: I) => TE.TaskEither<E, Array<O>>
