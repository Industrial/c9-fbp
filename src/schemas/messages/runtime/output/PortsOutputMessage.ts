import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { PortDefinitionSchema } from '#/schemas/messages/shared/PortDefinition.ts'
import { RuntimeOutputMessageBaseSchema } from '#/schemas/messages/runtime/RuntimeOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const PortsOutputMessageSchema = RuntimeOutputMessageBaseSchema.extend({
  command: S.Literal<['ports']>('ports'),
  payload: S.Struct({
    inPorts: PortDefinitionSchema,
    outPorts: PortDefinitionSchema,
    graph: GraphIDSchema,
  }),
})

export const PortsOutputMessageTranscoder = deriveTranscoder(PortsOutputMessageSchema)

export type PortsOutputMessageInput = S.InputOf<typeof PortsOutputMessageSchema>

export type PortsOutputMessage = S.OutputOf<typeof PortsOutputMessageSchema>

export const PortsOutputInputMessageTranscoder = deriveTranscoder(PortsOutputMessageSchema)

export const PortsInputMessageInputGuard = deriveInputGuard(PortsOutputMessageSchema)

export const PortsInputMessageGuard = deriveGuard(PortsOutputMessageSchema)
