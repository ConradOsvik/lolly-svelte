<script lang="ts">
	import type { MatchListData } from '$lib/types/leagueTypes'

	import { derived, writable } from 'svelte/store'
	import HeroiconsMagnifyingGlassSolid from '~icons/heroicons/magnifying-glass-solid'

	import { page } from '$app/stores'

	import { summonerData } from '$lib/stores/leagueData'
	import { trpc } from '$lib/trpc/client'

	import Input from '$lib/components/common/Input.svelte'

	import Match from './Match.svelte'

	const matchList = writable<MatchListData>($summonerData.matchList ?? [])

	const sortedMatchList = derived(matchList, ($matchList) =>
		$matchList.slice().sort((a, b) => b.matchId.localeCompare(a.matchId))
	)

	let label = 'Show more',
		disabled = false

	$: $summonerData.matchList && addDataToStore($summonerData.matchList)

	const addDataToStore = (data: MatchListData) => {
		const nonDupes = data.filter(
			(obj) => !$matchList.some((match) => match.matchId === obj.matchId) && obj
		)

		$matchList = [...$matchList, ...nonDupes]
	}

	const handleClick = async () => {
		try {
			disabled = true
			label = 'Loading...'

			const data = await trpc($page).match.get.query({
				puuid: $summonerData.profile.puuid,
				take: 20,
				skip: $matchList.length
			})

			if (!data) return

			addDataToStore(data)
		} catch (err: unknown) {
			console.error(err)

			label = 'Show more'
			disabled = false
		} finally {
			label = 'Show more'
			disabled = false
		}
	}
</script>

<div class="m-1.5 flex w-full flex-col items-center justify-start">
	<div class="mb-1.5 w-full rounded-2xl border border-zinc-200 p-3 dark:border-zinc-700">
		<p>test</p>
		<Input placeholder="Summoner, Champion">
			<HeroiconsMagnifyingGlassSolid slot="icon" />
		</Input>
	</div>
	{#each $sortedMatchList as data (data.matchId)}
		<Match {data} />
	{/each}
	<button
		class="m-3 w-full rounded-lg bg-violet-500 px-6 py-3 text-lg font-medium text-white transition-all hover:bg-violet-800 {disabled &&
			'pointer-events-none select-none bg-zinc-200 text-zinc-400 dark:bg-zinc-700 dark:text-zinc-500'}"
		on:click={handleClick}
		{disabled}
	>
		{label}
	</button>
</div>
