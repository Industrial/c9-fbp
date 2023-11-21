import * as E from 'fp-ts/Either.ts'
import * as Eq from 'fp-ts/Eq.ts'
import * as O from 'fp-ts/Option.ts'
import * as PortDomain from '#/domain/port.ts'
import * as equals from '#/equals.ts'
import { ReadonlyRecord } from 'fp-ts/ReadonlyRecord.ts'
import { pipe } from 'fp-ts/function.ts'
import { lens as L, traversal as T } from 'monocle-ts'

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
}

export const create = (
  id: Node['id'],
  component: Node['component'],
  inports: Node['inports'],
  outports: Node['outports'],
  metadata: Node['metadata'],
): Node => ({
  id,
  component,
  inports,
  outports,
  metadata,
  state: {},
})

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
