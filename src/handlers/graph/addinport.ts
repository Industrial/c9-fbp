import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as PortDomain from '#/domain/port.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { AddInportGraphInputMessage } from '#/schemas/messages/graph/input/AddInportGraphInputMessage.ts'
import { AddInportGraphOutputMessageInput } from '#/schemas/messages/graph/output/AddInportGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'

export const addinport: MessageHandler<
  AddInportGraphInputMessage,
  AddInportGraphOutputMessageInput | ErrorGraphOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.containsNodeById(message.payload.node)),
        E.chain(
          GraphDomain.withInportByNodeId(
            PortDomain.create(message.payload.port, message.payload.public, message.payload.metadata ?? {}),
            message.payload.node,
          ),
        ),
        TE.fromEitherK(E.map((graph) => graph)),
      )
    ),
    TE.chain((graph) => graphs.set(graph.id, graph)),
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
          command: 'addinport',
          payload: {
            graph: graph.id,
            metadata: message.payload.metadata,
            public: message.payload.public,
            node: message.payload.node,
            port: message.payload.port,
          },
        })()
      },
    ),
  )
