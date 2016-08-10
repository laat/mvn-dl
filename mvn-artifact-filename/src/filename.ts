import * as util from "util";

export interface Artifact {
    groupId: string;
    artifactId: string;
    version: string;
    extension?: string;
    classifier?: string;
}

export default function filename (artifact: Artifact) {
    const extension = artifact.extension || "jar";
    if (artifact.classifier) {
        return util.format("%s-%s-%s.%s",
                           artifact.artifactId,
                           artifact.version,
                           artifact.classifier,
                           extension);
    };
    return util.format("%s-%s.%s",
                       artifact.artifactId,
                       artifact.version,
                       extension);
}
