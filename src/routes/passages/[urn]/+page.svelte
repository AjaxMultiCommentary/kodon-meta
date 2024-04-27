<script lang="ts">
	import type { Comment, PassageConfig } from '$lib/types';
	import CitableTextContainer from '$lib/components/CitableTextContainer.svelte';
	import CollapsibleComment from '$lib/components/CollapsibleComment.svelte';
	import CTS_URN from '$lib/cts_urn.js';
	import Navigation from '$lib/components/Navigation.svelte';

	export let data;

	$: comments = data.comments as Comment[];
	$: currentPassage = data.currentPassage as PassageConfig;
	$: metadata = { title: 'title', description: 'description' };
	$: passages = data.passages as PassageConfig[];
	$: textContainers = data.textContainers;
	$: textElements = data.textElements;

	function getCommentsForLine(urn: string) {
		const ctsUrn = new CTS_URN(urn);
		return comments.filter((c) => {
			return c.ctsUrn?.integerCitations[0].every(
				(value: number, index: number) => value === ctsUrn.integerCitations[0][index]
			);
		});
	}

	function highlightComments(e: CustomEvent) {
		const commentsToHighlight = e.detail;
		let foundComment: Comment | undefined;

		comments = comments.map((comment: Comment) => {
			if (commentsToHighlight.includes(comment.citable_urn)) {
				if (!foundComment) {
					foundComment = comment;
				}

				return {
					...comment,
					isHighlighted: true
				};
			}

			return {
				...comment,
				isHighlighted: false
			};
		});

		if (foundComment) {
			document.getElementById(foundComment.citable_urn)?.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<article class="mx-auto w-full p-8">
	<div class="pb-8">
		<h1 class="text-2xl font-bold">{metadata.title}</h1>

		<p>{metadata.description}</p>
	</div>
	<div class="grid grid-cols-10 gap-x-8 gap-y-2 h-screen max-h-[64rem]">
		<section class="col-span-2">
			<Navigation {passages} currentPassageUrn={currentPassage.urn} />
		</section>
		<section class="col-span-5 overflow-y-scroll">
			{#each textContainers as textContainer}
				<CitableTextContainer
					{textContainer}
					commentUrns={getCommentsForLine(textContainer.urn).map((c) => c.urn)}
					on:highlightComments={highlightComments}
				/>
			{/each}
		</section>
		<section class="overflow-y-scroll col-span-3 max-h-screen">
			{#each comments as comment}
				<CollapsibleComment {comment} />
			{/each}
		</section>
	</div>
</article>
