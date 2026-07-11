import { XMLParser } from 'fast-xml-parser';

// parseTagValue: false keeps values like <timestamp>20120607.154250</timestamp>
// as strings; number coercion would drop trailing zeros.
const parser = new XMLParser({ parseTagValue: false });

export default function parseXmlString(body: string) {
  return parser.parse(body);
}
