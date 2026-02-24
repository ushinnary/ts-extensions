{ pkgs ? import (builtins.fetchTarball "https://github.com/NixOS/nixpkgs/archive/nixos-25.11.tar.gz") {} }:

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
