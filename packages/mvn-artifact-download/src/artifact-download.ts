import * as fs from 'fs';
import * as path from 'path';
import parseName from 'mvn-artifact-name-parser';
import filename from 'mvn-artifact-filename';
import artifactUrl from 'mvn-artifact-url';
import http = require('http');
import fetch from 'node-fetch';

function pipeToFile(body: NodeJS.ReadableStream, destFile: string) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destFile);
    file.on('finish', () => {
      file.close();
      resolve(destFile);
    });
    file.on('error', err => {
      fs.unlink(destFile, function ignore() {});
      reject(err);
    });
    body.pipe(file);
  });
}

export default async function download(
  artifactName: string,
  destination?: string,
  repository?: string
) {
  destination = destination || process.cwd();
  const artifact = parseName(artifactName);

  const url = await artifactUrl(artifact, repository);

  const destFile = path.join(destination || process.cwd(), filename(artifact));
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error(`Unable to fetch ${url}. Status ${response.status}`);
  }
  await pipeToFile(response.body, destFile);
  return destFile;
}
