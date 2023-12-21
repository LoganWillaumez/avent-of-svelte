<script>

import Description from '$lib/components/Description.svelte';
import { description } from './data';
import { page } from '$app/stores';
    const pattern = '(challenges)/'
    const actualChallenge = $page.route.id ? $page.route.id.split(pattern)[1] : '';
</script>
<div class="h-full flex flex-col gap-10 text-slate-100 items-center relative" >
    <h2 class="text-5xl font-bold text-center">Day {actualChallenge}</h2>
    <Description htmlContent={description[actualChallenge]}></Description>
    <slot/>
    <a class="py-2 px-8 bg-red-500 rounded" href={"/challenges"}>Back</a>
</div>
