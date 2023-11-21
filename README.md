# C9-FBP
This is a runtime for the [FBP Protocol](https://github.com/flowbased/fbp-protocol) on the [Deno](https://deno.land) JavaScript runtime.

Eventually, it will become JS runtime independent so you could run it on [Deno](https://deno.land), [NodeJS](https://nodejs.org/en), [Bun](https://bun.sh) or even [WebAssembly](https://github.com/second-state/wasmedge-quickjs).

## Installation
```bash
git clone git@github.com:Industrial/c9-fbp.git
cd c9-fbp
deno task test
```

### NixOS
For [NixOS](https://nixos.org/), deno can be installed on a project basis by
using the `.envrc` and `flake.nix` file. Run this command to automatically use
the [Nix Flake](https://nixos.wiki/wiki/Flakes) when entering the directory.

## Usage
### Lint
```bash
deno task lint
deno task lint:watch
```

### Test
```bash
deno task test
deno task test:watch
deno task test:coverage
```

### Start
```bash
deno task start
```

### Develop
```bash
deno task dev
```

## Documentation
### Message Streaming Model
#### Graph
A Graph is a Box (visually) that receives Message's. The Graph contains Node's.

#### Message
A Message is a JSON object.

#### Node
A Node is a Box that has a list of Inport's and a list of Outport's. An Inport
is a TransformStream that data is written to from outside of the Node and read
from inside the Node. An Outport is a TransformStream that data is written to
from inside the Node and read from outside the Node. This is a pull-based
system. That means that the logic of the Node runs when one of the Outport's
asks for a Message. For every Message asked for, the logic of the Node may pull
one or multiple Message's from one to many input ports.
To prevent the case where a message is asked from one Outport but the Node
decides that a Message should instead go to another Outport, the Node will logic
will only run when all Outport's are ready to receive a message.

#### GraphNode
A GraphNode is a Node that contains it's own Graph. For a Graph to be usable in
a GraphNode, it needs to contain an Input Node and an Output Node, which wire in
the GraphNode's Inport to the Input Node and the Output Node to the GraphNode's
Outport.

## Functional Model of Streams
Create a function called `waitForAllOutportsReady => Task<void>`. It completes
(asynchronously) when all outport ports are ready to write to.

Create a function called `waitForNextInportMessage => Task<{ portId: string,
data: unknown }>`. It completes when the next message arrives on any inport.

Create a `send` function that takes a `pordId` and `data` argument. It send the
data to the port.

Create a function called `run` that takes a `logic` function. The `logic`
function is the implementation of the component that the nodes is configured to
run. It first calls `waitForAllOutportsReady`. Then, it calls
`waitForNextInportMessage`. Then, it passes the next InportMessage to the logic
function along with the `send` function. The `send` function is composed with
the `run` function so that the process is started again when the message is
sent. It might be more efficient to run the `run` function (as a side effect)
before the send happens so it's listening before the send triggers the ready.