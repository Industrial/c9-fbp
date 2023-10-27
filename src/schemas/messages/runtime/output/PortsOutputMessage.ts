import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { RuntimeInputMessageBaseSchema } from '#/schemas/messages/runtime/RuntimeInputMessageBase.ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { PortDefinitionSchema } from '#/schemas/messages/shared/PortDefinition.ts'

export const PortsOutputMessageSchema = RuntimeInputMessageBaseSchema.intersect(S.Struct({
  command: S.Literal('packet'),
  payload: S.Struct({
    inPorts: PortDefinitionSchema,
    outPorts: PortDefinitionSchema,
    graph: GraphIDSchema,
  }),
}))

export type PortsOutputMessageInput = S.InputOf<typeof PortsOutputMessageSchema>

export type PortsOutputMessage = S.OutputOf<typeof PortsOutputMessageSchema>

export const PortsOutputMessageTranscoder = deriveTranscoder(PortsOutputMessageSchema)
