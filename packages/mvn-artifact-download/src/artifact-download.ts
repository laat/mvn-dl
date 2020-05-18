import fs from 'fs';
import { Agent } from 'http';
import getFilename from 'mvn-artifact-filename';
import parseName from 'mvn-artifact-name-parser';
import artifactUrl from 'mvn-artifact-url';
import fetch from 'node-fetch';
import path from 'path';

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

function pipeToFile(body: NodeJS.ReadableStream, destFile: string) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destFile);
    file.on('finish', () => {
      file.close();
      resolve(destFile);
    });
    file.on('error', (err) => {
      fs.unlink(destFile, function ignore() {});
      reject(err);
    });
    body.pipe(file);
  });
}

export default (async function download(
  artifactName: string,
  destination?: string,
  repository?: string,
  filename?: string,
  fetchOptions: FetchOptions = {}
) {
  destination = destination || process.cwd();
  const artifact = parseName(artifactName);

  const url = await artifactUrl(artifact, repository, fetchOptions);

  const destFile = path.join(
    destination || process.cwd(),
    filename || getFilename(artifact)
  );
  const response = await fetch(url, fetchOptions);
  if (response.status !== 200) {
    throw new Error(`Unable to fetch ${url}. Status ${response.status}`);
  }
  await pipeToFile(response.body, destFile);
  return destFile;
});
