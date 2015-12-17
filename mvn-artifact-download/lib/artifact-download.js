import fs from 'fs'
import path from 'path'
import { Promise } from 'es6-promise'
import request from 'request'
import parseName from 'mvn-artifact-name-parser'
import filename from 'mvn-artifact-filename'
import artifactUrl from 'mvn-artifact-url'

export default function download (artifactName, destination, repository) {
  return new Promise(function (resolve, reject) {
    destination = destination || process.cwd()
    const artifact = parseName(artifactName)
    const destFile = path.join(destination || process.cwd(), filename(artifact))

    const file = fs.createWriteStream(destFile)
    file.on('finish', () => {
      file.close()
      resolve(destFile)
    })
    file.on('error', (err) => {
      fs.unlink(destFile)
      reject(err)
    })

    const url = artifactUrl(artifact, repository)
    const sendReq = request.get(url)
    sendReq.on('response', (r) => {
      if (r.statusCode === 200) {
        r.pipe(file)
      } else {
        reject(r.statusCode)
      }
    })
  })
}
