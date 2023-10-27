import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { RuntimeOutputMessageSchema } from '#/schemas/messages/runtime/RuntimeOutputMessage.ts'

export const OutputMessageSchema = S.Union(
  RuntimeOutputMessageSchema,
)

export type OutputMessageOutput = S.OutputOf<typeof OutputMessageSchema>

export type OutputMessage = S.OutputOf<typeof OutputMessageSchema>

export const OutputMessageTranscoder = deriveTranscoder(OutputMessageSchema)
