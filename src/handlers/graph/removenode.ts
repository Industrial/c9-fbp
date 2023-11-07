import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { RemoveNodeInputMessage } from '#/schemas/messages/graph/input/RemoveNodeInputMessage.ts'
import { RemoveNodeOutputMessageInput } from '#/schemas/messages/graph/output/RemoveNodeOutputMessage.ts'
import { graphFindNodeById, graphWithoutNode, toGraphErrorInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const removenode = (
  message: RemoveNodeInputMessage,
): TE.TaskEither<Error, Array<RemoveNodeOutputMessageInput | ErrorOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        graph,
        graphFindNodeById(message.payload.id),
        TE.fromEitherK(E.chain((group) => {
          return pipe(
            graph,
            graphWithoutNode(group),
          )
        })),
      )
    }),
    TE.map((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      toGraphErrorInput,
      (_graph): Array<RemoveNodeOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'removenode',
            payload: {
              id: message.payload.id,
              graph: message.payload.graph,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
