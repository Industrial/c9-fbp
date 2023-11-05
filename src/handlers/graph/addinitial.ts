import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { AddInitialInputMessage } from '#/schemas/messages/graph/input/AddInitialInputMessage.ts'
import { AddInitialOutputMessageInput } from '#/schemas/messages/graph/output/AddInitialOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { graphWithIIP, toGraphErrorInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const addinitial = (
  message: AddInitialInputMessage,
): TE.TaskEither<Error, Array<AddInitialOutputMessageInput | ErrorOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        graph,
        TE.fromEitherK(graphWithIIP({
          src: message.payload.src,
          tgt: message.payload.tgt,
          metadata: message.payload.metadata,
        })),
      )
    }),
    TE.match(
      toGraphErrorInput,
      (_graph): Array<AddInitialOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'addinitial',
            payload: {
              graph: message.payload.graph,
              metadata: message.payload.metadata,
              src: message.payload.src,
              tgt: message.payload.tgt,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
