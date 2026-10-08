import filename from 'mvn-artifact-filename';
import parseXmlString from './parseXmlString.js';

export interface Artifact {
  groupId: string;
  artifactId: string;
  version: string;
  extension?: string;
  classifier?: string;
  isSnapShot?: boolean;
  snapShotVersion?: string;
}

export interface FetchOptions extends RequestInit {
  /**
   * request headers, e.g. `{ Authorization: "Bearer ..." }` for private registries
   */
  headers?: HeadersInit;
}

function isPrivateOrLoopbackHost(hostname: string): boolean {
  const ipv4 = hostname.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4) {
    const [a, b] = ipv4.slice(1, 3).map(Number);
    if (a === 0 || a === 10 || a === 127) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
  }
  return hostname === 'localhost' || hostname === '::1';
}

function assertAllowedBasePath(basePath: string): void {
  const { hostname, protocol } = new URL(basePath);
  if (protocol !== 'http:' && protocol !== 'https:') {
    throw new Error(`Unsupported protocol for repository url: ${protocol}`);
  }
  if (isPrivateOrLoopbackHost(hostname)) {
    throw new Error(
      `Refusing to fetch artifact from internal/private host: ${hostname}`
    );
  }
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
  const response = await fetch(metadataUrl, fetchOptions);
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

export default async function artifactUrl(
  artifact: Artifact,
  basePath?: string,
  fetchOptions: FetchOptions = {}
) {
  const prefix = basePath || 'https://repo1.maven.org/maven2/';
  assertAllowedBasePath(prefix);
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
}
