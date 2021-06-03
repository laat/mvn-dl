# mvn-dl

[![npm][npm-image]][npm-url]

[travis-image]: https://img.shields.io/travis/laat/mvn-dl.svg?style=flat&branch=master
[travis-url]: https://travis-ci.org/laat/mvn-dl
[npm-image]: https://img.shields.io/npm/v/mvn-dl.svg?style=flat
[npm-url]: https://npmjs.org/package/mvn-dl

## Install

```
$ npm install --save -g mvn-dl
```

## Usage

```js
Usage:
 mvn-dl <artifact> [options]

Options:
 -d --destination <destination>  Destination folder
 -f --filename <filename>        Output filename
 -r --repository <url>           Url to the maven repo

Examples:
 # download jar
 mvn-dl org.apache.commons:commons-lang3:3.4
 # download jar to dist
 mvn-dl org.apache.commons:commons-lang3:3.4 -d dist
```

## License

MIT © [Sigurd Fosseng](http://github.com/laat)
