<script lang="ts">
	import '@picocss/pico';
	import '../app.css';
	import TopBar from '../views/top-bar/top-bar.svelte';
	import Notifications from 'svelte-notifications';
</script>

<Notifications>
	<TopBar />
	<slot />
</Notifications>
