<style lang="scss">
    .hamburger {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 2rem;
        height: 2rem;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
        z-index: 10;
    }

    .hamburger div {
        width: 2rem;
        height: 0.25rem;
        background: slategray;
        border-radius: 10px;
        transition: all 0.3s linear;
        position: relative;
        transform-origin: 1px;
    }

    .change .bar1 {
        transform: rotate(45deg);
    }

    .change .bar2 {
        opacity: 0;
    }

    .change .bar3 {
        transform: rotate(-45deg);
    }


</style>

<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    let hamburgerOpen = false;
    let classList = '';
    export { classList as class };

    const toggleMenu = () => {
        hamburgerOpen = !hamburgerOpen;
        dispatch('toggle');
    };


    const dispatch = createEventDispatcher();
</script>

<button class="hamburger {hamburgerOpen && 'change'} {classList}" on:click={toggleMenu}>
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
  </button>
  