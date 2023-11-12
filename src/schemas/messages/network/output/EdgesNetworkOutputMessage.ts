import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { NetworkOutputMessageBaseSchema } from '#/schemas/messages/network/NetworkOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const EdgesNetworkOutputMessageSchema = NetworkOutputMessageBaseSchema
  .extend({
    command: S.Literal<['edges']>('edges'),
    payload: S.Struct({
      enable: S.Boolean,
      graph: GraphIDSchema,
    }),
  })

export type EdgesNetworkOutputMessageInput = S.OutputOf<typeof EdgesNetworkOutputMessageSchema>

export type EdgesNetworkOutputMessage = S.OutputOf<typeof EdgesNetworkOutputMessageSchema>

export const EdgesNetworkOutputMessageTranscoder = deriveTranscoder(EdgesNetworkOutputMessageSchema)

export const EdgesNetworkOutputMessageInputGuard = deriveInputGuard(EdgesNetworkOutputMessageSchema)

export const EdgesNetworkOutputMessageGuard = deriveGuard(EdgesNetworkOutputMessageSchema)
