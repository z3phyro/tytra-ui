<script lang="ts">
	import Card from '../card/card.svelte';
	export let translation: { [id: string]: string } = {};
	export let level = 0;
	export let dicts: { [id: string]: string } = {};
	export let path = '';
	export let search = '';
	export let lang = 'en';

	const getFullPath = (key: string) => {
		if (!path) return key;
		return `${path}.${key}`;
	};
</script>

{#each Object.keys(translation) as key}
	<details open={key.includes(search.split('.')[level])}>
		<summary role="button" class:contrast={level == 2} class:secondary={level == 1}>{key}</summary>
		{#if typeof translation[key] == 'object'}
			<svelte:self
				translation={translation[key]}
				path={getFullPath(key)}
				{dicts}
				{search}
				level={level + 1}
			/>
		{:else}
			<Card fullPath={getFullPath(key)} {dicts} {lang} value={translation[key]} />
		{/if}
	</details>
{/each}
