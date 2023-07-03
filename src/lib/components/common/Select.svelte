<script lang="ts">
	import { onMount } from 'svelte'
	import { portal } from 'svelte-portal'

	let innerWidth = 0,
		innerHeight = 0

	export let selected: undefined | string = undefined
	export let options: string[] = []
	export let open = false
	export let offset = 0

	let mounted = false,
		anchorLabel: HTMLElement,
		menu: HTMLElement,
		menuLabelElements: HTMLElement[] = [],
		position = {
			top: 0,
			left: 0,
			bottom: 0,
			right: 0
		}

	const setValue = (value: string) => {}

	const calculatePosition = () => {
		if (!mounted) return
		const anchorLabelRect = anchorLabel.getBoundingClientRect()
		const menuRect = menu.getBoundingClientRect()
		const menuItemLabel = menuLabelElements[options.findIndex((option) => option === selected)]
			? menuLabelElements[options.findIndex((option) => option === selected)]
			: menuLabelElements[0]
		const menuItemLabelRect = menuLabelElements[options.findIndex((option) => option === selected)]
			? menuLabelElements[
					options.findIndex((option) => option === selected)
			  ].getBoundingClientRect()
			: menuLabelElements[0].getBoundingClientRect()

		console.log(menuItemLabelRect.left)

		//Top position
		if (anchorLabelRect.top - offset - menuItemLabelRect.top > 0) {
			position.top = anchorLabelRect.top - offset - menuItemLabelRect.top
		}
		if (anchorLabelRect.top - offset - menuItemLabelRect.top < 0) {
			position.top = offset
		}

		//Left position
		if (anchorLabelRect.left + menuRect.width < innerWidth - offset) {
			position.left = anchorLabelRect.left - menuItemLabelRect.left
		}
		if (anchorLabelRect.left + menuRect.width > innerWidth - offset) {
			position.right = offset
		}

		//Bottom position
		if (anchorLabelRect.bottom - offset - menuItemLabelRect.bottom < 0) {
			position.bottom = offset
		}

		// if (menuItemLabel.offsetTop > anchorRect.top - offset) {
		// 	position.top = 0 + offset
		// } else {
		// 	position.top = anchorRect.top - menuItemLabel.offsetTop
		// }

		// if (menuItemLabel.offsetLeft > anchorRect.left - offset) {
		// 	position.left = 0 + offset
		// } else {
		// 	position.left = anchorRect.left - menuItemLabel.offsetLeft
		// }

		// if (menuRect.top + menuRect.height > innerHeight - offset) {
		// }
	}

	$: {
		innerWidth
		innerHeight
		calculatePosition()
	}

	onMount(() => (mounted = true))
</script>

<svelte:window
	bind:innerWidth
	bind:innerHeight
	on:resize={calculatePosition}
	on:scroll={calculatePosition}
/>

<button class="bg-violet-600 px-3 py-1.5">
	<span bind:this={anchorLabel}>
		{selected ? selected : 'Select'}
	</span>
</button>

{#if open}
	<div class="fixed inset-0 z-[1000]" use:portal={document.body}>
		<div
			class="relative inline py-3"
			style="top: {position.top}px; left: {position.left}px; bottom: {position.bottom}px; right: {position.right}px"
			bind:this={menu}
		>
			<ul class="m-0 inline-flex list-none flex-col p-2">
				{#each options as option, i}
					<li class="m-2 cursor-pointer p-2" on:click={() => setValue(option)}>
						<span bind:this={menuLabelElements[i]}>
							{option}
						</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}
