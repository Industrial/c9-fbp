import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorNetworkOutputMessageInput } from '#/schemas/messages/network/output/ErrorNetworkOutputMessage.ts'
import { Float } from 'schemata-ts/float'
import { GetStatusNetworkInputMessage } from '#/schemas/messages/network/input/GetStatusNetworkInputMessage.ts'
import { StatusNetworkOutputMessageInput } from '#/schemas/messages/network/output/StatusNetworkOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'

export const getstatus: MessageHandler<
  GetStatusNetworkInputMessage,
  StatusNetworkOutputMessageInput | ErrorNetworkOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.match(
      (error) => {
        send({
          protocol: 'network',
          command: 'error',
          payload: {
            graph: message.payload.graph,
            message: error.message,
            stack: undefined,
          },
        })()
      },
      (graph) => {
        send({
          protocol: 'network',
          command: 'status',
          payload: {
            graph: graph.id,
            debug: graph.network.isDebugging,
            running: graph.network.isRunning,
            started: graph.network.hasStarted,
            uptime: (new Date().valueOf() - new Date(graph.network.startTime).valueOf()) as Float,
          },
        })()
      },
    ),
  )
