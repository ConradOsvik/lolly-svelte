<script lang="ts">
	import { page } from '$app/stores'

	export let path: string
	$: isActive = $page.url.pathname === path || $page.url.pathname.startsWith(`${path}/`)
</script>

<a
	class="inline-flex w-60 items-center justify-start rounded-br-full rounded-tr-full px-6 py-3 text-xl font-medium no-underline {isActive
		? 'bg-violet-500/10 text-violet-500 hover:bg-violet-500/25'
		: 'hover:bg-violet-500/10'}"
	href={path}
>
	<span class="mr-3">
		<slot name="icon" />
	</span>
	<slot />
</a>
