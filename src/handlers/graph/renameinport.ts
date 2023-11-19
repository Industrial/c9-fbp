import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as NodeDomain from '#/domain/node.ts'
import * as PortDomain from '#/domain/port.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { RenameInportGraphInputMessage } from '#/schemas/messages/graph/input/RenameInportGraphInputMessage.ts'
import { RenameInportGraphOutputMessageInput } from '#/schemas/messages/graph/output/RenameInportGraphOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'

export const renameinport: MessageHandler<
  RenameInportGraphInputMessage,
  RenameInportGraphOutputMessageInput | ErrorGraphOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.containsInportByNodeIdAndPortId(message.payload.node, message.payload.from)),
        E.chain(GraphDomain.findNodeById(message.payload.node)),
        E.chain((node) =>
          pipe(
            E.right(node),
            E.chain(NodeDomain.findInportById(message.payload.from)),
            E.chain((port) =>
              pipe(
                E.right(node),
                E.chain(NodeDomain.withoutInport(port)),
                E.chain(NodeDomain.withInport(PortDomain.create(
                  message.payload.to,
                  message.payload.to,
                  port.metadata,
                  port.iip,
                ))),
              )
            ),
            E.map(() => graph),
          )
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
          command: 'renameinport',
          payload: {
            graph: graph.id,
            node: message.payload.node,
            from: message.payload.from,
            to: message.payload.to,
          },
        })()
      },
    ),
  )
