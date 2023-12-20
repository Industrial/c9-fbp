import * as E from 'fp-ts/Either.ts'
import * as Eq from 'fp-ts/Eq.ts'
import * as O from 'fp-ts/Option.ts'
import * as PortDomain from '#/domain/port.ts'
import * as RR from 'fp-ts/ReadonlyRecord.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as equals from '#/equals.ts'
import * as string from 'fp-ts/string.ts'
import { ReadonlyRecord } from 'fp-ts/ReadonlyRecord.ts'
import { identity, pipe } from 'fp-ts/function.ts'
import { lens as L, traversal as T } from 'monocle-ts'

export type NodeInputMessage = {
  portId: PortDomain.Port['id']
  // TODO: Type correctly.
  chunk: unknown
}

export type NodeOutputMessage = {
  portId: PortDomain.Port['id']
  // TODO: Type correctly.
  chunk: unknown
}

export type Node = {
  id: string
  component: string
  metadata: Record<string, unknown>
  inports: ReadonlyRecord<PortDomain.Port['id'], PortDomain.Port>
  outports: ReadonlyRecord<PortDomain.Port['id'], PortDomain.Port>

  // The current state of the node logic. In here, you can buffer messages of
  // inports if the node requires multiple messages from the same port, or keep
  // other state like counters.
  state: Record<string, unknown>
  inputStream: TransformStream<NodeInputMessage>
  outputStream: WritableStream<NodeOutputMessage>
}

export const eq: Eq.Eq<Node> = Eq.fromEquals(equals.byProperty('id'))

export const findInportById = (id: PortDomain.Port['id']) => (node: Node) =>
  pipe(
    node,
    pipe(
      L.id<Node>(),
      L.prop('inports'),
      L.atKey(id),
    ).get,
  )

export const inportNotFoundError = () => new Error('InportNotFound')

export const findInportByIdE = (id: PortDomain.Port['id']) => (node: Node) =>
  pipe(
    node,
    findInportById(id),
    E.fromOption(inportNotFoundError),
  )

export const modifyInportAtId =
  (id: PortDomain.Port['id']) => (f: (port: O.Option<PortDomain.Port>) => O.Option<PortDomain.Port>) =>
    pipe(
      T.id<Node>(),
      T.prop('inports'),
      T.atKey(id),
      T.modify(f),
    )

export const findOutportById = (id: PortDomain.Port['id']) => (node: Node) =>
  pipe(
    node,
    pipe(
      L.id<Node>(),
      L.prop('outports'),
      L.atKey(id),
    ).get,
  )

export const outportNotFoundError = () => new Error('OutportNotFound')

export const findOutportByIdE = (id: PortDomain.Port['id']) => (node: Node) =>
  pipe(
    node,
    findOutportById(id),
    E.fromOption(outportNotFoundError),
  )

export const modifyOutportAtId =
  (id: PortDomain.Port['id']) => (f: (port: O.Option<PortDomain.Port>) => O.Option<PortDomain.Port>) =>
    pipe(
      T.id<Node>(),
      T.prop('outports'),
      T.atKey(id),
      T.modify(f),
    )

// TODO: This returns undefined but I really just want to know when it happens.
// I don't want to return anything useful. Should I use FRP here instead? But
// then what does it return with FRP?
export const waitForAllOutportsReady = (outports: Node['outports']) =>
  pipe(
    outports,
    RR.map((a) =>
      TE.tryCatch(
        () => a.stream.writable.getWriter().ready,
        E.toError,
      )
    ),
    RR.collect(string.Ord)((_k, v) => v),
    TE.traverseArray(identity),
    TE.map(() => undefined),
  )

// export const waitForNextInportMessage = (node: Node) =>
//   pipe(
//     node.inports,
//     RR.map((a) =>
//       TE.tryCatch(
//         () => a.stream.readable.getReader().read,
//         E.toError,
//       )
//     ),
//   )

export const writeNodeOutputMessage = (outports: Node['outports']) => ({ portId, chunk }: NodeOutputMessage) =>
  pipe(
    TE.right(outports),
    TE.chain(waitForAllOutportsReady),
    TE.chain(() =>
      pipe(
        outports[portId],
        TE.fromEitherK(E.fromNullable(outportNotFoundError())),
        TE.chain(PortDomain.writeToStream(chunk)),
      )
    ),
  )

const createInputStreamSource = (inports: Node['inports']): UnderlyingSource<NodeInputMessage> => ({
  start: async (controller) => {
  },
})

const createOutputStreamSink = (outports: Node['outports']): UnderlyingSink<NodeOutputMessage> => ({
  write: async (nodeOutputMessage) => {
    await writeNodeOutputMessage(outports)(nodeOutputMessage)()
  },
})

export const create = (
  id: Node['id'],
  component: Node['component'],
  inports: Node['inports'],
  outports: Node['outports'],
  metadata: Node['metadata'],
): Node => {
  const node: Node = {
    id,
    component,
    inports,
    outports,
    metadata,
    state: {},
    inputStream: new TransformStream(),
    outputStream: new WritableStream(createOutputStreamSink(outports)),
  }

  return node
}
