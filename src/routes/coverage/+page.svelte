<script lang="ts">
	import { onMount } from 'svelte';
	import { coverage, dicts } from '../../core/stores/main.store';
	import { getRequest } from '../../core/utils/request';

	onMount(async () => {
		$dicts = await getRequest('api/dictionaries');

		$coverage = await getRequest('api/coverage');
	});

	const getPercent = (percent: string) => {
		if (!percent) return 0;
		return Number(percent.slice(0, percent.length - 1));
	};
</script>

<main class="container">
	{#each Object.keys($dicts) || [] as dict}
		<details class="no-select">
			<summary
				role="button"
				class:success={getPercent($coverage[dict]?.percent) >= 80}
				class:warning={getPercent($coverage[dict]?.percent) > 50 &&
					getPercent($coverage[dict]?.percent) < 80}
				class:error={getPercent($coverage[dict]?.percent) <= 50}
			>
				<span>{$dicts[dict]}</span>
				<span class="outlined">{$coverage[dict]?.percent}</span>
			</summary>
			<ul>
				{#each $coverage[dict]?.paths || [] as path}
					<li>{path} <a href={`/?search=${path}&lang=${dict}`}>visit</a></li>
				{/each}
			</ul>
		</details>
	{/each}
</main>
