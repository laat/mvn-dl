#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { docopt } from 'docopt';
import download from 'mvn-artifact-download';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(
  readFileSync(join(__dirname, '..', 'package.json'), 'utf8')
);

const doc = `
Usage:
 mvn-dl <artifact> [options]

Options:
 -d --destination <destination>  Destination folder
 -f --filename <filename>        Output filename
 -r --repository <url>           Url to the maven repo

Examples:
 # download jar
 mvn-dl org.apache.commons:commons-lang3:3.4

 # download jar to dist
 mvn-dl org.apache.commons:commons-lang3:3.4 -d dist
`;
const args = docopt(doc, { version: pkg.version });
download(
  args['<artifact>'],
  args['--destination'],
  args['--repository'],
  args['--filename']
).catch((err) => {
  console.error(err);
  process.exit(1);
});
