<script lang="ts">
	import { onMount } from 'svelte';

	export let title: string = '';
	export let description: string = '';
	export let tagline: string = '';
	export let githubUrl: string = '';
	export let stars: number = 0;
	export let category: string = '';

	let showCopyDropdown = false;
	let currentUrl = '';
	let copyDropdownElement: HTMLDivElement;
	let showCopySuccess = false;

	onMount(() => {
		currentUrl = window.location.href;
		
		// Add click outside handler
		function handleClickOutside(event: MouseEvent) {
			if (copyDropdownElement && !copyDropdownElement.contains(event.target as Node)) {
				showCopyDropdown = false;
			}
		}
		
		document.addEventListener('click', handleClickOutside);
		
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	function toggleCopyDropdown(event: MouseEvent) {
		event.stopPropagation();
		showCopyDropdown = !showCopyDropdown;
	}

	async function copyToClipboard(text: string) {
		try {
			// Try modern clipboard API first
			if (navigator.clipboard && window.isSecureContext) {
				await navigator.clipboard.writeText(text);
				console.log('Copied to clipboard:', text);
			} else {
				// Fallback for older browsers or non-HTTPS
				const textArea = document.createElement('textarea');
				textArea.value = text;
				textArea.style.position = 'fixed';
				textArea.style.left = '-999999px';
				textArea.style.top = '-999999px';
				document.body.appendChild(textArea);
				textArea.focus();
				textArea.select();
				document.execCommand('copy');
				document.body.removeChild(textArea);
				console.log('Copied to clipboard (fallback):', text);
			}
			
			// Show success feedback
			showCopySuccess = true;
			setTimeout(() => {
				showCopySuccess = false;
			}, 2000);
			
			showCopyDropdown = false;
		} catch (err) {
			console.error('Failed to copy text: ', err);
			// Still close the dropdown even if copy fails
			showCopyDropdown = false;
		}
	}

	function getEditUrl() {
		// For now, link to the main repository since we don't have the docs repo
		// In a real implementation, this would link to the docs repository
		return githubUrl;
	}

	function getMarkdownUrl() {
		return currentUrl;
	}

	function getClaudeUrl() {
		return `https://claude.ai/chat?url=${encodeURIComponent(currentUrl)}`;
	}

	function getChatGPTUrl() {
		return `https://chat.openai.com/?url=${encodeURIComponent(currentUrl)}`;
	}
</script>

<div class="library-header">
	<div class="breadcrumbs">
		<a href="/" class="breadcrumb-link">Home</a>
		<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="breadcrumb-separator">
			<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
		</svg>
		<span class="breadcrumb-text">Libraries</span>
		<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="breadcrumb-separator">
			<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
		</svg>
		<span class="breadcrumb-text">{category}</span>
		<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="breadcrumb-separator">
			<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
		</svg>
		<span class="breadcrumb-current">{title}</span>
	</div>
	
	<div class="header-content">
		<div class="header-text">
			<h1 class="library-title">{title}</h1>
			<p class="library-tagline">{tagline}</p>
			<p class="library-description">
				{description}
			</p>
		</div>
		<div class="header-actions">
			<a href={getEditUrl()} target="_blank" rel="noopener" class="edit-button">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
					<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
				</svg>
				Edit on GitHub
			</a>
			<div class="copy-dropdown" bind:this={copyDropdownElement}>
				<button class="copy-button" on:click={toggleCopyDropdown}>
					Copy page
					<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
						<path d="M7 10l5 5 5-5z"/>
					</svg>
				</button>
				{#if showCopyDropdown}
					<div class="copy-menu">
						<button class="copy-item" on:click={() => copyToClipboard(getMarkdownUrl())}>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
								<path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
							</svg>
							<div class="copy-item-text">
								<div class="copy-item-title">View as Markdown</div>
								<div class="copy-item-desc">Open this page in Markdown</div>
							</div>
						</button>
						<a href={getClaudeUrl()} target="_blank" rel="noopener" class="copy-item">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
							</svg>
							<div class="copy-item-text">
								<div class="copy-item-title">Open in Claude</div>
								<div class="copy-item-desc">Ask questions about this page</div>
							</div>
							<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
								<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
							</svg>
						</a>
						<a href={getChatGPTUrl()} target="_blank" rel="noopener" class="copy-item">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
							</svg>
							<div class="copy-item-text">
								<div class="copy-item-title">Open in ChatGPT</div>
								<div class="copy-item-desc">Ask questions about this page</div>
							</div>
							<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
								<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
							</svg>
						</a>
					</div>
				{/if}
			</div>
		</div>
	</div>
	
	{#if showCopySuccess}
		<div class="copy-success">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
				<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
			</svg>
			Copied to clipboard!
		</div>
	{/if}
	
	<div class="header-meta">
		<a href={githubUrl} target="_blank" rel="noopener" class="github-link">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
			</svg>
			View on GitHub
		</a>
		<div class="stars">
			<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
			</svg>
			{stars}
		</div>
	</div>
</div>

<style lang="postcss">
	.library-header {
		@apply mb-8;
	}

	.breadcrumbs {
		@apply flex items-center gap-2 text-[15px] font-normal leading-[19.6px] tracking-[-0.0045em] text-[#56565C] dark:text-[#A3A3A0] mb-6;
	}

	.breadcrumb-link {
		@apply text-[#2D2D31] dark:text-white hover:text-[#56565C] dark:hover:text-[#A3A3A0] transition-colors duration-200 no-underline;
	}

	.breadcrumb-separator {
		@apply text-[#56565C] dark:text-[#A3A3A0];
	}

	.breadcrumb-text {
		@apply text-[#56565C] dark:text-[#A3A3A0];
	}

	.breadcrumb-current {
		@apply text-[#2D2D31] dark:text-white;
	}

	.header-content {
		@apply flex items-start justify-between gap-6 mb-6;
	}

	.header-text {
		@apply flex-1;
	}

	.library-title {
		@apply text-4xl font-medium text-[#2D2D31] dark:text-white mb-2;
	}

	.library-tagline {
		@apply text-lg text-[#666687] dark:text-gray-400 mb-4 font-medium;
	}

	.library-description {
		@apply text-[#666687] dark:text-gray-400 leading-relaxed;
	}

	.header-actions {
		@apply flex items-center gap-3;
	}

	.edit-button {
		@apply inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#666687] dark:text-gray-400 hover:text-[#19191C] dark:hover:text-white bg-white dark:bg-neutral-800/50 border border-[#EDEDF0] dark:border-neutral-700 rounded-md hover:bg-[#FAFAFB] dark:hover:bg-neutral-800 transition-colors duration-200 no-underline;
	}

	.copy-dropdown {
		@apply relative;
	}

	.copy-button {
		@apply inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#666687] dark:text-gray-400 hover:text-[#19191C] dark:hover:text-white bg-white dark:bg-neutral-800/50 border border-[#EDEDF0] dark:border-neutral-700 rounded-md hover:bg-[#FAFAFB] dark:hover:bg-neutral-800 transition-colors duration-200;
	}

	.copy-menu {
		@apply absolute top-full right-0 mt-2 w-64 bg-white dark:bg-neutral-800 border border-[#EDEDF0] dark:border-neutral-700 rounded-lg shadow-lg z-50;
	}

	.copy-item {
		@apply flex items-center gap-3 px-4 py-3 text-left hover:bg-[#FAFAFB] dark:hover:bg-neutral-700 transition-colors duration-200 no-underline;
	}

	.copy-item-text {
		@apply flex-1;
	}

	.copy-item-title {
		@apply text-sm font-medium text-[#19191C] dark:text-white;
	}

	.copy-item-desc {
		@apply text-xs text-[#666687] dark:text-gray-400 mt-1;
	}

	.header-meta {
		@apply flex items-center gap-6;
	}

	.github-link {
		@apply inline-flex items-center gap-2 text-sm font-medium text-[#666687] dark:text-gray-400 hover:text-[#19191C] dark:hover:text-white transition-colors duration-200 no-underline;
	}

	.stars {
		@apply flex items-center gap-1 text-sm text-[#666687] dark:text-gray-400 bg-[#FAFAFB] dark:bg-neutral-800/50 px-3 py-1 rounded-md;
	}

	.copy-success {
		@apply fixed top-4 right-4 z-50 flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg text-sm font-medium;
		animation: slideIn 0.3s ease-out;
	}

	@keyframes slideIn {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	@media (max-width: 768px) {
		.header-content {
			@apply flex-col items-start;
		}
		
		.header-actions {
			@apply flex-col w-full;
		}
		
		.edit-button,
		.copy-button {
			@apply w-full justify-center;
		}
	}
</style>
