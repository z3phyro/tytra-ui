<script lang="ts">
	export let value = '';
	export let minRows = 1;
	export let maxRows = 4;

	$: minHeight = `${1 + minRows * 1.2}em`;
	$: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;
</script>

<div class="area-container">
	<pre
		aria-hidden="true"
		style="visibility: hidden; min-height: {minHeight}; max-height: {maxHeight}">{value +
			'\n'}</pre>

	<textarea bind:value />
</div>

<style>
	.area-container {
		position: relative;
	}

	pre,
	textarea {
		font-family: inherit;
		padding: 0.5em;
		box-sizing: border-box;
		border: 1px solid #eee;
		outline: 1px solid var(--primary);
	}

	textarea {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		resize: none;
	}
</style>
