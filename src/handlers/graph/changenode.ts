import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ChangeNodeInputMessage } from '#/schemas/messages/graph/input/ChangeNodeInputMessage.ts'
import { ChangeNodeOutputMessageInput } from '#/schemas/messages/graph/output/ChangeNodeOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { graphFindNodeById, graphWithNode, toGraphErrorInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const changenode = (
  message: ChangeNodeInputMessage,
): TE.TaskEither<Error, Array<ChangeNodeOutputMessageInput | ErrorOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        graph,
        graphFindNodeById(message.payload.id),
        TE.fromEitherK(E.chain((group) => {
          return pipe(
            graph,
            graphWithNode(group),
          )
        })),
      )
    }),
    TE.match(
      toGraphErrorInput,
      (_graph): Array<ChangeNodeOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'changenode',
            payload: {
              id: message.payload.id,
              metadata: message.payload.metadata,
              graph: message.payload.graph,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
