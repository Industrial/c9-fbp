import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as NodeDomain from '#/domain/node.ts'
import * as PortDomain from '#/domain/port.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import * as traversal from '#/traversal.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'
import { RenameInportGraphInputMessage } from '#/schemas/messages/graph/input/RenameInportGraphInputMessage.ts'
import { RenameInportGraphOutputMessageInput } from '#/schemas/messages/graph/output/RenameInportGraphOutputMessage.ts'
import { identity, pipe } from 'fp-ts/function.ts'

export const renameinport: MessageHandler<
  RenameInportGraphInputMessage,
  RenameInportGraphOutputMessageInput | ErrorGraphOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.findNodeByIdE(message.payload.node)),
        E.chain(NodeDomain.findInportByIdE(message.payload.from)),
        E.map(() =>
          pipe(
            graph,
            pipe(
              traversal.map((node) =>
                pipe(
                  node,
                  NodeDomain.modifyInportAtId(message.payload.from)(traversal.remove),
                  NodeDomain.modifyInportAtId(message.payload.to)(
                    traversal.map((port) =>
                      PortDomain.create(
                        message.payload.to,
                        message.payload.to,
                        port.metadata,
                        port.iip,
                      )
                    ),
                  ),
                )
              ),
              GraphDomain.modifyNodeAtId(message.payload.node),
            ),
          )
        ),
        TE.fromEitherK(identity),
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
