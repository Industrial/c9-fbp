import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import {
  RuntimeOutputMessageBaseInput,
  RuntimeOutputMessageBaseSchema,
} from '#/schemas/messages/runtime/RuntimeOutputMessageBase.ts'
import { PortDefinition, PortDefinitionInput, PortDefinitionSchema } from '#/schemas/messages/shared/PortDefinition.ts'
import { GraphID, GraphIDInput, GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'

export type PortsOutputMessageInput = RuntimeOutputMessageBaseInput & {
  command: 'ports'
  payload: {
    inPorts: PortDefinitionInput
    outPorts: PortDefinitionInput
    graph: GraphIDInput
  }
}

export type PortsOutputMessage = RuntimeOutputMessageBaseInput & {
  command: 'ports'
  payload: {
    inPorts: PortDefinition
    outPorts: PortDefinition
    graph: GraphID
  }
}

export const PortsOutputMessageSchema: S.Schema<PortsOutputMessageInput, PortsOutputMessage> =
  RuntimeOutputMessageBaseSchema.extend({
    command: S.Literal<['ports']>('ports'),
    payload: S.Struct({
      inPorts: PortDefinitionSchema,
      outPorts: PortDefinitionSchema,
      graph: GraphIDSchema,
    }),
  })

export const PortsOutputMessageTranscoder = deriveTranscoder(PortsOutputMessageSchema)
