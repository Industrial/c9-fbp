import * as S from 'schemata-ts'
import { CapabilitiesSchema } from '#/schemas/messages/shared/Capabilities.ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { RuntimeOutputMessageBaseSchema } from '#/schemas/messages/runtime/RuntimeOutputMessageBase.ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RuntimeOutputMessageSchema = RuntimeOutputMessageBaseSchema.intersect(S.Struct({
  command: S.Literal('runtime'),
  payload: S.Struct({
    allCapabilities: CapabilitiesSchema,
    capabilities: CapabilitiesSchema,
    graph: GraphIDSchema,
    id: S.UUID(4),
    label: S.String(),
    namespace: S.String(),
    repository: S.String(),
    repositoryVersion: S.String(),
    type: S.String(),
    version: S.String(),
  }),
}))

export type RuntimeOutputMessageInput = S.InputOf<typeof RuntimeOutputMessageSchema>

export type RuntimeOutputMessage = S.OutputOf<typeof RuntimeOutputMessageSchema>

export const RuntimeOutputMessageTranscoder = deriveTranscoder(RuntimeOutputMessageSchema)
