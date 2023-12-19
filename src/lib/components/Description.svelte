<script lang="ts">
    import { slide } from 'svelte/transition';
    import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa'
    let isDescriptionOpen = false;

    const toggleDescription = () => {
        isDescriptionOpen = !isDescriptionOpen;
    };

    export let htmlContent = "";
</script>

<div class="max-w-[1000px] w-full mx-auto flex flex-col gap-5">
    <button class="font-bold underline px-4 py-2 bg-slate-800 w-fit rounded flex gap-2 items-center mx-auto" on:click={toggleDescription}>
        Description 
        <Fa class={`transition-transform transform ${isDescriptionOpen ? 'rotate-180' : ''}`} icon={faArrowUp} />
    </button>
    {#if isDescriptionOpen}
        <div transition:slide class="flex flex-col gap-3">
            {@html htmlContent}
            <slot></slot>
        </div>
    {/if}
</div>
