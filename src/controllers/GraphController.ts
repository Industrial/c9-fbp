import type { AddEdgeGraphInputMessage } from '#/schemas/messages/graph/input/AddEdgeGraphInputMessage.ts'
import { AddEdgeGraphOutputMessageInput } from '#/schemas/messages/graph/output/AddEdgeGraphOutputMessage.ts'
import { AddGroupGraphInputMessage } from '#/schemas/messages/graph/input/AddGroupGraphInputMessage.ts'
import { AddGroupGraphOutputMessageInput } from '#/schemas/messages/graph/output/AddGroupGraphOutputMessage.ts'
import { AddInitialGraphInputMessage } from '#/schemas/messages/graph/input/AddInitialGraphInputMessage.ts'
import { AddInitialGraphOutputMessageInput } from '#/schemas/messages/graph/output/AddInitialGraphOutputMessage.ts'
import { AddInportGraphInputMessage } from '#/schemas/messages/graph/input/AddInportGraphInputMessage.ts'
import { AddInportGraphOutputMessageInput } from '#/schemas/messages/graph/output/AddInportGraphOutputMessage.ts'
import { AddNodeGraphInputMessage } from '#/schemas/messages/graph/input/AddNodeGraphInputMessage.ts'
import { AddNodeGraphOutputMessageInput } from '#/schemas/messages/graph/output/AddNodeGraphOutputMessage.ts'
import { AddOutportGraphInputMessage } from '#/schemas/messages/graph/input/AddOutportGraphInputMessage.ts'
import { AddOutportGraphOutputMessageInput } from '#/schemas/messages/graph/output/AddOutportGraphOutputMessage.ts'
import { ChangeEdgeGraphInputMessage } from '#/schemas/messages/graph/input/ChangeEdgeGraphInputMessage.ts'
import { ChangeEdgeGraphOutputMessageInput } from '#/schemas/messages/graph/output/ChangeEdgeGraphOutputMessage.ts'
import { ChangeGroupGraphInputMessage } from '#/schemas/messages/graph/input/ChangeGroupGraphInputMessage.ts'
import { ChangeGroupGraphOutputMessageInput } from '#/schemas/messages/graph/output/ChangeGroupGraphOutputMessage.ts'
import { Edge } from '#/domain1/Edge.ts'
import { ErrorGraphOutputMessageInput } from '#/schemas/messages/graph/output/ErrorGraphOutputMessage.ts'
import { Graphs } from '#/domain1/Graphs.ts'
import { Group } from '#/domain1/Group.ts'
import { IIP } from '#/domain1/IIP.ts'
import { Node } from '#/domain1/Node.ts'
import { Port } from '#/domain1/Port.ts'
import { ChangeNodeGraphOutputMessageInput } from '#/schemas/messages/graph/output/ChangeNodeGraphOutputMessage.ts'
import { ClearGraphInputMessage } from '#/schemas/messages/graph/input/ClearGraphInputMessage.ts'
import { ClearGraphOutputMessageInput } from '#/schemas/messages/graph/output/ClearGraphOutputMessage.ts'

export class GraphController {
  socket: WebSocket

  public constructor(socket: GraphController['socket']) {
    this.socket = socket
  }

  public async addedge(message: AddEdgeGraphInputMessage): Promise<void> {
    try {
      const graphs = Graphs.getInstance()

      const graph = graphs.get(message.payload.graph)
      if (!graph) {
        throw new Error('GraphNotFound')
      }

      const sourceNode = graph.nodes[message.payload.src.node]
      if (!sourceNode) {
        throw new Error('NodeNotFound')
      }

      const sourcePort = sourceNode.outports[message.payload.src.port]
      if (!sourcePort) {
        throw new Error('OutportNotFound')
      }

      const targetNode = graph.nodes[message.payload.tgt.node]
      if (!targetNode) {
        throw new Error('NodeNotFound')
      }

      const targetPort = targetNode.inports[message.payload.tgt.port]
      if (!targetPort) {
        throw new Error('InportNotFound')
      }

      const src = {
        nodeId: message.payload.src.node,
        portId: message.payload.src.port,
      }
      const tgt = {
        nodeId: message.payload.tgt.node,
        portId: message.payload.tgt.port,
      }
      const edge = new Edge(src, tgt, message.payload.metadata)

      graph.addEdge(edge)

      this.sendMessage<AddEdgeGraphOutputMessageInput>({
        protocol: 'graph',
        command: 'addedge',
        payload: {
          graph: graph.id,
          src: message.payload.src,
          tgt: message.payload.tgt,
          metadata: message.payload.metadata,
        },
      })
    } catch (error: unknown) {
      this.handleError(error as Error)
    }
  }

