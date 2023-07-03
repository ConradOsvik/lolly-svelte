<script lang="ts">
	import { onMount } from 'svelte'
	import { portal } from 'svelte-portal'
	import { fade } from 'svelte/transition'

	import { clickOutside } from '$lib/actions/clickOutside'
	import { focusFirstChild } from '$lib/actions/focusFirstChild'
	import { platform } from '$lib/stores/leagueData'
	import { regions } from '$lib/utils/leagueoflegends'

	let innerWidth = 0,
		innerHeight = 0,
		mounted = false,
		anchor: HTMLElement,
		menu: HTMLElement,
		show = false,
		position = {
			x: 0,
			y: 0
		}

	$: {
		innerWidth, innerHeight, calculatePosition()
	}

	const calculatePosition = () => {
		if (!mounted) return
		const anchorRect = anchor.getBoundingClientRect()

		position.x = anchorRect.left
		position.y = anchorRect.top + anchorRect.height + 5
	}

	const handleClick = () => (show = true)

	const handleClickOutside = () => (show = false)

	onMount(() => (mounted = true))
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<button
	class="rounded-2xl bg-violet-500/10 px-6 py-3 text-lg font-medium text-violet-500 hover:bg-violet-500/25"
	bind:this={anchor}
	on:click={handleClick}
>
	{$platform || 'Select'}
</button>
{#if show}
	<div
		class="absolute flex min-h-[400px] min-w-[200px] flex-col items-center justify-start rounded-2xl p-3 shadow-2xl"
		style="top: {position.y}px; left: {position.x}px"
		transition:fade={{ duration: 150 }}
		bind:this={menu}
		use:portal={document.body}
		use:clickOutside
		use:focusFirstChild
		on:click_outside={handleClickOutside}
	>
		{#each regions as region}
			{#each region.platforms as platform}
				<button
					class="mb-1.5 w-full rounded-2xl bg-violet-500/10 p-3 text-lg font-medium last:mb-0 focus:ring"
				>
					{platform.value}
				</button>
			{/each}
		{/each}
	</div>
{/if}
