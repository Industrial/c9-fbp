import * as R from 'fp-ts/Record.ts'
import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import { Graph } from '#/schemas/messages/shared/Graph.ts'
import { GraphID } from '#/schemas/messages/shared/GraphID.ts'
import { pipe } from 'fp-ts/function.ts'

let graphs: Record<GraphID, Graph> = {}

export const getE = (id: GraphID) => {
  return pipe(
    graphs,
    R.lookup(id),
    E.fromOption(() => {
      return new Error('GraphNotFound')
    }),
  )
}

export const get = (id: GraphID) => {
  return pipe(
    graphs,
    R.lookup(id),
    TE.fromEitherK(E.fromOption(() => {
      return new Error('GraphNotFound')
    })),
  )
}

export const set = (id: GraphID, graph: Graph) => {
  graphs = pipe(
    graphs,
    R.upsertAt(id, graph),
  )
  return get(id)
}
