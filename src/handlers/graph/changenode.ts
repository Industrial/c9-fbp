import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ChangeNodeGraphInputMessage } from '#/schemas/messages/graph/input/ChangeNodeGraphInputMessage.ts'
import { ChangeNodeGraphOutputMessageInput } from '#/schemas/messages/graph/output/ChangeNodeGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'

export const changenode = (
  message: ChangeNodeGraphInputMessage,
): TE.TaskEither<Error, Array<ChangeNodeGraphOutputMessageInput | ErrorGraphOutputMessageInput>> =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.findNodeById(message.payload.id)),
        E.chain((node) =>
          pipe(
            graph,
            GraphDomain.withNode(node),
          )
        ),
        TE.fromEitherK(E.map((graph) => graph)),
      )
    ),
    TE.chain((graph) => graphs.set(graph.id, graph)),
    TE.match(
      GraphDomain.toGraphErrorGraphInput,
      (graph): Array<ChangeNodeGraphOutputMessageInput | ErrorGraphOutputMessageInput> => [
        {
          protocol: 'graph',
          command: 'changenode',
          payload: {
            graph: graph.id,
            id: message.payload.id,
            metadata: message.payload.metadata,
          },
        },
      ],
    ),
    TE.fromTask,
  )
