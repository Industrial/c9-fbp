import * as S from 'schemata-ts'
import { ComponentOutputMessageSchema } from '#/schemas/messages/component/ComponentOutputMessage.ts'
import { GraphOutputMessageSchema } from '#/schemas/messages/graph/GraphOutputMessage.ts'
import { NetworkOutputMessageSchema } from '#/schemas/messages/network/NetworkOutputMessage.ts'
import { RuntimeOutputMessageSchema } from '#/schemas/messages/runtime/RuntimeOutputMessage.ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const OutputMessageSchema = S.Union(
  ComponentOutputMessageSchema,
  GraphOutputMessageSchema,
  NetworkOutputMessageSchema,
  RuntimeOutputMessageSchema,
)

export type OutputMessageInput = S.InputOf<typeof OutputMessageSchema>

export type OutputMessage = S.OutputOf<typeof OutputMessageSchema>

export const OutputMessageTranscoder = deriveTranscoder(OutputMessageSchema)
