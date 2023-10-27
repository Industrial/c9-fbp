import { PacketOutputMessage } from '#/schemas/messages/runtime/output/PacketOutputMessage.ts'
import { PacketInputMessage } from '#/schemas/messages/runtime/input/PacketInputMessage.ts'

export const packet = async (message: PacketInputMessage): Promise<Array<PacketOutputMessage>> => {
  return []
}
