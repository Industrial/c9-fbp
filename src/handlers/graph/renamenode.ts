import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as NodeDomain from '#/domain/node.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { RenameNodeGraphInputMessage } from '#/schemas/messages/graph/input/RenameNodeGraphInputMessage.ts'
import { RenameNodeGraphOutputMessageInput } from '#/schemas/messages/graph/output/RenameNodeGraphOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'

export const renamenode: MessageHandler<
  RenameNodeGraphInputMessage,
  RenameNodeGraphOutputMessageInput | ErrorGraphOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.findNodeById(message.payload.from)),
        E.chain((node) =>
          pipe(
            E.right(graph),
            E.chain(GraphDomain.withoutNode(node)),
            E.chain(
              GraphDomain.withNode(
                NodeDomain.create(message.payload.to, node.component, node.inports, node.outports, node.metadata),
              ),
            ),
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
          command: 'renamenode',
          payload: {
            graph: graph.id,
            from: message.payload.from,
            to: message.payload.to,
          },
        })()
      },
    ),
  )
