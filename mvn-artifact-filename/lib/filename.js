import util from 'util'

export default function filename (artifact) {
  const extension = artifact.extension || 'jar'
  if (artifact.classifier) {
    return util.format('%s-%s-%s.%s',
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
