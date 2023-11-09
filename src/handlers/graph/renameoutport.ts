import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { RenameOutportGraphInputMessage } from '#/schemas/messages/graph/input/RenameOutportGraphInputMessage.ts'
import { RenameOutportGraphOutputMessageInput } from '#/schemas/messages/graph/output/RenameOutportGraphOutputMessage.ts'
import { graphFindOutportByPublic, graphWithOutport, toGraphErrorGraphInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const renameoutport = (
  message: RenameOutportGraphInputMessage,
): TE.TaskEither<Error, Array<RenameOutportGraphOutputMessageInput | ErrorGraphOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        graph,
        graphFindOutportByPublic(message.payload.from),
        TE.fromEitherK(E.chain((group) => {
          return pipe(
            graph,
            graphWithOutport({
              ...group,
              public: message.payload.to,
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
      (graph): Array<RenameOutportGraphOutputMessageInput | ErrorGraphOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'renameoutport',
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
