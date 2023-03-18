<script lang="ts">
	import { lang } from '../../core/stores/main.store';

	export let translation: { [id: string]: string } = {};
	export let level = 0;
	export let dicts: { [id: string]: string } = {};
	export let path = '';
	export let search = '';

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
			<article>
				<header>
					<span>
						{getFullPath(key)}
					</span>
					<ul class="tabs links">
						{#each Object.keys(dicts) as dict}
							<li
								on:click|preventDefault={(e) => {
									$lang = dict;
								}}
								class:active={$lang == dict}
								data-tooltip={dicts[dict]}
							>
								{dict}
							</li>
						{/each}
					</ul>
				</header>
				{translation[key]}
			</article>
		{/if}
	</details>
{/each}
