import * as E from 'fp-ts/Either.ts'
import * as R from 'fp-ts/Record.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as uuid from '#/uuid.ts'
import { Graph } from '#/schemas/messages/shared/Graph.ts'
import { GraphID } from '#/schemas/messages/shared/GraphID.ts'
import { pipe } from 'fp-ts/function.ts'

let graphs: Record<GraphID, Graph> = {}

const main = (): Graph => {
  return {
    id: 'main',
    main: true,
    name: 'main',
    outports: [],
    nodes: [],
    inports: [],
    iips: [],
    groups: [],
    edges: [],
    library: undefined,
    description: undefined,
    icon: undefined,
  }
}

export const get = (id?: GraphID): TE.TaskEither<Error, Graph> => {
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
        return set(newId, main())
      }),
    )
}

export const set = (id: GraphID, graph: Graph): TE.TaskEither<Error, Graph> => {
  graphs = pipe(
    graphs,
    R.upsertAt(id, graph),
  )
  return get(id)
}
