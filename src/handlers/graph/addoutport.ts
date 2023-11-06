import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { AddOutportInputMessage } from '#/schemas/messages/graph/input/AddOutportInputMessage.ts'
import { AddOutportOutputMessageInput } from '#/schemas/messages/graph/output/AddOutportOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { graphContainsNodeById, graphWithOutport, toGraphErrorInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const addoutport = (
  message: AddOutportInputMessage,
): TE.TaskEither<Error, Array<AddOutportOutputMessageInput | ErrorOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        E.right(graph),
        E.chain(graphContainsNodeById(message.payload.node)),
        E.chain(graphWithOutport({
          index: undefined,
          metadata: message.payload.metadata,
          node: message.payload.node,
          port: message.payload.port,
          public: message.payload.public,
        })),
        TE.fromEitherK(E.map((graph) => {
          return graph
        })),
      )
    }),
    TE.match(
      toGraphErrorInput,
      (_graph): Array<AddOutportOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'addoutport',
            payload: {
              graph: message.payload.graph,
              metadata: message.payload.metadata,
              public: message.payload.public,
              node: message.payload.node,
              port: message.payload.port,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
