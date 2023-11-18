import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ChangeEdgeGraphInputMessage } from '#/schemas/messages/graph/input/ChangeEdgeGraphInputMessage.ts'
import { ChangeEdgeGraphOutputMessageInput } from '#/schemas/messages/graph/output/ChangeEdgeGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'

export const changeedge = (
  message: ChangeEdgeGraphInputMessage,
): TE.TaskEither<Error, Array<ChangeEdgeGraphOutputMessageInput | ErrorGraphOutputMessageInput>> =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.containsNodeById(message.payload.src.node)),
        E.chain(GraphDomain.containsOutportByNodeIdAndPortId(message.payload.src.node, message.payload.src.port)),
        E.chain(GraphDomain.containsNodeById(message.payload.tgt.node)),
        E.chain(GraphDomain.containsInportByNodeIdAndPortId(message.payload.tgt.node, message.payload.tgt.port)),
        E.chain((graph) =>
          pipe(
            graph,
            GraphDomain.findEdgeByTargetNode(message.payload.src, message.payload.tgt),
            E.chain((edge) =>
              pipe(
                graph,
                GraphDomain.withEdge(edge),
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
      (graph): Array<ChangeEdgeGraphOutputMessageInput | ErrorGraphOutputMessageInput> => [
        {
          protocol: 'graph',
          command: 'changeedge',
          payload: {
            graph: graph.id,
            src: message.payload.src,
            tgt: message.payload.tgt,
            metadata: message.payload.metadata,
          },
        },
      ],
    ),
    TE.fromTask,
  )
