<script lang="ts">
	import { getNotificationsContext } from 'svelte-notifications';
	import { loadTranslations } from '../../core/stores/main.store';
	import { errorNotification, successNotification } from '../../core/utils/notifications';
	import { postRequest } from '../../core/utils/request';

	import TextArea from '../text-area/text-area.svelte';

	export let title = '';
	export let description = '';

	export let onCancel = () => {};

	export let termPath = '';
	export let addDicts: { [id: string]: string } = {};
	export let dicts: { [id: string]: string } = {};

	const { addNotification } = getNotificationsContext();

	export let onSave = async () => {
		try {
			await postRequest('api/translations/', {
				fullPath: termPath,
				values: Object.values(addDicts)
			});

			onCancel();
			loadTranslations();
			successNotification(addNotification, 'Translation updated');
		} catch (e: any) {
			errorNotification(addNotification, e.toString());
		}
	};
</script>

<dialog open>
	<article>
		<h3>Add a new translation</h3>
		<label for="">Path</label>
		<input bind:value={termPath} autofocus style="width: 500px; max-width: 100%" />

		{#each Object.keys(dicts) as dict, index}
			<label for={dict}>{dicts[dict]}</label>
			<TextArea bind:value={addDicts[index]} minRows={4} maxRows={5} />
		{/each}
		<footer>
			<a href="#" role="button" class="secondary" on:click={onCancel}>Cancel</a>
			<a href="#" role="button" on:click={onSave}>Save</a>
		</footer>
	</article>
</dialog>
