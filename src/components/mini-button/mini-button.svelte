<script lang="ts">
	export let onClick = () => {};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="mini-button" on:click={onClick}>
	<slot />
</div>
