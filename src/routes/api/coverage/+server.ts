import { error } from '@sveltejs/kit';
import { getAllCoverage } from '@z3phyro/tytra-core';
import type { RequestHandler } from './$types';

export const GET = (() => {
	if (!getAllCoverage) {
		throw error(500, "Can't access the dictionaries");
	}
	const result = getAllCoverage();

	return new Response(JSON.stringify(result));
}) satisfies RequestHandler;
