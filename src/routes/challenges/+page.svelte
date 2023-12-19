<script lang="ts">
	const challenges = [{ id: 1, name: 'Challenge 1', link: '/challenges/1' }];
</script>

<div>
	<h2 class="text-slate-100 text-5xl font-bold text-center">List of Challenges</h2>
	<div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
		{#each challenges as challenge (challenge.id)}
			<a href={challenge.link} class="bg-slate-700 p-4 rounded-lg hover:bg-slate-600 cursor-pointer block text-center no-underline text-slate-100">
				<p>Challenge {challenge.id}</p>
				<p>{challenge.name}</p>
			</a>
		{/each}
	</div>
</div>
