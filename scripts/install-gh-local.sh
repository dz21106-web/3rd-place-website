#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

mkdir -p .tools/downloads
curl -fsSL https://api.github.com/repos/cli/cli/releases/latest -o .tools/downloads/gh_latest.json

VERSION="$(sed -n 's/.*"tag_name": "v\{0,1\}\([0-9.]*\)".*/\1/p' .tools/downloads/gh_latest.json | head -n1)"
if [[ -z "$VERSION" ]]; then
  echo "Failed to detect latest gh version."
  exit 1
fi

TARBALL="gh_${VERSION}_linux_amd64.tar.gz"
URL="https://github.com/cli/cli/releases/download/v${VERSION}/${TARBALL}"
curl -fL "$URL" -o ".tools/downloads/${TARBALL}"

rm -rf .tools/gh
mkdir -p .tools/gh
tar -xzf ".tools/downloads/${TARBALL}" -C .tools/gh --strip-components=1

echo "Installed: .tools/gh/bin/gh"
.tools/gh/bin/gh --version
