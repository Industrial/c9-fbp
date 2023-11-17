import * as EdgeSchema from '#/schemas/messages/shared/Edge.ts'
import * as Eq from 'fp-ts/Eq.ts'
import { NodeID } from '#/domain1/node.ts'
import { PortID } from '#/domain1/port.ts'
import { pipe } from 'fp-ts/function.ts'

export type PortTarget = {
  nodeId: NodeID
  portId: PortID
}

export type Edge = {
  src: PortTarget
  tgt: PortTarget
  metadata: Record<string, unknown>
}

export const create = (
  sourceNode: Edge['src']['nodeId'],
  sourcePort: Edge['src']['portId'],
  targetNode: Edge['tgt']['nodeId'],
  targetPort: Edge['tgt']['portId'],
  metadata: Edge['metadata'],
): Edge => {
  return {
    src: {
      nodeId: sourceNode,
      portId: sourcePort,
    },
    tgt: {
      nodeId: targetNode,
      portId: targetPort,
    },
    metadata,
  }
}

export const serialize = (edge: Edge): EdgeSchema.Edge => {
  const input: EdgeSchema.EdgeInput = {
    src: {
      node: edge.src.nodeId,
      port: edge.src.portId,
    },
    tgt: {
      node: edge.tgt.nodeId,
      port: edge.tgt.portId,
    },
    metadata: edge.metadata,
  }

  return EdgeSchema.EdgeTranscoder.decode(input)
}

export const deserialize = (edge: EdgeSchema.Edge): Edge => {
  return create(
    edge.src.node,
    edge.src.port,
    edge.tgt.node,
    edge.tgt.port,
    edge.metadata ?? {},
  )
}

export const eqPortTarget = Eq.fromEquals<PortTarget>((a, b) => {
  return a.nodeId === b.nodeId && a.portId === b.portId
})

export const eq: Eq.Eq<Edge> = pipe(
  Eq.tuple(eqPortTarget, eqPortTarget),
  Eq.contramap<readonly [PortTarget, PortTarget], Edge>((port) => [port.src, port.tgt]),
)
