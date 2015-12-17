/* eslint-env mocha */

import { expect } from 'chai'
import parse from '../'

describe('artifact-name-parser', function () {
  it('should parse artifact', function () {
    var artifact = parse('org.apache.commons:commons-lang3:3.4')
    expect(artifact.groupId).to.equal('org.apache.commons')
    expect(artifact.artifactId).to.equal('commons-lang3')
    expect(artifact.version).to.equal('3.4')
  })
  it('should parse artifact with extension', function () {
    var artifact = parse('org.apache.commons:commons-lang3:war:3.4')
    expect(artifact.groupId).to.equal('org.apache.commons')
    expect(artifact.artifactId).to.equal('commons-lang3')
    expect(artifact.version).to.equal('3.4')
    expect(artifact.extension).to.equal('war')
  })
})
