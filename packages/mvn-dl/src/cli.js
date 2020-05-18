#!/usr/bin/env node
import { docopt } from 'docopt';
import download from 'mvn-artifact-download';
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
const args = docopt(doc, { version: require('../package.json').version });
download(
  args['<artifact>'],
  args['--destination'],
  args['--repository'],
  args['--filename']
).catch((err) => {
  console.error(err);
});
