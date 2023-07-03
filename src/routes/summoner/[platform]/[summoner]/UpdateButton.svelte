<script lang="ts">
	import type { PlatformType } from '$lib/types/routings'

	import { addMinutes, formatDistanceToNowStrict, isAfter } from 'date-fns'
	import { onDestroy } from 'svelte'

	import { page } from '$app/stores'

	import { summonerData } from '$lib/stores/leagueData'
	import { trpc } from '$lib/trpc/client'

	let summoner = $page.params.summoner
	let platform = $page.params.platform as PlatformType

	let currentDate = new Date()
	let interval = setInterval(() => {
		currentDate = new Date()
	}, 1000)

	let loading = false

	$: updatedAt = $summonerData.profile.updatedAt
	$: disabled = !loading && isAfter(addMinutes(updatedAt, 2), currentDate)
	$: timeDifference = isAfter(addMinutes(updatedAt, 2), currentDate)
		? 'Update ' +
		  formatDistanceToNowStrict(addMinutes(updatedAt, 2), {
				addSuffix: true,
				roundingMethod: 'ceil'
		  })
		: 'Updated ' +
		  formatDistanceToNowStrict(updatedAt, {
				addSuffix: true,
				roundingMethod: 'floor'
		  })
	$: label = !loading
		? isAfter(currentDate, addMinutes(updatedAt, 2))
			? 'update'
			: 'updated'
		: 'updating'

	const handleClick = async () => {
		try {
			loading = true
			disabled = true
			label = 'updating'

			const data = await trpc($page).summoner.update.mutate({ summoner, platform })

			summonerData.set(data)
		} catch (err: unknown) {
			console.error(err)

			label = 'update'
			disabled = false
			loading = false
		} finally {
			label = 'updated'
			loading = false
		}
	}

	onDestroy(() => clearInterval(interval))
</script>

<div class="flex items-end justify-start">
	<button
		class="rounded-lg bg-violet-500 px-6 py-3 text-lg font-medium capitalize text-white transition-all hover:bg-violet-800 {disabled &&
			'pointer-events-none select-none bg-zinc-200 text-zinc-400 dark:bg-zinc-700 dark:text-zinc-500'}"
		id="update-button"
		on:click={handleClick}
		{disabled}
	>
		{label}
	</button>
	<label
		for="update-button"
		class="ml-1.5 whitespace-nowrap leading-none {disabled && 'pointer-events-none select-none'}"
	>
		{timeDifference}
	</label>
</div>
