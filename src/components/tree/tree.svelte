<script lang="ts">
	import Card from '../card/card.svelte';
	import AddModal from '../add-modal/add-modal.svelte';
	import IconPlusCircle from '../icons/icon-plus-circle.svelte';
	import MiniButton from '../mini-button/mini-button.svelte';
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

	export let addVisible = false;
</script>

{#each Object.keys(translation) as key}
	<details open={key.includes(search.split('.')[level])}>
		<summary
			role="button"
			style="position: relative"
			class:contrast={level == 2}
			class:secondary={level == 1}
		>
			{key}
			<MiniButton
				style={'position: absolute; top:12px; right: 40px'}
				onClick={() => (addVisible = !addVisible)}
			>
				<IconPlusCircle />
			</MiniButton>
		</summary>
		{#if typeof translation[key] == 'object'}
			<svelte:self
				translation={translation[key]}
				path={getFullPath(key)}
				{dicts}
				{search}
				bind:lang
				level={level + 1}
			/>
		{:else}
			<Card fullPath={getFullPath(key)} {dicts} bind:lang value={translation[key]} />
		{/if}
	</details>
{/each}

{#if addVisible}
	<AddModal {dicts} onCancel={() => (addVisible = false)} termPath={`${path}.`} />
{/if}
