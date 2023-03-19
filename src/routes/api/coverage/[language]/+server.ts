import { error } from '@sveltejs/kit';
// eslint-disable-next-line
// @ts-ignore
import { getCoverage, readTranslation } from '@z3phyro/tytra-core';
import type { RequestHandler } from './$types';

export const GET = (({ params }) => {
	const language = params.language;
	if (!getCoverage) {
		throw error(500, "Can't access the dictionaries");
	}
	const json = readTranslation(language);
	const result = getCoverage(json);

	return new Response(JSON.stringify(result));
}) satisfies RequestHandler;
