import { error } from '@sveltejs/kit';
import { readTypedFile, updateTranslation, removeTranslation } from '@z3phyro/tytra-core';
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

export const DELETE = (async ({ params }) => {
	if (!removeTranslation) {
		throw error(500, "Can't access library");
	}

	// We use the language parameter as the fullpath here
	removeTranslation(params.language);

	return new Response('{}');
}) satisfies RequestHandler;
