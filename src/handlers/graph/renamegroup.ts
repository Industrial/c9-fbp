import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { RenameGroupInputMessage } from '#/schemas/messages/graph/input/RenameGroupInputMessage.ts'
import { RenameGroupOutputMessageInput } from '#/schemas/messages/graph/output/RenameGroupOutputMessage.ts'
import { graphFindGroupByName, graphWithGroup, toGraphErrorInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const renamegroup = (
  message: RenameGroupInputMessage,
): TE.TaskEither<Error, Array<RenameGroupOutputMessageInput | ErrorOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        E.right(graph),
        E.chain(graphFindGroupByName(message.payload.from)),
        TE.fromEitherK(E.chain((group) => {
          return pipe(
            graph,
            graphWithGroup({
              ...group,
              name: message.payload.to,
            }),
          )
        })),
      )
    }),
    TE.chain((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      toGraphErrorInput,
      (graph): Array<RenameGroupOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'renamegroup',
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
