import * as T from 'fp-ts/Task.ts'
import { ErrorComponentOutputMessageInput } from '#/schemas/messages/component/output/ErrorComponentOutputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'
import { SourceComponentInputMessage } from '#/schemas/messages/component/input/SourceComponentInputMessage.ts'
import { SourceComponentOutputMessage } from '#/schemas/messages/component/output/SourceComponentOutputMessage.ts'

export const source: MessageHandler<
  SourceComponentInputMessage,
  SourceComponentOutputMessage | ErrorComponentOutputMessageInput
> = (send) => (_message) =>
  T.fromIO(() => {
    send({
      protocol: 'component',
      command: 'error',
      payload: {
        message: 'foo',
      },
    })()
  })
