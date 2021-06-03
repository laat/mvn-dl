# mvn-dl

## Install

```
$ npm install --save -g mvn-dl
```

## Usage

```js
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
```

## License

MIT © [Sigurd Fosseng](http://github.com/laat)
