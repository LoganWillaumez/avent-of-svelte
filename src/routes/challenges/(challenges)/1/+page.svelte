<script lang="ts">
	import Description from '$lib/components/Description.svelte';
	import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { Elf } from './model.js';

	export let data;

	let { naughty, nice } = data;

	let sortDirectionNameNaughty = 'asc';
	let sortDirectionNameNice = 'asc';
	let sortDirectionTallyNaughty = 'asc';
	let sortDirectionTallyNice = 'asc';

	/**
	 * Sorts the elves by their name
	 * @param status 'naughty' | 'nice'
	 */
	const sortByName = (status: 'naughty' | 'nice') => {
		if (status === 'naughty') {
			if (sortDirectionNameNaughty === 'asc') {
				naughty = [...naughty.sort((elfA: Elf, elfB: Elf) => elfA.name.localeCompare(elfB.name))];
				sortDirectionNameNaughty = 'desc';
			} else {
				naughty = [...naughty.sort((elfA: Elf, elfB: Elf) => elfB.name.localeCompare(elfA.name))];
				sortDirectionNameNaughty = 'asc';
			}
		} else {
			if (sortDirectionNameNice === 'asc') {
				nice = [...nice.sort((elfA: Elf, elfB: Elf) => elfA.name.localeCompare(elfB.name))];
				sortDirectionNameNice = 'desc';
			} else {
				nice = [...nice.sort((elfA: Elf, elfB: Elf) => elfB.name.localeCompare(elfA.name))];
				sortDirectionNameNice = 'asc';
			}
		}
	};

	/**
	 * Sorts the elves by their tally
	 * @param status 'naughty' | 'nice'
	 */
	const sortByTally = (status: 'naughty' | 'nice') => {
		if (status === 'naughty') {
			if (sortDirectionTallyNaughty === 'asc') {
				naughty = [...naughty.sort((elfA: Elf, elfB: Elf) => elfA.tally - elfB.tally)];
				sortDirectionTallyNaughty = 'desc';
			} else {
				naughty = [...naughty.sort((elfA: Elf, elfB: Elf) => elfB.tally - elfA.tally)];
				sortDirectionTallyNaughty = 'asc';
			}
		} else {
			if (sortDirectionTallyNice === 'asc') {
				nice = [...nice.sort((elfA: Elf, elfB: Elf) => elfA.tally - elfB.tally)];
				sortDirectionTallyNice = 'desc';
			} else {
				nice = [...nice.sort((elfA: Elf, elfB: Elf) => elfB.tally - elfA.tally)];
				sortDirectionTallyNice = 'asc';
			}
		}
	};
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full justify-center">
	<div class="bg-red-700 bg-opacity-10 p-5 rounded-lg flex flex-col gap-5">
		<h3 class="text-slate-100 text-3xl font-bold text-center">Naughty</h3>
		<div class="flex justify-between text-slate-100 font-bold px-2">
			<button class="flex items-center" on:click={() => sortByName('naughty')}>
				Name
				<Fa
					class={`transition-transform ml-2 transform ${
						sortDirectionNameNaughty === 'asc' ? '' : 'rotate-180'
					} transition-transform`}
					icon={faArrowUp}
				/>
			</button>
			<button class="flex items-center" on:click={() => sortByTally('naughty')}>
				Tally
				<Fa
					class={`transition-transform ml-2 transform ${
						sortDirectionTallyNaughty === 'asc' ? '' : 'rotate-180'
					} transition-transform`}
					icon={faArrowUp}
				/>
			</button>
		</div>
		<ul class="flex flex-col text-slate-100 gap-3">
			{#each naughty as elf (elf)}
				<li class="bg-slate-700 bg-opacity-10 p-2 rounded flex justify-between">
					<span>{elf.name}</span>
					<span>{elf.tally}</span>
				</li>
			{/each}
		</ul>
	</div>
	<div class="bg-green-700 bg-opacity-10 p-5 rounded-lg flex flex-col gap-5">
		<h3 class="text-slate-100 text-3xl font-bold text-center">Nice</h3>
		<div class="flex justify-between text-slate-100 font-bold px-2">
			<button class="flex items-center" on:click={() => sortByName('nice')}>
				Name
				<Fa
					class={`transition-transform ml-2 transform ${
						sortDirectionNameNice === 'asc' ? '' : 'rotate-180'
					} transition-transform`}
					icon={faArrowUp}
				/>
			</button>
			<button class="flex items-center" on:click={() => sortByTally('nice')}>
				Tally
				<Fa
					class={`transition-transform ml-2 transform ${
						sortDirectionTallyNice === 'asc' ? '' : 'rotate-180'
					} transition-transform`}
					icon={faArrowUp}
				/>
			</button>
		</div>
		<ul class="flex flex-col text-slate-100 gap-3">
			{#each nice as elf (elf)}
				<li class="bg-slate-700 bg-opacity-10 p-2 rounded flex justify-between">
					<span>{elf.name}</span>
					<span>{elf.tally}</span>
				</li>
			{/each}
		</ul>
	</div>
</div>