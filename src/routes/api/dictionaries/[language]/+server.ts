import { error } from '@sveltejs/kit';
import { removeDictionary } from '@z3phyro/tytra-core';
import type { RequestHandler } from './$types';

export const DELETE = (async ({ params }) => {
	if (!removeDictionary) {
		throw error(500, "Can't access library");
	}

	removeDictionary(params.language);

	return new Response('{}');
}) satisfies RequestHandler;
