# mvn-artifact-filename
[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![js-standard-style][standard-style-image]][standard-style-url]

[travis-image]: https://img.shields.io/travis/laat/mvn-dl.svg?style=flat
[travis-url]: https://travis-ci.org/laat/mvn-dl
[npm-image]: https://img.shields.io/npm/v/mvn-artifact-filename.svg?style=flat
[npm-url]: https://npmjs.org/package/mvn-artifact-filename
[standard-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-style-url]: https://github.com/feross/standard

## Install

```
$ npm install --save mvn-artifact-filename
```

## Usage

```js
var createFilename = require('mvn-artifact-filename').default;

var artifact = {
  groupId: 'org.apache.commons',
  artifactId: 'commons-lang3',
  version: '3.4'
}
createFilename(artifact)
\\ commons-lang3-3.4.jar

artifact = {
  groupId: 'org.apache.commons',
  artifactId: 'commons-lang3',
  extension: 'war',
  version: '3.4'
}
createFilename(artifact)
\\ commons-lang3-3.4.war

var artifact = {
  groupId: 'org.apache.commons',
  artifactId: 'commons-lang3',
  extension: 'war',
  classifier: 'test',
  version: '3.4'
}
createFilename(artifact)
\\ commons-lang3-test-3.4.war
```

## Contributing

### Build

```js
npm run build
```

### Test

```js
npm test
```

### Watch

To watch for changes, build them and run the tests:

```js
npm run watch
```

## License

MIT © [Sigurd Fosseng](http://github.com/laat)
