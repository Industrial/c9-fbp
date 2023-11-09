import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { RemoveInportInputMessage } from '#/schemas/messages/graph/input/RemoveInportInputMessage.ts'
import { RemoveInportOutputMessageInput } from '#/schemas/messages/graph/output/RemoveInportOutputMessage.ts'
import { graphFindInportByPublic, graphWithoutInport, toGraphErrorInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const removeinport = (
  message: RemoveInportInputMessage,
): TE.TaskEither<Error, Array<RemoveInportOutputMessageInput | ErrorOutputMessageInput>> => {
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
      toGraphErrorInput,
      (graph): Array<RemoveInportOutputMessageInput | ErrorOutputMessageInput> => {
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
