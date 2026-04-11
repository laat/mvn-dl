import { test, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import nock from 'nock';
import url from '../lib/artifact-url.js';

before(() => {
  nock.disableNetConnect();
});

after(() => {
  nock.enableNetConnect();
  nock.cleanAll();
});

beforeEach(() => {
  nock.cleanAll();
});

test('regular artifact: should contain a path to the artifact', async () => {
  const artifact = {
    groupId: 'org.apache.commons',
    artifactId: 'commons-lang3',
    version: '3.4',
  };
  const result = await url(artifact, '.');
  assert.match(
    result,
    /org\/apache\/commons\/commons-lang3\/3\.4\/commons-lang3-3\.4\.jar/
  );
});

test('regular artifact: should contain the default base url', async () => {
  const artifact = {
    groupId: 'org.apache.commons',
    artifactId: 'commons-lang3',
    version: '3.4',
  };
  const result = await url(artifact);
  assert.ok(result.includes('https://repo1.maven.org/maven2/'));
});

test('regular artifact: can contain a base url other than the default', async () => {
  const artifact = {
    groupId: 'org.apache.commons',
    artifactId: 'commons-lang3',
    version: '3.4',
  };
  const result = await url(artifact, 'http://localhost/');
  assert.ok(result.includes('http://localhost/'));
});

test('artifact with classifier: should contain a path to the artifact', async () => {
  const artifact = {
    groupId: 'io.joynr.java.android',
    artifactId: 'joynr-android',
    version: '0.19.5',
    classifier: 'all',
  };
  const result = await url(artifact, '.');
  assert.ok(
    result.includes(
      'io/joynr/java/android/joynr-android/0.19.5/joynr-android-0.19.5-all.jar'
    )
  );
});

test('artifact with packaging: should contain a path to the artifact', async () => {
  const artifact = {
    groupId: 'org.apache.commons',
    artifactId: 'commons-lang3',
    version: '3.4',
    extension: 'pom',
  };
  const result = await url(artifact, '.');
  assert.ok(
    result.includes(
      'org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.pom'
    )
  );
});

const metadataXml =
  '<metadata><groupId>org.apache.commons</groupId><artifactId>commons-lang3</artifactId><version>3.4-SNAPSHOT</version><versioning><snapshot><timestamp>1</timestamp><buildNumber>23</buildNumber></snapshot><lastUpdated>20120607154257</lastUpdated><snapshotVersions><snapshotVersion><extension>jar</extension><value>1.0-20120607.154257-1339076577</value><updated>20120607154257</updated></snapshotVersion></snapshotVersions></versioning></metadata>';

test('snapshot artifact: should contain a path to the artifact', async () => {
  const artifact = {
    groupId: 'org.apache.commons',
    artifactId: 'commons-lang3',
    version: '3.4',
    isSnapShot: true,
  };

  nock('https://repo1.maven.org/maven2/')
    .get('/org/apache/commons/commons-lang3/3.4-SNAPSHOT/maven-metadata.xml')
    .reply(200, metadataXml);

  const result = await url(artifact);
  assert.ok(
    result.includes(
      'org/apache/commons/commons-lang3/3.4-SNAPSHOT/commons-lang3-3.4-1-23.jar'
    )
  );
});

test('snapshot artifact from private registry: should forward fetchOptions.headers', async () => {
  const artifact = {
    groupId: 'org.apache.commons',
    artifactId: 'commons-lang3',
    version: '3.4',
    isSnapShot: true,
  };

  nock('https://private.example.com/maven2/', {
    reqheaders: { authorization: 'Bearer secret-token' },
  })
    .get('/org/apache/commons/commons-lang3/3.4-SNAPSHOT/maven-metadata.xml')
    .reply(200, metadataXml);

  const result = await url(artifact, 'https://private.example.com/maven2/', {
    headers: { Authorization: 'Bearer secret-token' },
  });
  assert.ok(
    result.includes(
      'org/apache/commons/commons-lang3/3.4-SNAPSHOT/commons-lang3-3.4-1-23.jar'
    )
  );
});

test('artifact with snapShotVersion defined in the Artifact object', async () => {
  const artifact = {
    groupId: 'org.apache.commons',
    artifactId: 'commons-lang3',
    version: '3.4',
    isSnapShot: true,
    snapShotVersion: '1.2.3.4',
  };

  nock('https://repo1.maven.org/maven2/')
    .get('/org/apache/commons/commons-lang3/3.4-SNAPSHOT/maven-metadata.xml')
    .reply(200, metadataXml);

  const result = await url(artifact);
  assert.ok(
    result.includes(
      'org/apache/commons/commons-lang3/3.4-SNAPSHOT/commons-lang3-3.4-1.2.3.4.jar'
    )
  );
});
