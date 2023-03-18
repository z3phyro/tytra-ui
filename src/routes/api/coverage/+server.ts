import { error } from '@sveltejs/kit';
// eslint-disable-next-line
// @ts-ignore
import { getCoverage } from '@z3phyro/typed-translations/dist/translations';
import type { RequestHandler } from './$types';

export const GET = (() => {
	if (!getCoverage) {
		throw error(500, "Can't access the dictionaries");
	}

	const result = getCoverage();
	return new Response(JSON.stringify(result));
}) satisfies RequestHandler;
