import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { NetworkInputMessageBaseSchema } from '#/schemas/messages/network/NetworkInputMessageBase.ts'
import { TargetNodeSchema } from '#/schemas/messages/shared/TargetNode.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const EdgesNetworkInputMessageSchema = NetworkInputMessageBaseSchema
  .extend({
    command: S.Literal<['edges']>('edges'),
    payload: S.Struct({
      graph: GraphIDSchema,
      enable: S.Boolean,
      edges: S.Array(S.Struct({
        src: TargetNodeSchema,
        tgt: TargetNodeSchema,
      })),
    }),
  })

export type EdgesNetworkInputMessageInput = S.InputOf<typeof EdgesNetworkInputMessageSchema>

export type EdgesNetworkInputMessage = S.OutputOf<typeof EdgesNetworkInputMessageSchema>

export const EdgesNetworkInputMessageTranscoder = deriveTranscoder(EdgesNetworkInputMessageSchema)

export const EdgesNetworkInputMessageInputGuard = deriveInputGuard(EdgesNetworkInputMessageSchema)

export const EdgesNetworkInputMessageGuard = deriveGuard(EdgesNetworkInputMessageSchema)
