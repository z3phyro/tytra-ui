<script lang="ts">
	import { getRequest } from '../../core/utils/request';
	import { getNotificationsContext } from 'svelte-notifications';
	import { errorNotification, successNotification } from '../../core/utils/notifications';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(async () => {
		const result = await getRequest('api/dictionaries');
		if (Object.keys(result).length) {
			goto('/');
		}
	});

	const { addNotification } = getNotificationsContext();
	let initializing = false;
	const initialize = async () => {
		initializing = true;
		try {
			await getRequest(`api/init`);
			successNotification(addNotification, 'Translation updated');
			goto('/');
		} catch (e: any) {
			console.error(e);
			errorNotification(addNotification, e.toString());
		}
		initializing = false;
	};
</script>

<main class="container" style="">
	<section
		style="max-width: 450px;display: flex; align-items: center; flex-direction: column; margin: 0 auto"
	>
		<img src="favicon.png" alt="logo" style="width: 300px; height: 300px" />
		<h1 style="text-align: center">Welcome to Typed Translations</h1>
		<p style="text-align: center">
			We couldn't detect your current configuration. If you want to setup your translations click on
			initialize
		</p>

		<button class="primary" on:click={initialize} disabled={initializing} style="max-width: 250px"
			>{initializing ? 'Initializing...' : 'Initialize'}</button
		>
	</section>
</main>
