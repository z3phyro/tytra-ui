<script>
	import { search } from '../../core/stores/main.store';
</script>

<nav>
	<ul>
		<li>Slogan</li>
	</ul>
	<ul>
		<input
			type="search"
			id="search"
			name="search"
			placeholder="Path eg. general.hi"
			bind:value={$search}
		/>
	</ul>
</nav>
