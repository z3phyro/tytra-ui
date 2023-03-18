<script>
	import { search } from '../../core/stores/main.store';
	import { page } from '$app/stores';
	$: path = $page.url.pathname;

	$: {
		search.set($page.url.searchParams.get('search') ?? '');
	}
</script>

<nav>
	<ul class="links">
		<li class:active={path == '/'}><a style="color:inherit" href="/">Translations</a></li>
		<li class:active={path == '/coverage'}>
			<a style="color:inherit" href="/coverage">Coverage</a>
		</li>
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
