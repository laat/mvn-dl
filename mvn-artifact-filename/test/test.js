/* eslint-env mocha */

import { expect } from 'chai'
import filename from '../'

describe('mvn-artifact-url', function () {
  it('should download artifact', function () {
    let artifact = {
      groupId: 'org.apache.commons',
      artifactId: 'commons-lang3',
      version: '3.4'
    }
    expect(filename(artifact)).to.equal('commons-lang3-3.4.jar')
  })
  it('should give war filename', function () {
    let artifact = {
      groupId: 'org.apache.commons',
      artifactId: 'commons-lang3',
      extension: 'war',
      version: '3.4'
    }
    expect(filename(artifact)).to.equal('commons-lang3-3.4.war')
  })
  it('should give war filename with classifier', function () {
    let artifact = {
      groupId: 'org.apache.commons',
      artifactId: 'commons-lang3',
      extension: 'war',
      classifier: 'test',
      version: '3.4'
    }
    expect(filename(artifact)).to.equal('commons-lang3-test-3.4.war')
  })
})
