<script lang="ts">
	import type { RankedStatsData } from '$lib/types/leagueTypes'

	import { page } from '$app/stores'

	export let data: RankedStatsData
</script>

<div class="mb-1.5 flex w-80 flex-col rounded-2xl border border-zinc-200 p-3 dark:border-zinc-700">
	<div
		class="flex items-center justify-between border-b border-zinc-200 pb-3 text-lg dark:border-zinc-700"
	>
		<h3 class="m-0 text-lg leading-none">
			{data.queueType === 'RANKED_FLEX_SR'
				? 'Ranked Flex'
				: data.queueType === 'RANKED_SOLO_5x5'
				? 'Ranked Solo'
				: undefined}
		</h3>
		<a
			class="flex items-center justify-center rounded-lg border border-zinc-200 px-3 py-1.5 text-sm leading-none no-underline transition-all hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
			href="/lol/ladder/{$page.params.platform}/{data.leagueId}"
		>
			View ladder
		</a>
	</div>
	<div class="flex justify-between pt-3">
		<div class="flex items-center">
			<img
				class="relative mr-1.5 w-12"
				src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/{data.tier.toLowerCase()}.svg"
				alt="Icon of rank"
			/>
			<div class="flex flex-col justify-center">
				<span class="py-0.5 text-lg font-medium capitalize leading-none">
					{data.tier.toLowerCase()}
					{data.rank}
				</span>
				<span class="py-0.5 text-gray-600">
					{data.lp} LP
				</span>
			</div>
		</div>
		<div class="flex flex-col justify-center text-gray-600">
			<span class="py-0.5 text-right">
				{data.wins}W {data.losses}L
			</span>
			<span class="py-0.5">
				{((data.wins / (data.wins + data.losses)) * 100).toFixed(0)}
				% Winrate
			</span>
		</div>
	</div>
</div>
