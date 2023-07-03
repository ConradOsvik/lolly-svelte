<script lang="ts">
	import HeroiconsMoonSolid from '~icons/heroicons/moon-solid'
	import HeroiconsSunSolid from '~icons/heroicons/sun-solid'

	import { colorMode } from '$lib/stores/colorMode'

	const toggleTheme = () => {
		colorMode.update((mode) => (mode === 'dark' ? 'light' : 'dark'))

		$colorMode === 'dark'
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark')
	}
</script>

<button on:click={toggleTheme} class="m-1.5 rounded-2xl p-1.5 text-zinc-900 dark:text-white">
	{#if $colorMode === 'dark'}
		<HeroiconsSunSolid class="text-2xl" />
	{:else}
		<HeroiconsMoonSolid class="text-2xl" />
	{/if}
</button>
