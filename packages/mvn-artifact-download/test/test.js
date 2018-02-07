/* eslint-env mocha */

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import nock from 'nock';
import mockFs from 'mock-fs';
import download from '../';
const expect = chai.expect;
chai.use(chaiAsPromised);

const cwd = process.cwd();

describe('mvn-artifact-url', function() {
  it('should download artifact', function(done) {
    nock('https://repo1.maven.org/maven2/')
      .get('/org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.jar')
      .reply(200, 'Success');

    mockFs();
    let dl = download('org.apache.commons:commons-lang3:3.4');

    expect(dl)
      .to.eventually.equal(cwd + '/commons-lang3-3.4.jar')
      .and.notify(done);
  });
  it('should download artifact with custom filename', function(done) {
    nock('https://repo1.maven.org/maven2/')
      .get('/org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.jar')
      .reply(200, 'Success');

    const customFilename = 'custom.jar';
    mockFs();

    let dl = download(
      'org.apache.commons:commons-lang3:3.4',
      undefined,
      undefined,
      customFilename
    );

    expect(dl)
      .to.eventually.equal(cwd + '/' + customFilename)
      .and.notify(done);
  });
  it('should download artifact to destination', function(done) {
    nock('https://repo1.maven.org/maven2/')
      .get('/org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.jar')
      .reply(200, 'Success');

    mockFs({ '/foo/bar': {} });
    let dl = download('org.apache.commons:commons-lang3:3.4', '/foo/bar');

    expect(dl)
      .to.eventually.equal('/foo/bar/commons-lang3-3.4.jar')
      .and.notify(done);
  });
  it('should download artifact from custom repository', function(done) {
    nock('http://localhost/')
      .get('/org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.jar')
      .reply(200, 'Success');
    mockFs();

    let dl = download(
      'org.apache.commons:commons-lang3:3.4',
      null,
      'http://localhost/'
    );
    expect(dl)
      .to.eventually.equal(cwd + '/commons-lang3-3.4.jar')
      .and.notify(done);
  });
  it('should error if artifact does not exist', function(done) {
    nock('https://repo1.maven.org/maven2/')
      .get('/org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.jar')
      .reply(404, 'Error');

    mockFs();
    let dl = download('org.apache.commons:commons-lang3:3.4');
    expect(dl).to.eventually.be.rejected.and.notify(done);
  });
  it('should download latest snapshot version of artifact', function(done) {
    let metadataXml =
      '<metadata><groupId>org.apache.commons</groupId><artifactId>commons-lang3</artifactId><version>3.4-SNAPSHOT</version><versioning><snapshot><timestamp>1</timestamp><buildNumber>23</buildNumber></snapshot><lastUpdated>20120607154257</lastUpdated><snapshotVersions><snapshotVersion><extension>jar</extension><value>1.0-20120607.154257-1339076577</value><updated>20120607154257</updated></snapshotVersion></snapshotVersions></versioning></metadata>';
    nock('https://repo1.maven.org/maven2/')
      .get('/org/apache/commons/commons-lang3/3.4-SNAPSHOT/maven-metadata.xml')
      .reply(200, metadataXml);

    nock('https://repo1.maven.org/maven2/')
      .get(
        '/org/apache/commons/commons-lang3/3.4-SNAPSHOT/commons-lang3-3.4-1-23.jar'
      )
      .reply(200, metadataXml);

    mockFs();
    let dl = download('org.apache.commons:commons-lang3:3.4-SNAPSHOT');

    expect(dl)
      .to.eventually.equal(cwd + '/commons-lang3-3.4-SNAPSHOT.jar')
      .and.notify(done);
  });
});
