import * as EdgeSchema from '#/schemas/messages/shared/Edge.ts'
import { PortTarget } from '#/domain1/port.ts'

export type Edge = {
  src: PortTarget
  tgt: PortTarget
  metadata: Record<string, unknown>
}

export const createEdge = (
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
  return createEdge(
    edge.src.node,
    edge.src.port,
    edge.tgt.node,
    edge.tgt.port,
    edge.metadata ?? {},
  )
}
