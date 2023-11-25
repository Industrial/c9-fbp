import * as Either from 'fp-ts/Either.ts'
import * as TaskEither from 'fp-ts/TaskEither.ts'

export const writeToTransformStream = <C>(c: C) => (a: TransformStream) =>
  TaskEither.tryCatch(
    () => a.writable.getWriter().write(c),
    Either.toError,
  )
