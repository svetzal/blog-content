#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

if [[ ! -f package.json ]]; then
  echo "ERROR: package.json not found at repo root." >&2
  exit 1
fi

if [[ ! -d node_modules ]]; then
  echo "Installing dev dependencies (first run)..." >&2
  npm install
fi

echo "Running markdownlint --fix across repo..." >&2
npm run -s format:md
