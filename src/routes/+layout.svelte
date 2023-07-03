<script lang="ts">
	import '@fontsource-variable/rubik'
	import { fly } from 'svelte/transition'

	import Footer from '$lib/components/layout/Footer.svelte'
	import Header from '$lib/components/layout/Header.svelte'
	import Sidebar from '$lib/components/layout/Sidebar.svelte'

	import type { LayoutData } from './$types'
	import './app.css'
	import './tailwind.css'

	export let data: LayoutData
</script>

<svelte:head>
	<script lang="ts">
		if (document) {
			if (localStorage.colorMode === 'dark') {
				document.documentElement.classList.add('dark')
			} else if (
				localStorage.colorMode !== 'light' &&
				window &&
				window.matchMedia('(prefers-color-scheme: dark)').matches
			) {
				document.documentElement.classList.add('dark')
			}
		}
	</script>
</svelte:head>

<div class="flex h-screen w-screen overflow-hidden">
	<Sidebar />
	<div class="flex w-full flex-col items-center justify-start overflow-y-auto">
		<Header />
		{#key data.url}
			<main
				class="flex w-full"
				in:fly={{ x: -100, duration: 150, delay: 150 }}
				out:fly={{ x: 100, duration: 150 }}
			>
				<slot />
			</main>
		{/key}
		<Footer />
	</div>
</div>
