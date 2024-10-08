<script lang="ts">
	import type { Author, Comment } from '$lib/types';
	import IIIFViewer from './IIIFViewer.svelte';

	export let comment: Comment;

	$: creators = comment.commentaryAttributes.creators as Author[];
	$: isHighlighted = comment.isHighlighted;
	$: isOpen = isHighlighted;
	$: showIIIFViewer = false;

	function citation(comment: Comment) {
		const { integerCitations } = comment.ctsUrn;

		if (integerCitations.length === 2) {
			if (integerCitations[0].join('') !== integerCitations[1].join('')) {
				return `vv. ${integerCitations[0].join('')}-${integerCitations[1].join('')}`;
			}
		}

		return `v. ${integerCitations[0].join('')}`;
	}

	function toggleDetails(_e: Event) {
		isOpen = !isOpen;

		if (!isOpen) {
			isHighlighted = false;
		}
	}
</script>

<div
	class="border-2 collapse collapse-arrow rounded-sm mb-2"
	class:border-secondary={isOpen && isHighlighted}
	class:collapse-open={isOpen}
	id={comment.citable_urn}
>
	<div
		class="collapse-title"
		role="button"
		tabindex="0"
		on:click={toggleDetails}
		on:keyup={(event) => {
			if (event.key === 'Enter') {
				event.stopPropagation();
				toggleDetails(event);
			}
		}}
	>
		<h3 class="text-sm font-bold text-primary-content cursor-pointer">
			<span class="text-sm font-medium text-slate-600"
				><a data-sveltekit-reload href={`?gloss=${comment.citable_urn}`}>{citation(comment)}</a
				></span
			>
			{creators.map((c) => c.last_name || c.name).join(', ')}
			{comment.commentaryAttributes.publication_date}
		</h3>
		{#if comment.lemma}
			<small class="mt-1 mx-w-2xl text-sm text-slate-600">
				{comment.transcript || comment.lemma}
			</small>
		{/if}
	</div>
	<div class="collapse-content float-right">
		<p class="max-w-2xl text-sm text-gray-800 prose comment-body">{@html comment.body}</p>
		<!-- <div class="flex justify-center mt-2">
			{#if showIIIFViewer}
				<IIIFViewer {comment} />
			{:else}
				<button
					type="button"
					class="btn btn-xs btn-outline btn-secondary"
					on:click={() => (showIIIFViewer = true)}
				>
					Show page image
				</button>
			{/if}
		</div> -->
	</div>
</div>

<style lang="postcss">
	.comment-body :global(a) {
		@apply underline;
	}

	.comment-body :global(a:hover) {
		@apply font-bold;
	}
</style>
