{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs";
  inputs.flake-utils.url = "github:numtide/flake-utils";
  inputs.purescript-overlay.url = "github:thomashoneyman/purescript-overlay";
  inputs.purescript-overlay.inputs.nixpkgs.follows = "nixpkgs";
  outputs = {
    self,
    nixpkgs,
    flake-utils,
    purescript-overlay,
  } @ inputs: let
    inherit (nixpkgs) lib;
    inherit (lib) recursiveUpdate;
    inherit (flake-utils.lib) eachDefaultSystem defaultSystems;
    overlays = [purescript-overlay.overlays.default];
    nixpkgsFor = lib.genAttrs defaultSystems (system:
      import nixpkgs {
        inherit system;
        inherit overlays;
        config = {
          allowUnfree = true;
        };
      });
  in (eachDefaultSystem (
    system: let
      pkgs = nixpkgsFor.${system};
    in {
      devShells.default = pkgs.mkShell {
        nativeBuildInputs = with pkgs; [
          bashInteractive
        ];
        buildInputs = with pkgs; [
          # File Watch (Deno Watch isn't sufficient, use inotifywatch)
          inotify-tools

          # Deno
          deno

          # FBP Protocol
          jekyll
          lcov

          # PureScript
          purs
          spago-unstable
          purs-tidy-bin.purs-tidy-0_10_0
          purs-backend-es
          esbuild
          # haskellPackages.stack
        ];
      };
    }
  ));
}
