<script lang="ts">
	import { getNotificationsContext } from 'svelte-notifications';
	import { loadCoverage, loadDicts } from '../../core/stores/main.store';
	import { errorNotification, successNotification } from '../../core/utils/notifications';
	import { postRequest } from '../../core/utils/request';

	const { addNotification } = getNotificationsContext();

	export let shortName = '';
	export let name = '';

	export let onCancel = () => {};
	const onSave = async () => {
		try {
			await postRequest('api/dictionaries', {
				shortName,
				name
			});

			onCancel();
			successNotification(addNotification, 'Translation updated');
			await loadDicts();
			await loadCoverage();
		} catch (e: any) {
			console.error(e);
			errorNotification(addNotification, e.toString());
		}
	};
</script>

<dialog open>
	<article>
		<h3>Add a new dictionary</h3>
		<label for="shortName">Short Name</label>
		<input
			name="shortName"
			placeholder="eg. en"
			bind:value={shortName}
			style="width: 500px; max-width: 100%"
		/>
		<label for="name">Name</label>
		<input
			name="name"
			placeholder="eg. English"
			bind:value={name}
			style="width: 500px; max-width: 100%"
		/>

		<footer>
			<a href="#" role="button" class="secondary" on:click={onCancel}>Cancel</a>
			<a href="#" role="button" on:click={onSave}>Save</a>
		</footer>
	</article>
</dialog>
