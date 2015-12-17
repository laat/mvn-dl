const doc = `
Usage:
 mvn-dl <artifact> [options]

Options:
 -d --destination <destination>  Destination folder
 -r --repository <url>          Url to the maven repo

Examples:
 # download jar
 mvn-dl org.apache.commons:commons-lang3:3.4

 # download jar to dist
 mvn-dl org.apache.commons:commons-lang3:3.4 -d dist
`
import {docopt} from 'docopt'
import download from 'mvn-artifact-download'
const args = docopt(doc, { version: require('../package.json').version })
console.log(args)
console.log(args['<destination>'])
download(args['<artifact>'], args['--destination'], args['--repository'])
