import * as util from "util";

export interface Artifact {
    groupId: string;
    artifactId: string;
    version: string;
    extension?: string;
    classifier?: string;
    isSnapShot?: boolean;
    snapShotVersion?: string;
}

const getVersion = function(artifact: Artifact): string {
    return artifact.version + (artifact.isSnapShot ? "-" + artifact.snapShotVersion : "");
};
export default function filename (artifact: Artifact) {
    const extension = artifact.extension || "jar";
    let version = getVersion(artifact);

    if (artifact.classifier) {
        return util.format("%s-%s-%s.%s",
                           artifact.artifactId,
                           version,
                           artifact.classifier,
                           extension);
    }
    return util.format("%s-%s.%s",
                       artifact.artifactId,
                       version,
                       extension);
}
