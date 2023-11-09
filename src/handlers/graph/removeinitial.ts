import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { IIP } from '#/schemas/messages/shared/IIP.ts'
import { RemoveInitialGraphInputMessage } from '#/schemas/messages/graph/input/RemoveInitialGraphInputMessage.ts'
import { RemoveInitialGraphOutputMessageInput } from '#/schemas/messages/graph/output/RemoveInitialGraphOutputMessage.ts'
import { graphContainsIIP, graphWithoutIIP, toGraphErrorGraphInput } from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const removeinitial = (
  message: RemoveInitialGraphInputMessage,
): TE.TaskEither<Error, Array<RemoveInitialGraphOutputMessageInput | ErrorGraphOutputMessageInput>> => {
  const iip: IIP = {
    src: message.payload.src ?? {
      data: undefined,
    },
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
    TE.chain((graph) => {
      return graphs.set(graph.id, graph)
    }),
    TE.match(
      toGraphErrorGraphInput,
      (graph): Array<RemoveInitialGraphOutputMessageInput | ErrorGraphOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'removeinitial',
            payload: {
              graph: graph.id,
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
