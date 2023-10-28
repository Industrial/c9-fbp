import * as S from 'schemata-ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import {
  RuntimeOutputMessageBaseInput,
  RuntimeOutputMessageBaseSchema,
} from '#/schemas/messages/runtime/RuntimeOutputMessageBase.ts'
import { GraphID, GraphIDInput, GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { Capabilities, CapabilitiesInput, CapabilitiesSchema } from '#/schemas/messages/shared/Capabilities.ts'

export type RuntimeOutputMessageEvent = 'connect' | 'begingroup' | 'data' | 'endgroup' | 'disconnect'

export type RuntimeOutputMessageInput = RuntimeOutputMessageBaseInput & {
  command: 'runtime'
  payload: {
    allCapabilities: CapabilitiesInput
    capabilities: CapabilitiesInput
    graph: GraphIDInput
    id: string
    label: string
    namespace: string
    repository: string
    repositoryVersion: string
    type: string
    version: string
  }
}

export type RuntimeOutputMessage = RuntimeOutputMessageBaseInput & {
  command: 'runtime'
  payload: {
    allCapabilities: Capabilities
    capabilities: Capabilities
    graph: GraphID
    id: S.UUID<4>
    label: string
    namespace: string
    repository: string
    repositoryVersion: string
    type: string
    version: string
  }
}

export const RuntimeOutputMessageSchema: S.Schema<RuntimeOutputMessageInput, RuntimeOutputMessage> =
  RuntimeOutputMessageBaseSchema.extend({
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

export const GetRuntimeInputMessageTranscoder = deriveTranscoder(RuntimeOutputMessageSchema)
