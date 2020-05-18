# mvn-artifact-filename

[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]

[travis-image]: https://img.shields.io/travis/laat/mvn-dl.svg?style=flat&branch=master
[travis-url]: https://travis-ci.org/laat/mvn-dl
[npm-image]: https://img.shields.io/npm/v/mvn-artifact-filename.svg?style=flat
[npm-url]: https://npmjs.org/package/mvn-artifact-filename

## Install

```
$ npm install --save mvn-artifact-filename
```

## Usage

```javascript
import createFilename from 'mvn-artifact-filename';

let artifact;

artifact = {
  groupId: 'org.apache.commons',
  artifactId: 'commons-lang3',
  version: '3.4',
};
createFilename(artifact);
//=> "commons-lang3-3.4.jar"

artifact = {
  groupId: 'org.apache.commons',
  artifactId: 'commons-lang3',
  extension: 'war',
  version: '3.4',
};
createFilename(artifact);
//=> "commons-lang3-3.4.war"

artifact = {
  groupId: 'org.apache.commons',
  artifactId: 'commons-lang3',
  extension: 'war',
  classifier: 'tests',
  version: '3.4',
};
createFilename(artifact);
//=> "commons-lang3-3.4-tests.war"

artifact = {
  groupId: 'org.apache.commons',
  artifactId: 'commons-lang3',
  version: '3.4',
  isSnapShot: true,
  snapShotVersion: '123',
};
createFilename(artifact);
//=> "commons-lang3-3.4-123.jar"
```

## License

MIT © [Sigurd Fosseng](http://github.com/laat)
