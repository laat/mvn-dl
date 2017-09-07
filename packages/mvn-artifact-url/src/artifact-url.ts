import * as path from 'path';
import * as util from 'util';
import filename from 'mvn-artifact-filename';
import fetch from 'node-fetch';
import parseXmlString from './parseXmlString';

export interface Artifact {
  groupId: string;
  artifactId: string;
  version: string;
  extension?: string;
  classifier?: string;
  isSnapShot?: boolean;
  snapShotVersion?: string;
}

const groupPath = (artifact: Artifact): string =>
  [
    artifact.groupId.replace(/\./g, '/'),
    artifact.artifactId,
    artifact.version + (artifact.isSnapShot ? '-SNAPSHOT' : ''),
  ].join('/');

const artifactPath = (artifact: Artifact): string =>
  path.join(groupPath(artifact), filename(artifact));

const latestSnapShotVersion = async (artifact: Artifact, basepath: string) => {
  const metadataUrl = basepath + groupPath(artifact) + '/maven-metadata.xml';
  const response = await fetch(metadataUrl);
  if (response.status !== 200) {
    throw new Error(
      `Unable to fetch ${metadataUrl}. Status ${response.status}`
    );
  }
  const body = await response.text();
  const xml: any = await parseXmlString(body);
  const snapshot = xml.metadata.versioning[0].snapshot[0];
  const version = snapshot.timestamp[0] + '-' + snapshot.buildNumber[0];
  return version;
};

export default async (artifact: Artifact, basepath: string) => {
  const prefix = basepath || 'https://repo1.maven.org/maven2/';
  if (artifact.isSnapShot) {
    const snapShotVersion = await latestSnapShotVersion(artifact, prefix);
    return prefix + artifactPath({ ...artifact, snapShotVersion });
  } else {
    return prefix + artifactPath(artifact);
  }
};
