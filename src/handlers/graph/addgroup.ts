import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as GroupDomain from '#/domain/group.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { AddGroupGraphInputMessage } from '#/schemas/messages/graph/input/AddGroupGraphInputMessage.ts'
import { AddGroupGraphOutputMessageInput } from '#/schemas/messages/graph/output/AddGroupGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'
import { pipe } from 'fp-ts/function.ts'

export const addgroup: MessageHandler<
  AddGroupGraphInputMessage,
  AddGroupGraphOutputMessageInput | ErrorGraphOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.containsAllNodesById(message.payload.nodes)),
        E.chain(GraphDomain.withGroup(GroupDomain.create(
          message.payload.name,
          message.payload.nodes,
          message.payload.metadata?.description,
        ))),
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
          command: 'addgroup',
          payload: {
            graph: graph.id,
            metadata: message.payload.metadata,
            name: message.payload.name,
            nodes: message.payload.nodes,
          },
        })()
      },
    ),
  )
