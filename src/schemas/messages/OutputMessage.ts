import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import {
  RuntimeOutputMessage,
  RuntimeOutputMessageInput,
  RuntimeOutputMessageSchema,
} from '#/schemas/messages/runtime/RuntimeOutputMessage.ts'

export const OutputMessageSchema = S.Union(
  RuntimeOutputMessageSchema,
)

export type OutputMessageInput = RuntimeOutputMessageInput

export type OutputMessage = RuntimeOutputMessage

export const OutputMessageTranscoder = deriveTranscoder<OutputMessageInput, OutputMessage>(OutputMessageSchema)
