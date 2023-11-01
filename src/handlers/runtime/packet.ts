import * as TE from 'fp-ts/TaskEither.ts'
import { ErrorOutputMessageInput } from '#/schemas/messages/runtime/output/ErrorOutputMessage.ts'
import { PacketInputMessage } from '#/schemas/messages/runtime/input/PacketInputMessage.ts'
import { PacketOutputMessageInput } from '#/schemas/messages/runtime/output/PacketOutputMessage.ts'

export const packet = (
  _message: PacketInputMessage,
): TE.TaskEither<Error, Array<PacketOutputMessageInput | ErrorOutputMessageInput>> => {
  return TE.right([])
}
