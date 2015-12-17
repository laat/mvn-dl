export default function parseArtifact (name) {
  const parts = name.split(':')
  if (parts.length >= 3) {
    const artifact = {
      groupId: parts[0],
      artifactId: parts[1],
      version: parts[parts.length - 1]
    }
    if (parts.length > 3) {
      artifact.extension = parts[2]
    }
    if (parts.length > 4) {
      artifact.classifier = parts[3]
    }
    return artifact
  }
  throw new Error('not a maven package name. try <group>:<artifact>:<version>')
}
