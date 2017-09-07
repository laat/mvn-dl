/* eslint-env mocha */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import nock from 'nock';
import url from '../';
const expect = chai.expect;
chai.use(chaiAsPromised);

describe('mvn-artifact-url', function() {
  describe('of a regular artifact', function() {
    let artifact = {
      groupId: 'org.apache.commons',
      artifactId: 'commons-lang3',
      version: '3.4',
    };

    it('should contain a path to the artifact', function(done) {
      let urlPromise = url(artifact, '.');
      expect(urlPromise)
        .to.eventually.contain(
          'org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.jar'
        )
        .and.notify(done);
    });

    it('should contain the default base url', function(done) {
      let urlPromise = url(artifact);
      expect(urlPromise)
        .to.eventually.contain('https://repo1.maven.org/maven2/')
        .and.notify(done);
    });

    it('can contain a base url other than the default', function(done) {
      let urlPromise = url(artifact, 'http://localhost/');
      expect(urlPromise)
        .to.eventually.contain('http://localhost/')
        .and.notify(done);
    });
  });

  describe('of an artifact with a classifier specified', function() {
    let artifact = {
      groupId: 'io.joynr.java.android',
      artifactId: 'joynr-android',
      version: '0.19.5',
      classifier: 'all',
    };

    it('should contain a path to the artifact', function(done) {
      let urlPromise = url(artifact, '.');
      expect(urlPromise)
        .to.eventually.contain(
          'io/joynr/java/android/joynr-android/0.19.5/joynr-android-0.19.5-all.jar'
        )
        .and.notify(done);
    });
  });

  describe('of an artifact with packaging specified', function() {
    let artifact = {
      groupId: 'org.apache.commons',
      artifactId: 'commons-lang3',
      version: '3.4',
      extension: 'pom',
    };

    it('should contain a path to the artifact', function(done) {
      let urlPromise = url(artifact, '.');
      expect(urlPromise)
        .to.eventually.contain(
          'org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.pom'
        )
        .and.notify(done);
    });
  });

  describe('of an artifact with snapshot version', function() {
    let artifact = {
      groupId: 'org.apache.commons',
      artifactId: 'commons-lang3',
      version: '3.4',
      isSnapShot: true,
    };

    let metadataXml =
      '<metadata><groupId>org.apache.commons</groupId><artifactId>commons-lang3</artifactId><version>3.4-SNAPSHOT</version><versioning><snapshot><timestamp>1</timestamp><buildNumber>23</buildNumber></snapshot><lastUpdated>20120607154257</lastUpdated><snapshotVersions><snapshotVersion><extension>jar</extension><value>1.0-20120607.154257-1339076577</value><updated>20120607154257</updated></snapshotVersion></snapshotVersions></versioning></metadata>';
    it('should contain a path to the artifact', function(done) {
      nock('https://repo1.maven.org/maven2/')
        .get(
          '/org/apache/commons/commons-lang3/3.4-SNAPSHOT/maven-metadata.xml'
        )
        .reply(200, metadataXml);

      let urlPromise = url(artifact);
      expect(urlPromise)
        .to.eventually.contain(
          'org/apache/commons/commons-lang3/3.4-SNAPSHOT/commons-lang3-3.4-1-23.jar'
        )
        .and.notify(done);
    });
  });
});
