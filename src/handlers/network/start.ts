import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorNetworkOutputMessageInput } from '#/schemas/messages/network/output/ErrorNetworkOutputMessage.ts'
import { StartNetworkInputMessage } from '#/schemas/messages/network/input/StartNetworkInputMessage.ts'
import { StartedNetworkOutputMessageInput } from '#/schemas/messages/network/output/StartedNetworkOutputMessage.ts'
import { withNetworkStart } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'

export const start: MessageHandler<
  StartNetworkInputMessage,
  StartedNetworkOutputMessageInput | ErrorNetworkOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(withNetworkStart()),
        TE.fromEitherK(E.map((graph) => graph)),
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
