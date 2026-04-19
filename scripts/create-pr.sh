#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

GH_BIN="${GH_BIN:-$REPO_ROOT/.tools/gh/bin/gh}"
BASE_BRANCH="${BASE_BRANCH:-main}"
CURRENT_BRANCH="$(git branch --show-current)"

if [[ ! -x "$GH_BIN" ]]; then
  echo "gh not found: $GH_BIN"
  echo "Install local gh under .tools/gh or set GH_BIN to your gh path."
  exit 1
fi

if [[ -z "$CURRENT_BRANCH" ]]; then
  echo "Could not detect current git branch."
  exit 1
fi

if [[ "$CURRENT_BRANCH" == "main" ]]; then
  echo "Refusing to create PR from main. Create and switch to a work branch first."
  exit 1
fi

if ! "$GH_BIN" auth status >/dev/null 2>&1; then
  echo "GitHub CLI is not authenticated."
  echo "Run: $GH_BIN auth login"
  exit 1
fi

if ! git rev-parse --abbrev-ref "@{upstream}" >/dev/null 2>&1; then
  git push -u origin "$CURRENT_BRANCH"
fi

if "$GH_BIN" pr view --json number >/dev/null 2>&1; then
  echo "PR already exists for branch: $CURRENT_BRANCH"
  "$GH_BIN" pr view --web
  exit 0
fi

"$GH_BIN" pr create --base "$BASE_BRANCH" --head "$CURRENT_BRANCH" --fill
