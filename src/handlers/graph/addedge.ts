import * as RA from 'fp-ts/ReadonlyArray.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import * as spectacles from 'spectacles-ts'
import { AddEdgeInputMessage } from '#/schemas/messages/graph/input/AddEdgeInputMessage.ts'
import { AddEdgeOutputMessage } from '#/schemas/messages/graph/output/AddEdgeOutputMessage.ts'
import { Edge } from '#/schemas/messages/shared/Edge.ts'
import { ErrorOutputMessage } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { Handler } from '#/handlers/Handler.ts'
import { pipe } from 'fp-ts/function.ts'

export const addedge: Handler<AddEdgeInputMessage, ErrorOutputMessage, AddEdgeOutputMessage> = (message) => {
  const edge: Edge = {
    src: message.payload.src,
    tgt: message.payload.tgt,
    metadata: message.payload.metadata,
  }

  return pipe(
    graphs.get(message.payload.graph),
    TE.map((graph) => {
      return pipe(
        graph,
        // @ts-ignore: deep type
        spectacles.set(
          'edges',
          pipe(
            graph.edges,
            RA.filter((a) => {
              return a.src.node !== edge.src.node && a.src.port !== edge.src.port && a.tgt.node !== edge.tgt.node &&
                a.tgt.port !== edge.tgt.port
            }),
            RA.append(edge),
          ),
        ),
      )
    }),
    TE.mapLeft((error): ErrorOutputMessage => {
      return {
        protocol: 'graph',
        command: 'error',
        payload: {
          message: error.message,
        },
      }
    }),
    TE.map((graph): Array<AddEdgeOutputMessage> => {
      return [
        {
          protocol: 'graph',
          command: 'addedge',
          payload: {
            graph: graph.id,
            metadata: edge.metadata,
            src: edge.src,
            tgt: edge.tgt,
          },
        },
      ]
    }),
  )
}
