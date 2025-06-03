<script lang="ts">
	import { Bibliography, Tooltip, WikidataBibliography } from 'kodon';

	let { data } = $props();

	let bibliographies = $derived(data.bibliographies);
	let csls = $derived(data.csls);
	let wikidataCitations = $derived(data.wikidataCitations);
	let activeTab = $state('core-bibliography');
	
</script>

<div role="tablist" class="tabs tabs-bordered">
	<a
		role="tab"
		class="tab"
		class:tab-active={activeTab === 'core-bibliography'}
		href="#core-bibliography"
		onclick={() => (activeTab = 'core-bibliography')}
		><span class="mr-2">Core Bibliography</span>
		<Tooltip
			text={`This bibliography lists the commentaries that were used to create the multi-commentary. N.B.: only commentaries in the public domain are accessible via the application.`}
		/></a
	>
	<a
		role="tab"
		class="tab"
		class:tab-active={activeTab === 'extended-bibliography'}
		href="#extended-bibliography"
		onclick={() => (activeTab = 'extended-bibliography')}
		><span class="mr-2">Extended Bibliography</span>
		<Tooltip
			text={`This bibliography lists all publications cited by core commentaries (it currently includes Ferrari's bibliography; Stanford's and Garvie's will be added soon).`}
		/></a
	>
</div>

<div class="mb-8 border border-t-transparent p-4">
	{#if activeTab === 'core-bibliography'}
		<Bibliography {bibliographies} {csls} />
	{:else}
		<WikidataBibliography citations={wikidataCitations} />
	{/if}
</div>
