import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as NodeDomain from '#/domain/node.ts'
import * as PortDomain from '#/domain/port.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import * as traversal from '#/traversal.ts'
import { AddInportGraphInputMessage } from '#/schemas/messages/graph/input/AddInportGraphInputMessage.ts'
import { AddInportGraphOutputMessageInput } from '#/schemas/messages/graph/output/AddInportGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'
import { identity, pipe } from 'fp-ts/function.ts'

export const addinport: MessageHandler<
  AddInportGraphInputMessage,
  AddInportGraphOutputMessageInput | ErrorGraphOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.findNodeByIdE(message.payload.node)),
        E.map(() =>
          pipe(
            graph,
            pipe(
              PortDomain.create(
                message.payload.port,
                message.payload.public,
                message.payload.metadata ?? {},
              ),
              traversal.add,
              NodeDomain.modifyInportAtId(message.payload.port),
              traversal.map,
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
