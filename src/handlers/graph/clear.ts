import * as GraphDomain from '#/domain/graph.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ClearGraphInputMessage } from '#/schemas/messages/graph/input/ClearGraphInputMessage.ts'
import { ClearGraphOutputMessageInput } from '#/schemas/messages/graph/output/ClearGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'

export const clear = (
  message: ClearGraphInputMessage,
): TE.TaskEither<Error, ClearGraphOutputMessageInput | ErrorGraphOutputMessageInput> =>
  pipe(
    graphs.set(
      message.payload.id,
      GraphDomain.create(
        message.payload.id,
        message.payload.name ?? 'main',
        [],
        [],
        [],
        message.payload.main ?? false,
        message.payload.library,
        message.payload.description,
        message.payload.icon,
      ),
    ),
    TE.match(
      GraphDomain.toGraphErrorGraphInput,
      (graph): Array<ClearGraphOutputMessageInput | ErrorGraphOutputMessageInput> => [
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
      ],
    ),
    TE.fromTask,
  )
