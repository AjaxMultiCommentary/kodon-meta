<script lang="ts">
	import type { Comment, PassageConfig, TextContainer } from 'kodon';
	import { ReadingEnvironment } from 'kodon';
	import { page } from '$app/stores';

	export let data;

	$: comments = data.comments as unknown as Comment[];
	$: currentPassage = data.currentPassage as unknown as PassageConfig;
	$: metadata = data.metadata;
	$: passages = data.passages as unknown as PassageConfig[];
	$: textContainers = data.textContainers as unknown as TextContainer[];

	function stripMarkdown(s: string): string {
		return s.replace(/_|\*/gi, '');
	}

	const heatmapTooltip = `The highlights below illustrate the "density" of
comments on a particular lemma or line.
Darker shades of blue indicate a greater number of glosses on the
highlighted portion of the text.`;
	const filterListTooltip = `Use this filter to show or hide comments on the right. You can search for a commentary by name using the text box.`;
	const navigationTooltip = `This synopsis is based on the Lloyd-Jones edition of the text,
                    and the line numbers might not line up exactly with other editions.
                    Click on a section of the synopsis to view it in the critical text area.`;
</script>

<svelte:head>
	<title>{stripMarkdown(metadata.title)}</title>
</svelte:head>
<ReadingEnvironment
	currentURL={$page.url}
	{comments}
	{currentPassage}
	{heatmapTooltip}
	{filterListTooltip}
	{navigationTooltip}
	{passages}
	{textContainers}
	iiifURL="https://raw.githubusercontent.com/AjaxMultiCommentary/ajmc_iiif/main/docs"
/>
