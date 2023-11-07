import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { RenameNodeInputMessage } from '#/schemas/messages/graph/input/RenameNodeInputMessage.ts'
import { RenameNodeOutputMessageInput } from '#/schemas/messages/graph/output/RenameNodeOutputMessage.ts'
import { graphFindNodeById, graphWithNode, toGraphErrorInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const renamenode = (
  message: RenameNodeInputMessage,
): TE.TaskEither<Error, Array<RenameNodeOutputMessageInput | ErrorOutputMessageInput>> => {
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
    TE.map((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      toGraphErrorInput,
      (_graph): Array<RenameNodeOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'renamenode',
            payload: {
              from: message.payload.from,
              graph: message.payload.graph,
              to: message.payload.to,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
