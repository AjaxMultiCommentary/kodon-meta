<script lang="ts">
	import type { TextContainer } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import CTS_URN from '$lib/cts_urn';
	import Speaker from './Speaker.svelte';
	import TextToken from './TextToken.svelte';

	const dispatch = createEventDispatcher();

	export let commentUrns: string[];
	export let textContainer: TextContainer;

	$: ctsUrn = new CTS_URN(textContainer.urn);
	$: tokens = textContainer.words.map((w) => {
		return {
			...w,
			comments: textContainer.comments?.filter((c) => {
				// comment only applies to this container
				if (c.ctsUrn.integerCitations.length === 1) {
					return (
						parseInt(c.start_offset || '') === w.offset ||
						(c.start_offset &&
							parseInt(c.start_offset || '') < w.offset &&
							c.end_offset &&
							parseInt(c.end_offset || '') < w.offset + w.text.length)
					);
				}

				// comment starts on this container
				if (
					c.ctsUrn.integerCitations[0].every(
						(value: number, index: number) => ctsUrn.integerCitations[0][index] === value
					)
				) {
					return parseInt(c.start_offset || '') <= w.offset;
				}

				// comment fully contains this container
				if (
					c.ctsUrn.integerCitations[0].every(
						(value: number, index: number) => value <= ctsUrn.integerCitations[0][index]
					) &&
					c.ctsUrn.integerCitations[1].every(
						(value: number, index: number) => value >= ctsUrn.integerCitations[0][index]
					)
				) {
					return true;
				}

				// comment ends on this container
				if (
					c.ctsUrn.integerCitations[1].every(
						(value: number, index: number) => ctsUrn.integerCitations[0][index] === value
					)
				) {
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
		{#if commentUrns.length > 0}
			<a
				href={`?highlight=${textContainer.urn}`}
				role="button"
				class="base-content hover:opacity-70 cursor-pointer w-12 text-center inline-block bg-secondary"
				on:click={() => dispatch('highlightComments', commentUrns)}
				data-citation={ctsUrn.citations[0]}>{ctsUrn.citations[0]}</a
			>
		{:else}
			<span class="base-content cursor-pointer w-12 text-center inline-block"
				>{ctsUrn.citations.join('.')}</span
			>
		{/if}
	</div>
</div>

<style lang="postcss">
	.indent-hanging {
		text-indent: 2.3rem hanging;
	}
</style>
