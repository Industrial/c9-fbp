import * as S from 'schemata-ts'
import { ComponentOutputMessageBaseSchema } from '#/schemas/messages/component/ComponentOutputMessageBase.ts'
import { MetadataNodeSchema } from '#/schemas/messages/shared/MetadataNode.ts'
import { NodeIDSchema } from '#/schemas/messages/shared/NodeID.ts'
import { PortIDSchema } from '#/schemas/messages/shared/PortID.ts'
import { deriveGuard, deriveInputGuard } from 'schemata-ts/Guard'
import { deriveTranscoder } from 'schemata-ts/Transcoder'

export const ComponentComponentOutputMessageSchema = ComponentOutputMessageBaseSchema
  .extend({
    command: S.Literal<['component']>('component'),
    payload: S.Struct({
      name: S.String(),
      subgraph: S.Boolean,
      inPorts: S.Array(S.Struct({
        index: S.Optional(S.Union(S.Float(), S.String())),
        node: NodeIDSchema,
        port: PortIDSchema,
        public: PortIDSchema,
        metadata: S.Optional(MetadataNodeSchema),
      })),
      outPorts: S.Array(S.Struct({
        index: S.Optional(S.Union(S.Float(), S.String())),
        node: NodeIDSchema,
        port: PortIDSchema,
        public: PortIDSchema,
        metadata: S.Optional(MetadataNodeSchema),
      })),
      description: S.Optional(S.String()),
      icon: S.Optional(S.String()),
    }),
  })

export type ComponentComponentOutputMessageInput = S.OutputOf<typeof ComponentComponentOutputMessageSchema>

export type ComponentComponentOutputMessage = S.OutputOf<typeof ComponentComponentOutputMessageSchema>

export const ComponentComponentOutputMessageTranscoder = deriveTranscoder(ComponentComponentOutputMessageSchema)

export const ComponentComponentOutputMessageInputGuard = deriveInputGuard(ComponentComponentOutputMessageSchema)

export const ComponentComponentOutputMessageGuard = deriveGuard(ComponentComponentOutputMessageSchema)
