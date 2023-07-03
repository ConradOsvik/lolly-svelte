<script lang="ts">
	import { fade } from 'svelte/transition'
	import HeroiconsXMarkSolid from '~icons/heroicons/x-mark-solid'

	export let size: 'small' | 'large' = 'small'
	export let variant: 'solid' | 'outline' = 'solid'

	let value = ''
	let input: HTMLElement | undefined
</script>

<div
	class="relative m-1.5 inline-flex items-center justify-center {size === 'large'
		? 'rounded-xl'
		: 'rounded-lg'} {variant === 'outline'
		? 'border border-zinc-200 dark:border-zinc-700'
		: 'bg-zinc-100 dark:bg-zinc-800'}"
>
	{#if $$slots.icon}
		<span
			class="flex items-center justify-center rounded-2xl {size === 'large'
				? 'p-3 text-xl'
				: 'p-1.5 text-lg'}"
		>
			<slot name="icon" />
		</span>
	{/if}
	<input
		class="bg-transparent {size === 'large'
			? 'rounded-xl p-3 text-lg'
			: 'text-md rounded-lg p-1.5'}"
		bind:value
		bind:this={input}
		{...$$restProps}
	/>
	{#if value.length > 0}
		<button
			class="absolute right-0 top-1/2 -translate-y-1/2 {size === 'large'
				? 'rounded-xl p-3'
				: 'rounded-lg p-1.5'} {variant === 'outline'
				? 'bg-white dark:bg-zinc-900'
				: 'bg-zinc-100 dark:bg-zinc-800'}"
			type="button"
			transition:fade={{ duration: 150 }}
			on:click={() => {
				value = ''
				if (input) input.focus()
			}}
		>
			<HeroiconsXMarkSolid class="text-xl" />
		</button>
	{/if}
</div>
