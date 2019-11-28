#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset
# set -o xtrace

git clean -xfd

yarn
yarn lerna bootstrap
yarn lerna run build
yarn test
yarn lerna publish
