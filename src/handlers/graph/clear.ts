import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ClearInputMessage } from '#/schemas/messages/graph/input/ClearInputMessage.ts'
import { ClearOutputMessageInput } from '#/schemas/messages/graph/output/ClearOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'
import { toGraphErrorInput } from '#/domain/graph.ts'

export const clear = (
  message: ClearInputMessage,
): TE.TaskEither<Error, ClearOutputMessageInput | ErrorOutputMessageInput> => {
  return pipe(
    graphs.set(message.payload.id, {
      id: message.payload.id,
      description: message.payload.description,
      icon: message.payload.icon,
      library: message.payload.library,
      name: message.payload.name ?? 'main',
      main: message.payload.main ?? false,
      edges: [],
      groups: [],
      iips: [],
      inports: [],
      nodes: [],
      outports: [],
    }),
    TE.match(
      toGraphErrorInput,
      (graph): Array<ClearOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'clear',
            payload: {
              id: graph.id,
              main: message.payload.main,
              name: message.payload.name,
              description: message.payload.description,
              icon: message.payload.icon,
              library: message.payload.library,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
