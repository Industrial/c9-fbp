import * as GraphDomain from '#/domain/graph.ts'
import * as NodeDomain from '#/domain/node.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import * as traversal from '#/traversal.ts'
import { AddNodeGraphInputMessage } from '#/schemas/messages/graph/input/AddNodeGraphInputMessage.ts'
import { AddNodeGraphOutputMessageInput } from '#/schemas/messages/graph/output/AddNodeGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'
import { pipe } from 'fp-ts/function.ts'

export const addnode: MessageHandler<
  AddNodeGraphInputMessage,
  AddNodeGraphOutputMessageInput | ErrorGraphOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.map((graph) =>
      pipe(
        graph,
        pipe(
          NodeDomain.create(
            message.payload.id,
            message.payload.component,
            {},
            {},
            message.payload.metadata ?? {},
          ),
          traversal.add,
          GraphDomain.modifyNodeAtId(message.payload.id),
        ),
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
          command: 'addnode',
          payload: {
            graph: graph.id,
            id: message.payload.id,
            component: message.payload.component,
            metadata: message.payload.metadata,
          },
        })()
      },
    ),
  )
