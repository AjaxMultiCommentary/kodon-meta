import fs from 'fs';
import frontMatter from 'front-matter';
import { marked } from 'marked';
import CTS_URN from '$lib/cts_urn';

const COMMENTARIES_DIR = 'commentaries';
const GLOSSA_PROPERTY_REGEX = /^:(?<name>[^:\n]+):\s+(?<value>.*)(?:\n|$)/;
const URN_REGEX = /\@(?<urn>[^\n]+)/;

type GlossaProperties = {
    attributes?: any;
    content?: string;
    lemma?: string;
    end_offset?: number;
    start_offset?: number;
    citable_urn?: string;
    image_paths?: string;
    overlays?: string;
    page_ids?: string;
};

export function readCommentaryFiles() {
    const files = fs.readdirSync(COMMENTARIES_DIR);

    return files.flatMap(file => {
        const s = fs.readFileSync(`${COMMENTARIES_DIR}/${file}`, 'utf-8');
        const { attributes, body } = frontMatter(s);
        const glossae = body.split('\n---\n').filter(g => g.trim() !== "").map(g => g.trim());

        return glossae.map(glossa => {
            const match = glossa.match(URN_REGEX);

            if (match?.groups?.urn) {
                const urn = match.groups.urn;
                let withProperties = glossa.replace(URN_REGEX, "").trim();
                const glossaProperties: GlossaProperties = {};

                let propMatch = withProperties.match(GLOSSA_PROPERTY_REGEX);

                while (propMatch?.groups?.name) {
                    // @ts-ignore
                    glossaProperties[propMatch.groups.name] = propMatch.groups.value;

                    withProperties = withProperties.replace(GLOSSA_PROPERTY_REGEX, "").trim();
                    propMatch = withProperties.match(GLOSSA_PROPERTY_REGEX);
                }

                return {
                    commentaryAttributes: attributes,
                    ...glossaProperties,
                    body: marked(withProperties),
                    ctsUrn: new CTS_URN(urn),
                    rawBody: withProperties,
                    urn
                };
            }
        });
    });
}