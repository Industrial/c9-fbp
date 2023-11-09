import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { RemoveNodeGraphInputMessage } from '#/schemas/messages/graph/input/RemoveNodeGraphInputMessage.ts'
import { RemoveNodeGraphOutputMessageInput } from '#/schemas/messages/graph/output/RemoveNodeGraphOutputMessage.ts'
import { graphFindNodeById, graphWithoutNode, toGraphErrorGraphInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const removenode = (
  message: RemoveNodeGraphInputMessage,
): TE.TaskEither<Error, Array<RemoveNodeGraphOutputMessageInput | ErrorGraphOutputMessageInput>> => {
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
    TE.chain((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      toGraphErrorGraphInput,
      (graph): Array<RemoveNodeGraphOutputMessageInput | ErrorGraphOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'removenode',
            payload: {
              graph: graph.id,
              id: message.payload.id,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
