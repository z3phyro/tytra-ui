<script lang="ts">
	export let title = '';
	export let description = '';

	export let onCancel = () => {};
	export let onConfirm = () => {};

	export let okText = 'Confirm';
	export let cancelText = 'Cancel';
</script>

<dialog open>
	<article>
		<h3>{title}</h3>
		<p>
			{description}
		</p>
		<footer>
			<a href="#cancel" role="button" class="secondary" on:click={onCancel}>{cancelText}</a>
			<a href="#confirm" role="button" on:click={onConfirm}>{okText}</a>
		</footer>
	</article>
</dialog>