  public async addgroup(message: AddGroupGraphInputMessage): Promise<void> {
    try {
      const graphs = Graphs.getInstance()

      const graph = graphs.get(message.payload.graph)
      if (!graph) {
        throw new Error('GraphNotFound')
      }

      if (!graph.hasAllNodesById(message.payload.nodes)) {
        throw new Error('NodeNotFound')
      }

      const group = new Group(
        message.payload.name,
        message.payload.nodes as Array<Node['id']>,
        message.payload.metadata,
      )
      graph.addGroup(group)

      this.sendMessage<AddGroupGraphOutputMessageInput>({
        protocol: 'graph',
        command: 'addgroup',
        payload: {
          graph: graph.id,
          name: message.payload.name,
          nodes: message.payload.nodes,
          metadata: message.payload.metadata,
        },
      })
    } catch (error: unknown) {
      this.handleError(error as Error)
    }
  }

  public async addinitial(message: AddInitialGraphInputMessage): Promise<void> {
    try {
      const graphs = Graphs.getInstance()

      const graph = graphs.get(message.payload.graph)
      if (!graph) {
        throw new Error('GraphNotFound')
      }

      const targetNode = graph.nodes[message.payload.tgt.node]
      if (!targetNode) {
        throw new Error('NodeNotFound')
      }

      const targetPort = targetNode.inports[message.payload.tgt.port]
      if (!targetPort) {
        throw new Error('InportNotFound')
      }

      const iip = new IIP(
        message.payload.src.data,
        message.payload.metadata,
      )

      targetPort.iip = iip

      this.sendMessage<AddInitialGraphOutputMessageInput>({
        protocol: 'graph',
        command: 'addinitial',
        payload: {
          graph: graph.id,
          src: message.payload.src,
          tgt: message.payload.tgt,
          metadata: message.payload.metadata,
        },
      })
    } catch (error: unknown) {
      this.handleError(error as Error)
    }
  }

  public async addinport(message: AddInportGraphInputMessage): Promise<void> {
    try {
      const graphs = Graphs.getInstance()

      const graph = graphs.get(message.payload.graph)
      if (!graph) {
        throw new Error('GraphNotFound')
      }

      const node = graph.nodes[message.payload.node]
      if (!node) {
        throw new Error('NodeNotFound')
      }

      const inport = new Port(
        message.payload.port,
        message.payload.public,
        message.payload.metadata,
      )

      node.addInport(inport)

      this.sendMessage<AddInportGraphOutputMessageInput>({
        protocol: 'graph',
        command: 'addinport',
        payload: {
          graph: graph.id,
          node: message.payload.node,
          port: message.payload.port,
          public: message.payload.public,
          metadata: message.payload.metadata,
        },
      })
    } catch (error: unknown) {
      this.handleError(error as Error)
    }
  }

  public async addnode(message: AddNodeGraphInputMessage): Promise<void> {
    try {
      const graphs = Graphs.getInstance()

      const graph = graphs.get(message.payload.graph)
      if (!graph) {
        throw new Error('GraphNotFound')
      }

      const node = new Node(
        message.payload.id,
        message.payload.component,
        {},
        {},
        message.payload.metadata,
      )

      graph.addNode(node)

      this.sendMessage<AddNodeGraphOutputMessageInput>({
        protocol: 'graph',
        command: 'addnode',
        payload: {
          graph: graph.id,
          id: message.payload.id,
          component: message.payload.component,
          metadata: message.payload.metadata,
        },
      })
    } catch (error: unknown) {
      this.handleError(error as Error)
    }
  }

  public async addoutport(message: AddOutportGraphInputMessage): Promise<void> {
    try {
      const graphs = Graphs.getInstance()

      const graph = graphs.get(message.payload.graph)
      if (!graph) {
        throw new Error('GraphNotFound')
      }

      const node = graph.nodes[message.payload.node]
      if (!node) {
        throw new Error('NodeNotFound')
      }

      const outport = new Port(
        message.payload.port,
        message.payload.public,
        message.payload.metadata,
      )

      node.addOutport(outport)

      this.sendMessage<AddOutportGraphOutputMessageInput>({
        protocol: 'graph',
        command: 'addoutport',
        payload: {
          graph: graph.id,
          node: message.payload.node,
          port: message.payload.port,
          public: message.payload.public,
          metadata: message.payload.metadata,
        },
      })
    } catch (error: unknown) {
      this.handleError(error as Error)
    }
  }

