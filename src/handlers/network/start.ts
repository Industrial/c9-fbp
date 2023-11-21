import * as GraphDomain from '#/domain/graph.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorNetworkOutputMessageInput } from '#/schemas/messages/network/output/ErrorNetworkOutputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'
import { StartNetworkInputMessage } from '#/schemas/messages/network/input/StartNetworkInputMessage.ts'
import { StartedNetworkOutputMessageInput } from '#/schemas/messages/network/output/StartedNetworkOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'

export const start: MessageHandler<
  StartNetworkInputMessage,
  StartedNetworkOutputMessageInput | ErrorNetworkOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.map((graph) =>
      pipe(
        graph,
        GraphDomain.startNetwork,
      )
    ),
    TE.chain((graph) => graphs.set(graph.id, graph)),
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
          command: 'started',
          payload: {
            graph: graph.id,
            debug: graph.network.isDebugging,
            running: graph.network.isRunning,
            started: graph.network.hasStarted,
            time: graph.network.startTime,
          },
        })()
      },
    ),
  )
