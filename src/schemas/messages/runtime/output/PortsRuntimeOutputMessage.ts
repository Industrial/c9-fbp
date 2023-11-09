import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { PortDefinitionSchema } from '#/schemas/messages/shared/PortDefinition.ts'
import { RuntimeOutputMessageBaseSchema } from '#/schemas/messages/runtime/RuntimeOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const PortsOutputRuntimeMessageSchema = RuntimeOutputMessageBaseSchema.extend({
  command: S.Literal<['ports']>('ports'),
  payload: S.Struct({
    inPorts: PortDefinitionSchema,
    outPorts: PortDefinitionSchema,
    graph: GraphIDSchema,
  }),
})

export const PortsOutputRuntimeMessageTranscoder = deriveTranscoder(PortsOutputRuntimeMessageSchema)

export type PortsOutputRuntimeMessageInput = S.InputOf<typeof PortsOutputRuntimeMessageSchema>

export type PortsRuntimeOutputMessage = S.OutputOf<typeof PortsOutputRuntimeMessageSchema>

export const PortsRuntimeOutputInputMessageTranscoder = deriveTranscoder(PortsOutputRuntimeMessageSchema)

export const PortsRuntimeOutputMessageInputGuard = deriveInputGuard(PortsOutputRuntimeMessageSchema)

export const PortsRuntimeOutputMessageGuard = deriveGuard(PortsOutputRuntimeMessageSchema)
