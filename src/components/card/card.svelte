<script lang="ts">
	import IconLink from '../icons/icon-link.svelte';
	import MiniButton from '../mini-button/mini-button.svelte';
	import { getNotificationsContext } from 'svelte-notifications';

	export let fullPath = '';
	export let dicts: any;
	export let lang = 'en';
	export let value = '';

	const { addNotification } = getNotificationsContext();
</script>

<article id={fullPath}>
	<header>
		<span>
			<MiniButton
				onClick={() => {
					navigator.clipboard.writeText(`${window.location.host}/?search=${fullPath}&lang=${lang}`);
					addNotification({
						text: 'Copied to clipboard',
						position: 'top-right',
						type: 'success',
						removeAfter: 1000
					});
				}}
			>
				<IconLink />
			</MiniButton>
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
