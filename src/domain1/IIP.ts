export class IIP {
  #data: unknown

  #metadata: Record<string, unknown>

  constructor(data: unknown, metadata?: Record<string, unknown>) {
    this.#data = data
    this.#metadata = metadata ?? {}
  }

  get data() {
    return this.#data
  }

  set data(data: unknown) {
    this.#data = data
  }

  get metadata() {
    return this.#metadata
  }

  set metadata(metadata: Record<string, unknown>) {
    this.#metadata = metadata
  }
}
