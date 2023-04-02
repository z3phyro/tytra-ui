<script lang="ts">
	import { onMount } from 'svelte';
	import AddModal from '../components/add-modal/add-modal.svelte';
	import IconPlusCircle from '../components/icons/icon-plus-circle.svelte';
	import IconPlus from '../components/icons/icon-plus.svelte';
	import Tree from '../components/tree/tree.svelte';
	import {
		dicts,
		lang,
		loadCoverage,
		loadDicts,
		loadTranslations,
		search,
		translations
	} from '../core/stores/main.store';

	onMount(async () => {
		await loadDicts();

		await loadTranslations();

		await loadCoverage();
	});

	const filterKey = (obj: any, search: string, level = 0, currPath = '') => {
		return Object.keys(obj).reduce((cur: any, key: string) => {
			const tempPath = currPath ? currPath + '.' + key : 'key';

			if (typeof obj[key] == 'object') {
				const tempObj: any = filterKey(
					obj[key],
					search,
					level + 1,
					currPath ? currPath + '.' + key : key
				);

				if (Object.keys(tempObj).length) {
					return Object.assign(cur, {
						[key]: tempObj
					});
				} else {
					return cur;
				}
			}

			if (tempPath.includes(search)) {
				Object.assign(cur, { [key]: obj[key] });
			}

			return cur;
		}, {});
	};

	$: filteredTranslation = filterKey($translations[$lang] ?? {}, $search);

	let addVisible = false;
</script>

<main class="container">
	<button class="success" on:click={() => (addVisible = true)}>
		<span style="margin-bottom: 20px; margin-right: 4px"><IconPlusCircle /></span>Add translation
	</button>
	<Tree translation={filteredTranslation} dicts={$dicts} search={$search} bind:lang={$lang} />
</main>

{#if addVisible}
	<AddModal dicts={$dicts} onCancel={() => (addVisible = false)} termPath={''} />
{/if}
