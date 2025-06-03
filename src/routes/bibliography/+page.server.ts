import type { WikidataEntry } from 'kodon';
import type { PageServerLoad } from './$types';

import { loadBibliographies } from 'kodon';

export const prerender = true;

export const load: PageServerLoad = async ({ parent }) => {
	const parentData = await parent();

	const { bibliographies, csls } = loadBibliographies(parentData.config.bibliographies_directory);
	const data = (await import('$lib/assets/wikidata_citations.json')).default;

	const wikidataCitations = data.map((citation: WikidataEntry) => {
		const citations = citation.citedBy.value
			.split(', ')
			.map((wikidataURL: string) => {
				return data.find((c) => c.subject.value === wikidataURL);
			})
			.filter((x: any) => typeof x !== 'undefined');

		return {
			...citation,
			citations,
			wikidataURL: citation.subject.value
		};
	});

	return { bibliographies, csls, wikidataCitations };
};
