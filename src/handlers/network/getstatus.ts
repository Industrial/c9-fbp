import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorNetworkOutputMessageInput } from '#/schemas/messages/network/output/ErrorNetworkOutputMessage.ts'
import { Float } from 'schemata-ts/float'
import { GetStatusNetworkInputMessage } from '#/schemas/messages/network/input/GetStatusNetworkInputMessage.ts'
import { StatusNetworkOutputMessageInput } from '#/schemas/messages/network/output/StatusNetworkOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'

export const getstatus = (
  message: GetStatusNetworkInputMessage,
): TE.TaskEither<Error, Array<StatusNetworkOutputMessageInput | ErrorNetworkOutputMessageInput>> =>
  pipe(
    graphs.get(message.payload.graph),
    TE.match(
      (error): Array<StatusNetworkOutputMessageInput | ErrorNetworkOutputMessageInput> => [
        {
          protocol: 'network',
          command: 'error',
          payload: {
            graph: message.payload.graph,
            message: error.message,
            stack: undefined,
          },
        },
      ],
      (graph): Array<StatusNetworkOutputMessageInput | ErrorNetworkOutputMessageInput> => [
        {
          protocol: 'network',
          command: 'status',
          payload: {
            graph: graph.id,
            debug: graph.network.isDebugging,
            running: graph.network.isRunning,
            started: graph.network.hasStarted,
            uptime: (new Date().valueOf() - new Date(graph.network.startTime).valueOf()) as Float,
          },
        },
      ],
    ),
    TE.fromTask,
  )
