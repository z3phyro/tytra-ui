<script lang="ts">
	import { getNotificationsContext } from 'svelte-notifications';
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
				values: Object.values(addDicts).reduce(
					(prev, curr) => (prev ? prev + ' ' + curr : curr),
					''
				)
			});

			onCancel();
			successNotification(addNotification, 'Translation updated');
		} catch (e: any) {
			errorNotification(addNotification, e.toString());
		}
	};
</script>

<dialog open>
	<article>
		<h3>Add a new entry</h3>
		<label for="">Path</label>
		<input bind:value={termPath} style="width: 500px; max-width: 100%" />

		{#each Object.keys(dicts) as dict}
			<label for={dict}>{dicts[dict]}</label>
			<TextArea bind:value={addDicts[dict]} minRows={4} maxRows={5} />
		{/each}
		<footer>
			<a href="#cancel" role="button" class="secondary" on:click={onCancel}>Cancel</a>
			<a href="#confirm" role="button" on:click={onSave}>Save</a>
		</footer>
	</article>
</dialog>
