import * as T from 'fp-ts/Task.ts'
import { ErrorComponentOutputMessageInput } from '#/schemas/messages/component/output/ErrorComponentOutputMessage.ts'
import { GetSourceComponentInputMessage } from '#/schemas/messages/component/input/GetSourceComponentInputMessage.ts'
import { MessageHandler } from '#/handlers/MessageHandler.ts'
import { SourceComponentOutputMessage } from '#/schemas/messages/component/output/SourceComponentOutputMessage.ts'

export const getsource: MessageHandler<
  GetSourceComponentInputMessage,
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
