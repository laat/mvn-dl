import * as path from "path";
import * as util from "util";
import filename from "mvn-artifact-filename";
const parseString = require("xml2js").parseString;
const request = require("request");

export interface Artifact {
    groupId: string;
    artifactId: string;
    version: string;
    extension?: string;
    classifier?: string;
    isSnapShot?: boolean;
    snapShotVersion?: string;
}

const groupPath = function (artifact: Artifact): string {
  return [artifact.groupId.replace(/\./g, "/"),
    artifact.artifactId,
    artifact.version + (artifact.isSnapShot ? "-SNAPSHOT" : "")
  ].join("/");
};

const artifactPath = function (artifact: Artifact): string {
  return path.join(groupPath(artifact), filename(artifact));
};

const latestSnapShotVersion = function(artifact: Artifact, basepath: string){
  return new Promise(function(resolve: any, reject: any){
    let metadataUrl = basepath + groupPath(artifact) + "/maven-metadata.xml";
    request(metadataUrl, function(error: any, response: any, body: any){
      if (response.statusCode !== 200) {
        reject(response.statusCode);
      } else {
        parseString(body, function(err: any, result: any){
          if (err) {
            reject(err);
          } else {
            let snapshot = result.metadata.versioning[0].snapshot[0];
            let version = snapshot.timestamp[0] + "-" + snapshot.buildNumber[0];
            resolve(version);
          }
        });
      }
    });
  });
};

export default function artifactUrl (artifact: Artifact, basepath: string) {
  return new Promise(function(resolve: any, reject: any){
    let prefix = basepath || "https://repo1.maven.org/maven2/";
    if (artifact.isSnapShot) {
      latestSnapShotVersion(artifact, prefix).then(function(version: string){
        artifact.snapShotVersion = version;
        let url = prefix + artifactPath(artifact);
        resolve(url);
      }, function(err: any){
        reject(err);
      });
    } else {
      let url = prefix + artifactPath(artifact);
      resolve(url);
    }
  });
}
