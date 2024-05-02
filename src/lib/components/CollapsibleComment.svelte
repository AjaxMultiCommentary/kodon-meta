<script lang="ts">
	import type { Author, Comment } from '$lib/types';

	export let comment: Comment;
	export let isOpen = false;

	$: isHighlighted = comment.isHighlighted;
	$: creators = comment.commentaryAttributes.creators as Author[];

	function citation(comment: Comment) {
		const { integerCitations } = comment.ctsUrn;

		if (integerCitations.length === 2) {
			if (integerCitations[0].join('') !== integerCitations[1].join('')) {
				return `vv. ${integerCitations[0].join('')}-${integerCitations[1].join('')}`;
			}
		}

		return `v. ${integerCitations[0].join('')}`;
	}

	function toggleDetails(e: Event) {
		isOpen = !isOpen;
	}
</script>

<div
	class="border-2 collapse collapse-arrow rounded-sm mb-2"
	class:border-secondary={isHighlighted}
	class:collapse-open={isOpen || isHighlighted}
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
