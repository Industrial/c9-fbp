import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { NetworkOutputMessageBaseSchema } from '#/schemas/messages/network/NetworkOutputMessageBase.ts'
import { TargetNodeSchema } from '#/schemas/messages/shared/TargetNode.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const EdgesNetworkOutputMessageSchema = NetworkOutputMessageBaseSchema
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

export type EdgesNetworkOutputMessageInput = S.OutputOf<typeof EdgesNetworkOutputMessageSchema>

export type EdgesNetworkOutputMessage = S.OutputOf<typeof EdgesNetworkOutputMessageSchema>

export const EdgesNetworkOutputMessageTranscoder = deriveTranscoder(EdgesNetworkOutputMessageSchema)

export const EdgesNetworkOutputMessageInputGuard = deriveInputGuard(EdgesNetworkOutputMessageSchema)

export const EdgesNetworkOutputMessageGuard = deriveGuard(EdgesNetworkOutputMessageSchema)
