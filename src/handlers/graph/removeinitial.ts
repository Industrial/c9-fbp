import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'
import { IIP } from '#/schemas/messages/shared/IIP.ts'
import { RemoveInitialInputMessage } from '#/schemas/messages/graph/input/RemoveInitialInputMessage.ts'
import { RemoveInitialOutputMessageInput } from '#/schemas/messages/graph/output/RemoveInitialOutputMessage.ts'
import { graphContainsIIP, graphWithoutIIP, toGraphErrorInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const removeinitial = (
  message: RemoveInitialInputMessage,
): TE.TaskEither<Error, Array<RemoveInitialOutputMessageInput | ErrorOutputMessageInput>> => {
  const iip: IIP = {
    src: message.payload.src,
    tgt: message.payload.tgt,
    metadata: {
      route: undefined,
      schema: undefined,
      secure: undefined,
    },
  }

  return pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) => {
      return pipe(
        E.right(graph),
        E.chain(graphContainsIIP(iip)),
        E.chain(graphWithoutIIP(iip)),
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
      (_graph): Array<RemoveInitialOutputMessageInput | ErrorOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'removeinitial',
            payload: {
              graph: message.payload.graph,
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
