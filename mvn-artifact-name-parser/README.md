# mvn-artifact-name-parser
[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![js-standard-style][standard-style-image]][standard-style-url]

[travis-image]: https://img.shields.io/travis/laat/mvn-dl.svg?style=flat
[travis-url]: https://travis-ci.org/laat/mvn-dl
[npm-image]: https://img.shields.io/npm/v/mvn-artifact-name-parser.svg?style=flat
[npm-url]: https://npmjs.org/package/mvn-artifact-name-parser
[standard-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-style-url]: https://github.com/feross/standard

## Install

```
$ npm install --save mvn-artifact-name-parser
```

## Usage

```js
var parse = require('mvn-artifact-name-parser');

parse('org.apache.commons:commons-lang3:3.4')
//{
// groupId: 'org.apache.commons',
// artifactId: 'commons-lang3',
// version: '3.4'
//}

parse('org.apache.commons:commons-lang3:jar:3.4')
//{
// groupId: 'org.apache.commons',
// artifactId: 'commons-lang3',
// extension: 'jar',
// version: '3.4'
//}
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
