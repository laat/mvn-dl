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
import download from 'mvn-artifact-download';

download('org.apache.commons:commons-lang3:3.4')
// Promise that resolves to destination filename

download('org.apache.commons:commons-lang3:3.4', '/path/to/destination/dir')
// Promise that resolves to destination filename

download('org.apache.commons:commons-lang3:3.4', null, 'http://alternative.repo')
// Promise that resolves to destination filename
```

## API

### download(artifactName, [destinationFolder], [repository])

Downloads an artifact from the repository

#### artifactName

Type: `string`

#### destinationFolder

Type: `string`
Default: `process.cwd()`

#### repository

Type: `string`

## License

MIT © [Sigurd Fosseng](http://github.com/laat)
