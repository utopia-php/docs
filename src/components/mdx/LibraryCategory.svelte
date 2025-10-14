<script lang="ts">
	import LibraryCard from './LibraryCard.svelte';

	export let title: string = '';
	export let description: string = '';
	export let libraries: Array<{
		name: string;
		description: string;
		githubUrl: string;
		stars: number;
		libraryUrl: string;
	}> = [];
</script>

<section class="library-category">
	<div class="category-header">
		<h2 class="category-title">{title}</h2>
		<p class="category-description">{description}</p>
	</div>
	<div class="libraries-grid">
		{#each libraries as library}
			<LibraryCard
				name={library.name}
				description={library.description}
				githubUrl={library.githubUrl}
				stars={library.stars}
				libraryUrl={library.libraryUrl}
			/>
		{/each}
	</div>
</section>

<style lang="postcss">
	.library-category {
		@apply mb-12;
	}

	.category-header {
		@apply mb-8;
	}

	.category-title {
		@apply text-2xl font-bold text-[#19191C] dark:text-white mb-2;
	}

	.category-description {
		@apply text-[#666687] dark:text-gray-400 text-lg;
	}

	.libraries-grid {
		@apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
	}
</style>
