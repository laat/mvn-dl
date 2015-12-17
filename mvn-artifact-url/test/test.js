/* eslint-env mocha */

import { expect } from 'chai'
import url from '../'

let artifact = {
  groupId: 'org.apache.commons',
  artifactId: 'commons-lang3',
  version: '3.4'
}

describe('mvn-artifact-url', function () {
  it('should contain artifact path', function () {
    expect(url(artifact, '.')).to.have.string('org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.jar')
  })
  it('should contain default url', function () {
    expect(url(artifact)).to.have.string('https://repo1.maven.org/maven2/')
  })
  it('should use another basepath than default', function () {
    expect(url(artifact, 'http://localhost/')).to.have.string('http://localhost/')
  })
})
