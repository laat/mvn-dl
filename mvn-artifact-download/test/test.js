/* eslint-env mocha */

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import nock from 'nock'
import mockFs from 'mock-fs'
import download from '../'
const expect = chai.expect
chai.use(chaiAsPromised)

const cwd = process.cwd()

describe('mvn-artifact-url', function () {
  it('should download artifact', function (done) {
    nock('https://repo1.maven.org/maven2/')
      .get('/org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.jar')
      .reply(200, 'Success')

    mockFs()
    let dl = download('org.apache.commons:commons-lang3:3.4')

    expect(dl).to.eventually.equal(cwd + '/commons-lang3-3.4.jar').and.notify(done)
  })
  it('should download artifact to destination', function (done) {
    nock('https://repo1.maven.org/maven2/')
      .get('/org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.jar')
      .reply(200, 'Success')

    mockFs({'/foo/bar': {}})
    let dl = download('org.apache.commons:commons-lang3:3.4', '/foo/bar')

    expect(dl).to.eventually.equal('/foo/bar/commons-lang3-3.4.jar').and.notify(done)
  })
  it('should download artifact from custom repository', function (done) {
    nock('http://localhost/')
      .get('/org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.jar')
      .reply(200, 'Success')
    mockFs()

    let dl = download('org.apache.commons:commons-lang3:3.4', null, 'http://localhost/')
    expect(dl).to.eventually.equal(cwd + '/commons-lang3-3.4.jar').and.notify(done)
  })
  it('should error if artifact does not exist', function (done) {
    nock('https://repo1.maven.org/maven2/')
      .get('/org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.jar')
      .reply(404, 'Error')

    mockFs()
    let dl = download('org.apache.commons:commons-lang3:3.4')
    expect(dl).to.eventually.be.rejected.and.notify(done)
  })
})
