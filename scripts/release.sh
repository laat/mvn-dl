#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset
# set -o xtrace

git clean -xfd

npm ci
npx lerna bootstrap
npm run build
npm test
npx lerna publish
