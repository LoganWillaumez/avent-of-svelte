<style lang="scss">
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    .rotate-continuous {
    animation: spin 10s linear infinite;
    }

    @keyframes bounce {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.8);
        }
    }

    .clicked {
        animation: bounce 0.3s ease;
    }

    .transition-height {
        transition: height 0.3s ease-out;
    }
</style>

<script lang="ts">
    import Fa from 'svelte-fa';
    import { faMinus, faRotateRight } from '@fortawesome/free-solid-svg-icons';
	import { description } from './data';
	import Description from '$lib/components/Description.svelte';

    let cookieCount = 0;
    let isClicked = false;
    let maxCookies = 10;
    let jaugeColor : string;
    

  $: jaugeHeight = `${(cookieCount / maxCookies) * 100}%`;
  $: isHappy = cookieCount >= maxCookies;
  $: {
    if (cookieCount / maxCookies < 0.3) {
      jaugeColor = 'bg-red-500';
    } else if (cookieCount / maxCookies < 0.7) {
      jaugeColor = 'bg-orange-500';
    } else {
      jaugeColor = 'bg-green-500';
    }
  }
  
    const handleClick = () => {
      isClicked = true;
      cookieCount < 10 && cookieCount++;
      setTimeout(() => {
        isClicked = false;
      }, 150);
    };
  
    const modifyCookies = (reset = false) => {
      if (reset) {
        cookieCount = 0;
      } else {
        cookieCount > 0 && cookieCount--;
      }
    };
</script>

<div class="h-full flex flex-col gap-10 overflow-auto text-slate-100 items-center relative"> 
    <h2 class="text-5xl font-bold text-center">Day 2</h2>
	<Description htmlContent={description}></Description>
    <button  on:click={handleClick} class="transition-scale max-w-[200px] rotate-continuous click-animation">
        <img
        class="{isClicked ? 'clicked' : ''}"
          src="/images/coockie.webp"
          alt="Cookie Monster"
        />
      </button>
      
      
    <div class="flex gap-10">
        <button class="text-orange-400" on:click={() => modifyCookies()}><Fa  size="2x" icon={faMinus}></Fa></button>
        <button class="text-red-500" on:click={() => modifyCookies(true)}><Fa  size="2x" icon={faRotateRight}></Fa></button>
    </div>
    <p>Number of cookies eaten: {cookieCount}</p>
    <div class="absolute h-72 w-12 bg-gray-200 rounded-full overflow-hidden right-0">
        <div class={`absolute bottom-0 w-full rounded-b-full transition-height ${jaugeColor}`} style="height: {jaugeHeight}"></div>
        <div class="absolute w-full h-[1px] bg-slate-700 top-[70%]"></div>
        <div class="absolute w-full h-[1px] bg-slate-700 top-[30%]"></div>
        <img src="/images/santa-happy.png" class="transition-opacity absolute w-12 top-2 {isHappy ? 'opacity-100' : 'opacity-30'} transition-opacity" alt="santa happy"/>
        <img src="/images/santa-angry.webp" class="transition-opacity absolute w-12 bottom-2 {isHappy ? 'opacity-30' : 'opacity-100'}" alt="santa angry"/>
    </div>
    <p class="text-center absolute -top-10 right-0">{isHappy ? 'Happy' : 'Angry'}</p>
</div>