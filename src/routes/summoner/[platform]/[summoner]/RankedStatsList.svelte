<script lang="ts">
	import { summonerData } from '$lib/stores/leagueData'

	import RankedStats from './RankedStats.svelte'
</script>

<div class="m-1.5 flex flex-col items-center justify-start">
	{#if $summonerData.rankedStats}
		{#each $summonerData.rankedStats as data}
			{#if data.queueType === 'RANKED_SOLO_5x5' || data.queueType === 'RANKED_FLEX_SR'}
				<RankedStats {data} />
			{/if}
		{/each}
	{/if}
</div>
