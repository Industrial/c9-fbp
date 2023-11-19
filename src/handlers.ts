import * as handlers from '#/handlers/mod.ts'
import { InputMessage } from '#/schemas/messages/InputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'

export const getHandlerByInputMessage = (inputMessage: InputMessage): MessageHandler => {
  const protocolHandlers = handlers[inputMessage.protocol as keyof typeof handlers]
  return protocolHandlers[inputMessage.command as keyof typeof protocolHandlers] as MessageHandler
}
