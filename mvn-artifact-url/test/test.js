/* eslint-env mocha */
import { expect } from 'chai'
import url from '../'

describe('mvn-artifact-url', function () {

  describe('of a regular artifact', function () {

    let artifact = {
      groupId: 'org.apache.commons',
      artifactId: 'commons-lang3',
      version: '3.4'
    }

    it('should contain a path to the artifact', function () {
      expect(url(artifact, '.')).to.contain('org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.jar')
    })

    it('should contain the default base url', function () {
      expect(url(artifact)).to.contain('https://repo1.maven.org/maven2/')
    })

    it('can contain a base url other than the default', function () {
      expect(url(artifact, 'http://localhost/')).to.contain('http://localhost/')
    })
  })

  describe('of an artifact with a classifier specified', function () {

    let artifact = {
      groupId: 'io.joynr.java.android',
      artifactId: 'joynr-android',
      version: '0.19.5',
      classifier: 'all'
    }

    it('should contain a path to the artifact', function () {
      expect(url(artifact, '.')).to.contain('io/joynr/java/android/joynr-android/0.19.5/joynr-android-0.19.5-all.jar')
    })
  })

  describe('of an artifact with packaging specified', function () {

    let artifact = {
      groupId: 'org.apache.commons',
      artifactId: 'commons-lang3',
      version: '3.4',
      extension: 'pom'
    }

    it('should contain a path to the artifact', function () {
      expect(url(artifact, '.')).to.contain('org/apache/commons/commons-lang3/3.4/commons-lang3-3.4.pom')
    })
  })
})
