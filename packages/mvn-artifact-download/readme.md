# mvn-artifact-download

## Install

```
$ npm install --save mvn-artifact-download
```

## Usage

```js
import download from 'mvn-artifact-download';

download('org.apache.commons:commons-lang3:3.4');
// Promise that resolves to destination filename

download({
  groupId: 'org.apache.commons',
  artifactId: 'commons-lang3',
  version: '3.4',
});
// Promise that resolves to destination filename

download('org.apache.commons:commons-lang3:3.4', '/path/to/destination/dir');
// Promise that resolves to destination filename

download(
  'org.apache.commons:commons-lang3:3.4',
  null,
  'http://alternative.repo'
);
// Promise that resolves to destination filename

download(
  'org.apache.commons:commons-lang3:3.4',
  null,
  'http://alternative.repo',
  { timout: 1000 } // with optional timeout
);
// Promise that resolves to destination filename
```

## API

### download(artifactName, [destinationFolder], [repository], [fetchOptions])

Downloads an artifact from the repository

#### artifactName

Type: `string | Artifact`

#### destinationFolder

Type: `string`
Default: `process.cwd()`

#### repository

Type: `string`

#### fetchOptions

An optional object containing

Attribute: **timeout** `number` req/res timeout in ms
Attribute: **agent** `http.Agent` allows custom proxy, certificate etc.

## License

MIT © [Sigurd Fosseng](http://github.com/laat)
