import { readTranslation } from '@z3phyro/typed-translations/dist/translation';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

export const GET = (({ params }) => {
	const language = params.language;
	if (!readTranslation) {
		throw error(500, "Can't access the translations");
	}

	const result = readTranslation(language);
	return new Response(JSON.stringify(result));
}) satisfies RequestHandler;
