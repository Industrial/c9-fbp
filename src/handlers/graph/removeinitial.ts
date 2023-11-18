import * as GraphDomain from '#/domain/graph.ts'
import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { RemoveInitialGraphInputMessage } from '#/schemas/messages/graph/input/RemoveInitialGraphInputMessage.ts'
import { RemoveInitialGraphOutputMessageInput } from '#/schemas/messages/graph/output/RemoveInitialGraphOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'

export const removeinitial = (
  message: RemoveInitialGraphInputMessage,
): TE.TaskEither<Error, Array<RemoveInitialGraphOutputMessageInput | ErrorGraphOutputMessageInput>> =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.containsNodeById(message.payload.tgt.node)),
        E.chain(GraphDomain.containsInportByNodeIdAndPortId(message.payload.tgt.node, message.payload.tgt.port)),
        E.chain((graph) =>
          pipe(
            graph,
            GraphDomain.withoutIIPByNodeIdAndPortId(
              message.payload.tgt.node,
              message.payload.tgt.port,
            ),
          )
        ),
        TE.fromEitherK(E.map((graph) => graph)),
      )
    ),
    TE.chain((graph) => graphs.set(graph.id, graph)),
    TE.match(
      GraphDomain.toGraphErrorGraphInput,
      (graph): Array<RemoveInitialGraphOutputMessageInput | ErrorGraphOutputMessageInput> => [
        {
          protocol: 'graph',
          command: 'removeinitial',
          payload: {
            graph: graph.id,
            src: message.payload.src,
            tgt: message.payload.tgt,
          },
        },
      ],
    ),
    TE.fromTask,
  )
