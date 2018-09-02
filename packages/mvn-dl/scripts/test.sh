#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset
# set -o xtrace

node ./lib/cli.js org.apache.commons:commons-lang3:3.4 --filename test-download.jar

if [ -f test-download.jar ];
then
  echo "donload succeded";
  rm test-download.jar
else
  echo "download failed"
  exit 1
fi
