import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { MetadataGroupSchema } from '#/schemas/messages/shared/MetadataGroup.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'

export const AddInportOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['addinport']>('addinport'),
    payload: S.Struct({
      public: PortIDSchema,
      node: NodeIDSchema,
      port: PortIDSchema,
      metadata: MetadataGroupSchema,
      graph: GraphIDSchema,
    }),
  })

export type AddInportOutputMessageInput = S.InputOf<typeof AddInportOutputMessageSchema>

export type AddInportOutputMessage = S.OutputOf<typeof AddInportOutputMessageSchema>

export const AddInportOutputMessageTranscoder = deriveTranscoder(AddInportOutputMessageSchema)

export const AddInportOutputMessageInputGuard = deriveInputGuard(AddInportOutputMessageSchema)

export const AddInportOutputMessageGuard = deriveGuard(AddInportOutputMessageSchema)
