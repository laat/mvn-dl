# mvn-artifact-name-parser

Parses maven coordinate strings of the following format

```
groupId:artifactId:version
groupId:artifactId:extension:version
groupId:artifactId:extension:classifier:version
```

## Install

```
$ npm install --save mvn-artifact-name-parser
```

## Usage

```javascript
import parse from 'mvn-artifact-name-parser';

parse('org.apache.commons:commons-lang3:3.4');
/*=>
{
  groupId: 'org.apache.commons',
  artifactId: 'commons-lang3',
  version: '3.4'
}
*/

parse('org.apache.commons:commons-lang3:jar:3.4');
/*=>
{
  groupId: 'org.apache.commons',
  artifactId: 'commons-lang3',
  extension: 'jar',
  version: '3.4'
}
*/

parse('org.apache.commons:commons-lang3:jar:3.4-SNAPSHOT');
/*=>
{
  groupId: 'org.apache.commons',
  artifactId: 'commons-lang3',
  extension: 'jar',
  version: '3.4',
  isSnapShot: true
}
*/
```

## License

MIT © [Sigurd Fosseng](http://github.com/laat)
