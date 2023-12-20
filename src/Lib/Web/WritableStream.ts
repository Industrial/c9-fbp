export const create = <T>(
  start?: WritableStreamDefaultControllerStartCallback,
  write?: WritableStreamDefaultControllerWriteCallback<T>,
  close?: WritableStreamDefaultControllerCloseCallback,
  abort?: WritableStreamErrorCallback,
): WritableStream<T> => new WritableStream<T>({ start, write, close, abort })

// Properties
export const getLocked = <T>(writableStream: WritableStream<T>): boolean => writableStream.locked

// Methods
export const close = <T>(writableStream: WritableStream<T>) => (): Promise<void> => writableStream.close()
export const abort = <T>(writableStream: WritableStream<T>) => (reason?: unknown): Promise<void> =>
  writableStream.abort(reason)
export const getWriter = <T>(writableStream: WritableStream<T>): WritableStreamDefaultWriter<T> =>
  writableStream.getWriter()

// Default Writer Properties
export const getDefaultWriterClosed = <T>(writer: WritableStreamDefaultWriter<T>): Promise<void> => writer.closed
export const getDefaultWriterDesiredSize = <T>(writer: WritableStreamDefaultWriter<T>): number | null =>
  writer.desiredSize

// Default Writer Methods
export const writeData = <T>(writer: WritableStreamDefaultWriter<T>) => (chunk: T): Promise<void> => writer.write(chunk)
export const closeWriter = <T>(writer: WritableStreamDefaultWriter<T>) => (): Promise<void> => writer.close()
export const abortWriter = <T>(writer: WritableStreamDefaultWriter<T>) => (reason?: unknown): Promise<void> =>
  writer.abort(reason)
