<script lang="ts">
	export let group: string | undefined;
	export let title: string;

	// Get the current path
	let currentPath = '';
	if (typeof window !== 'undefined') {
		currentPath = window.location.pathname;
	}

	// If we're on the index page (root path), always show "Home"
	$: displayTitle = currentPath === '/' ? 'Home' : title;
</script>

<div class="mb-6 hidden lg:block">
	<div class="flex items-center gap-2 text-[15px] font-normal leading-[19.6px] tracking-[-0.0045em] text-[#56565C] dark:text-[#A3A3A0]">
		<a href="/" class="text-[#2D2D31] dark:text-white hover:text-[#56565C] dark:hover:text-[#A3A3A0] transition-colors duration-200 no-underline">
			Home
		</a>
		{#if group}
			<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="text-[#56565C] dark:text-[#A3A3A0]">
				<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
			</svg>
			<span class="text-[#56565C] dark:text-[#A3A3A0]">{group}</span>
		{/if}
		{#if group}
			<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="text-[#56565C] dark:text-[#A3A3A0]">
				<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
			</svg>
		{/if}
		<span class="text-[#2D2D31] dark:text-white">{displayTitle}</span>
	</div>
</div>
