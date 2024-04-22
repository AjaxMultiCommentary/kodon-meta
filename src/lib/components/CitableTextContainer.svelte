<script lang="ts">
	import CTS_URN from '$lib/cts_urn';
	import type { TextContainer } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let commentUrns: string[];
	export let textContainer: TextContainer;

	$: ctsUrn = new CTS_URN(textContainer.urn);
</script>

<div class="align-baseline flex justify-between w-full">
	<p class="max-w-prose w-3/4 indent-hanging">
		{textContainer.text}
	</p>
	{#if commentUrns.length > 0}
		<a
			href={`#${textContainer.offset}`}
			role="button"
			class="bg-secondary hover:opacity-70 w-6 text-center"
			on:click={() => dispatch('highlightComments', commentUrns)}
			data-citation={ctsUrn.citations[0]}>{ctsUrn.citations[0]}</a
		>
	{:else}
		<span class="text-center w-6">{ctsUrn.citations[0]}</span>
	{/if}
</div>

<style lang="postcss">
	.indent-hanging {
		text-indent: 2.3rem hanging;
	}
</style>
