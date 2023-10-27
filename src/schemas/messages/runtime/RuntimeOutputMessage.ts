import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

import { RuntimeOutputMessageSchema as RuntimeRuntimeOutputMessageSchema } from '#/schemas/messages/runtime/output/RuntimeOutputMessage.ts'

export const RuntimeOutputMessageSchema = S.Union(
  RuntimeRuntimeOutputMessageSchema,
)

export type RuntimeOutputMessageOutput = S.OutputOf<typeof RuntimeOutputMessageSchema>

export type RuntimeOutputMessage = S.OutputOf<typeof RuntimeOutputMessageSchema>

export const RuntimeOutputMessageTranscoder = deriveTranscoder(RuntimeOutputMessageSchema)
