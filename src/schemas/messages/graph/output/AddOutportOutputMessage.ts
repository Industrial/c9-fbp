import * as S from 'schemata-ts'
import { GraphIDSchema } from '#/schemas/messages/shared/GraphID.ts'
import { GraphOutputMessageBaseSchema } from '#/schemas/messages/graph/GraphOutputMessageBase.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { MetadataGroupSchema } from '#/schemas/messages/shared/MetadataGroup.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'

export const AddOutportOutputMessageSchema = GraphOutputMessageBaseSchema
  .extend({
    command: S.Literal<['addoutport']>('addoutport'),
    payload: S.Struct({
      public: PortIDSchema,
      node: NodeIDSchema,
      port: PortIDSchema,
      metadata: MetadataGroupSchema,
      graph: GraphIDSchema,
    }),
  })

export type AddOutportOutputMessageInput = S.InputOf<typeof AddOutportOutputMessageSchema>

export type AddOutportOutputMessage = S.OutputOf<typeof AddOutportOutputMessageSchema>

export const AddOutportOutputMessageTranscoder = deriveTranscoder(AddOutportOutputMessageSchema)

export const AddOutportOutputMessageInputGuard = deriveInputGuard(AddOutportOutputMessageSchema)

export const AddOutportOutputMessageGuard = deriveGuard(AddOutportOutputMessageSchema)
