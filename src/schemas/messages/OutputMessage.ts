import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import {
  RuntimeOutputMessage,
  RuntimeOutputMessageInput,
  RuntimeOutputMessageSchema,
} from '#/schemas/messages/runtime/RuntimeOutputMessage.ts'
import {
  GraphOutputMessage,
  GraphOutputMessageInput,
  GraphOutputMessageSchema,
} from '#/schemas/messages/graph/GraphOutputMessage.ts'

export const OutputMessageSchema = S.Union(
  GraphOutputMessageSchema,
  RuntimeOutputMessageSchema,
)

export type OutputMessageInput =
  | GraphOutputMessageInput
  | RuntimeOutputMessageInput

export type OutputMessage =
  | GraphOutputMessage
  | RuntimeOutputMessage

export const OutputMessageTranscoder = deriveTranscoder(OutputMessageSchema)
