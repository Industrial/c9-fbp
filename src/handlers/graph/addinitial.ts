import * as E from 'fp-ts/Either.ts'
import * as GraphDomain from '#/domain/graph.ts'
import * as IIPDomain from '#/domain/iip.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as graphs from '#/graphs.ts'
import { AddInitialGraphInputMessage } from '#/schemas/messages/graph/input/AddInitialGraphInputMessage.ts'
import { AddInitialGraphOutputMessageInput } from '#/schemas/messages/graph/output/AddInitialGraphOutputMessage.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { pipe } from 'fp-ts/function.ts'

export const addinitial = (
  message: AddInitialGraphInputMessage,
): TE.TaskEither<Error, Array<AddInitialGraphOutputMessageInput | ErrorGraphOutputMessageInput>> =>
  pipe(
    graphs.get(message.payload.graph),
    TE.chain((graph) =>
      pipe(
        E.right(graph),
        E.chain(
          GraphDomain.withIIPByNodeIdAndPortId(
            IIPDomain.create(message.payload.src.data, message.payload.metadata ?? {}),
            message.payload.tgt.node,
            message.payload.tgt.port,
          ),
        ),
        TE.fromEitherK(E.map((graph) => graph)),
      )
    ),
    TE.chain((graph) => graphs.set(graph.id, graph)),
    TE.match(
      GraphDomain.toGraphErrorGraphInput,
      (graph): Array<AddInitialGraphOutputMessageInput | ErrorGraphOutputMessageInput> => [
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
      ],
    ),
    TE.fromTask,
  )
