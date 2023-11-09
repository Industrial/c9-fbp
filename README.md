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