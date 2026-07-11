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
  { signal: AbortSignal.timeout(1000) } // with optional timeout
);
// Promise that resolves to destination filename

download('org.apache.commons:commons-lang3:3.4', null, 'http://private.repo', {
  headers: { Authorization: 'Bearer my-token' }, // for private registries
});
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

Type: [`RequestInit`](https://developer.mozilla.org/en-US/docs/Web/API/RequestInit)

Optional options passed to the built-in `fetch`, for example

Attribute: **headers** `HeadersInit` request headers, e.g. `{ Authorization: 'Bearer ...' }` for private registries
Attribute: **signal** `AbortSignal` cancellation/timeout, e.g. `AbortSignal.timeout(1000)`

## License

MIT © [Sigurd Fosseng](http://github.com/laat)
