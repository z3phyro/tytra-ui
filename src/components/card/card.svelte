<script lang="ts">
	import IconLink from '../icons/icon-link.svelte';
	import MiniButton from '../mini-button/mini-button.svelte';
	import TextArea from '../text-area/text-area.svelte';
	import { deleteRequest, putRequest } from '../../core/utils/request';
	import { errorNotification, successNotification } from '../../core/utils/notifications';
	import { getNotificationsContext } from 'svelte-notifications';
	import ConfirmModal from '../confirm-modal/confirm-modal.svelte';

	export let fullPath = '';
	export let dicts: any;
	export let lang = 'en';
	export let value = '';

	const { addNotification } = getNotificationsContext();

	let edit = false;

	let editValue = value;
	const toggleEdit = () => {
		editValue = value;
		edit = !edit;
	};

	let saving = false;
	const saveEdition = async () => {
		saving = true;
		value = editValue;
		edit = !edit;

		try {
			await putRequest(`api/translations/${dicts[lang]}`, {
				fullPath,
				editValue
			});

			successNotification(addNotification, 'Translation updated');
		} catch (e: any) {
			errorNotification(addNotification, e.toString());
		}

		saving = false;
	};

	let confirmingDeletion = false;
	const deleteAction = () => {
		confirmingDeletion = true;
	};

	const confirmDelete = async () => {
		try {
			await deleteRequest(`api/translations/${fullPath}`);
			successNotification(addNotification, 'Translation updated');
		} catch (e: any) {
			errorNotification(addNotification, e.toString());
		}
		confirmingDeletion = false;
	};
</script>

<article id={fullPath}>
	<header>
		<span>
			<MiniButton
				onClick={() => {
					navigator.clipboard.writeText(`${window.location.host}/?search=${fullPath}&lang=${lang}`);
					successNotification(addNotification, 'Copied to clipboard');
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

	{#if edit}
		<TextArea bind:value={editValue} minRows={4} maxRows={40} />
	{:else}
		<p style="padding: 5px">
			{value}
		</p>
	{/if}
	<div class="grid">
		<div />
		<div />
		<div />
		<div />
		<div />
		{#if edit}
			<button disabled={saving} class="outline" on:click={toggleEdit}>Cancel</button>
			<button disabled={saving} on:click={saveEdition}>Save</button>
		{:else}
			<button class="outline" on:click={deleteAction}>Remove</button>
			<button on:click={toggleEdit}>Edit</button>
		{/if}
	</div>
</article>

{#if confirmingDeletion}
	<ConfirmModal
		title={'Removing an entire set of translations'}
		description={`This operation will remove the translation on all languages. 
	Are you sure you want to continue?`}
		okText={'Yes'}
		onCancel={() => (confirmingDeletion = false)}
		onConfirm={() => confirmDelete()}
	/>
{/if}
