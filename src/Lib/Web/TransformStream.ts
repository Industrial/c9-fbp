export const create = <I, O>(
  transformer?: Transformer<I, O>,
  writableStrategy?: QueuingStrategy<I>,
  readableStrategy?: QueuingStrategy<O>,
): TransformStream<I, O> => new TransformStream(transformer, writableStrategy, readableStrategy)

// Properties
export const getReadable = <I, O>(transformStream: TransformStream<I, O>): ReadableStream<O> => transformStream.readable
export const getWritable = <I, O>(transformStream: TransformStream<I, O>): WritableStream<I> => transformStream.writable
