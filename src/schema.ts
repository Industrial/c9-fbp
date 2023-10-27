import { SerialTaskInput, SerialTaskTranscoder } from '#/schemas/mod.ts'

const steps: SerialTaskInput = {
  type: 'SerialTask',
  name: 'Main',
  input: [],
  output: [],
  steps: [
    {
      type: 'HarvestFarmTask',
      input: {
        contractAddress: '123',
        minimumReward: '-123',
      },
    },
  ],
}

// * A language to specify a GraphNode.
//   * Multiple named inputs.
//   * Multiple named outputs.
// * A language to specify a Graph.
//   * Wire values to inputs.
//   * Wire outputs to inputs.

const stepsOutput = SerialTaskTranscoder.decode(steps)

console.log('stepsOutput', stepsOutput)
