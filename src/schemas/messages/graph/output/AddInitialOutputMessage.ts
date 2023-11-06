import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { IIPValueSchema } from '../../shared/IIPValue.ts'
import { MetadataEdgeSchema } from '#/schemas/messages/shared/MetadataEdge.ts'
import { TargetNodeSchema } from '#/schemas/messages/shared/TargetNode.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const AddInitialOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['addinitial']>('addinitial'),
    payload: S.Struct({
      src: IIPValueSchema,
      tgt: TargetNodeSchema,
      metadata: MetadataEdgeSchema,
      graph: GraphIDSchema,
    }),
  })

export type AddInitialOutputMessageInput = S.InputOf<typeof AddInitialOutputMessageSchema>

export type AddInitialOutputMessage = S.OutputOf<typeof AddInitialOutputMessageSchema>

export const AddInitialOutputMessageTranscoder = deriveTranscoder(AddInitialOutputMessageSchema)

export const AddInitialOutputMessageInputGuard = deriveInputGuard(AddInitialOutputMessageSchema)

export const AddInitialOutputMessageGuard = deriveGuard(AddInitialOutputMessageSchema)
