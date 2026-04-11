import { test } from 'node:test';
import assert from 'node:assert/strict';
import parse from '../lib/parse.js';

test('should parse artifact', () => {
  const artifact = parse('org.apache.commons:commons-lang3:3.4');
  assert.equal(artifact.groupId, 'org.apache.commons');
  assert.equal(artifact.artifactId, 'commons-lang3');
  assert.equal(artifact.version, '3.4');
});

test('should parse artifact with extension', () => {
  const artifact = parse('org.apache.commons:commons-lang3:war:3.4');
  assert.equal(artifact.groupId, 'org.apache.commons');
  assert.equal(artifact.artifactId, 'commons-lang3');
  assert.equal(artifact.version, '3.4');
  assert.equal(artifact.extension, 'war');
});

test('should parse artifact with SNAPSHOT version', () => {
  const artifact = parse('org.apache.commons:commons-lang3:3.4-SNAPSHOT');
  assert.equal(artifact.groupId, 'org.apache.commons');
  assert.equal(artifact.artifactId, 'commons-lang3');
  assert.equal(artifact.version, '3.4');
  assert.equal(artifact.isSnapShot, true);
});
