import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { RenameInportGraphInputMessage } from '#/schemas/messages/graph/input/RenameInportGraphInputMessage.ts'
import { RenameInportGraphOutputMessageInput } from '#/schemas/messages/graph/output/RenameInportGraphOutputMessage.ts'
import { graphFindInportByPublic, graphWithInport, toGraphErrorGraphInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const renameinport = (
  message: RenameInportGraphInputMessage,
): TE.TaskEither<Error, Array<RenameInportGraphOutputMessageInput | ErrorGraphOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        graph,
        graphFindInportByPublic(message.payload.from),
        TE.fromEitherK(E.chain((group) => {
          return pipe(
            graph,
            graphWithInport({
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
      (graph): Array<RenameInportGraphOutputMessageInput | ErrorGraphOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'renameinport',
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
