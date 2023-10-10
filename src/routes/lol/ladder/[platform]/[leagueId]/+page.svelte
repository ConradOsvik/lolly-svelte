<script lang="ts">
	import { page } from '$app/stores'

	import type { PageData } from './$types'

	export let data: PageData

	let platform = $page.params.platform

	const romanToInt = (roman: 'I' | 'II' | 'III' | 'IV') => {
		const romanMap = new Map([
			['I', 1],
			['II', 2],
			['III', 3],
			['IV', 4]
		])
		return romanMap.get(roman)
	}

	data.entries.sort((a, b) => {
		const rankA = romanToInt(a.rank as 'I' | 'II' | 'III' | 'IV')
		const rankB = romanToInt(b.rank as 'I' | 'II' | 'III' | 'IV')
		if (rankA && rankB && rankA !== rankB) {
			return rankA - rankB
		}
		return b.leaguePoints - a.leaguePoints
	})
</script>

<svelte:head>
	<title>{data.name} - {platform}</title>
</svelte:head>

<pre>
    {JSON.stringify(data, null, 2)}
</pre>
