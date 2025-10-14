<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';

	export let href: string = '/';
	export let label: string = 'Back to Libraries';
</script>

<a href={href} class="back-button">
	<ArrowLeft size={16} />
	{label}
</a>

<style lang="postcss">
	.back-button {
		@apply inline-flex items-center gap-2 text-sm font-medium text-[#666687] dark:text-gray-400 hover:text-[#19191C] dark:hover:text-white transition-colors duration-200 no-underline mb-6;
	}
</style>
