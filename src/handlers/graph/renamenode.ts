import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { RenameNodeGraphInputMessage } from '#/schemas/messages/graph/input/RenameNodeGraphInputMessage.ts'
import { RenameNodeGraphOutputMessageInput } from '#/schemas/messages/graph/output/RenameNodeGraphOutputMessage.ts'
import { graphFindNodeById, graphWithNode, toGraphErrorGraphInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const renamenode = (
  message: RenameNodeGraphInputMessage,
): TE.TaskEither<Error, Array<RenameNodeGraphOutputMessageInput | ErrorGraphOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        graph,
        graphFindNodeById(message.payload.from),
        TE.fromEitherK(E.chain((group) => {
          return pipe(
            graph,
            graphWithNode({
              ...group,
              id: message.payload.to,
            }),
          )
        })),
      )
    }),
    TE.chain((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      toGraphErrorGraphInput,
      (graph): Array<RenameNodeGraphOutputMessageInput | ErrorGraphOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'renamenode',
            payload: {
              graph: graph.id,
              from: message.payload.from,
              to: message.payload.to,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
