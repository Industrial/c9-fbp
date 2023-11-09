import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { RemoveOutportGraphInputMessage } from '#/schemas/messages/graph/input/RemoveOutportGraphInputMessage.ts'
import { RemoveOutportGraphOutputMessageInput } from '#/schemas/messages/graph/output/RemoveOutportGraphOutputMessage.ts'
import { graphFindOutportByPublic, graphWithoutOutport, toGraphErrorGraphInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const removeoutport = (
  message: RemoveOutportGraphInputMessage,
): TE.TaskEither<Error, Array<RemoveOutportGraphOutputMessageInput | ErrorGraphOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        graph,
        graphFindOutportByPublic(message.payload.public),
        TE.fromEitherK(E.chain((outport) => {
          return pipe(
            graph,
            graphWithoutOutport(outport),
          )
        })),
      )
    }),
    TE.chain((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      toGraphErrorGraphInput,
      (graph): Array<RemoveOutportGraphOutputMessageInput | ErrorGraphOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'removeoutport',
            payload: {
              graph: graph.id,
              public: message.payload.public,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
