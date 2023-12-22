<script lang="ts">
	import { challenges } from "./data";
</script>

<div class="w-full">
	<h2 class="text-slate-100 md:text-5xl text-3xl font-bold text-center">List of Challenges</h2>
	<div class="flex flex-wrap justify-center gap-4 p-4">
		{#each challenges as challenge (challenge.id)}
			<a href={`/challenges/${challenge.id}`} class="bg-slate-700 p-4 rounded-lg hover:bg-slate-600 cursor-pointer block text-center no-underline text-slate-100 w-[200px] min-w-fit">
				<p class="font-bold">Day {challenge.id}</p>
				<p class="font-medium text-sm italic">{challenge.name}</p>
			</a>
		{/each}
	</div>
</div>
