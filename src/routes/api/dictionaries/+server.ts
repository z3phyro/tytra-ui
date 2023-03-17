import { error } from '@sveltejs/kit';
import { getDictionaries } from '@z3phyro/typed-translations/dist/dictionaries';
import type { RequestHandler } from './$types';

export const GET = (() => {
	if (!getDictionaries) {
		throw error(500, "Can't access the dictionaries");
	}

	const result = getDictionaries();
	return new Response(JSON.stringify(result));
}) satisfies RequestHandler;
