<script lang="ts">
	import { patch, summonerData } from '$lib/stores/leagueData'
</script>

<div class="relative m-1.5 w-32">
	<img
		class="m-0 w-full rounded-2xl"
		src="http://ddragon.leagueoflegends.com/cdn/{$patch}/img/profileicon/{$summonerData.profile
			.profileIconId}.png"
		alt="Summoner icon"
	/>
	<span
		class="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 px-2 py-1 leading-none text-white"
	>
		{$summonerData.profile.summonerLevel}
	</span>
</div>
