<script lang="ts">
	import type { MatchData } from '$lib/types/leagueTypes'

	import { page } from '$app/stores'

	export let data: MatchData

	let summoner = $page.params.summoner

	let player = data.MatchParticipants.find((participant) => participant.summonerName === summoner)!
	let outcome =
		player.win && data.gameDuration > 180
			? 'win'
			: !player.win && data.gameDuration > 180
			? 'loss'
			: 'remake'
</script>

<div
	class="mb-1.5 flex w-full rounded-lg {outcome === 'win'
		? 'bg-blue-500/10'
		: outcome === 'loss'
		? 'bg-red-500/10'
		: 'bg-stone-500/10'}"
>
	{data.matchId}
</div>
