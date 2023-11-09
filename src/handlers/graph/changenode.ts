import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ChangeNodeGraphInputMessage } from '#/schemas/messages/graph/input/ChangeNodeGraphInputMessage.ts'
import { ChangeNodeGraphOutputMessageInput } from '#/schemas/messages/graph/output/ChangeNodeGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { graphFindNodeById, graphWithNode, toGraphErrorGraphInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const changenode = (
  message: ChangeNodeGraphInputMessage,
): TE.TaskEither<Error, Array<ChangeNodeGraphOutputMessageInput | ErrorGraphOutputMessageInput>> => {
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
    TE.chain((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      toGraphErrorGraphInput,
      (graph): Array<ChangeNodeGraphOutputMessageInput | ErrorGraphOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'changenode',
            payload: {
              graph: graph.id,
              id: message.payload.id,
              metadata: message.payload.metadata,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
