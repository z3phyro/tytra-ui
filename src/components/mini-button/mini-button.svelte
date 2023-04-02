<script lang="ts">
	export let onClick = () => {};
	export let style = '';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="mini-button" {style} on:click|stopPropagation|preventDefault={onClick}>
	<slot />
</div>
