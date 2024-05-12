<script lang="ts">
	import type { Comment, PassageConfig, TextContainer } from '$lib/types';

	import { page } from '$app/stores';
	import CitableTextContainer from '$lib/components/CitableTextContainer.svelte';
	import CollapsibleComment from '$lib/components/CollapsibleComment.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import { marked } from 'marked';
	import { onMount, tick } from 'svelte';

	export let data;

	$: comments = data.comments as Comment[];
	$: currentPassage = data.currentPassage as PassageConfig;
	$: metadata = data.metadata;
	$: passages = data.passages as PassageConfig[];
	$: textContainers = data.textContainers as TextContainer[];

	onMount(() => {
		const commentToHighlight = $page.url.searchParams.get('gloss');

		if (commentToHighlight) {
			highlightComments([commentToHighlight]);
		}
	});

	function handleHighlightComments(e: CustomEvent) {
		highlightComments(e.detail);
	}

	async function highlightComments(commentsToHighlight: string[]) {
		let foundComment: Comment | undefined;

		comments = comments.map((comment: Comment) => {
			if (commentsToHighlight.includes(comment.citable_urn as string)) {
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

		if (foundComment && foundComment.citable_urn) {
			await tick();

			setTimeout(() => {
				// @ts-ignore
				document.getElementById(foundComment.citable_urn)?.scrollIntoView({ behavior: 'smooth' });
			}, 200);
		}
	}

	function stripMarkdown(s: string): string {
		return s.replace(/_|\*/gi, '');
	}
</script>

<svelte:head>
	<title>{stripMarkdown(metadata.title)}</title>
</svelte:head>
<article class="mx-auto w-full p-8">
	<div class="pb-8">
		<h1 class="text-2xl font-bold">{@html marked(metadata.title)}</h1>

		<p>{@html marked(metadata.description)}</p>
	</div>
	<div class="grid grid-cols-10 gap-x-8 gap-y-2 h-screen max-h-[64rem]">
		<section class="col-span-2">
			<Navigation {passages} currentPassageUrn={currentPassage.urn} />
		</section>
		<section class="col-span-5 overflow-y-scroll -mt-4">
			{#each textContainers as textContainer}
				<CitableTextContainer {textContainer} on:highlightComments={handleHighlightComments} />
			{/each}
		</section>
		<section class="overflow-y-scroll col-span-3 max-h-screen">
			{#each comments as comment}
				<CollapsibleComment {comment} />
			{/each}
		</section>
	</div>
</article>
