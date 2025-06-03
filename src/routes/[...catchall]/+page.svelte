<script lang="ts">
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let config = $derived(data.config);
	let body = $derived(data.body);
	let title = $derived(data.title);

	function stripMarkdown(s: string): string {
		return s.replace(/_|\*/gi, '');
	}
</script>

<svelte:head>
	<title>{stripMarkdown(config.title)} • {title}</title>
</svelte:head>

<article class="prose">
	{@html body}
</article>
