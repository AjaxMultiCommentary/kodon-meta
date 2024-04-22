<script lang="ts">
	import type { Comment } from '$lib/types';
	import CitableTextContainer from './CitableTextContainer.svelte';

	export let comment: Comment;

	$: isHighlighted = comment.isHighlighted;

	function citation(comment: Comment) {
		const { integerCitations } = comment.ctsUrn;

		if (integerCitations.length === 2) {
			if (integerCitations[0].join('') !== integerCitations[1].join('')) {
				return `vv. ${integerCitations[0].join('')}-${integerCitations[1].join('')}`;
			}
		}

		return `v. ${integerCitations[0].join('')}`;
	}
</script>

<div
	class="border-2 collapse collapse-arrow rounded-sm mb-2"
	class:border-secondary={isHighlighted}
	id={comment.citable_urn}
>
	<input type="checkbox" />
	<div class="collapse-title">
		<h3 class="text-sm font-bold text-primary-content cursor-pointer">
			<span class="text-sm font-medium text-slate-600">{citation(comment)}</span>
			{comment.commentaryAttributes?.creators.map((c) => c?.last_name).join(', ')}
			{comment.commentaryAttributes.publication_date}
		</h3>
		{#if comment.lemma}
			<small class="mt-1 mx-w-2xl text-sm text-slate-600">
				{comment.transcript || comment.lemma}
			</small>
		{/if}
	</div>
	<div class="collapse-content float-right">
		<p class="max-w-2xl text-sm text-gray-800">{@html comment.body}</p>
	</div>
</div>
