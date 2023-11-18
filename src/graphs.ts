import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from './domain/graph.ts'
import * as R from 'fp-ts/Record.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as uuid from '#/uuid.ts'
import { pipe } from 'fp-ts/function.ts'

let graphs: Record<GraphDomain.GraphID, GraphDomain.Graph> = {}

export const get = (id?: GraphDomain.GraphID): TE.TaskEither<Error, GraphDomain.Graph> => {
  return id
    ? pipe(
      graphs,
      R.lookup(id),
      TE.fromEitherK(E.fromOption(() => {
        return new Error('GraphNotFound')
      })),
    )
    : pipe(
      uuid.create(),
      TE.chain((newId) => {
        return set(
          newId,
          GraphDomain.create(
            'main',
            'main',
            [],
            [],
            [],
            true,
          ),
        )
      }),
    )
}

export const set = (id: GraphDomain.GraphID, graph: GraphDomain.Graph): TE.TaskEither<Error, GraphDomain.Graph> => {
  graphs = pipe(
    graphs,
    R.upsertAt(id, graph),
  )
  return get(id)
}
