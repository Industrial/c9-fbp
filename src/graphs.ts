import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as R from 'fp-ts/Record.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as uuid from '#/uuid.ts'
import { pipe } from 'fp-ts/function.ts'

let graphs: Record<GraphDomain.Graph['id'], GraphDomain.Graph> = {}

export const get = (id?: GraphDomain.Graph['id']): TE.TaskEither<Error, GraphDomain.Graph> =>
  id
    ? pipe(
      graphs,
      R.lookup(id),
      TE.fromEitherK(E.fromOption(() => new Error('GraphNotFound'))),
    )
    : pipe(
      uuid.create(),
      TE.chain((newId) =>
        set(
          newId,
          GraphDomain.create(
            'main',
            'main',
            {},
            {},
            {},
            true,
          ),
        )
      ),
    )

export const set = (id: GraphDomain.Graph['id'], graph: GraphDomain.Graph): TE.TaskEither<Error, GraphDomain.Graph> =>
  pipe(
    TE.fromIO(() => {
      graphs = pipe(
        graphs,
        R.upsertAt(id, graph),
      )
    }),
    TE.chain(() => get(id)),
  )
