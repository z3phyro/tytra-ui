<script lang="ts">
	import { onMount } from 'svelte';
	import AddDictionaryModal from '../../components/add-dictionary-modal/add-dictionary-modal.svelte';
	import ConfirmModal from '../../components/confirm-modal/confirm-modal.svelte';
	import IconDelete from '../../components/icons/icon-delete.svelte';
	import IconPlusCircle from '../../components/icons/icon-plus-circle.svelte';
	import MiniButton from '../../components/mini-button/mini-button.svelte';
	import { coverage, dicts, loadCoverage, loadDicts } from '../../core/stores/main.store';
	import { errorNotification, successNotification } from '../../core/utils/notifications';
	import { deleteRequest } from '../../core/utils/request';
	import { getNotificationsContext } from 'svelte-notifications';

	const { addNotification } = getNotificationsContext();

	onMount(async () => {
		loadDicts();
		loadCoverage();
	});

	const getPercent = (percent: string) => {
		if (!percent) return 0;
		return Number(percent.slice(0, percent.length - 1));
	};

	let addVisible = false;
	let removeDict = '';

	const onDelete = async () => {
		try {
			await deleteRequest(`api/dictionaries/${removeDict}`);
			loadDicts();
			successNotification(addNotification, 'Dictionary Removed');
		} catch (e: any) {
			errorNotification(addNotification, e.toString());
		}
		removeDict = '';
	};
</script>

<main class="container">
	<button class="primary" on:click={() => (addVisible = true)}>
		<span style="margin-bottom: 20px; margin-right: 4px"><IconPlusCircle /></span>Add Dictionary
	</button>
	{#each Object.keys($dicts) || [] as dict}
		<details class="no-select">
			<summary
				role="button"
				style="position: relative"
				class:info={typeof $coverage[dict] == 'undefined'}
				class:success={typeof $coverage[dict] !== 'undefined' &&
					getPercent($coverage[dict]?.percent) >= 80}
				class:warning={typeof $coverage[dict] !== 'undefined' &&
					getPercent($coverage[dict]?.percent) > 50 &&
					getPercent($coverage[dict]?.percent) < 80}
				class:error={typeof $coverage[dict] !== 'undefined' &&
					getPercent($coverage[dict]?.percent) <= 50}
			>
				<span>{$dicts[dict]}</span>
				<span class="outlined">{$coverage[dict]?.percent ?? 'Loading...'}</span>
				<MiniButton
					style={'position: absolute; top:12px; right: 40px; color: white !important'}
					onClick={() => (removeDict = dict)}
				>
					<IconDelete />
				</MiniButton>
			</summary>
			<ul>
				{#each $coverage[dict]?.paths || [] as path}
					<li>{path} <a href={`/?search=${path}&lang=${dict}`}>visit</a></li>
				{/each}
			</ul>
		</details>
	{/each}
</main>

{#if addVisible}
	<AddDictionaryModal onCancel={() => (addVisible = false)} />
{/if}

{#if !!removeDict}
	<ConfirmModal
		title="Delete confirmation"
		description="This operation will delete all the translations corresponding to this dictionary. Are you sure you want to continue?"
		onCancel={() => (removeDict = '')}
		okText="Delete"
		okClass="danger"
		onConfirm={onDelete}
	/>
{/if}
