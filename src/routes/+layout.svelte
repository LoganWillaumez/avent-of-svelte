<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.scss';
</script>

<div class="w-full h-full bg-[#080E16] overflow-auto md:pt-20 pt-5 md:px-20 px-5 md:pb-10 pb-3 relative flex flex-col gap-10">
	<div class="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#1e41554e] to-transparent rounded-full blur-2xl"></div>
	<div class="w-full flex justify-center z-50 ">
		<Navbar />
	</div>
	<div class="flex-grow">
		<slot />
	</div>
</div>
