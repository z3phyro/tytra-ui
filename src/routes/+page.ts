import { lang, search } from '../core/stores/main.store';
import type { LayoutLoad } from './$types';

export const load = (async ({ url }) => {
	search.set(url.searchParams.get('search') ?? '');
	lang.set(url.searchParams.get('lang') ?? '');
}) satisfies LayoutLoad;
