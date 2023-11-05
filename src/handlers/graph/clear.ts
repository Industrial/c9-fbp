import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ClearInputMessage } from '#/schemas/messages/graph/input/ClearInputMessage.ts'
import { ClearOutputMessageInput } from '#/schemas/messages/graph/output/ClearOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'

export const clear = (
  message: ClearInputMessage,
): TE.TaskEither<Error, ClearOutputMessageInput | ErrorOutputMessageInput> => {
  return pipe(
    graphs.set(message.payload.id, {
      ...message.payload,
      edges: [],
      groups: [],
      iips: [],
      inports: [],
      nodes: [],
      outports: [],
    }),
    TE.match(
      (error): Array<ClearOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'error',
            payload: {
              message: error.message,
            },
          },
        ]
      },
      (graph): Array<ClearOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'clear',
            payload: {
              ...graph,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
