// Properties
export const getLocked = (stream: ReadableStream<Uint8Array>): boolean => stream.locked

// Methods
export const create = (
  start?: ReadableStreamDefaultControllerCallback<Uint8Array>,
  cancel?: ReadableStreamErrorCallback,
  pull?: ReadableStreamDefaultControllerCallback<Uint8Array>,
  highWaterMark?: number,
  // autoAllocateChunkSize?: number,
): ReadableStream<Uint8Array> =>
  new ReadableStream<Uint8Array>({
    cancel,
    pull,
    start,
    // autoAllocateChunkSize,
    // type: 'bytes',
  }, {
    highWaterMark,
    // size,
  })
export const cancelImpl =
  (stream: ReadableStream<Uint8Array>) => async (reason?: string): Promise<ReadableStream<Uint8Array>> => {
    stream.cancel(reason)
    return stream
  }
export const getReader = (stream: ReadableStream<Uint8Array>) => (): ReadableStreamDefaultReader<Uint8Array> =>
  stream.getReader()
export const pipeThrough =
  (stream: ReadableStream<Uint8Array>) =>
  ({ writable, readable }: { writable: WritableStream<Uint8Array>; readable: ReadableStream<Uint8Array> }) =>
  (options?: PipeOptions): ReadableStream<Uint8Array> => stream.pipeThrough({ writable, readable }, options)
export const pipeTo =
  (stream: ReadableStream<Uint8Array>) =>
  (dest: WritableStream<Uint8Array>) =>
  (options?: PipeOptions): Promise<void> => stream.pipeTo(dest, options)
export const tee = (stream: ReadableStream<Uint8Array>): [ReadableStream<Uint8Array>, ReadableStream<Uint8Array>] =>
  stream.tee()

// Helper Methods
export const isReadableStreamLocked = <T>(stream: ReadableStream<T>): boolean => {
  try {
    const reader = stream.getReader()
    reader.releaseLock()
    return false
  } catch {
    return true
  }
}
