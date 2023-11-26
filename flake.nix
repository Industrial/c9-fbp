{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs";
  inputs.flake-utils.url = "github:numtide/flake-utils";
  inputs.flake-compat.url = "github:edolstra/flake-compat";
  inputs.flake-compat.flake = false;
  outputs = {
    self,
    nixpkgs,
    flake-utils,
    flake-compat,
  } @ inputs: let
    inherit (nixpkgs) lib;
    inherit (lib) recursiveUpdate;
    inherit (flake-utils.lib) eachDefaultSystem defaultSystems;
    nixpkgsFor = lib.genAttrs defaultSystems (system:
      import nixpkgs {
        config = {
          allowUnfree = true;
        };
        inherit system;
      });
  in (eachDefaultSystem (
    system: let
      pkgs = nixpkgsFor.${system};

      # spagoPkgs = import (builtins.fetchGit {
      #   name = "spago-0.20.7";
      #   url = "https://github.com/NixOS/nixpkgs/";
      #   ref = "refs/heads/nixpkgs-unstable";
      #   rev = "d1c3fea7ecbed758168787fe4e4a3157e52bc808";
      # }) {};

      # spagoOld = spagoPkgs.haskellPackages.spago;
    in {
      devShell = pkgs.mkShell {
        nativeBuildInputs = with pkgs; [
          bashInteractive
        ];
        buildInputs = with pkgs; [
          # # Node
          # nodejs_20
          # nodejs_20.pkgs.eslint
          # nodejs_20.pkgs.pnpm
          # nodejs_20.pkgs.typescript

          # Deno
          deno

          # # fbp-protocol
          jekyll
          lcov

          # PureScript
          git
          purescript
          # spagoOld
          haskellPackages.stack
          esbuild
          # openssl
        ];
      };
    }
  ));
}
