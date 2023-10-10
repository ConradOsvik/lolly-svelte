<script lang="ts">
	import { summonerData } from '$lib/stores/leagueData'

	import ProfileIcon from './ProfileIcon.svelte'
	import UpdateButton from './UpdateButton.svelte'
</script>

<div class="my-3 flex items-center justify-start">
	<ProfileIcon />
	<div class="m-1.5 flex h-full flex-col items-start justify-between">
		<h2 class="m-0">{$summonerData.profile.summonerName}</h2>
		<UpdateButton />
	</div>
</div>
