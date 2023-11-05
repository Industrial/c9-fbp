import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { RemoveOutportInputMessage } from '#/schemas/messages/graph/input/RemoveOutportInputMessage.ts'
import { RemoveOutportOutputMessageInput } from '#/schemas/messages/graph/output/RemoveOutportOutputMessage.ts'
import { graphFindOutportByPublic, graphWithoutOutport, toGraphErrorInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const removeoutport = (
  message: RemoveOutportInputMessage,
): TE.TaskEither<Error, Array<RemoveOutportOutputMessageInput | ErrorOutputMessageInput>> => {
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
    TE.match(
      toGraphErrorInput,
      (_graph): Array<RemoveOutportOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'removeoutport',
            payload: {
              graph: message.payload.graph,
              public: message.payload.public,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
