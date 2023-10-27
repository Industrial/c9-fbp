import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { RuntimeInputMessageSchema } from './runtime/RuntimeInputMessage.ts'

export const OutputMessageSchema = S.Union(
  RuntimeInputMessageSchema,
)

export type OutputMessageOutput = S.OutputOf<typeof OutputMessageSchema>

export type OutputMessage = S.OutputOf<typeof OutputMessageSchema>

export const OutputMessageTranscoder = deriveTranscoder(OutputMessageSchema)
