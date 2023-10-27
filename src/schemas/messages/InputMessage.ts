import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { RuntimeInputMessageSchema } from './runtime/RuntimeInputMessage.ts'

export const InputMessageSchema = S.Union(
  RuntimeInputMessageSchema,
)

export type InputMessageInput = S.InputOf<typeof InputMessageSchema>

export type InputMessage = S.OutputOf<typeof InputMessageSchema>

export const InputMessageTranscoder = deriveTranscoder<InputMessageInput, InputMessage>(InputMessageSchema)
