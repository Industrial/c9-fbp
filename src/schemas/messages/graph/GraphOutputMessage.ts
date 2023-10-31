import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

import {
  ClearOutputMessage,
  ClearOutputMessageInput,
  ClearOutputMessageSchema,
} from '#/schemas/messages/graph/output/ClearOutputMessage.ts'
import {
  AddEdgeOutputMessage,
  AddEdgeOutputMessageInput,
  AddEdgeOutputMessageSchema,
} from '#/schemas/messages/graph/output/AddEdgeOutputMessage.ts'
import {
  ErrorOutputMessage,
  ErrorOutputMessageInput,
  ErrorOutputMessageSchema,
} from '#/schemas/messages/graph/output/ErrorOutputMessage.ts'

export type GraphOutputMessageInput =
  | AddEdgeOutputMessageInput
  | ClearOutputMessageInput
  | ErrorOutputMessageInput

export type GraphOutputMessage =
  | AddEdgeOutputMessage
  | ClearOutputMessage
  | ErrorOutputMessage

export const GraphOutputMessageSchema: S.Schema<GraphOutputMessageInput, GraphOutputMessage> = S.Union(
  AddEdgeOutputMessageSchema,
  ClearOutputMessageSchema,
  ErrorOutputMessageSchema,
)

export const GraphOutputMessageTranscoder = deriveTranscoder(GraphOutputMessageSchema)
