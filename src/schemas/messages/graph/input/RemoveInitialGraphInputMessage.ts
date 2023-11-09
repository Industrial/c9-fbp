import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { IIPValueSchema } from '../../shared/IIPValue.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { TargetNodeSchema } from '#/schemas/messages/shared/TargetNode.ts'

export const RemoveInitialGraphInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['removeinitial']>('removeinitial'),
    payload: S.Struct({
      src: S.Optional(IIPValueSchema),
      tgt: TargetNodeSchema,
      graph: GraphIDSchema,
    }),
  })

export type RemoveInitialGraphInputMessageInput = S.InputOf<typeof RemoveInitialGraphInputMessageSchema>

export type RemoveInitialGraphInputMessage = S.OutputOf<typeof RemoveInitialGraphInputMessageSchema>

export const RemoveInitialGraphInputMessageTranscoder = deriveTranscoder(RemoveInitialGraphInputMessageSchema)

export const RemoveInitialGraphInputMessageInputGuard = deriveInputGuard(RemoveInitialGraphInputMessageSchema)

export const RemoveInitialGraphInputMessageGuard = deriveGuard(RemoveInitialGraphInputMessageSchema)
