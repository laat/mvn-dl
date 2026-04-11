import { test, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import nock from 'nock';
import download from '../lib/artifact-download.js';

let tmpDir;

before(() => {
  nock.disableNetConnect();
});

after(() => {
  nock.enableNetConnect();
  nock.cleanAll();
});

beforeEach(() => {
  nock.cleanAll();
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mvn-dl-test-'));
});

test('should download artifact', async () => {
  nock('https://repo1.maven.org/maven2/')
    .get('/org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.jar')
    .reply(200, 'Success');

  const result = await download(
    'org.apache.commons:commons-lang3:3.4',
    tmpDir
  );
  assert.equal(result, path.join(tmpDir, 'commons-lang3-3.4.jar'));
  assert.equal(fs.readFileSync(result, 'utf8'), 'Success');
});

test('should download artifact defined as object', async () => {
  nock('https://repo1.maven.org/maven2/')
    .get('/org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.jar')
    .reply(200, 'Success');

  const result = await download(
    {
      groupId: 'org.apache.commons',
      artifactId: 'commons-lang3',
      version: '3.4',
    },
    tmpDir
  );
  assert.equal(result, path.join(tmpDir, 'commons-lang3-3.4.jar'));
});

test('should download artifact with custom filename', async () => {
  nock('https://repo1.maven.org/maven2/')
    .get('/org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.jar')
    .reply(200, 'Success');

  const customFilename = 'custom.jar';
  const result = await download(
    'org.apache.commons:commons-lang3:3.4',
    tmpDir,
    undefined,
    customFilename
  );
  assert.equal(result, path.join(tmpDir, customFilename));
});

test('should download artifact to destination', async () => {
  nock('https://repo1.maven.org/maven2/')
    .get('/org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.jar')
    .reply(200, 'Success');

  const result = await download(
    'org.apache.commons:commons-lang3:3.4',
    tmpDir
  );
  assert.equal(result, path.join(tmpDir, 'commons-lang3-3.4.jar'));
});

test('should download artifact from custom repository', async () => {
  nock('http://localhost/')
    .get('/org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.jar')
    .reply(200, 'Success');

  const result = await download(
    'org.apache.commons:commons-lang3:3.4',
    tmpDir,
    'http://localhost/'
  );
  assert.equal(result, path.join(tmpDir, 'commons-lang3-3.4.jar'));
});

test('should error if artifact does not exist', async () => {
  nock('https://repo1.maven.org/maven2/')
    .get('/org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.jar')
    .reply(404, 'Error');

  await assert.rejects(
    download('org.apache.commons:commons-lang3:3.4', tmpDir)
  );
});

test('should download latest snapshot version of artifact', async () => {
  const metadataXml =
    '<metadata><groupId>org.apache.commons</groupId><artifactId>commons-lang3</artifactId><version>3.4-SNAPSHOT</version><versioning><snapshot><timestamp>1</timestamp><buildNumber>23</buildNumber></snapshot><lastUpdated>20120607154257</lastUpdated><snapshotVersions><snapshotVersion><extension>jar</extension><value>1.0-20120607.154257-1339076577</value><updated>20120607154257</updated></snapshotVersion></snapshotVersions></versioning></metadata>';
  nock('https://repo1.maven.org/maven2/')
    .get('/org/apache/commons/commons-lang3/3.4-SNAPSHOT/maven-metadata.xml')
    .reply(200, metadataXml);

  nock('https://repo1.maven.org/maven2/')
    .get(
      '/org/apache/commons/commons-lang3/3.4-SNAPSHOT/commons-lang3-3.4-1-23.jar'
    )
    .reply(200, metadataXml);

  const result = await download(
    'org.apache.commons:commons-lang3:3.4-SNAPSHOT',
    tmpDir
  );
  assert.equal(result, path.join(tmpDir, 'commons-lang3-3.4-SNAPSHOT.jar'));
});
