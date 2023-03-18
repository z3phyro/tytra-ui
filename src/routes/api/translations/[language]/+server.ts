import { error } from '@sveltejs/kit';
//  eslint-disable-next-line
// @ts-ignore
import { readTypedFile } from '@z3phyro/typed-translations/dist/io';
import type { RequestHandler } from './$types';

export const GET = (({ params }) => {
	if (!readTypedFile) {
		throw error(500, "Can't access library");
	}

	console.log(params.language);

	const result = readTypedFile(`${params.language}.translation.ts`);

	return new Response(JSON.stringify(result));
}) satisfies RequestHandler;
