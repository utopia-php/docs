<script lang="ts">
	import { onMount } from 'svelte';
	import { Sun, Moon, Menu } from 'lucide-svelte';
	import Search from './Search.svelte';
	import { layoutStore } from '../stores/layout';

	let isDark = false;

	onMount(() => {
		// Initialize isDark state from current class
		isDark = document.documentElement.classList.contains('dark');

		// Create mutation observer to keep isDark in sync
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.attributeName === 'class') {
					isDark = document.documentElement.classList.contains('dark');
				}
			});
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class']
		});

		return () => observer.disconnect();
	});

	const toggleTheme = () => {
		const newTheme = isDark ? 'light' : 'dark';
		localStorage.setItem('theme', newTheme);
		const applyThemeChange = () => {
			document.documentElement.classList.toggle('dark', newTheme === 'dark');
		};

		if (document.startViewTransition) {
			document.startViewTransition(applyThemeChange);
		} else {
			applyThemeChange();
		}
	};

	const toggleRightSidebar = () => {
		const sidebar = document.getElementById('right-sidebar');
		if (sidebar) {
			sidebar.classList.toggle('translate-x-full');
			layoutStore.toggleRightSidebar();
		}
	};
</script>

<header
	class="fixed left-0 right-0 top-0 z-50 h-14 border-b border-[#EDEDF0] bg-white dark:border-neutral-800 dark:bg-[#121212]"
>
	<div class="flex h-full items-center justify-between px-4 lg:pl-7">
		<a href="/" class="flex items-center">
			<img src={isDark ? "/logo-dark.svg" : "/logo-light.svg"} alt="Logo" class="h-8 w-auto" />
		</a>

		<div class="flex items-center gap-2 sm:gap-4">
			<div class="hidden sm:block">
				<Search />
			</div>

			<a
				href="https://github.com/appwrite/template-for-documentation"
				target="_blank"
				rel="noopener noreferrer"
				class="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-neutral-800"
				aria-label="View on GitHub"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="text-gray-600 dark:text-gray-400">
					<path d="M10 2.5C5.85625 2.5 2.5 5.94114 2.5 10.1897C2.5 13.5924 4.64687 16.4664 7.62812 17.4853C8.00312 17.5526 8.14375 17.3219 8.14375 17.12C8.14375 16.9374 8.13438 16.3319 8.13438 15.6878C6.25 16.0435 5.7625 15.2168 5.6125 14.7843C5.52812 14.5632 5.1625 13.8808 4.84375 13.6981C4.58125 13.5539 4.20625 13.1983 4.83438 13.1887C5.425 13.1791 5.84688 13.7462 5.9875 13.9769C6.6625 15.1399 7.74063 14.8131 8.17188 14.6113C8.2375 14.1115 8.43437 13.775 8.65 13.5828C6.98125 13.3905 5.2375 12.7273 5.2375 9.78599C5.2375 8.94974 5.52813 8.25767 6.00625 7.71939C5.93125 7.52714 5.66875 6.73895 6.08125 5.68161C6.08125 5.68161 6.70938 5.47976 8.14375 6.46981C8.74375 6.29679 9.38125 6.21028 10.0188 6.21028C10.6563 6.21028 11.2938 6.29679 11.8938 6.46981C13.3281 5.47015 13.9563 5.68161 13.9563 5.68161C14.3688 6.73895 14.1063 7.52714 14.0313 7.71939C14.5094 8.25767 14.8 8.94013 14.8 9.78599C14.8 12.7369 13.0469 13.3905 11.3781 13.5828C11.65 13.8231 11.8844 14.2845 11.8844 15.0054C11.8844 16.0339 11.875 16.8605 11.875 17.12C11.875 17.3219 12.0156 17.5622 12.3906 17.4853C13.8795 16.97 15.1733 15.9889 16.0898 14.6801C17.0064 13.3714 17.4996 11.8009 17.5 10.1897C17.5 5.94114 14.1438 2.5 10 2.5Z" fill="currentColor"/>
				</svg>
			</a>

			<button
				on:click={toggleTheme}
				class="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-neutral-800"
				aria-label="Toggle theme"
			>
				{#if isDark}
					<Sun class="h-5 w-5 text-gray-600 dark:text-gray-400" />
				{:else}
					<Moon class="h-5 w-5 text-gray-600" />
				{/if}
			</button>

			<button
				on:click={toggleRightSidebar}
				class="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 lg:hidden"
				aria-label="Toggle table of contents"
			>
				<Menu class="h-5 w-5 text-gray-600 dark:text-gray-400" />
			</button>
		</div>
	</div>
</header>
