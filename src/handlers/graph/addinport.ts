import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { AddInportInputMessage } from '#/schemas/messages/graph/input/AddInportInputMessage.ts'
import { AddInportOutputMessageInput } from '#/schemas/messages/graph/output/AddInportOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { graphWithInport, toGraphErrorInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const addinport = (
  message: AddInportInputMessage,
): TE.TaskEither<Error, Array<AddInportOutputMessageInput | ErrorOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        graph,
        TE.fromEitherK(graphWithInport({
          index: undefined,
          metadata: message.payload.metadata,
          node: message.payload.node,
          port: message.payload.port,
          public: message.payload.public,
        })),
      )
    }),
    TE.match(
      toGraphErrorInput,
      (_graph): Array<AddInportOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'addinport',
            payload: {
              graph: message.payload.graph,
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
