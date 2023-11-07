import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { AddInitialInputMessage } from '#/schemas/messages/graph/input/AddInitialInputMessage.ts'
import { AddInitialOutputMessageInput } from '#/schemas/messages/graph/output/AddInitialOutputMessage.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { graphContainsInportByPublic, graphContainsNodeById, graphWithIIP, toGraphErrorInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const addinitial = (
  message: AddInitialInputMessage,
): TE.TaskEither<Error, Array<AddInitialOutputMessageInput | ErrorOutputMessageInput>> => {
  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        E.right(graph),
        E.chain(graphContainsNodeById(message.payload.tgt.node)),
        E.chain(graphContainsInportByPublic(message.payload.tgt.port)),
        E.chain(graphWithIIP({
          src: message.payload.src,
          tgt: message.payload.tgt,
          metadata: message.payload.metadata,
        })),
        TE.fromEitherK(E.map((graph) => {
          return graph
        })),
      )
    }),
    TE.map((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      toGraphErrorInput,
      (_graph): Array<AddInitialOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'addinitial',
            payload: {
              graph: message.payload.graph,
              metadata: message.payload.metadata,
              src: message.payload.src,
              tgt: message.payload.tgt,
            },
          },
        ]
      },
    ),
    TE.fromTask,
  )
}
