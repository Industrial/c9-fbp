import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { RemoveInportGraphInputMessage } from '#/schemas/messages/graph/input/RemoveInportGraphInputMessage.ts'
import { RemoveInportGraphOutputMessageInput } from '#/schemas/messages/graph/output/RemoveInportGraphOutputMessage.ts'
import { graphFindInportByPublic, graphWithoutInport, toGraphErrorGraphInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const removeinport = (
  message: RemoveInportGraphInputMessage,
): TE.TaskEither<Error, Array<RemoveInportGraphOutputMessageInput | ErrorGraphOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        E.right(graph),
        E.chain(graphFindInportByPublic(message.payload.public)),
        TE.fromEitherK(E.chain((inport) => {
          return pipe(
            graph,
            graphWithoutInport(inport),
          )
        })),
      )
    }),
    TE.chain((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      toGraphErrorGraphInput,
      (graph): Array<RemoveInportGraphOutputMessageInput | ErrorGraphOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'removeinport',
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
