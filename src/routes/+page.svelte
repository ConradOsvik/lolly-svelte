<script lang="ts">
	import { onMount } from 'svelte'
	import Icon123 from '~icons/tabler/123'

	import Select from '$lib/components/common/Select.svelte'

	let date = new Date()
	$: time = date.toLocaleTimeString()

	onMount(() => {
		const timerId = setInterval(() => {
			date = new Date()
		}, 1000)
		return () => {
			clearInterval(timerId)
		}
	})
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<!-- <Select open={true} options={['Select', '123']} /> -->
{time}
<Icon123 />
