<script lang="ts">
    import { flip } from 'svelte/animate';
    export let data: { data: Array<{ name: string, weight: number }> };
    let packages = structuredClone(data.data);
    let loadedPackages: Array<{ name: string, weight: number }> = [];
    let draggingElement = null;
    let totalWeightPackages = 0;

    const dragStart = (event: DragEvent, packageIndex: number, source: string) => {
        const data = { packageIndex, source };
        if(!event.dataTransfer) return;
        event.dataTransfer.setData('text/plain', JSON.stringify(data));
        draggingElement = event.target;
    };
    
    const dragOver = (event: DragEvent) => {
        event.preventDefault();
    };

    const drop = (event: DragEvent, target: string) => {
        event.preventDefault();
        draggingElement = null;

        const json = event.dataTransfer ? event.dataTransfer.getData("text/plain") : '';
        const { packageIndex, source } = JSON.parse(json);

        if (source === target) return;

        let droppedPackage;
        if (source === 'packages') {
            droppedPackage = packages.splice(packageIndex, 1)[0];
            loadedPackages = [droppedPackage, ...loadedPackages];
            totalWeightPackages += droppedPackage.weight;
        } else {
            droppedPackage = loadedPackages.splice(packageIndex, 1)[0];
            packages = [droppedPackage, ...packages];
            totalWeightPackages -= droppedPackage.weight;
            totalWeightPackages <= 0 && (totalWeightPackages = 0);
        }

        packages = [...packages];
        loadedPackages = [...loadedPackages];
    };

    const dragEnd = () => {
        draggingElement = null;
    };

    const reset = () => {
        packages = structuredClone(data.data);
        loadedPackages = [];
        totalWeightPackages = 0;
    };
</script>

<div class="flex w-full gap-5">
    <div class="flex flex-col gap-3 w-1/2 bg-slate-800 p-5 rounded"
        role="list"
        on:drop={event => drop(event, 'packages')}
        on:dragover={dragOver}>
        <div class="flex justify-between text-white">
            <p class="font-bold">Name</p>
            <p class="font-bold">Weight</p>
        </div>
        {#each packages as pack, packageIndex (pack)}
            <div animate:flip class="min-w-fit bg-slate-700 rounded px-5 py-3 flex justify-between text-white hover:cursor-grab"
                role="listitem"
                draggable={true}
                on:dragstart={event => dragStart(event, packageIndex, 'packages')}
                on:dragend={dragEnd}>
                <p>{pack.name}</p>
                <p>{pack.weight} kg</p>
            </div>
        {/each}
    </div>

    <div class="flex flex-col gap-3 w-1/2 bg-slate-800 p-5 rounded"
        role="list"
        on:drop={event => drop(event, 'loadedPackages')}
        on:dragover={dragOver}>
<p class="font-bold">Loaded Packets</p>
        <p class="font-bold {totalWeightPackages > 0 ? totalWeightPackages > 100 ? 'text-red-300' : 'text-green-300' : 'text-slate-300'}">Total weight : {parseFloat(totalWeightPackages.toFixed(2))} kg</p>
        <button class="bg-red-700 rounded px-5 py-3 text-white hover:cursor-pointer" on:click={reset}>Reset</button>
        <div class="flex justify-between text-white">
        </div>
        {#each loadedPackages as pack, packageIndex (pack)}
            <div animate:flip class="min-w-fit bg-slate-700 rounded px-5 py-3 flex justify-between text-white hover:cursor-grab"
                role="listitem"
                draggable={true}
                on:dragstart={event => dragStart(event, packageIndex, 'loadedPackages')}
                on:dragend={dragEnd}>
                <p>{pack.name}</p>
                <p>{pack.weight} kg</p>
            </div>
        {/each}
    </div>
</div>
