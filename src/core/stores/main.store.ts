import { writable } from 'svelte/store';
export const dicts = writable<any>({});
export const search = writable('');
export const lang = writable('en');
export const coverage = writable<any>({});

// search.subscribe((value) => {
// 	if (value && typeof history != 'undefined' && typeof window != 'undefined') {
// 		const url = new URL(window.location.toString());
// 		url.searchParams.set('search', value);
// 		window.history.pushState({}, '', url);
// 	}
// });
