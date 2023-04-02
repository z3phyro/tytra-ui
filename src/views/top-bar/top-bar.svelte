<script lang="ts">
	import { lang, search } from '../../core/stores/main.store';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	$: path = $page.url.pathname;

	onMount(() => {
		search.set($page.url.searchParams.get('search') ?? '');
	});

	let searchValue = '';
	search.subscribe((val) => {
		searchValue = val;
	});

	let searchTimeout: ReturnType<typeof setTimeout>;
</script>

<nav>
	<ul class="links">
		<li class:active={path == '/'}>
			<a style="color:inherit" href={`/?search=${searchValue}&lang=${$lang}`}>Translations</a>
		</li>
		<li class:active={path == '/coverage'}>
			<a style="color:inherit" href={`/coverage?search=${searchValue}&lang=${$lang}`}>Coverage</a>
		</li>
	</ul>
	<ul>
		<input
			type="search"
			id="search"
			name="search"
			placeholder="Path eg. general.hi"
			value={searchValue}
			on:input={({ currentTarget: { value } }) => {
				let query = $page.url.searchParams;
				search.set(value);

				clearTimeout(searchTimeout);
				searchTimeout = setTimeout(() => {
					query.set('search', value);
					const newUrl = `${window.location.pathname}?${query.toString()}`;
					window.history.pushState({}, '', newUrl);
				}, 300);
			}}
		/>
	</ul>
</nav>
