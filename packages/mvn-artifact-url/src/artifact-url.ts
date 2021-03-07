import { Agent } from 'http';
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

export interface FetchOptions {
  /**
   * http.Agent instance, allows custom proxy, certificate etc.
   * @default null
   */
  agent?: Agent | ((parsedUrl: URL) => Agent);
  /**
   * req/res timeout in ms, it resets on redirect. 0 to disable (OS limit applies)
   * @default 0
   */
  timeout?: number;
}

function groupPath(artifact: Artifact): string {
  return [
    artifact.groupId.replace(/\./g, '/'),
    artifact.artifactId,
    artifact.version + (artifact.isSnapShot ? '-SNAPSHOT' : ''),
  ].join('/');
}

function artifactPath(artifact: Artifact): string {
  return groupPath(artifact) + '/' + filename(artifact);
}

async function latestSnapShotVersion(
  artifact: Artifact,
  basepath: string,
  fetchOptions: FetchOptions = {}
) {
  const metadataUrl = basepath + groupPath(artifact) + '/maven-metadata.xml';
  const response = await fetch(metadataUrl, {
    agent: fetchOptions.agent,
    timeout: fetchOptions.timeout,
  });
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
}

export default (async function artifactUrl(
  artifact: Artifact,
  basePath?: string,
  fetchOptions: FetchOptions = {}
) {
  const prefix = basePath || 'https://repo1.maven.org/maven2/';
  if (artifact.isSnapShot) {
    const snapShotVersion = await latestSnapShotVersion(
      artifact,
      prefix,
      fetchOptions
    );
    return prefix + artifactPath({ snapShotVersion, ...artifact });
  } else {
    return prefix + artifactPath(artifact);
  }
});
