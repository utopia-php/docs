<script lang="ts">
	import { socials } from '@/utils/socials.ts';
</script>

<footer
	class="relative z-30 flex w-full flex-col justify-between gap-3 border-t bg-white p-[16px_24px] text-xs dark:border-[#2C2C2F] dark:bg-[#1b1b1b] md:flex-row lg:z-50"
>
	<div class="flex items-center gap-2">
		<div>
			Deployed by <a href="https://appwrite.io" target="_blank">Appwrite</a>. Source code available
			on
			<a href="https://github.com/appwrite/template-for-documentation" target="_blank">GitHub</a>.
		</div>
	</div>

	<div class="flex justify-between gap-3">
		<div class="flex items-center gap-2">
			{#each socials as social (social.link)}
				<a aria-label={social.label} class="social-card" href={social.link} target="_blank">
					<span class="svg-wrapper">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html social.icon}
					</span>
				</a>
			{/each}
		</div>
	</div>
</footer>

<style>
	footer {
		font-size: 12px;
		font-weight: 400;
		line-height: 18px;
		margin-top: auto;
		font-style: normal;
		letter-spacing: -0.063px;
		color: var(--color-fgColor-neutral-secondary, #56565c);

		& a {
			color: #19191c;
			font-weight: 400;
			line-height: 140%;
			font-style: normal;
			letter-spacing: -0.063px;
			text-decoration: underline;
			font-size: 12px;
		}
	}

	:global(html.dark footer) {
		color: #a3a3a0;

		& a {
			color: #e6e6e3;
		}
	}

	.social-card {
		padding: 3px;
		border-radius: 6px;
		border: 1px solid var(--color-border-neutral-strong, #d8d8db);

		transition: border 0.3s ease-in-out;

		&:hover {
			border: 1px solid #9f9fa7;
		}
	}

	:global(html.dark .social-card) {
		border: var(--border-width-S, 1px) solid var(--color-border-neutral-strong, #56565c);
	}

	.svg-wrapper {
		width: 16px;
		height: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
