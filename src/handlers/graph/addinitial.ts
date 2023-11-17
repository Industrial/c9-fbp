import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { AddInitialGraphInputMessage } from '#/schemas/messages/graph/input/AddInitialGraphInputMessage.ts'
import { AddInitialGraphOutputMessageInput } from '#/schemas/messages/graph/output/AddInitialGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import {
  graphContainsInportByPublic,
  graphContainsNodeById,
  graphWithIIP,
  toGraphErrorGraphInput,
} from '#/domain/graph.ts'
import { pipe } from 'fp-ts/function.ts'

export const addinitial = (
  message: AddInitialGraphInputMessage,
): TE.TaskEither<Error, Array<AddInitialGraphOutputMessageInput | ErrorGraphOutputMessageInput>> => {
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
          metadata: message.payload.metadata ?? {},
        })),
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
      (graph): Array<AddInitialGraphOutputMessageInput | ErrorGraphOutputMessageInput> => {
        return [
          {
            protocol: 'graph',
            command: 'addinitial',
            payload: {
              graph: graph.id,
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
