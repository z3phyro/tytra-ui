import { error } from '@sveltejs/kit';
import { initTranslations } from '@z3phyro/tytra-core';
import type { RequestHandler } from './$types';

export const GET = (() => {
	if (!initTranslations) {
		throw error(500, "Can't access the dictionaries");
	}

	initTranslations();
	return new Response('{}');
}) satisfies RequestHandler;
