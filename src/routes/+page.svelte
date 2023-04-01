<script lang="ts">
	import { onMount } from 'svelte';
	import Tree from '../components/tree/tree.svelte';
	import { dicts, lang, search } from '../core/stores/main.store';
	import { getRequest } from '../core/utils/request';

	let translations: any = {};

	onMount(async () => {
		$dicts = await getRequest('api/dictionaries');

		if (!$lang) {
			$lang = Object.keys($dicts)[0];
		}

		Object.keys($dicts).forEach(async (language) => {
			translations[language] = await getRequest(`api/translations/${$dicts[language]}`);
		});
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

	$: filteredTranslation = filterKey(translations[$lang] ?? {}, $search);
</script>

<main class="container">
	<Tree translation={filteredTranslation} dicts={$dicts} search={$search} bind:lang={$lang} />
</main>
