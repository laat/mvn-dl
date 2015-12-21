import * as path from "path";
import * as util from "util";
import filename from "mvn-artifact-filename";

export interface Artifact {
    groupId: string;
    artifactId: string;
    version: string;
    extension?: string;
    classifier?: string;
}

const groupPath = function (artifact: Artifact): string {
  return [artifact.groupId.replace(/\./g, "/"),
    artifact.artifactId,
    artifact.version
  ].join("/");
};

const artifactPath = function (artifact: Artifact): string {
  return path.join(groupPath(artifact), filename(artifact));
};

export default function artifactUrl (artifact: Artifact, basepath: string) {
  let prefix = basepath || "https://repo1.maven.org/maven2/";
  return prefix + artifactPath(artifact);
}
