# mvn-artifact-url
[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]

[travis-image]: https://img.shields.io/travis/laat/mvn-dl.svg?style=flat&branch=master
[travis-url]: https://travis-ci.org/laat/mvn-dl
[npm-image]: https://img.shields.io/npm/v/mvn-artifact-url.svg?style=flat
[npm-url]: https://npmjs.org/package/mvn-artifact-url

## Install

```
$ npm install --save mvn-artifact-url
```

## Usage

```javascript
import url from 'mvn-artifact-url';

let artifact = {
  groupId: 'org.apache.commons',
  artifactId: 'commons-lang3',
  version: '3.4',
};

url(artifact).then(resolved => {
  resolved;
  //=> 'https://repo1.maven.org/maven2/org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.jar'
});

url(artifact, 'http://localhost/').then(resolved => {
  resolved;
  //=> 'http://localhost/org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.jar'
});

// SNAPSHOT releases gets resolved.
url({
  groupId: 'org.apache.commons',
  artifactId: 'commons-lang3',
  version: '3.4',
  isSnapShot: true,
}).then(resolved => {
  resolved;
  //=> 'https://repo1.maven.org/maven2/org/apache/commons/commons-lang3/3.4-SNAPSHOT/commons-lang3-3.4-1-23.jar'
});
```

## License

MIT © [Sigurd Fosseng](http://github.com/laat)
