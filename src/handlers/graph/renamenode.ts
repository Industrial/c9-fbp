import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as NodeDomain from '#/domain/node.ts'
import * as O from 'fp-ts/Option.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'
import { RenameNodeGraphInputMessage } from '#/schemas/messages/graph/input/RenameNodeGraphInputMessage.ts'
import { RenameNodeGraphOutputMessageInput } from '#/schemas/messages/graph/output/RenameNodeGraphOutputMessage.ts'
import { identity, pipe } from 'fp-ts/function.ts'

export const renamenode: MessageHandler<
  RenameNodeGraphInputMessage,
  RenameNodeGraphOutputMessageInput | ErrorGraphOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.findNodeByIdE(message.payload.from)),
        E.map(() =>
          pipe(
            graph,
            GraphDomain.modifyNodeAtId(message.payload.from)(() => O.none),
            GraphDomain.modifyNodeAtId(message.payload.from)(
              O.map((node) =>
                NodeDomain.create(
                  message.payload.to,
                  node.component,
                  node.inports,
                  node.outports,
                  node.metadata,
                )
              ),
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
