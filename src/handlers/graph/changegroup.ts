import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as GroupDomain from '#/domain/group.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import * as traversal from '#/traversal.ts'
import { ChangeGroupGraphInputMessage } from '#/schemas/messages/graph/input/ChangeGroupGraphInputMessage.ts'
import { ChangeGroupGraphOutputMessageInput } from '#/schemas/messages/graph/output/ChangeGroupGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'
import { identity, pipe } from 'fp-ts/function.ts'

export const changegroup: MessageHandler<
  ChangeGroupGraphInputMessage,
  ChangeGroupGraphOutputMessageInput | ErrorGraphOutputMessageInput
> = (send) => (message) =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.findGroupByNameE(message.payload.name)),
        E.map(() =>
          pipe(
            graph,
            GraphDomain.modifyGroupAtName(message.payload.name)(
              traversal.map((group) =>
                GroupDomain.create(
                  message.payload.name,
                  group.nodes,
                  message.payload.metadata?.description ?? group.metadata.description,
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
          command: 'changegroup',
          payload: {
            graph: graph.id,
            metadata: message.payload.metadata,
            name: message.payload.name,
          },
        })()
      },
    ),
  )
