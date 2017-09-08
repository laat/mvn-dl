# mvn-dl
[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]

[travis-image]: https://img.shields.io/travis/laat/mvn-dl.svg?style=flat&branch=master
[travis-url]: https://travis-ci.org/laat/mvn-dl
[npm-image]: https://img.shields.io/npm/v/mvn-dl.svg?style=flat
[npm-url]: https://npmjs.org/package/mvn-dl


This is a mono-repo for **mvn-dl**

* [mvn-dl](./packages/mvn-dl) cli
* [mvn-artifact-name-parser](./packages/mvn-artifact-name-parser)
* [mvn-artifact-url](./packages/mvn-artifact-url)
* [mvn-artifact-filename](./packages/mvn-artifact-filename)
* [mvn-artifact-download](./packages/mvn-artifact-download)

## Development

This repository uses yarn workspaces
```
yarn config set workspaces-experimental true
```
