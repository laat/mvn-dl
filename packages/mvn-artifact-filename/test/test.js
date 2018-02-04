/* eslint-env mocha */

import { expect } from 'chai';
import filename from '../';

describe('mvn-artifact-url', function() {
  it('should download artifact', function() {
    let artifact = {
      groupId: 'org.apache.commons',
      artifactId: 'commons-lang3',
      version: '3.4',
    };
    expect(filename(artifact)).to.equal('commons-lang3-3.4.jar');
  });
  it('should yield the war filename', function() {
    let artifact = {
      groupId: 'org.apache.commons',
      artifactId: 'commons-lang3',
      extension: 'war',
      version: '3.4',
    };
    expect(filename(artifact)).to.equal('commons-lang3-3.4.war');
  });
  it('should yield the filename with a classifier', function() {
    let artifact = {
      groupId: 'org.apache.openejb',
      artifactId: 'openejb-itests-webapp',
      extension: 'jar',
      classifier: 'test',
      version: '3.0-beta-1',
    };
    expect(filename(artifact)).to.equal(
      'openejb-itests-webapp-3.0-beta-1-test.jar'
    );
  });
  it('should yield the filename for the snapshot version', function() {
    let artifact = {
      groupId: 'org.apache.openejb',
      artifactId: 'openejb-itests-webapp',
      version: '3.0',
      isSnapShot: true,
      snapShotVersion: '123',
    };
    expect(filename(artifact)).to.equal('openejb-itests-webapp-3.0-123.jar');
  });
  it('should suffix with SNAPSHOT if snapshot version could not be found', function() {
    let artifact = {
      groupId: 'org.apache.openejb',
      artifactId: 'openejb-itests-webapp',
      version: '3.0',
      isSnapShot: true,
    };
    expect(filename(artifact)).to.equal(
      'openejb-itests-webapp-3.0-SNAPSHOT.jar'
    );
  });
});
