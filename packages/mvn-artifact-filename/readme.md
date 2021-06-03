# mvn-artifact-filename

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
