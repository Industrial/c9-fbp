import * as E from 'fp-ts/Either.ts'
import * as EdgeDomain from '#/domain/edge.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { AddEdgeGraphInputMessage } from '#/schemas/messages/graph/input/AddEdgeGraphInputMessage.ts'
import { AddEdgeGraphOutputMessageInput } from '#/schemas/messages/graph/output/AddEdgeGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'
import { toGraphErrorGraphInput } from '#/domain/graph.ts'

export const addedge = (
  message: AddEdgeGraphInputMessage,
): TE.TaskEither<Error, Array<AddEdgeGraphOutputMessageInput | ErrorGraphOutputMessageInput>> =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(GraphDomain.containsOutportByNodeIdAndPortId(message.payload.src.node, message.payload.src.port)),
        E.chain(GraphDomain.containsInportByNodeIdAndPortId(message.payload.tgt.node, message.payload.tgt.port)),
        E.chain(GraphDomain.withEdge(EdgeDomain.create(
          message.payload.src.node,
          message.payload.src.port,
          message.payload.tgt.node,
          message.payload.tgt.port,
          message.payload.metadata ?? {},
        ))),
        TE.fromEitherK(E.map((graph) => graph)),
      )
    ),
    TE.chain((graph) => graphs.set(graph.id, graph)),
    TE.match(
      toGraphErrorGraphInput,
      (graph): Array<AddEdgeGraphOutputMessageInput | ErrorGraphOutputMessageInput> => [
        {
          protocol: 'graph',
          command: 'addedge',
          payload: {
            graph: graph.id,
            metadata: message.payload.metadata,
            src: message.payload.src,
            tgt: message.payload.tgt,
          },
        },
      ],
    ),
    TE.fromTask,
  )
