<script lang="ts">
	import { onMount } from 'svelte';
	import Tree from '../components/tree/tree.svelte';
	import { search } from '../core/stores/main.store';
	import { getRequest } from '../core/utils/request';

	let translation: { [id: string]: string } = { loading: 'data' };
	let dicts = { loading: 'data' };

	onMount(async () => {
		dicts = await getRequest('api/dictionaries');
		translation = await getRequest('api/translations/english');
	});

	const filterKey = (obj: any, search: string, level = 0) => {
		console.log(obj, level);

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

	$: filteredTranslation = filterKey(translation, $search);
</script>

{$search}

<main class="container">
	<Tree translation={filteredTranslation} {dicts} search={$search} />
</main>
