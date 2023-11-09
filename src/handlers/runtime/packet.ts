import * as TE from 'fp-ts/TaskEither.ts'
import { ErrorRuntimeOutputMessageInput } from '#/schemas/messages/runtime/output/ErrorRuntimeOutputMessage.ts'
import { PacketRuntimeInputMessage } from '#/schemas/messages/runtime/input/PacketRuntimeInputMessage.ts'
import { PacketRuntimeOutputMessageInput } from '#/schemas/messages/runtime/output/PacketRuntimeOutputMessage.ts'

export const packet = (
  _message: PacketRuntimeInputMessage,
): TE.TaskEither<Error, Array<PacketRuntimeOutputMessageInput | ErrorRuntimeOutputMessageInput>> => {
  return TE.right([])
}
