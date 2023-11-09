import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { RenameGroupGraphInputMessage } from '#/schemas/messages/graph/input/RenameGroupGraphInputMessage.ts'
import { RenameGroupGraphOutputMessageInput } from '#/schemas/messages/graph/output/RenameGroupGraphOutputMessage.ts'
import { graphFindGroupByName, graphWithGroup, toGraphErrorGraphInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const renamegroup = (
  message: RenameGroupGraphInputMessage,
): TE.TaskEither<Error, Array<RenameGroupGraphOutputMessageInput | ErrorGraphOutputMessageInput>> => {
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
      toGraphErrorGraphInput,
      (graph): Array<RenameGroupGraphOutputMessageInput | ErrorGraphOutputMessageInput> => {
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
