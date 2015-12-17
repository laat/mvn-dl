import path from 'path'
import util from 'util'

const filename = function (artifact) {
  const extension = artifact.extension || 'jar'
  if (artifact.classifier) {
    return util.format('%s-%s-%s.%',
      artifact.artifactId,
      artifact.classifier,
      artifact.version,
      extension)
  }
  return util.format('%s-%s.%s',
    artifact.artifactId,
    artifact.version,
    extension)
}

const groupPath = function (artifact) {
  return [artifact.groupId.replace(/\./g, '/'),
    artifact.artifactId,
    artifact.version
  ].join('/')
}

const artifactPath = function (artifact) {
  return path.join(groupPath(artifact), filename(artifact))
}

export default function artifactUrl (artifact, basepath) {
  let prefix = basepath || 'https://repo1.maven.org/maven2/'
  return prefix + artifactPath(artifact)
}
