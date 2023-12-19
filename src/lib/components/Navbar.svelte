<script lang="ts">
	import { page } from '$app/stores'; // Importe le store de page de SvelteKit
	import { derived } from 'svelte/store';

	const navData = [
		{
			name: 'Home',
			path: '/'
		},
		{
			name: 'Challenges',
			path: '/challenges'
		},
		{
			name: 'About',
			path: '/about'
		}
	];

	/**
	 * Get the current path
	 */
	const activePath = derived(page, ($page) => $page.url.pathname);

	/**
	 * Determine if the current path is the same as the path passed in parameter
	 * @param path string 
	 * @param currentPath string
	 */
	const isActive = (path: string, currentPath: string) => {
		return path === currentPath;
	}
</script>

<div class="flex gap-10 max-w-[500px] justify-center w-full">
	{#each navData as navItem}
		<a class="px-3 py-1 text-slate-100 rounded-sm text-2xl underline transition-all {isActive(navItem.path, $activePath) ? 'text-orange-500 scale-110' : ''}" href={navItem.path}>
			{navItem.name}
		</a>
	{/each}
</div>
