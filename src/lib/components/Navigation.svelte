<script lang="ts">
	import type { PassageConfig } from '$lib/types';

	import { base } from '$app/paths';

	export let passages: PassageConfig[];
	export let currentPassageUrn: string;
</script>

<section class="col-span-1">
	<ul class="menu bg-base-200 p-0">
		{#each passages as passage}
			<li class="text-sm">
				<a href="{base}/passages/{passage.urn}" class:active={passage.urn === currentPassageUrn}>
					{passage.label}
					{passage.ref}
				</a>
			</li>
		{/each}
	</ul>
</section>
