import { IIP } from '#/domain1/IIP.ts'

export class Port {
  #id: string

  #public: string

  #metadata: Record<string, unknown>

  #iip?: IIP

  #stream: TransformStream

  constructor(
    id: string,
    publicName: string,
    metadata?: Record<string, unknown>,
    iip?: IIP,
  ) {
    this.#id = id
    this.#public = publicName
    this.#metadata = metadata ?? {}
    this.#iip = iip
    this.#stream = new TransformStream()
  }

  get id() {
    return this.#id
  }

  set id(id: string) {
    this.#id = id
  }

  get public() {
    return this.#public
  }

  set public(publicName: string) {
    this.#public = publicName
  }

  get metadata() {
    return this.#metadata
  }

  set metadata(metadata: Record<string, unknown>) {
    this.#metadata = metadata
  }

  get iip() {
    return this.#iip
  }

  set iip(iip: IIP | undefined) {
    this.#iip = iip
  }

  get stream() {
    return this.#stream
  }

  set stream(stream: TransformStream) {
    this.#stream = stream
  }
}
