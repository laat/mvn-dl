import { test } from 'node:test';
import assert from 'node:assert/strict';
import filename from '../lib/filename.js';

test('should download artifact', () => {
  const artifact = {
    groupId: 'org.apache.commons',
    artifactId: 'commons-lang3',
    version: '3.4',
  };
  assert.equal(filename(artifact), 'commons-lang3-3.4.jar');
});

test('should yield the war filename', () => {
  const artifact = {
    groupId: 'org.apache.commons',
    artifactId: 'commons-lang3',
    extension: 'war',
    version: '3.4',
  };
  assert.equal(filename(artifact), 'commons-lang3-3.4.war');
});

test('should yield the filename with a classifier', () => {
  const artifact = {
    groupId: 'org.apache.openejb',
    artifactId: 'openejb-itests-webapp',
    extension: 'jar',
    classifier: 'test',
    version: '3.0-beta-1',
  };
  assert.equal(
    filename(artifact),
    'openejb-itests-webapp-3.0-beta-1-test.jar'
  );
});

test('should yield the filename for the snapshot version', () => {
  const artifact = {
    groupId: 'org.apache.openejb',
    artifactId: 'openejb-itests-webapp',
    version: '3.0',
    isSnapShot: true,
    snapShotVersion: '123',
  };
  assert.equal(filename(artifact), 'openejb-itests-webapp-3.0-123.jar');
});

test('should suffix with SNAPSHOT if snapshot version could not be found', () => {
  const artifact = {
    groupId: 'org.apache.openejb',
    artifactId: 'openejb-itests-webapp',
    version: '3.0',
    isSnapShot: true,
  };
  assert.equal(filename(artifact), 'openejb-itests-webapp-3.0-SNAPSHOT.jar');
});
