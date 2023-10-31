import * as TE from 'fp-ts/TaskEither.ts'
import { ErrorOutputMessage } from '#/schemas/messages/runtime/output/ErrorOutputMessage.ts'
import { Handler } from '#/handlers/Handler.ts'
import { PacketInputMessage } from '#/schemas/messages/runtime/input/PacketInputMessage.ts'
import { PacketOutputMessage } from '#/schemas/messages/runtime/output/PacketOutputMessage.ts'

export const packet: Handler<PacketInputMessage, ErrorOutputMessage, PacketOutputMessage> = (_message) => {
  return TE.right([])
}
