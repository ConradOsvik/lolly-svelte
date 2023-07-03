<script lang="ts">
	import SearchInput from '../common/SearchInput.svelte'
	import ThemeToggle from '../common/ThemeToggle.svelte'
</script>

<header
	class="sticky top-0 z-[1000] mb-2 flex w-full items-center justify-center bg-white p-2 after:absolute after:bottom-0 after:left-[50%] after:w-full after:-translate-x-1/2 after:border-b after:border-zinc-200 dark:bg-zinc-900 dark:after:border-zinc-700"
>
	<div class="flex flex-[1] items-center justify-start" />
	<div class="flex flex-[2] items-center justify-center">
		<SearchInput />
	</div>
	<div class="flex flex-[1] items-center justify-end"><ThemeToggle /></div>
</header>
