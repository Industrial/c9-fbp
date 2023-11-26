import { Port } from '#/domain1/Port.ts'

export type NodeInputMessage = {
  portId: Port['id']
  // TODO: Type correctly.
  chunk: unknown
}

export type NodeOutputMessage = {
  portId: Port['id']
  // TODO: Type correctly.
  chunk: unknown
}

export class Node {
  #id: string

  #component: string

  #metadata: Record<string, unknown>

  #inports: Record<Port['id'], Port>

  #outports: Record<Port['id'], Port>

  #state: Record<string, unknown>

  #inputStream: TransformStream<NodeInputMessage>

  #outputStream: WritableStream<NodeOutputMessage>

  public constructor(
    id: string,
    component: string,
    inports: Record<string, Port>,
    outports: Record<string, Port>,
    metadata?: Record<string, unknown>,
  ) {
    this.#id = id
    this.#component = component
    this.#metadata = metadata ?? {}
    this.#inports = inports
    this.#outports = outports
    this.#state = {}
    this.#inputStream = new TransformStream<NodeInputMessage>()
    this.#outputStream = new WritableStream<NodeOutputMessage>()
  }

  get id() {
    return this.#id
  }

  set id(id: string) {
    this.#id = id
  }

  get component() {
    return this.#component
  }

  set component(component: string) {
    this.#component = component
  }

  get metadata() {
    return this.#metadata
  }

  set metadata(metadata: Record<string, unknown>) {
    this.#metadata = metadata
  }

  get inports() {
    return this.#inports
  }

  public addInport(inport: Port): void {
    this.#inports[inport.id] = inport
  }

  public removeInport(inport: Port): void {
    delete this.#inports[inport.id]
  }

  get outports() {
    return this.#outports
  }

  public addOutport(outport: Port): void {
    this.#outports[outport.id] = outport
  }

  public removeOutport(outport: Port): void {
    delete this.#outports[outport.id]
  }

  get state() {
    return this.#state
  }

  set state(state: Record<string, unknown>) {
    this.#state = state
  }

  get inputStream() {
    return this.#inputStream
  }

  set inputStream(inputStream: TransformStream<NodeInputMessage>) {
    this.#inputStream = inputStream
  }

  get outputStream() {
    return this.#outputStream
  }

  set outputStream(outputStream: WritableStream<NodeOutputMessage>) {
    this.#outputStream = outputStream
  }
}
