<script lang="ts">
	export let group: string[]
	export let value: string
	export let checked: boolean

	$: updateChekbox(group)
	$: updateGroup(checked)

	function updateChekbox(group: string[]) {
		checked = group.indexOf(value) >= 0
	}

	function updateGroup(checked: boolean) {
		const index = group.indexOf(value)
		if (checked) {
			if (index < 0) {
				group.push(value)
				group = group
			}
		} else {
			if (index >= 0) {
				group.splice(index, 1)
				group = group
			}
		}
	}
</script>

<input type="checkbox" bind:checked {value} />
