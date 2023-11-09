import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ClearGraphInputMessage } from '#/schemas/messages/graph/input/ClearGraphInputMessage.ts'
import { ClearGraphOutputMessageInput } from '#/schemas/messages/graph/output/ClearGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'
import { toGraphErrorGraphInput } from '#/domain/graph.ts'

export const clear = (
  message: ClearGraphInputMessage,
): TE.TaskEither<Error, ClearGraphOutputMessageInput | ErrorGraphOutputMessageInput> => {
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
      toGraphErrorGraphInput,
      (graph): Array<ClearGraphOutputMessageInput | ErrorGraphOutputMessageInput> => {
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
