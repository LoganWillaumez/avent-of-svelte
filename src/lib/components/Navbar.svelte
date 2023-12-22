<script lang="ts">
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import Hamburger from './Hamburger.svelte';

	const navData = [
		{
			name: 'About',
			path: '/'
		},
		{
			name: 'Challenges',
			path: '/challenges'
		}
	];

	let isMenuOpen = false;

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	}
</script>
<div class="md:hidden ">
	<Hamburger class="fixed top-5 left-5" on:toggle={toggleMenu} />
</div>
<div class="hidden md:flex gap-10 max-w-[500px] justify-center w-full">
	{#each navData as navItem}
		<a class="transition-all block px-3 py-1 text-slate-100 text-2x {$page.url.pathname === navItem.path ? 'text-orange-600 scale-110 underline' : ''}"  href={navItem.path}>
			{navItem.name}
		</a>
	{/each}
</div>
  
{#if isMenuOpen}
  <div class="md:hidden top-0 fixed bg-black  flex flex-col gap-3 w-full justify-center items-center py-10" transition:fade>
	{#each navData as navItem}
	  <a class="block px-3 py-1 text-slate-100  font-bold text-2xl {$page.url.pathname === navItem.path ? 'text-orange-600 scale-110 underline' : ''}" href={navItem.path} on:click={toggleMenu}>
		{navItem.name}
	  </a>
	{/each}
</div>
{/if}

