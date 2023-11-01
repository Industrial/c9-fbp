import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphInputMessageBaseSchema } from '#/schemas/messages/graph/GraphInputMessageBase.ts'
import { IIPSchema } from '#/schemas/messages/shared/IIP.ts'
import { MetadataEdgeSchema } from '#/schemas/messages/shared/MetadataEdge.ts'
import { PortSchema } from '#/schemas/messages/shared/Port.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const AddInitialInputMessageSchema = GraphInputMessageBaseSchema
  .extend({
    command: S.Literal<['addinitial']>('addinitial'),
    payload: S.Struct({
      src: IIPSchema,
      tgt: PortSchema,
      metadata: MetadataEdgeSchema,
      graph: GraphIDSchema,
    }),
  })

export type AddInitialInputMessageInput = S.InputOf<typeof AddInitialInputMessageSchema>

export type AddInitialInputMessage = S.OutputOf<typeof AddInitialInputMessageSchema>

export const AddInitialInputMessageTranscoder = deriveTranscoder(AddInitialInputMessageSchema)

export const AddInitialInputMessageInputGuard = deriveInputGuard(AddInitialInputMessageSchema)

export const AddInitialInputMessageGuard = deriveGuard(AddInitialInputMessageSchema)
