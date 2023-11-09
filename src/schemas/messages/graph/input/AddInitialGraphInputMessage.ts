import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { IIPValueSchema } from '../../shared/IIPValue.ts'
import { MetadataEdgeSchema } from '#/schemas/messages/shared/MetadataEdge.ts'
import { TargetNodeSchema } from '#/schemas/messages/shared/TargetNode.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const AddInitialGraphInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['addinitial']>('addinitial'),
    payload: S.Struct({
      src: IIPValueSchema,
      tgt: TargetNodeSchema,
      graph: GraphIDSchema,
      metadata: S.Optional(MetadataEdgeSchema),
    }),
  })

export type AddInitialGraphInputMessageInput = S.InputOf<typeof AddInitialGraphInputMessageSchema>

export type AddInitialGraphInputMessage = S.OutputOf<typeof AddInitialGraphInputMessageSchema>

export const AddInitialGraphInputMessageTranscoder = deriveTranscoder(AddInitialGraphInputMessageSchema)

export const AddInitialGraphInputMessageInputGuard = deriveInputGuard(AddInitialGraphInputMessageSchema)

export const AddInitialGraphInputMessageGuard = deriveGuard(AddInitialGraphInputMessageSchema)
