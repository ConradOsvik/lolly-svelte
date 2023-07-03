<script lang="ts">
	import IconCog6Tooth from '~icons/heroicons-solid/cog-6-tooth'
	import IconWrenchScrewdriver from '~icons/heroicons-solid/wrench-screwdriver'
	import HeroiconsBookOpenSolid from '~icons/heroicons/book-open-solid'
	import HeroiconsBugAntSolid from '~icons/heroicons/bug-ant-solid'
	import HeroiconsChartBarSolid from '~icons/heroicons/chart-bar-solid'
	import HeroiconsDocumentMagnifyingGlassSolid from '~icons/heroicons/document-magnifying-glass-solid'
	import HeroiconsHome20Solid from '~icons/heroicons/home-20-solid'
	import HeroiconsPuzzlePieceSolid from '~icons/heroicons/puzzle-piece-solid'
	import HeroiconsTrophySolid from '~icons/heroicons/trophy-solid'

	import SidebarButton from '../common/SidebarButton.svelte'
</script>

<nav class="my-3 mr-3 flex h-screen flex-col items-center justify-start">
	<SidebarButton path="/">
		<HeroiconsHome20Solid slot="icon" />
		Home
	</SidebarButton>
	<SidebarButton path="/champions">
		<HeroiconsBugAntSolid slot="icon" />
		Champions
	</SidebarButton>
	<SidebarButton path="/items">
		<HeroiconsPuzzlePieceSolid slot="icon" />
		Items
	</SidebarButton>
	<SidebarButton path="/leaderboards">
		<HeroiconsTrophySolid slot="icon" />
		Leaderboards
	</SidebarButton>
	<SidebarButton path="/multisearch">
		<HeroiconsDocumentMagnifyingGlassSolid slot="icon" />
		Multisearch
	</SidebarButton>
	<SidebarButton path="/statistics">
		<HeroiconsChartBarSolid slot="icon" />
		Statistics
	</SidebarButton>
	<SidebarButton path="/guides">
		<HeroiconsBookOpenSolid slot="icon" />
		Guides
	</SidebarButton>
	<SidebarButton path="/tools">
		<IconWrenchScrewdriver slot="icon" />
		Tools
	</SidebarButton>
	<SidebarButton path="/settings">
		<IconCog6Tooth slot="icon" />
		Settings
	</SidebarButton>
</nav>
