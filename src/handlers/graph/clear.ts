import * as GraphDomain from '#/domain/graph.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ClearGraphInputMessage } from '#/schemas/messages/graph/input/ClearGraphInputMessage.ts'
import { ClearGraphOutputMessageInput } from '#/schemas/messages/graph/output/ClearGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'

export const clear: MessageHandler<
  ClearGraphInputMessage,
  ClearGraphOutputMessageInput | ErrorGraphOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.set(
      message.payload.id,
      GraphDomain.create(
        message.payload.id,
        message.payload.name ?? 'main',
        {},
        {},
        {},
        message.payload.main ?? false,
        message.payload.library,
        message.payload.description,
        message.payload.icon,
      ),
    ),
    TE.match(
      (error) => {
        send({
          protocol: 'graph',
          command: 'error',
          payload: {
            message: error.message,
          },
        })()
      },
      (graph) => {
        send({
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
        })()
      },
    ),
  )
