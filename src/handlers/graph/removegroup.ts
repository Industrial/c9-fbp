import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { RemoveGroupGraphInputMessage } from '#/schemas/messages/graph/input/RemoveGroupGraphInputMessage.ts'
import { RemoveGroupGraphOutputMessageInput } from '#/schemas/messages/graph/output/RemoveGroupGraphOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'

export const removegroup = (
  message: RemoveGroupGraphInputMessage,
): TE.TaskEither<Error, Array<RemoveGroupGraphOutputMessageInput | ErrorGraphOutputMessageInput>> =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain((graph) =>
          pipe(
            graph,
            GraphDomain.findGroupByName(message.payload.name),
            E.chain((group) =>
              pipe(
                graph,
                GraphDomain.withoutGroup(group),
              )
            ),
          )
        ),
        TE.fromEitherK(E.map((graph) => graph)),
      )
    ),
    TE.chain((graph) => graphs.set(graph.id, graph)),
    TE.match(
      GraphDomain.toGraphErrorGraphInput,
      (graph): Array<RemoveGroupGraphOutputMessageInput | ErrorGraphOutputMessageInput> => [
        {
          protocol: 'graph',
          command: 'removegroup',
          payload: {
            graph: graph.id,
            name: message.payload.name,
          },
        },
      ],
    ),
    TE.fromTask,
  )
