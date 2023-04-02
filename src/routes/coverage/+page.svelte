<script lang="ts">
	import { onMount } from 'svelte';
	import AddDictionaryModal from '../../components/add-dictionary-modal/add-dictionary-modal.svelte';
	import IconPlusCircle from '../../components/icons/icon-plus-circle.svelte';
	import { coverage, dicts, loadCoverage, loadDicts } from '../../core/stores/main.store';
	import { getRequest } from '../../core/utils/request';

	onMount(async () => {
		loadDicts();
		loadCoverage();
	});

	const getPercent = (percent: string) => {
		if (!percent) return 0;
		return Number(percent.slice(0, percent.length - 1));
	};

	let addVisible = false;
</script>

<main class="container">
	<button class="primary" on:click={() => (addVisible = true)}>
		<span style="margin-bottom: 20px; margin-right: 4px"><IconPlusCircle /></span>Add Dictionary
	</button>
	{#each Object.keys($dicts) || [] as dict}
		<details class="no-select">
			<summary
				role="button"
				class:info={typeof $coverage[dict] == 'undefined'}
				class:success={typeof $coverage[dict] !== 'undefined' &&
					getPercent($coverage[dict]?.percent) >= 80}
				class:warning={typeof $coverage[dict] !== 'undefined' &&
					getPercent($coverage[dict]?.percent) > 50 &&
					getPercent($coverage[dict]?.percent) < 80}
				class:error={typeof $coverage[dict] !== 'undefined' &&
					getPercent($coverage[dict]?.percent) <= 50}
			>
				<span>{$dicts[dict]}</span>
				<span class="outlined">{$coverage[dict]?.percent ?? 'Loading...'}</span>
			</summary>
			<ul>
				{#each $coverage[dict]?.paths || [] as path}
					<li>{path} <a href={`/?search=${path}&lang=${dict}`}>visit</a></li>
				{/each}
			</ul>
		</details>
	{/each}
</main>

{#if addVisible}
	<AddDictionaryModal onCancel={() => (addVisible = false)} />
{/if}
