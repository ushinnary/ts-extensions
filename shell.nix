{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs_24
  ];

  shellHook = ''
    echo "Node.js environment loaded"
    echo "Node version: $(node --version)"
    echo "NPM version: $(npm --version)"
  '';
}
