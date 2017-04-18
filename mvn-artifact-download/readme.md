# mvn-artifact-download
[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]

[travis-image]: https://img.shields.io/travis/laat/mvn-dl.svg?style=flat&branch=master
[travis-url]: https://travis-ci.org/laat/mvn-dl
[npm-image]: https://img.shields.io/npm/v/mvn-artifact-download.svg?style=flat
[npm-url]: https://npmjs.org/package/mvn-artifact-download

## Install

```
$ npm install --save mvn-artifact-download
```

## Usage

```js
var download = require('mvn-artifact-download');
download('org.apache.commons:commons-lang3:3.4')
.then(function (destinationFile){
  // success
  }, function(err){
  // error
})

download('org.apache.commons:commons-lang3:3.4', '/path/to/destination/dir')
.then(function (destinationFile){
  // success
  }, function(err){
  // error
})

download('org.apache.commons:commons-lang3:3.4', null, 'http://alternative.repo')
.then(function (destinationFile){
  // success
  }, function(err){
  // error
})
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

## License

MIT © [Sigurd Fosseng](http://github.com/laat)
