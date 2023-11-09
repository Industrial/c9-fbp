import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { IIPValueSchema } from '../../shared/IIPValue.ts'
import { TargetNodeSchema } from '#/schemas/messages/shared/TargetNode.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const RemoveInitialGraphOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['removeinitial']>('removeinitial'),
    payload: S.Struct({
      src: S.Optional(IIPValueSchema),
      tgt: TargetNodeSchema,
      graph: GraphIDSchema,
    }),
  })

export type RemoveInitialGraphOutputMessageInput = S.InputOf<typeof RemoveInitialGraphOutputMessageSchema>

export type RemoveInitialGraphOutputMessage = S.OutputOf<typeof RemoveInitialGraphOutputMessageSchema>

export const RemoveInitialGraphOutputMessageTranscoder = deriveTranscoder(RemoveInitialGraphOutputMessageSchema)

export const RemoveInitialGraphOutputMessageInputGuard = deriveInputGuard(RemoveInitialGraphOutputMessageSchema)

export const RemoveInitialGraphOutputMessageGuard = deriveGuard(RemoveInitialGraphOutputMessageSchema)
