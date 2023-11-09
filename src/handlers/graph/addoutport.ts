import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { AddOutportGraphInputMessage } from '#/schemas/messages/graph/input/AddOutportGraphInputMessage.ts'
import { AddOutportGraphOutputMessageInput } from '#/schemas/messages/graph/output/AddOutportGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { graphContainsNodeById, graphWithOutport, toGraphErrorGraphInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const addoutport = (
  message: AddOutportGraphInputMessage,
): TE.TaskEither<Error, Array<AddOutportGraphOutputMessageInput | ErrorGraphOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        E.right(graph),
        E.chain(graphContainsNodeById(message.payload.node)),
        E.chain(graphWithOutport({
          index: undefined,
          metadata: message.payload.metadata,
          node: message.payload.node,
          port: message.payload.port,
          public: message.payload.public,
        })),
        TE.fromEitherK(E.map((graph) => {
          return graph
        })),
      )
    }),
    TE.chain((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      toGraphErrorGraphInput,
      (graph): Array<AddOutportGraphOutputMessageInput | ErrorGraphOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'addoutport',
            payload: {
              graph: graph.id,
              metadata: message.payload.metadata,
              public: message.payload.public,
              node: message.payload.node,
              port: message.payload.port,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
