<script lang="ts">
	export let selected: string[]
	export let label: string | undefined
</script>

<label>
	<input bind:group={selected} />
</label>
