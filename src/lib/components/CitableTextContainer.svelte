<script lang="ts">
	import type { Comment, TextContainer, Word } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import CTS_URN from '$lib/cts_urn';
	import Speaker from './Speaker.svelte';
	import TextToken from './TextToken.svelte';

	const dispatch = createEventDispatcher();

	export let textContainer: TextContainer;

	function isCommentContainedByTextContainer(comment: Comment) {
		return (
			comment.ctsUrn.integerCitations.length === 1 ||
			comment.ctsUrn.integerCitations[0].join('') === comment.ctsUrn.integerCitations[1].join('')
		);
	}

	function tokenTestForCommentContainedByTestContainer(comment: Comment, token: Word) {
		const startOffsetInt = parseInt(comment.start_offset || '');
		const endOffsetInt = parseInt(comment.end_offset || '');

		return (
			startOffsetInt === token.offset ||
			(startOffsetInt <= token.offset && endOffsetInt >= token.offset + token.text.length)
		);
	}

	$: ctsUrn = new CTS_URN(textContainer.urn);
	$: wholeLineComments =
		textContainer.comments
			?.filter((c) => !c.ctsUrn.tokens.some((t: string | undefined) => Boolean(t)))
			.filter((c) => ctsUrn.hasEqualStart(c.ctsUrn)) || [];
	$: tokens = textContainer.words.map((w) => {
		return {
			...w,
			comments: textContainer.comments
				?.filter((c) => c.ctsUrn.tokens.some((t: string | undefined) => Boolean(t)))
				.filter((c) => {
					const commentUrn = new CTS_URN(c.ctsUrn.__urn);
					// comment only applies to this container
					if (isCommentContainedByTextContainer(c)) {
						return tokenTestForCommentContainedByTestContainer(c, w);
					}

					// comment starts on this container
					if (ctsUrn.hasEqualStart(c.ctsUrn)) {
						return parseInt(c.start_offset || '') <= w.offset;
					}

					// comment fully contains this container
					if (commentUrn.contains(ctsUrn)) {
						return true;
					}

					// comment ends on this container
					if (ctsUrn.hasEqualEnd(c.ctsUrn)) {
						return parseInt(c.end_offset || '') >= w.offset;
					}

					return false;
				})
		};
	});
</script>

<div>
	{#if textContainer.speaker}
		<Speaker name={textContainer.speaker} />
	{/if}
	<div class="flex justify-between">
		<p class="max-w-prose indent-hanging">
			{#each tokens as token (token.xml_id)}
				<TextToken {token} />
			{/each}
		</p>
		{#if wholeLineComments.length > 0}
			<a
				href={`?highlight=${textContainer.urn}`}
				role="button"
				class={`base-content hover:opacity-70 cursor-pointer w-12 text-center inline-block comment-box-shadow comments-${wholeLineComments.length}`}
				on:click={() =>
					dispatch(
						'highlightComments',
						wholeLineComments.map((c) => c.urn)
					)}
				data-citation={ctsUrn.citations[0]}>{ctsUrn.citations[0]}</a
			>
		{:else}
			<span class="base-content w-12 text-center inline-block">{ctsUrn.citations.join('.')}</span>
		{/if}
	</div>
</div>

<style lang="postcss">
	.indent-hanging {
		text-indent: 2.3rem hanging;
	}
	.comment-box-shadow.comments-1 {
		background-color: rgb(99, 162, 187, 0.2);
	}

	.comment-box-shadow.comments-2 {
		background-color: rgba(99, 162, 187, 0.4);
	}

	.comment-box-shadow.comments-3 {
		background-color: rgba(99, 162, 187, 0.6);
	}

	.comment-box-shadow.comments-4 {
		background-color: rgba(99, 162, 187, 0.8);
	}

	.comment-box-shadow.comments-5 {
		background-color: rgba(99, 162, 187, 0.9);
	}

	.comment-box-shadow.comments-6 {
		background-color: rgba(99, 162, 187, 1);
	}

	.comment-box-shadow.comments-7 {
		background-color: rgba(67, 121, 142, 0.8);
	}

	.comment-box-shadow.comments-8 {
		background-color: rgba(67, 121, 142, 0.9);
	}

	.comment-box-shadow.comments-9 {
		background-color: rgba(67, 121, 142, 1);
	}

	.comment-box-shadow.comments-10 {
		background-color: rgb(67, 121, 142, 1);
	}
</style>
