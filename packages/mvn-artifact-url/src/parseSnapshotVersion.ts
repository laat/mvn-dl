function textOf(xml: string, tag: string): string | undefined {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return match?.[1].trim();
}

export default function parseSnapshotVersion(metadataXml: string): string {
  const snapshot = textOf(metadataXml, 'snapshot');
  const timestamp = snapshot && textOf(snapshot, 'timestamp');
  const buildNumber = snapshot && textOf(snapshot, 'buildNumber');
  if (!timestamp || !buildNumber) {
    throw new Error('Unable to parse snapshot version from maven-metadata.xml');
  }
  return timestamp + '-' + buildNumber;
}