  public async changeedge(message: ChangeEdgeGraphInputMessage): Promise<void> {
    try {
      const graphs = Graphs.getInstance()

      const graph = graphs.get(message.payload.graph)
      if (!graph) {
        throw new Error('GraphNotFound')
      }

      const sourceNode = graph.nodes[message.payload.src.node]
      if (!sourceNode) {
        throw new Error('NodeNotFound')
      }

      const sourcePort = sourceNode.outports[message.payload.src.port]
      if (!sourcePort) {
        throw new Error('OutportNotFound')
      }

      const targetNode = graph.nodes[message.payload.tgt.node]
      if (!targetNode) {
        throw new Error('NodeNotFound')
      }

      const targetPort = targetNode.inports[message.payload.tgt.port]
      if (!targetPort) {
        throw new Error('InportNotFound')
      }

      const edgeId = Edge.createEdgeId({
        nodeId: message.payload.src.node,
        portId: message.payload.src.port,
      }, {
        nodeId: message.payload.tgt.node,
        portId: message.payload.tgt.port,
      })
      const edge = graph.edges[edgeId]
      if (!edge) {
        throw new Error('EdgeNotFound')
      }

      edge.metadata = message.payload.metadata as Record<string, unknown>

      this.sendMessage<ChangeEdgeGraphOutputMessageInput>({
        protocol: 'graph',
        command: 'changeedge',
        payload: {
          graph: message.payload.graph,
          src: message.payload.src,
          tgt: message.payload.tgt,
          metadata: message.payload.metadata,
        },
      })
    } catch (error: unknown) {
      this.handleError(error as Error)
    }
  }

  public async changegroup(message: ChangeGroupGraphInputMessage): Promise<void> {
    try {
      const graphs = Graphs.getInstance()

      const graph = graphs.get(message.payload.graph)
      if (!graph) {
        throw new Error('GraphNotFound')
      }

      const group = graph.groups[message.payload.name]
      if (!group) {
        throw new Error('GroupNotFound')
      }

      group.metadata = message.payload.metadata as Record<string, unknown>

      this.sendMessage<ChangeGroupGraphOutputMessageInput>({
        protocol: 'graph',
        command: 'changegroup',
        payload: {
          graph: message.payload.graph,
          name: message.payload.name,
          metadata: message.payload.metadata,
        },
      })
    } catch (error: unknown) {
      this.handleError(error as Error)
    }
  }

  public async changenode(message: ChangeNodeGraphOutputMessageInput): Promise<void> {
    try {
      const graphs = Graphs.getInstance()

      const graph = graphs.get(message.payload.graph)
      if (!graph) {
        throw new Error('GraphNotFound')
      }

      const node = graph.nodes[message.payload.id]
      if (!node) {
        throw new Error('NodeNotFound')
      }

      node.metadata = message.payload.metadata as Record<string, unknown>

      this.sendMessage<ChangeNodeGraphOutputMessageInput>({
        protocol: 'graph',
        command: 'changenode',
        payload: {
          graph: message.payload.graph,
          id: message.payload.id,
          metadata: message.payload.metadata,
        },
      })
    } catch (error: unknown) {
      this.handleError(error as Error)
    }
  }

  public async clear(message: ClearGraphInputMessage): Promise<void> {
    try {
      const graphs = Graphs.getInstance()

      const graph = graphs.get(message.payload.id)
      if (!graph) {
        throw new Error('GraphNotFound')
      }

      graph.id = message.payload.id
      graph.main = message.payload.main ?? true
      graph.name = message.payload.name ?? 'main'
      graph.library = message.payload.library
      graph.description = message.payload.description
      graph.icon = message.payload.icon

      this.sendMessage<ClearGraphOutputMessageInput>({
        protocol: 'graph',
        command: 'clear',
        payload: {
          id: message.payload.id,
          main: message.payload.main,
          name: message.payload.name,
          library: message.payload.library,
          description: message.payload.description,
          icon: message.payload.icon,
        },
      })
    } catch (error: unknown) {
      this.handleError(error as Error)
    }
  }

  private handleError(error: Error) {
    this.sendMessage<ErrorGraphOutputMessageInput>({
      protocol: 'graph',
      command: 'error',
      payload: {
        message: (error as Error).message,
      },
    })
  }

  private sendMessage<M>(message: M) {
    this.socket.send(JSON.stringify(message))
  }
}
