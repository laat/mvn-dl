var nock = require('nock');

var metadataXml =
  '<metadata><groupId>org.apache.commons</groupId><artifactId>commons-lang3</artifactId><version>3.4-SNAPSHOT</version><versioning><snapshot><timestamp>1</timestamp><buildNumber>23</buildNumber></snapshot><lastUpdated>20120607154257</lastUpdated><snapshotVersions><snapshotVersion><extension>jar</extension><value>1.0-20120607.154257-1339076577</value><updated>20120607154257</updated></snapshotVersion></snapshotVersions></versioning></metadata>';
nock('https://repo1.maven.org/maven2/')
  .get('/org/apache/commons/commons-lang3/3.4-SNAPSHOT/maven-metadata.xml')
  .reply(200, metadataXml);
