import fs from 'node:fs';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';
import getFilename from 'mvn-artifact-filename';
import parseName from 'mvn-artifact-name-parser';
import artifactUrl from 'mvn-artifact-url';

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
   * request headers, e.g. `{ Authorization: "Bearer ..." }` for private registries
   */
  headers?: HeadersInit;
}

export default async function download(
  artifact: Artifact | string,
  destination?: string | null,
  repository?: string | null,
  filename?: string | null,
  fetchOptions: FetchOptions = {}
) {
  destination = destination || process.cwd();
  const artifactShape =
    typeof artifact === 'string' ? parseName(artifact) : artifact;

  const url = await artifactUrl(
    artifactShape,
    repository ?? undefined,
    fetchOptions
  );

  const destFile = path.join(
    destination,
    filename || getFilename(artifactShape)
  );
  const response = await fetch(url, fetchOptions);
  if (response.status !== 200) {
    throw new Error(`Unable to fetch ${url}. Status ${response.status}`);
  }
  if (!response.body) {
    throw new Error(`Empty response body for ${url}`);
  }
  await pipeline(
    Readable.fromWeb(response.body as any),
    fs.createWriteStream(destFile)
  );
  return destFile;
}
