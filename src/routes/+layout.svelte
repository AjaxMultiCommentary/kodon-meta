<script lang="ts">
	import type { LayoutData } from './$types';
	import '../app.css';

	import { base } from '$app/paths';

	import { Header } from 'kodon';

	interface Props {
		data: LayoutData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
</script>

<svelte:head>
	<title>AjMC</title>
</svelte:head>

<div>
	<Header title={data.title} staticPages={data.staticPages}>
		<a href="{base}/passages" class="btn btn-link">Multi-Commentary</a>
	</Header>
	<main class="px-4">
		{@render children?.()}
	</main>
</div>
