<script lang="ts">
    import {  invalidateAll } from "$app/navigation";
    import { onMount } from 'svelte';
	import Lottie from "$lib/components/Lottie.svelte";

    export let data: any;

    let globalHeartRate = [data.data.heartRate];

    onMount(() => {
        const intervalId = setInterval(() => {
            invalidateAll();
            globalHeartRate = [...globalHeartRate, data.data.heartRate];
            console.log('🚀 ~ globalHeartRate:', globalHeartRate);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    });
</script>

<div class="flex gap-10 h-full">
    <div class="flex flex-col items-center">
        <div class="w-[500px]">
            <Lottie lottieAnim="hearth"/>
        </div>
        <p class="text-[#FF3B00FF] text-2xl font-bold"> {data.data.heartRate}</p>
    </div>
    <div class="w-[300px] h-[400px] overflow-auto">
        {#each globalHeartRate as heartRate}
            <p class="text-[#FF3B00FF] text-2xl font-bold"> {heartRate}</p>
            
        {/each}
    </div>
</div>
