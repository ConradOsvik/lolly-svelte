<script lang="ts">
	import { createSelect, melt } from '@melt-ui/svelte'
	import { fade } from 'svelte/transition'

	const options = {
		europe: ['EU West', 'EU Nordic & East', 'Russia', 'Turkey'],
		americas: ['North America', 'Latin America North', 'Latin America South', 'Brazil'],
		asia: ['Korea', 'Oceania', 'Japan']
	}

	const {
		elements: { trigger, menu, option, group, groupLabel, label },
		states: { valueLabel, open }
	} = createSelect({
		forceVisible: true,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true
		}
	})
</script>

<div class="flex items-center justify-center">
	<div class="flex flex-col gap-1">
		<button
			class="text-magnum-700 flex h-10 min-w-[220px] items-center justify-between rounded-lg bg-white px-3 py-2 shadow transition-opacity hover:opacity-90"
			use:melt={$trigger}
			aria-label="Food"
		>
			{$valueLabel || 'Select a region'}
		</button>
		{#if $open}
			<div
				class="z-20 flex max-h-[300px] flex-col overflow-y-auto rounded-lg bg-white p-1 shadow focus:!ring-0"
				use:melt={$menu}
				transition:fade={{ duration: 150 }}
			>
				{#each Object.entries(options) as [key, arr]}
					<div use:melt={$group(key)}>
						<div
							class="py-1 pl-4 pr-4 font-semibold capitalize text-neutral-800"
							use:melt={$groupLabel(key)}
						>
							{key}
						</div>
						{#each arr as item}
							<div
								class="focus:text-magnum-700 data-[highlighted]:bg-magnum-50 data-[selected]:bg-magnum-100 data-[highlighted]:text-magnum-900 data-[selected]:text-magnum-900 relative cursor-pointer rounded-lg py-1 pl-8 pr-4 text-neutral-800 focus:z-10"
								use:melt={$option({ value: item, label: item })}
							>
								{item}
							</div>
						{/each}
					</div>
				{/each}
			</div>
		{/if}
	</div>
	<input />
</div>
