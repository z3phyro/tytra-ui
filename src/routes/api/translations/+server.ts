import { addTranslation } from '@z3phyro/tytra-core';
import type { RequestHandler } from './$types';

export const POST = (async ({ request }) => {
	const { fullPath, values } = await request.json();

	addTranslation(fullPath, values);

	return new Response('{}');
}) satisfies RequestHandler;
