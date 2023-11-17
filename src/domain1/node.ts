import * as GraphSchema from '#/schemas/messages/shared/Graph.ts'
import * as IO from 'fp-ts/IO.ts'
import * as NodeSchema from '#/schemas/messages/shared/Node.ts'
import * as O from 'fp-ts/Option.ts'
import * as PortDomain from '#/domain1/port.ts'
import * as RA from 'fp-ts/ReadonlyArray.ts'
import { Port } from '#/domain1/port.ts'
import { pipe } from 'fp-ts/function.ts'

export type NodeID = string

export type Component = (node: Node) => IO.IO<void>

export type Node = {
  id: NodeID
  component: string
  metadata: Record<string, unknown>
  inports: ReadonlyArray<Port>
  outports: ReadonlyArray<Port>

  // The current state of the node logic. In here, you can buffer messages of
  // inports if the node requires multiple messages from the same port, or keep
  // other state like counters.
  state: Record<string, unknown>
}

export const createNode = (
  id: Node['id'],
  component: Node['component'],
  inports: Node['inports'],
  outports: Node['outports'],
  metadata: Node['metadata'],
): Node => {
  return {
    id,
    component,
    inports,
    outports,
    metadata,
    state: {},
  }
}

export const serialize = (node: Node): NodeSchema.Node => {
  const input: NodeSchema.NodeInput = {
    id: node.id,
    component: node.component,
    metadata: node.metadata,
  }

  return NodeSchema.NodeTranscoder.decode(input)
}

export const deserialize = (
  node: NodeSchema.Node,
  graph: GraphSchema.Graph,
): Node => {
  const inports = pipe(
    graph.inports,
    RA.map((inport) => {
      return pipe(
        graph.iips,
        RA.findFirst((iip) => {
          return iip.tgt.node === node.id && iip.tgt.port === inport.port
        }),
        O.match(
          () => {
            return PortDomain.deserialize(inport)
          },
          (iip) => {
            return PortDomain.deserialize(inport, iip)
          },
        ),
      )
    }),
  )

  const outports = pipe(
    graph.outports,
    RA.map((outport) => {
      return pipe(
        graph.iips,
        RA.findFirst((iip) => {
          return iip.tgt.node === node.id && iip.tgt.port === outport.port
        }),
        O.match(
          () => {
            return PortDomain.deserialize(outport)
          },
          (iip) => {
            return PortDomain.deserialize(outport, iip)
          },
        ),
      )
    }),
  )

  return createNode(
    node.id,
    node.component,
    inports,
    outports,
    node.metadata,
  )
}
