import * as util from 'util';

export interface Artifact {
  groupId: string;
  artifactId: string;
  version: string;
  extension?: string;
  classifier?: string;
  isSnapShot?: boolean;
  snapShotVersion?: string;
}

function getVersion(artifact: Artifact): string {
  const version = artifact.version;
  const suffix = artifact.isSnapShot ? `-${artifact.snapShotVersion}` : '';
  return `${version}${suffix}`;
}

export default function filename(artifact: Artifact) {
  const extension = artifact.extension || 'jar';
  let version = getVersion(artifact);

  if (artifact.classifier) {
    return util.format(
      '%s-%s-%s.%s',
      artifact.artifactId,
      version,
      artifact.classifier,
      extension
    );
  }
  return util.format('%s-%s.%s', artifact.artifactId, version, extension);
}
