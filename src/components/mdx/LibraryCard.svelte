<script lang="ts">
	import { Star } from 'lucide-svelte';

	export let name: string = '';
	export let description: string = '';
	export let githubUrl: string = '';
	export let stars: number = 0;
	export let libraryUrl: string = '';

	const safeId = name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
</script>

<a href={libraryUrl} class="library-card">
	<div class="card-header">
		<h3 class="title" id={safeId}>
			{name}
		</h3>
		<div class="stats">
			<button class="stars" onclick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(githubUrl, '_blank'); }}>
				<Star size={14} />
				{stars}
			</button>
		</div>
	</div>
	<div class="content">
		<p>{description}</p>
	</div>
</a>

<style lang="postcss">
	.library-card {
		@apply block rounded-lg border border-[#EDEDF0] dark:border-neutral-800 p-4 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg bg-white dark:bg-[#121212]/50 cursor-pointer no-underline hover:no-underline;
	}

	.card-header {
		@apply mb-2 flex items-start justify-between gap-3;
	}

	.title {
		@apply text-[16px] font-semibold leading-[20px] tracking-[-0.0045em] text-[#19191C] dark:text-white;
	}

	.stats {
		@apply flex items-center gap-2;
	}

	.stars {
		@apply flex items-center gap-1 text-xs text-[#666687] dark:text-gray-400 bg-[#FAFAFB] dark:bg-neutral-800/50 px-2 py-1 rounded-md hover:bg-[#F0F0F0] dark:hover:bg-neutral-800 transition-colors duration-200 border-0 cursor-pointer;
	}

	.content {
		@apply text-[14px] leading-[18px] tracking-[-0.0045em] text-[#666687] dark:text-gray-400;
	}

	.content :global(p) {
		@apply m-0;
	}
</style>
