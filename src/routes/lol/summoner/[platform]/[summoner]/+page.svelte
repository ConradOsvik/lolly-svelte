<script lang="ts">
	import type { PlatformType } from '$lib/types/routings'

	import { page } from '$app/stores'

	import { summonerData } from '$lib/stores/leagueData'

	import type { PageData } from './$types'
	import Banner from './Banner.svelte'
	import MatchHistory from './MatchHistory.svelte'
	import RankedStatsList from './RankedStatsList.svelte'

	export let data: PageData

	let summoner = $page.params.summoner,
		platform = $page.params.platform as PlatformType

	summonerData.set(data)
</script>

<svelte:head>
	<title>{summoner} - {platform} / Lolly</title>
</svelte:head>

<Banner />
<hr class="my-3" />
<div class="flex items-start justify-start">
	<RankedStatsList />
	<MatchHistory />
</div>
