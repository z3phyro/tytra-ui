<script lang="ts">
	import { onMount } from 'svelte';
	import Tree from '../components/tree/tree.svelte';
	import { lang, search } from '../core/stores/main.store';
	import { getRequest } from '../core/utils/request';

	let translations: any = {};
	let dicts: any = { loading: 'data' };

	onMount(async () => {
		dicts = await getRequest('api/dictionaries');

		if (!$lang) {
			$lang = Object.keys(dicts)[0];
		}

		Object.keys(dicts).forEach(async (language) => {
			translations[language] = await getRequest(`api/translations/${dicts[language]}`);
		});
	});

	const filterKey = (obj: any, search: string, level = 0) => {
		return Object.keys(obj).reduce((cur: any, key: string) => {
			if (search && search.split('.').length > level) {
				if (!key.includes(search.split('.')[level])) {
					return cur;
				}
				if (typeof obj[key] == 'object')
					return Object.assign(cur, { [key]: filterKey(obj[key], search, level + 1) });
			}

			return Object.assign(cur, { [key]: obj[key] });
		}, {});
	};

	$: filteredTranslation = filterKey(translations[$lang] ?? {}, $search);
</script>

<main class="container">
	<Tree translation={filteredTranslation} {dicts} search={$search} />
</main>
