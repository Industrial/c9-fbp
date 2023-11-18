import * as E from 'fp-ts/Either.ts'
import * as TE from 'fp-ts/TaskEither.ts'
import * as uuid from 'std/uuid/mod.ts'

export const uuidNamespace = '2ff101f3-8408-4cbd-8d79-0e62dbdd7c52'
export const data = 'c9-fbp'

export const create = TE.tryCatchK(
  () => uuid.v5.generate(uuidNamespace, new TextEncoder().encode(data)),
  E.toError,
)
