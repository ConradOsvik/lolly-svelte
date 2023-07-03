<script lang="ts">
	import { fade } from 'svelte/transition'
	import HeroiconsMagnifyingGlassSolid from '~icons/heroicons/magnifying-glass-solid'
	import HeroiconsXMarkSolid from '~icons/heroicons/x-mark-solid'

	import PlatformSelect from './PlatformSelect.svelte'

	let value = '',
		input: HTMLElement

	const handleSubmit = (e: SubmitEvent) => {
		console.log('submitted')
	}
</script>

<PlatformSelect />
<form
	class="relative m-1.5 flex rounded-2xl bg-zinc-100 dark:bg-zinc-800"
	on:submit|preventDefault={handleSubmit}
>
	<span class="flex items-center justify-center rounded-2xl p-3">
		<HeroiconsMagnifyingGlassSolid class="text-xl" />
	</span>
	<input
		bind:this={input}
		bind:value
		class="rounded-2xl bg-zinc-100 py-3 pr-3 text-xl placeholder:text-zinc-300 focus-visible:ring-0 dark:bg-zinc-800 dark:placeholder:text-zinc-600"
		placeholder="Summoner"
	/>
	{#if value.length > 0}
		<button
			class="absolute right-0 top-1/2 -translate-y-1/2 rounded-2xl bg-zinc-100 p-3 dark:bg-zinc-800"
			type="button"
			transition:fade={{ duration: 150 }}
			on:click={() => {
				value = ''
				input.focus()
			}}
		>
			<HeroiconsXMarkSolid class="text-xl" />
		</button>
	{/if}
</form>
