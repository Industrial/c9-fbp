import * as S from 'schemata-ts/index.ts'
import { deriveTranscoder } from 'schemata-ts/Transcoder.ts'

import { SerialTask, SerialTaskInput, SerialTaskSchema } from '#/schemas/SerialTask.ts'
import { Task, TaskInput, TaskSchema } from '#/schemas/Task.ts'
import { TaskBase, TaskBaseInput, TaskBaseSchema } from '#/schemas/TaskBase.ts'

export type ParallelTaskInput = TaskBaseInput & {
  type: 'ParallelTask'
  steps: ReadonlyArray<SerialTaskInput | TaskInput>
}

export type ParallelTask = TaskBase & {
  type: 'ParallelTask'
  steps: ReadonlyArray<SerialTask | Task>
}

export const ParallelTaskSchema: S.Schema<ParallelTaskInput, ParallelTask> = TaskBaseSchema.extend({
  type: S.Literal('ParallelTask'),
  steps: S.Lazy('Steps', () => {
    return S.Array(S.Union(SerialTaskSchema, TaskSchema))
  }),
})

export const ParallelTaskTranscoder = deriveTranscoder(ParallelTaskSchema)
