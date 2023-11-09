import * as S from 'schemata-ts'
import { CapabilitiesSchema } from '#/schemas/messages/shared/Capabilities.ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { RuntimeOutputMessageBaseSchema } from '#/schemas/messages/runtime/RuntimeOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export type RuntimeRuntimeOutputMessageEvent = 'connect' | 'begingroup' | 'data' | 'endgroup' | 'disconnect'

export const RuntimeRuntimeOutputMessageSchema = RuntimeOutputMessageBaseSchema.extend({
  command: S.Literal<['runtime']>('runtime'),
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
})

export type RuntimeRuntimeOutputMessageInput = S.InputOf<typeof RuntimeRuntimeOutputMessageSchema>

export type RuntimeRuntimeOutputMessage = S.OutputOf<typeof RuntimeRuntimeOutputMessageSchema>

export const RuntimeRuntimeOutputMessageTranscoder = deriveTranscoder(RuntimeRuntimeOutputMessageSchema)

export const RuntimeRuntimeOutputMessageInputGuard = deriveInputGuard(RuntimeRuntimeOutputMessageSchema)

export const RuntimeRuntimeOutputMessageGuard = deriveGuard(RuntimeRuntimeOutputMessageSchema)
