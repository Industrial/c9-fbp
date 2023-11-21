import * as Eq from 'fp-ts/Eq.ts'
import * as NodeDomain from '#/domain/node.ts'
import * as PortDomain from '#/domain/port.ts'
import * as equals from '#/equals.ts'
import { pipe } from 'fp-ts/function.ts'

export type PortTarget = {
  nodeId: NodeDomain.Node['id']
  portId: PortDomain.Port['id']
}

export type EdgeId =
  `${Edge['src']['nodeId']}:${Edge['src']['portId']}/${Edge['src']['nodeId']}:${Edge['src']['portId']}`

export const createEdgeId = (src: Edge['src'], tgt: Edge['tgt']): EdgeId =>
  `${src.nodeId}:${src.portId}/${tgt.nodeId}:${tgt.portId}`

export type Edge = {
  src: {
    nodeId: NodeDomain.Node['id']
    portId: PortDomain.Port['id']
  }
  tgt: {
    nodeId: NodeDomain.Node['id']
    portId: PortDomain.Port['id']
  }
  metadata: Record<string, unknown>
}

export const create = (
  sourceNode: Edge['src']['nodeId'],
  sourcePort: Edge['src']['portId'],
  targetNode: Edge['tgt']['nodeId'],
  targetPort: Edge['tgt']['portId'],
  metadata: Edge['metadata'],
): Edge => ({
  src: {
    nodeId: sourceNode,
    portId: sourcePort,
  },
  tgt: {
    nodeId: targetNode,
    portId: targetPort,
  },
  metadata,
})

export const eqPortTarget = Eq.fromEquals<PortTarget>(
  equals.and(equals.byProperty('nodeId'), equals.byProperty('portId')),
)

export const eq: Eq.Eq<Edge> = pipe(
  Eq.tuple(eqPortTarget, eqPortTarget),
  Eq.contramap<readonly [PortTarget, PortTarget], Edge>((port) => [port.src, port.tgt]),
)
