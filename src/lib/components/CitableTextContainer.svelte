<script lang="ts">
	import CTS_URN from '$lib/cts_urn';
	import type { TextContainer } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let commentUrns: string[];
	export let textContainer: TextContainer;

	$: ctsUrn = new CTS_URN(textContainer.urn);
</script>

<div class="flex justify-between">
	<p class="max-w-prose indent-hanging">
		{textContainer.text}
	</p>
	{#if commentUrns.length > 0}
		<a
			href={`#${textContainer.offset}`}
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

<style lang="postcss">
	.indent-hanging {
		text-indent: 2.3rem hanging;
	}
</style>
