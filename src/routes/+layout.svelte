<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.scss';
</script>

<div class="w-full h-full flex flex-col p-20 gap-10 bg-[#080E16]">
	<div class="absolute inset-0 bg-gradient-to-r from-transparent via-[#1e41554e] to-transparent rounded-full blur-2xl"></div>
	<div class="w-full flex justify-center z-10">
		<Navbar />
	</div>
	<div class="slot z-10 h-full">
		<slot />
	</div>
</div>
