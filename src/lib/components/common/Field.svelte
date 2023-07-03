<script lang="ts">
	import Checkbox from './Checkbox.svelte'
	import Radio from './Radio.svelte'

	type Types =
		| 'button'
		| 'checkbox'
		| 'color'
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'file'
		| 'hidden'
		| 'image'
		| 'month'
		| 'number'
		| 'password'
		| 'radio'
		| 'range'
		| 'reset'
		| 'search'
		| 'submit'
		| 'tel'
		| 'text'
		| 'time'
		| 'url'
		| 'week'
		| 'select'

	export let type: Types = 'text'
	export let label: string | undefined = undefined
	export let placeholder: string = ''
	export let options: string[] = []
	export let help: string | undefined = undefined
	export let selected: string[] = []
</script>

{#if type === 'text' || 'password' || 'email'}
	<div>
		<input />
	</div>
{/if}

{#if type === 'checkbox' || 'radio' || 'select'}
	<div>
		{#each options as option}
			<svelte:component
				this={type === 'checkbox' ? Checkbox : type === 'radio' ? Radio : undefined}
				{label}
			/>
		{/each}
	</div>
{/if}
