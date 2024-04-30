<script lang="ts">
	import type { Word } from '$lib/types.js';

	export let token: Word;

	function getClass(t: Word) {
		return `comment-box-shadow comments-${Math.min(t.comments?.length || 0, 10)}`;
	}
</script>

<span
	id={token.xml_id}
	class={getClass(token)}
	class:cursor-pointer={token.comments?.length || 0 > 0}
	>{token.text + ' '}
</span>

<style lang="postcss">
	.addition::before {
		content: '<';
	}

	.addition::after {
		content: '>';
	}

	.deletion {
		opacity: 0.7;
	}

	.deletion::before {
		content: '[';
	}

	.deletion::after {
		content: ']';
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
