<script lang="ts">
	export let fullPath = '';
	export let dicts: any;
	export let lang = 'en';
	export let value = '';
</script>

<article>
	<header>
		<span>
			{fullPath}
		</span>
		<ul class="tabs links">
			{#each Object.keys(dicts) as dict}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<li
					on:click|preventDefault={(e) => {
						lang = dict;
					}}
					class:active={lang == dict}
					data-tooltip={dicts[dict]}
				>
					{dict}
				</li>
			{/each}
		</ul>
	</header>
	{value}
</article>
