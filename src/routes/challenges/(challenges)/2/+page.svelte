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
	import { onMount } from 'svelte';
	import { text } from '@sveltejs/kit';

    let cookieCount = 0;
    let isClicked = false;
    let maxCookies = 10;
    let jaugeColor : string;
    let textColor : string;
    let isMdScreen = false;
    

  $: jaugeHeight = `${(cookieCount / maxCookies) * 100}%`;
  $: isHappy = cookieCount >= maxCookies;
  $: {
    if (cookieCount / maxCookies < 0.3) {
      jaugeColor = 'bg-red-500';
      textColor = 'text-red-500';
    } else if (cookieCount / maxCookies < 0.7) {
      jaugeColor = 'bg-orange-500';
      textColor = 'text-orange-500';
    } else {
      jaugeColor = 'bg-green-500';
      textColor = 'text-green-500';
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

    onMount(() => {
      const mediaQuery = window.matchMedia('(max-width: 768px)');
      updateScreenSize(mediaQuery);
      mediaQuery.addListener(updateScreenSize);

      function updateScreenSize(e: any) {
        isMdScreen = e.matches;
        console.log('🚀 ~ isMdScreen:', isMdScreen);
      }

    return () => {
      mediaQuery.removeListener(updateScreenSize);
    };
  });
</script>

<div class="h-full w-full flex flex-col items-center gap-5">  
    <button  on:click={handleClick} class="transition-scale max-w-[200px] rotate-continuous click-animation">
        <img
        class="{isClicked ? 'clicked' : ''}"
          src="/images/coockie.webp"
          alt="Cookie Monster"
        />
      </button>
    <div class="flex gap-10 justify-center">
        <button class="text-orange-400" on:click={() => modifyCookies()}><Fa  size="2x" icon={faMinus}></Fa></button>
        <button class="text-red-500" on:click={() => modifyCookies(true)}><Fa  size="2x" icon={faRotateRight}></Fa></button>
    </div>
    <p class="flex-grow">Number of cookies eaten: {cookieCount}</p>
    <div class="md:absolute md:h-72 md:w-12 bg-gray-200 rounded-full overflow-hidden md:right-0 md:top-12 md:bottom-auto w-full max-w-[500px] h-12 bottom-0 md:left-auto md:flex md:justify-center relative">
        <div class={`transition-all absolute bottom-0 w-full md:rounded-b-full  rounded-l-full md:rounded-l-none md:rounded-r-none h-full md:h-0 ${jaugeColor}`} style="{isMdScreen ? `width: ${jaugeHeight};` : `height: ${jaugeHeight};`}"></div>
        <div class="absolute md:w-full md:h-[1px] h-full w-[1px] bg-slate-700 md:top-[70%] top-auto left-[70%] md:left-0"></div>
        <div class="absolute md:w-full md:h-[1px] h-full w-[1px] bg-slate-700 md:top-[30%] top-auto left-[30%] md:left-0"></div>
        <img src="/images/santa-happy.png" class="transition-opacity absolute w-12 md:top-2 right-0 {isHappy ? 'opacity-100' : 'opacity-30'} transition-opacity" alt="santa happy"/>
        <img src="/images/santa-angry.webp" class="transition-opacity absolute w-12 md:bottom-2 {isHappy ? 'opacity-30' : 'opacity-100'}" alt="santa angry"/>
    </div>
    <p class="transition-color text-center md:absolute -top-0 right-0 font-bold {textColor}" >{isHappy ? 'Happy' : 'Angry'}</p>
</div>