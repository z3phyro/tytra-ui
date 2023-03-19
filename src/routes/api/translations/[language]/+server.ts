import { error } from '@sveltejs/kit';
//  eslint-disable-next-line
// @ts-ignore
import { readTypedFile, updateTranslation } from '@z3phyro/tytra-core';
import type { RequestHandler } from './$types';

export const GET = (({ params }) => {
	if (!readTypedFile) {
		throw error(500, "Can't access library");
	}

	const result = readTypedFile(`${params.language}.translation.ts`);

	return new Response(JSON.stringify(result));
}) satisfies RequestHandler;

export const PUT = (async ({ request, params }) => {
	if (!updateTranslation) {
		throw error(500, "Can't access library");
	}

	const { fullPath, editValue } = await request.json();

	updateTranslation(params.language, fullPath, editValue);

	return new Response('{}');
}) satisfies RequestHandler;
