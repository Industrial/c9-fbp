import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as NodeDomain from '#/domain/node.ts'
import * as O from 'fp-ts/Option.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ChangeNodeGraphInputMessage } from '#/schemas/messages/graph/input/ChangeNodeGraphInputMessage.ts'
import { ChangeNodeGraphOutputMessageInput } from '#/schemas/messages/graph/output/ChangeNodeGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'
import { identity, pipe } from 'fp-ts/function.ts'

export const changenode: MessageHandler<
  ChangeNodeGraphInputMessage,
  ChangeNodeGraphOutputMessageInput | ErrorGraphOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.findNodeByIdE(message.payload.id)),
        E.map(() =>
          pipe(
            graph,
            GraphDomain.modifyNodeAtId(message.payload.id)(O.map((node) =>
              NodeDomain.create(
                message.payload.id,
                node.component,
                node.inports,
                node.outports,
                message.payload.metadata,
              )
            )),
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
          command: 'changenode',
          payload: {
            graph: graph.id,
            id: message.payload.id,
            metadata: message.payload.metadata,
          },
        })()
      },
    ),
  )
