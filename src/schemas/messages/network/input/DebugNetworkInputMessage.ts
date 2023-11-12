import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { NetworkInputMessageBaseSchema } from '#/schemas/messages/network/NetworkInputMessageBase.ts'
import { TargetNodeSchema } from '#/schemas/messages/shared/TargetNode.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const DebugNetworkInputMessageSchema = NetworkInputMessageBaseSchema
  .extend({
    command: S.Literal<['debug']>('debug'),
    payload: S.Struct({
      graph: GraphIDSchema,
      edges: S.Array(
        TargetNodeSchema,
      ),
    }),
  })

export type DebugNetworkInputMessageInput = S.InputOf<typeof DebugNetworkInputMessageSchema>

export type DebugNetworkInputMessage = S.OutputOf<typeof DebugNetworkInputMessageSchema>

export const DebugNetworkInputMessageTranscoder = deriveTranscoder(DebugNetworkInputMessageSchema)

export const DebugNetworkInputMessageInputGuard = deriveInputGuard(DebugNetworkInputMessageSchema)

export const DebugNetworkInputMessageGuard = deriveGuard(DebugNetworkInputMessageSchema)
