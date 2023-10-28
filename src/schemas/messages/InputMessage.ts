import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import {
  RuntimeInputMessage,
  RuntimeInputMessageInput,
  RuntimeInputMessageSchema,
} from '#/schemas/messages/runtime/RuntimeInputMessage.ts'

export const InputMessageSchema = S.Union(
  RuntimeInputMessageSchema,
)

export type InputMessageInput = RuntimeInputMessageInput

export type InputMessage = RuntimeInputMessage

export const InputMessageTranscoder = deriveTranscoder<InputMessageInput, InputMessage>(InputMessageSchema)
