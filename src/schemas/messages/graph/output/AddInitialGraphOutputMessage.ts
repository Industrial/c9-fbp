import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { IIPValueSchema } from '../../shared/IIPValue.ts'
import { MetadataEdgeSchema } from '#/schemas/messages/shared/MetadataEdge.ts'
import { TargetNodeSchema } from '#/schemas/messages/shared/TargetNode.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const AddInitialGraphOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['addinitial']>('addinitial'),
    payload: S.Struct({
      src: IIPValueSchema,
      tgt: TargetNodeSchema,
      graph: GraphIDSchema,
      metadata: S.Optional(MetadataEdgeSchema),
    }),
  })

export type AddInitialGraphOutputMessageInput = S.InputOf<typeof AddInitialGraphOutputMessageSchema>

export type AddInitialGraphOutputMessage = S.OutputOf<typeof AddInitialGraphOutputMessageSchema>

export const AddInitialGraphOutputMessageTranscoder = deriveTranscoder(AddInitialGraphOutputMessageSchema)

export const AddInitialGraphOutputMessageInputGuard = deriveInputGuard(AddInitialGraphOutputMessageSchema)

export const AddInitialGraphOutputMessageGuard = deriveGuard(AddInitialGraphOutputMessageSchema)
